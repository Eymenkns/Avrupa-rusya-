import { relations } from "drizzle-orm";
import {
  date,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const expenseFormStatusEnum = pgEnum("expense_form_status", [
  "draft",
  "submitted",
  "synced",
  "settled",
  "failed",
]);

export const expenseFormsTable = pgTable("expense_forms", {
  id: serial("id").primaryKey(),
  driverName: text("driver_name").notNull(),
  vehiclePlate: text("vehicle_plate"),
  shipmentId: integer("shipment_id"),
  modaltransParentType: text("modaltrans_parent_type").notNull().default("Logistics::Shipment"),
  status: expenseFormStatusEnum("status").notNull().default("draft"),
  currency: text("currency").notNull().default("TRY"),
  subtotal: numeric("subtotal", { precision: 14, scale: 2 }).notNull().default("0"),
  vatTotal: numeric("vat_total", { precision: 14, scale: 2 }).notNull().default("0"),
  total: numeric("total", { precision: 14, scale: 2 }).notNull().default("0"),
  settlementNotes: text("settlement_notes"),
  costSnapshot: jsonb("cost_snapshot"),
  syncError: text("sync_error"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const expenseLineItemsTable = pgTable("expense_line_items", {
  id: serial("id").primaryKey(),
  formId: integer("form_id")
    .notNull()
    .references(() => expenseFormsTable.id, { onDelete: "cascade" }),
  description: text("description").notNull(),
  finitemName: text("finitem_name"),
  finitemId: integer("finitem_id"),
  debitCredit: text("debit_credit").notNull().default("debit"),
  quantity: numeric("quantity", { precision: 12, scale: 4 }).notNull().default("1"),
  unitPrice: numeric("unit_price", { precision: 14, scale: 2 }).notNull(),
  vatRate: numeric("vat_rate", { precision: 5, scale: 2 }).notNull().default("0"),
  lineTotal: numeric("line_total", { precision: 14, scale: 2 }).notNull(),
  docNo: text("doc_no"),
  docDate: date("doc_date"),
  modaltransInvoiceItemId: integer("modaltrans_invoice_item_id"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const expenseFormsRelations = relations(expenseFormsTable, ({ many }) => ({
  lineItems: many(expenseLineItemsTable),
}));

export const expenseLineItemsRelations = relations(expenseLineItemsTable, ({ one }) => ({
  form: one(expenseFormsTable, {
    fields: [expenseLineItemsTable.formId],
    references: [expenseFormsTable.id],
  }),
}));

const lineItemInputSchema = z.object({
  description: z.string().min(1),
  finitemName: z.string().optional(),
  finitemId: z.number().int().positive().optional(),
  debitCredit: z.enum(["debit", "credit"]).optional(),
  quantity: z.number().positive(),
  unitPrice: z.number(),
  vatRate: z.number().min(0).max(100).optional(),
  docNo: z.string().optional(),
  docDate: z.string().optional(),
  notes: z.string().optional(),
});

export const insertExpenseFormSchema = createInsertSchema(expenseFormsTable)
  .omit({
    id: true,
    status: true,
    subtotal: true,
    vatTotal: true,
    total: true,
    costSnapshot: true,
    syncError: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    lineItems: z.array(lineItemInputSchema).min(1),
  });

export type InsertExpenseForm = z.infer<typeof insertExpenseFormSchema>;
export type ExpenseForm = typeof expenseFormsTable.$inferSelect;
export type ExpenseLineItem = typeof expenseLineItemsTable.$inferSelect;
