import { eq } from "drizzle-orm";
import { db } from "@workspace/db";
import {
  expenseFormsTable,
  expenseLineItemsTable,
  insertExpenseFormSchema,
  type ExpenseForm,
  type ExpenseLineItem,
} from "@workspace/db/schema";
import {
  ModaltransClient,
  buildSettlementCostSnapshot,
  computeFormTotals,
  computeLineTotal,
  getModaltransConfigFromEnv,
  syncExpenseLinesToModaltrans,
  type ExpenseFormCostSnapshot,
  type PipelineLineItem,
} from "@workspace/modaltrans";

function toNumber(value: string | null | undefined): number {
  if (value == null) return 0;
  return Number(value);
}

function mapLineFromDb(row: ExpenseLineItem): PipelineLineItem {
  return {
    id: row.id,
    description: row.description,
    finitemName: row.finitemName ?? undefined,
    finitemId: row.finitemId ?? undefined,
    debitCredit: (row.debitCredit as "debit" | "credit") ?? "debit",
    quantity: toNumber(row.quantity),
    unitPrice: toNumber(row.unitPrice),
    vatRate: toNumber(row.vatRate),
    docNo: row.docNo ?? undefined,
    docDate: row.docDate ?? undefined,
    lineTotal: toNumber(row.lineTotal),
    modaltransInvoiceItemId: row.modaltransInvoiceItemId,
  };
}

export interface ExpenseFormResponse {
  form: ExpenseForm;
  lineItems: ExpenseLineItem[];
  costSnapshot?: ExpenseFormCostSnapshot | null;
}

async function loadFormWithItems(formId: number): Promise<ExpenseFormResponse | null> {
  const [form] = await db.select().from(expenseFormsTable).where(eq(expenseFormsTable.id, formId));
  if (!form) return null;

  const lineItems = await db
    .select()
    .from(expenseLineItemsTable)
    .where(eq(expenseLineItemsTable.formId, formId))
    .orderBy(expenseLineItemsTable.sortOrder);

  return {
    form,
    lineItems,
    costSnapshot: (form.costSnapshot as ExpenseFormCostSnapshot | null) ?? null,
  };
}

export async function createExpenseForm(input: unknown): Promise<ExpenseFormResponse> {
  const parsed = insertExpenseFormSchema.parse(input);
  const pipelineItems: PipelineLineItem[] = parsed.lineItems.map((item) => ({
    ...item,
    lineTotal: computeLineTotal(item),
  }));
  const totals = computeFormTotals(pipelineItems);

  const [form] = await db
    .insert(expenseFormsTable)
    .values({
      driverName: parsed.driverName,
      vehiclePlate: parsed.vehiclePlate,
      shipmentId: parsed.shipmentId,
      modaltransParentType: parsed.modaltransParentType,
      currency: parsed.currency,
      status: "submitted",
      subtotal: String(totals.subtotal),
      vatTotal: String(totals.vatTotal),
      total: String(totals.total),
    })
    .returning();

  const lineRows = await db
    .insert(expenseLineItemsTable)
    .values(
      pipelineItems.map((item, index) => ({
        formId: form.id,
        description: item.description,
        finitemName: item.finitemName,
        finitemId: item.finitemId,
        debitCredit: item.debitCredit ?? "debit",
        quantity: String(item.quantity),
        unitPrice: String(item.unitPrice),
        vatRate: String(item.vatRate ?? 0),
        lineTotal: String(item.lineTotal),
        docNo: item.docNo,
        docDate: item.docDate,
        sortOrder: index,
      })),
    )
    .returning();

  return { form, lineItems: lineRows };
}

export async function getExpenseForm(formId: number): Promise<ExpenseFormResponse | null> {
  return loadFormWithItems(formId);
}

export async function runModaltransSync(formId: number): Promise<ExpenseFormResponse> {
  const loaded = await loadFormWithItems(formId);
  if (!loaded) throw new Error("Masraf formu bulunamadı.");
  if (!loaded.form.shipmentId) throw new Error("Modaltrans senkronu için shipmentId gerekli.");

  const config = getModaltransConfigFromEnv();
  if (!config) {
    await db
      .update(expenseFormsTable)
      .set({
        status: "failed",
        syncError: "MODALTRANS_API_URL ve MODALTRANS_BEARER_TOKEN tanımlı değil.",
        updatedAt: new Date(),
      })
      .where(eq(expenseFormsTable.id, formId));
    throw new Error("Modaltrans yapılandırması eksik.");
  }

  const client = new ModaltransClient(config);
  const pipelineItems = loaded.lineItems.map(mapLineFromDb);

  const { lineItems: synced, errors } = await syncExpenseLinesToModaltrans(client, {
    shipmentId: loaded.form.shipmentId,
    parentType: loaded.form.modaltransParentType,
    currency: loaded.form.currency,
    lineItems: pipelineItems,
  });

  for (const item of synced) {
    if (!item.id) continue;
    await db
      .update(expenseLineItemsTable)
      .set({ modaltransInvoiceItemId: item.modaltransInvoiceItemId ?? null })
      .where(eq(expenseLineItemsTable.id, item.id));
  }

  const allSynced = synced.every((i) => i.modaltransInvoiceItemId != null);
  const status = allSynced ? "synced" : errors.length ? "failed" : "synced";

  await db
    .update(expenseFormsTable)
    .set({
      status,
      syncError: errors.length ? errors.join("; ") : null,
      updatedAt: new Date(),
    })
    .where(eq(expenseFormsTable.id, formId));

  const result = await loadFormWithItems(formId);
  if (!result) throw new Error("Masraf formu bulunamadı.");
  return result;
}

export async function runExpenseSettlement(
  formId: number,
  settlementNotes?: string,
): Promise<ExpenseFormResponse> {
  const loaded = await loadFormWithItems(formId);
  if (!loaded) throw new Error("Masraf formu bulunamadı.");
  if (!loaded.form.shipmentId) throw new Error("Settlement için shipmentId gerekli.");

  const config = getModaltransConfigFromEnv();
  let costSnapshot: ExpenseFormCostSnapshot = {
    formSubtotal: toNumber(loaded.form.subtotal),
    formVatTotal: toNumber(loaded.form.vatTotal),
    formTotal: toNumber(loaded.form.total),
  };

  if (config) {
    const client = new ModaltransClient(config);
    costSnapshot = await buildSettlementCostSnapshot(client, {
      shipmentId: loaded.form.shipmentId,
      parentType: loaded.form.modaltransParentType,
      currency: loaded.form.currency,
      lineItems: loaded.lineItems.map(mapLineFromDb),
    });
  }

  await db
    .update(expenseFormsTable)
    .set({
      status: "settled",
      settlementNotes: settlementNotes ?? null,
      costSnapshot,
      updatedAt: new Date(),
    })
    .where(eq(expenseFormsTable.id, formId));

  const result = await loadFormWithItems(formId);
  if (!result) throw new Error("Masraf formu bulunamadı.");
  return result;
}

export async function getShipmentCostsFromModaltrans(shipmentId: number) {
  const config = getModaltransConfigFromEnv();
  if (!config) throw new Error("Modaltrans yapılandırması eksik.");
  const client = new ModaltransClient(config);
  return client.getShipmentFinancials(shipmentId);
}
