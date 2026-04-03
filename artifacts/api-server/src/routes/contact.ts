import { Router, type IRouter } from "express";
import { appendFile, mkdir } from "fs/promises";
import path from "path";
import nodemailer from "nodemailer";

const router: IRouter = Router();

interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  serviceType?: string;
  cargoDetails?: string;
  route?: string;
  message: string;
}

function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmailHtml(data: ContactPayload): string {
  return `
    <h2>Yeni Teklif Talebi — ChapterLOG</h2>
    <table cellpadding="6" cellspacing="0" border="1" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
      <tr><td><strong>Ad / Firma</strong></td><td>${esc(data.name)}</td></tr>
      <tr><td><strong>E-posta</strong></td><td>${esc(data.email)}</td></tr>
      <tr><td><strong>Telefon</strong></td><td>${esc(data.phone)}</td></tr>
      <tr><td><strong>Hizmet Türü</strong></td><td>${data.serviceType ? esc(data.serviceType) : "—"}</td></tr>
      <tr><td><strong>Kargo (m³/kg)</strong></td><td>${data.cargoDetails ? esc(data.cargoDetails) : "—"}</td></tr>
      <tr><td><strong>Güzergah</strong></td><td>${data.route ? esc(data.route) : "—"}</td></tr>
      <tr><td><strong>Mesaj</strong></td><td>${esc(data.message)}</td></tr>
    </table>
  `;
}

async function sendViaSmtp(data: ContactPayload): Promise<void> {
  const host = process.env["SMTP_HOST"];
  const user = process.env["SMTP_USER"];
  const pass = process.env["SMTP_PASS"];

  if (!host || !user || !pass) {
    throw new Error("SMTP env vars not configured");
  }

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env["SMTP_PORT"] || 587),
    secure: process.env["SMTP_SECURE"] === "true",
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"ChapterLOG Web" <${user}>`,
    to: process.env["CONTACT_TO"] || "info@chapterlog.com.tr",
    replyTo: data.email,
    subject: `[ChapterLOG] Yeni teklif talebi — ${data.name}`,
    html: buildEmailHtml(data),
  });
}

async function saveToLog(data: ContactPayload): Promise<void> {
  const entry = { receivedAt: new Date().toISOString(), ...data };
  const logsDir = path.resolve("logs");
  await mkdir(logsDir, { recursive: true });
  await appendFile(path.join(logsDir, "contact-submissions.jsonl"), JSON.stringify(entry) + "\n", "utf8");
}

router.post("/contact", async (req, res) => {
  const body = req.body as ContactPayload;

  if (!body.name || !body.email || !body.phone || !body.message) {
    res.status(400).json({ ok: false, error: "Zorunlu alanlar eksik." });
    return;
  }

  let emailSent = false;

  try {
    await sendViaSmtp(body);
    emailSent = true;
    console.log("[contact] Email sent via SMTP for:", body.email);
  } catch (smtpErr) {
    console.warn("[contact] SMTP unavailable, falling back to JSONL log:", (smtpErr as Error).message);
  }

  try {
    await saveToLog(body);
    console.log("[contact] Submission logged to JSONL for:", body.email);
  } catch (logErr) {
    if (!emailSent) {
      console.error("[contact] Both SMTP and file log failed:", logErr);
      res.status(500).json({ ok: false, error: "Sunucu hatası. Lütfen doğrudan e-posta veya WhatsApp ile ulaşın." });
      return;
    }
  }

  res.json({ ok: true });
});

export default router;
