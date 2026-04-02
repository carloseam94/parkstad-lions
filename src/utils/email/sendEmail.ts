import { Resend } from "resend";

export type SendEmailBody = {
  from?: string;
  to?: string | string[];
  subject?: string;
  html?: string;
  text?: string;
  replyTo?: string;
};

export type SendEmailResult = {
  status: number;
  body: Record<string, unknown>;
};

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

export async function sendEmail(
  rawBody: unknown,
  env: Record<string, string | undefined>,
): Promise<SendEmailResult> {
  const apiKey = env.RESEND_API_KEY ?? env.RESEND_API_TOKEN;

  if (!apiKey) {
    return {
      status: 500,
      body: {
        error: "Missing Resend API key. Set RESEND_API_KEY or RESEND_API_TOKEN.",
      },
    };
  }

  const body = normalizeBody(rawBody);

  const from = body.from ?? env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
  const to = body.to ?? env.RESEND_EMAIL;
  const subject = body.subject;
  const html = body.html;
  const text = body.text;

  if (!to || (Array.isArray(to) && to.length === 0)) {
    return {
      status: 500,
      body: {
        error: "Missing recipient. Set RESEND_EMAIL or provide to in request body.",
      },
    };
  }

  if (!subject) {
    return {
      status: 400,
      body: { error: "Missing required field: subject" },
    };
  }

  if (!html && !text) {
    return {
      status: 400,
      body: { error: "Provide at least one of: html or text" },
    };
  }

  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      ...(html ? { html } : {}),
      ...(text ? { text } : {}),
      ...(body.replyTo ? { replyTo: body.replyTo } : {}),
    } as any);

    if (error) {
      return {
        status: Number(error.statusCode) || 400,
        body: {
          error: "Resend request failed",
          details: error,
          config: {
            hasApiKey: true,
            hasRecipient: true,
            usingDefaultFrom: !env.RESEND_FROM_EMAIL && !body.from,
          },
          hint: "In production, set RESEND_FROM_EMAIL to a verified sender/domain in Resend.",
        },
      };
    }

    return {
      status: 200,
      body: {
        ok: true,
        id: data?.id,
        response: data,
      },
    };
  } catch (error) {
    return {
      status: 500,
      body: {
        error: "Unexpected error while sending email",
        details: error instanceof Error ? error.message : "Unknown error",
      },
    };
  }
}
