import type {
  ModaltransConfig,
  ModaltransInvoiceItem,
  ModaltransShipmentFinancials,
} from "./types.js";

export class ModaltransApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly body?: string,
  ) {
    super(message);
    this.name = "ModaltransApiError";
  }
}

export function getModaltransConfigFromEnv(): ModaltransConfig | null {
  const baseUrl = process.env["MODALTRANS_API_URL"]?.replace(/\/$/, "");
  const bearerToken = process.env["MODALTRANS_BEARER_TOKEN"];
  if (!baseUrl || !bearerToken) return null;
  return { baseUrl, bearerToken };
}

export class ModaltransClient {
  constructor(private readonly config: ModaltransConfig) {}

  private async request<T>(path: string, init?: RequestInit): Promise<T> {
    const url = `${this.config.baseUrl}${path}`;
    const res = await fetch(url, {
      ...init,
      headers: {
        Authorization: `Bearer ${this.config.bearerToken}`,
        Accept: "application/json",
        ...(init?.body ? { "Content-Type": "application/json" } : {}),
        ...init?.headers,
      },
    });

    const text = await res.text();
    if (!res.ok) {
      throw new ModaltransApiError(
        `Modaltrans API ${res.status}: ${text.slice(0, 500)}`,
        res.status,
        text,
      );
    }

    if (!text) return undefined as T;
    return JSON.parse(text) as T;
  }

  async listInvoiceItems(params: {
    parentId: number;
    parentType: string;
    page?: number;
  }): Promise<ModaltransInvoiceItem[]> {
    const qs = new URLSearchParams({
      parent_id: String(params.parentId),
      parent_type: params.parentType,
      page: String(params.page ?? 1),
    });
    return this.request<ModaltransInvoiceItem[]>(`/api/v1/invoice_items?${qs}`);
  }

  async createInvoiceItem(payload: {
    parentId: number;
    parentType: string;
    name: string;
    debitCredit: "debit" | "credit";
    currency: string;
    quantity: number;
    unitPrice: number;
    vatRate: number;
    finitemId?: number;
    docNo?: string;
    docDate?: string;
    notes?: string;
  }): Promise<ModaltransInvoiceItem> {
    const body = {
      invoice_item: {
        parent_id: payload.parentId,
        parent_type: payload.parentType,
        name: payload.name,
        debit_credit: payload.debitCredit,
        curr: payload.currency,
        unit_number: payload.quantity,
        unit_price: payload.unitPrice,
        vat_rate: payload.vatRate,
        finitem_id: payload.finitemId,
        doc_no: payload.docNo,
        doc_date: payload.docDate,
        notes: payload.notes,
      },
    };

    return this.request<ModaltransInvoiceItem>("/api/v1/invoice_items", {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  async getShipmentFinancials(shipmentId: number): Promise<ModaltransShipmentFinancials> {
    return this.request<ModaltransShipmentFinancials>(
      `/api/v1/shipments/${shipmentId}/financials`,
    );
  }
}
