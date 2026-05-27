export interface ModaltransConfig {
  baseUrl: string;
  bearerToken: string;
}

export interface ModaltransInvoiceItem {
  id: number;
  name: string;
  parent_id: number;
  parent_type: string;
  finitem_id?: number;
  finitem_name?: string;
  debit_credit: string;
  curr: string;
  unit_number: number;
  unit_price: number;
  total_amount: number;
  vat_rate?: number;
  vat_amount?: number;
  doc_no?: string;
  doc_date?: string;
  notes?: string;
}

export interface ModaltransFinancialSummary {
  total_sales: number;
  total_purchases: number;
  profit_loss: number;
  total_sales_usd?: number;
  total_purchases_usd?: number;
  profit_loss_usd?: number;
}

export interface ModaltransShipmentFinancials {
  finload: ModaltransFinancialSummary[];
  involines: ModaltransInvoiceItem[];
}

export interface ExpenseLineItemInput {
  description: string;
  finitemName?: string;
  finitemId?: number;
  debitCredit?: "debit" | "credit";
  quantity: number;
  unitPrice: number;
  vatRate?: number;
  docNo?: string;
  docDate?: string;
  notes?: string;
}

export interface ExpenseFormCostSnapshot {
  formSubtotal: number;
  formVatTotal: number;
  formTotal: number;
  modaltrans?: {
    totalSales: number;
    totalPurchases: number;
    profitLoss: number;
    invoiceLineCount: number;
    syncedAt: string;
  };
}
