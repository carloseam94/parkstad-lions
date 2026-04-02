import { Resend } from "resend";

type SendEmailBody = {
  from?: string;
  to?: string | string[];
  subject?: string;
  html?: string;
  text?: string;
  replyTo?: string;
};

function sendJson(res: any, status: number, body: Record<string, unknown>) {
  res.status(status).json(body);
}

function normalizeBody(rawBody: unknown): SendEmailBody {
  if (typeof rawBody === "string") {
    try {
      return JSON.parse(rawBody) as SendEmailBody;
    } catch {
      return {};
    }
  }

  if (rawBody && typeof rawBody === "object") {
    return rawBody as SendEmailBody;
  }

  return {};
}

export default async function handler(req: any, res: any) {
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return sendJson(res, 405, { error: "Method not allowed. Use POST." });
  }

  const apiKey = process.env.RESEND_API_KEY ?? process.env.RESEND_API_TOKEN;
  if (!apiKey) {
    return sendJson(res, 500, {
      error: "Missing Resend API key. Set RESEND_API_KEY or RESEND_API_TOKEN.",
    });
  }

  const resend = new Resend(apiKey);
  const body = normalizeBody(req.body);

  const from = body.from ?? process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
  const to = body.to;
  const subject = body.subject;
  const html = body.html;
  const text = body.text;

  if (!to || (Array.isArray(to) && to.length === 0)) {
    return sendJson(res, 400, { error: "Missing required field: to" });
  }

  if (!subject) {
    return sendJson(res, 400, { error: "Missing required field: subject" });
  }

  if (!html && !text) {
    return sendJson(res, 400, { error: "Provide at least one of: html or text" });
  }

  const payload = {
    from,
    to: Array.isArray(to) ? to : [to],
    subject,
    ...(html ? { html } : {}),
    ...(text ? { text } : {}),
    ...(body.replyTo ? { replyTo: body.replyTo } : {}),
  };

  try {
    const { data, error } = await resend.emails.send(payload as any);

    if (error) {
      return sendJson(res, 400, {
        error: "Resend request failed",
        details: error,
      });
    }

    return sendJson(res, 200, {
      ok: true,
      id: data?.id,
      response: data,
    });
  } catch (error) {
    return sendJson(res, 500, {
      error: "Unexpected error while sending email",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
