import { NextResponse } from "next/server";

/**
 * Email capture endpoint.
 *
 * Deliberately provider agnostic. Set RESEND_API_KEY and RESEND_AUDIENCE_ID,
 * or swap the forward() body for ConvertKit, and nothing else in the app
 * changes. Until a provider is configured this validates and logs, so the
 * front end can be built and tested without credentials.
 *
 * The Club will need a members area within a year, so this stays a first
 * party route rather than a third party embed.
 */

type Intent = "waitlist" | "chapter-one" | "journal" | "newsletter";

const INTENTS: readonly Intent[] = [
  "waitlist",
  "chapter-one",
  "journal",
  "newsletter",
];

// Deliberately permissive. Address validation belongs to the mail provider,
// not to a regular expression.
const LOOKS_LIKE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function forward(email: string, intent: Intent) {
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    console.info(
      `[subscribe] No mail provider configured. Would add ${email} to "${intent}".`,
    );
    return;
  }

  const response = await fetch(
    `https://api.resend.com/audiences/${audienceId}/contacts`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, unsubscribed: false }),
    },
  );

  if (!response.ok) {
    throw new Error(`Mail provider returned ${response.status}`);
  }
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { email, intent } = (payload ?? {}) as {
    email?: unknown;
    intent?: unknown;
  };

  if (typeof email !== "string" || !LOOKS_LIKE_EMAIL.test(email.trim())) {
    return NextResponse.json(
      { error: "That address does not look right." },
      { status: 400 },
    );
  }

  const resolvedIntent: Intent = INTENTS.includes(intent as Intent)
    ? (intent as Intent)
    : "newsletter";

  try {
    await forward(email.trim().toLowerCase(), resolvedIntent);
  } catch (error) {
    console.error("[subscribe] Failed to forward address.", error);
    return NextResponse.json(
      { error: "Could not add that address right now." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, intent: resolvedIntent });
}
