import type { APIRoute } from "astro";
import { sendEmail } from "../../utils/email/sendEmail";

function json(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export const POST: APIRoute = async ({ request }) => {
  const rawBody = await request.json().catch(() => ({}));
  const result = await sendEmail(rawBody, {
    ...process.env,
    ...import.meta.env,
  } as Record<string, string | undefined>);

  return json(result.status, result.body);
};

export const OPTIONS: APIRoute = async () => {
  return new Response(null, { status: 204 });
};
