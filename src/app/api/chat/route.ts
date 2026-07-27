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

  if (!process.env.AI_GATEWAY_API_KEY && !process.env.VERCEL_OIDC_TOKEN) {
    console.info("[chat] No AI Gateway credentials configured.");
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
