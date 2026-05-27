import { ModaltransClient } from "./client.js";
import type {
  ExpenseFormCostSnapshot,
  ExpenseLineItemInput,
  ModaltransInvoiceItem,
} from "./types.js";

export interface PipelineLineItem extends ExpenseLineItemInput {
  id?: number;
  lineTotal: number;
  modaltransInvoiceItemId?: number | null;
}

export interface PipelineFormState {
  shipmentId: number;
  parentType: string;
  currency: string;
  lineItems: PipelineLineItem[];
}

export function computeLineTotal(item: ExpenseLineItemInput): number {
  const base = item.quantity * item.unitPrice;
  const vatRate = item.vatRate ?? 0;
  return Math.round(base * (1 + vatRate / 100) * 100) / 100;
}

export function computeFormTotals(lineItems: PipelineLineItem[]): {
  subtotal: number;
  vatTotal: number;
  total: number;
} {
  let subtotal = 0;
  let vatTotal = 0;

  for (const item of lineItems) {
    const base = item.quantity * item.unitPrice;
    const vat = base * ((item.vatRate ?? 0) / 100);
    subtotal += base;
    vatTotal += vat;
  }

  subtotal = Math.round(subtotal * 100) / 100;
  vatTotal = Math.round(vatTotal * 100) / 100;
  return { subtotal, vatTotal, total: Math.round((subtotal + vatTotal) * 100) / 100 };
}

function matchInvoiceItem(
  local: PipelineLineItem,
  remote: ModaltransInvoiceItem[],
): ModaltransInvoiceItem | undefined {
  if (local.docNo) {
    const byDoc = remote.find((r) => r.doc_no === local.docNo);
    if (byDoc) return byDoc;
  }
  if (local.finitemName) {
    const byFin = remote.find((r) => r.finitem_name === local.finitemName || r.name === local.finitemName);
    if (byFin) return byFin;
  }
  return remote.find((r) => r.name === local.description);
}

export async function syncExpenseLinesToModaltrans(
  client: ModaltransClient,
  form: PipelineFormState,
): Promise<{ lineItems: PipelineLineItem[]; errors: string[] }> {
  const errors: string[] = [];
  let remoteItems: ModaltransInvoiceItem[] = [];

  try {
    remoteItems = await client.listInvoiceItems({
      parentId: form.shipmentId,
      parentType: form.parentType,
    });
  } catch (err) {
    errors.push(`Liste alınamadı: ${(err as Error).message}`);
  }

  const updated: PipelineLineItem[] = [];

  for (const item of form.lineItems) {
    const existing = remoteItems.length ? matchInvoiceItem(item, remoteItems) : undefined;
    if (existing) {
      updated.push({ ...item, modaltransInvoiceItemId: existing.id });
      continue;
    }

    try {
      const created = await client.createInvoiceItem({
        parentId: form.shipmentId,
        parentType: form.parentType,
        name: item.description,
        debitCredit: item.debitCredit ?? "debit",
        currency: form.currency,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        vatRate: item.vatRate ?? 0,
        finitemId: item.finitemId,
        docNo: item.docNo,
        docDate: item.docDate,
        notes: item.notes,
      });
      updated.push({ ...item, modaltransInvoiceItemId: created.id });
      remoteItems.push(created);
    } catch (err) {
      errors.push(`"${item.description}": ${(err as Error).message}`);
      updated.push({ ...item, modaltransInvoiceItemId: null });
    }
  }

  return { lineItems: updated, errors };
}

export async function buildSettlementCostSnapshot(
  client: ModaltransClient,
  form: PipelineFormState,
): Promise<ExpenseFormCostSnapshot> {
  const totals = computeFormTotals(form.lineItems);
  const snapshot: ExpenseFormCostSnapshot = {
    formSubtotal: totals.subtotal,
    formVatTotal: totals.vatTotal,
    formTotal: totals.total,
  };

  const financials = await client.getShipmentFinancials(form.shipmentId);
  const summary = financials.finload?.[0];
  if (summary) {
    snapshot.modaltrans = {
      totalSales: summary.total_sales,
      totalPurchases: summary.total_purchases,
      profitLoss: summary.profit_loss,
      invoiceLineCount: financials.involines?.length ?? 0,
      syncedAt: new Date().toISOString(),
    };
  }

  return snapshot;
}
