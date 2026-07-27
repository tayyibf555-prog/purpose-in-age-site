import { NextResponse } from "next/server";

/**
 * Speaking and general enquiries.
 *
 * Provider agnostic on purpose. Set RESEND_API_KEY and CONTACT_TO_EMAIL and
 * this delivers; without them it validates and logs, so the front end works
 * in development with no credentials.
 */

const LOOKS_LIKE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  date?: unknown;
  audience?: unknown;
  subject?: unknown;
};

const asText = (value: unknown, max = 4000) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: Request) {
  let payload: Payload;

  try {
    payload = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = asText(payload.name, 200);
  const email = asText(payload.email, 320);
  const message = asText(payload.message);
  const date = asText(payload.date, 200);
  const audience = asText(payload.audience, 300);
  const subject = payload.subject === "speaking" ? "speaking" : "general";

  if (!name || !LOOKS_LIKE_EMAIL.test(email)) {
    return NextResponse.json(
      { error: "A name and a valid email address are required." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "site@purposeinage.com";

  const body = [
    `Subject: ${subject}`,
    `Name: ${name}`,
    `Email: ${email}`,
    date && `Date: ${date}`,
    audience && `Audience: ${audience}`,
    "",
    message || "(no message)",
  ]
    .filter(Boolean)
    .join("\n");

  if (!apiKey || !to) {
    console.info(`[contact] No mail provider configured. Would send:\n${body}`);
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject:
          subject === "speaking"
            ? `Speaking enquiry from ${name}`
            : `Message from ${name}`,
        text: body,
      }),
    });

    if (!response.ok) throw new Error(`Provider returned ${response.status}`);
  } catch (error) {
    console.error("[contact] Delivery failed.", error);
    return NextResponse.json(
      { error: "Could not send that right now." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, delivered: true });
}
