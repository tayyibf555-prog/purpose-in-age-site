import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";
import { SYSTEM_INSTRUCTIONS } from "@/lib/knowledge";

export const maxDuration = 30;

/**
 * The site assistant.
 *
 * Routed through the Vercel AI Gateway, so there is no provider SDK to swap if
 * the model changes. Needs AI_GATEWAY_API_KEY locally; on Vercel the OIDC
 * token covers it.
 *
 * Grounding is the entire point of this endpoint. The instructions are built
 * from the same content module the pages render, and the model is told to
 * refuse rather than guess. A chatbot that invents a fact about Scott would
 * undo the accuracy work the rest of the site depends on.
 */
export async function POST(req: Request) {
  let messages: UIMessage[];

  try {
    ({ messages } = (await req.json()) as { messages: UIMessage[] });
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: "No messages." }, { status: 400 });
  }

  // Cheap abuse guard: this is a small FAQ assistant, not a general chatbot.
  if (messages.length > 40) {
    return Response.json(
      { error: "This conversation is too long. Start a new one." },
      { status: 413 },
    );
  }

  /*
   * Credential pre-flight, local only.
   *
   * VERCEL_OIDC_TOKEN is a local development convenience that `vercel env
   * pull` writes into .env.local. It is NOT exposed under that name in the
   * deployed runtime, where the Gateway is reached through the platform's own
   * OIDC federation. Checking for it in production returned a false 503 and
   * blocked a call that would have succeeded.
   *
   * So on Vercel we always attempt the call and let a real failure surface.
   * Locally we keep the clean message, because a developer without
   * credentials should get an explanation rather than a stream error.
   */
  const onVercel = process.env.VERCEL === "1";

  if (
    !onVercel &&
    !process.env.AI_GATEWAY_API_KEY &&
    !process.env.VERCEL_OIDC_TOKEN
  ) {
    console.info("[chat] No AI Gateway credentials configured locally.");
    return Response.json(
      { error: "The assistant is not configured yet." },
      { status: 503 },
    );
  }

  const result = streamText({
    model: "anthropic/claude-sonnet-5",
    instructions: SYSTEM_INSTRUCTIONS,
    messages: await convertToModelMessages(messages),
    temperature: 0.3,
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
