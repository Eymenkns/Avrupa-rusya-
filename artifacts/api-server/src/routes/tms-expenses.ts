import { Router, type IRouter } from "express";
import {
  createExpenseForm,
  getExpenseForm,
  getShipmentCostsFromModaltrans,
  runExpenseSettlement,
  runModaltransSync,
} from "../services/tms-expense-service";

const router: IRouter = Router();

router.post("/tms/expenses", async (req, res) => {
  try {
    const result = await createExpenseForm(req.body);
    res.status(201).json({ ok: true, ...result });
  } catch (err) {
    const message = (err as Error).message;
    res.status(400).json({ ok: false, error: message });
  }
});

router.get("/tms/expenses/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    res.status(400).json({ ok: false, error: "Geçersiz form id." });
    return;
  }

  const result = await getExpenseForm(id);
  if (!result) {
    res.status(404).json({ ok: false, error: "Masraf formu bulunamadı." });
    return;
  }

  res.json({ ok: true, ...result });
});

router.post("/tms/expenses/:id/sync", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    res.status(400).json({ ok: false, error: "Geçersiz form id." });
    return;
  }

  try {
    const result = await runModaltransSync(id);
    res.json({ ok: true, ...result });
  } catch (err) {
    res.status(502).json({ ok: false, error: (err as Error).message });
  }
});

router.post("/tms/expenses/:id/settle", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    res.status(400).json({ ok: false, error: "Geçersiz form id." });
    return;
  }

  const notes = typeof req.body?.settlementNotes === "string" ? req.body.settlementNotes : undefined;

  try {
    const result = await runExpenseSettlement(id, notes);
    res.json({ ok: true, ...result });
  } catch (err) {
    res.status(502).json({ ok: false, error: (err as Error).message });
  }
});

router.post("/tms/expenses/:id/run-pipeline", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    res.status(400).json({ ok: false, error: "Geçersiz form id." });
    return;
  }

  const notes = typeof req.body?.settlementNotes === "string" ? req.body.settlementNotes : undefined;

  try {
    await runModaltransSync(id);
    const result = await runExpenseSettlement(id, notes);
    res.json({ ok: true, pipeline: ["sync", "settle"], ...result });
  } catch (err) {
    res.status(502).json({ ok: false, error: (err as Error).message });
  }
});

router.get("/tms/shipments/:shipmentId/costs", async (req, res) => {
  const shipmentId = Number(req.params.shipmentId);
  if (!Number.isFinite(shipmentId)) {
    res.status(400).json({ ok: false, error: "Geçersiz shipment id." });
    return;
  }

  try {
    const financials = await getShipmentCostsFromModaltrans(shipmentId);
    res.json({ ok: true, financials });
  } catch (err) {
    res.status(502).json({ ok: false, error: (err as Error).message });
  }
});

export default router;
