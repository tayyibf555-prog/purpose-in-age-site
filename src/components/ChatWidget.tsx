"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import { LogoMark } from "./Logo";

const STARTERS = [
  "What is the Club?",
  "Who is Scott?",
  "When is the book out?",
];

/**
 * The site assistant.
 *
 * Deliberately not a bouncing bubble with a notification dot. It is a pill in
 * the site's own button language that sits still until it is asked for. The
 * reader is 55 to 80 and sceptical, and a chat widget that jumps at them is
 * the fastest way to lose them.
 *
 * It says plainly that it is not Scott. On a site whose product is one man's
 * credibility, letting a model speak as him would be the wrong trade.
 */
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const busy = status === "submitted" || status === "streaming";

  // Focus the input when the panel opens.
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Escape closes, from anywhere in the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Keep the newest message in view.
  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages]);

  const ask = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    void sendMessage({ text: trimmed });
    setInput("");
  };

  return (
    <div className="fixed right-[14px] bottom-[14px] z-90 flex flex-col items-end gap-3 sm:right-[18px] sm:bottom-[18px]">
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-label="Ask about Purpose in Age"
          className="panel flex h-[min(34rem,70svh)] w-[min(24rem,calc(100vw-28px))] flex-col overflow-hidden shadow-2xl"
        >
          <header className="flex items-start justify-between gap-4 border-b border-espresso/12 px-6 py-5">
            <div>
              <p className="font-display text-lg leading-tight font-extrabold tracking-[-0.02em] text-espresso">
                Ask about Purpose in Age
              </p>
              <p className="mt-1.5 text-sm text-espresso-soft">
                An assistant, not Scott. It only knows what is on this site.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="-mt-1 -mr-2 grid size-11 shrink-0 place-items-center rounded-full text-espresso hover:bg-espresso/8"
              aria-label="Close the assistant"
            >
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                <path
                  d="M3 3l11 11M14 3L3 14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </header>

          <div
            ref={logRef}
            className="flex-1 space-y-5 overflow-y-auto px-6 py-6"
            role="log"
            aria-live="polite"
          >
            {messages.length === 0 && (
              <div>
                <p className="text-base text-espresso">
                  Ask me about the Club, the book, the ROMEO table, or booking
                  Scott to speak.
                </p>
                <ul className="mt-5 flex flex-col items-start gap-2.5">
                  {STARTERS.map((starter) => (
                    <li key={starter}>
                      <button
                        type="button"
                        onClick={() => ask(starter)}
                        className="min-h-[44px] rounded-full border border-espresso/20 px-4 py-2 text-left text-base text-espresso hover:border-clay hover:bg-clay/5"
                      >
                        {starter}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {messages.map((message) => {
              const text = message.parts
                .map((part) => (part.type === "text" ? part.text : ""))
                .join("");
              if (!text) return null;

              return message.role === "user" ? (
                <p
                  key={message.id}
                  className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-clay px-4 py-3 text-base text-bone"
                >
                  {text}
                </p>
              ) : (
                <p
                  key={message.id}
                  className="max-w-[92%] text-base whitespace-pre-wrap text-espresso"
                >
                  {text}
                </p>
              );
            })}

            {status === "submitted" && (
              <p className="text-base text-espresso-soft">Thinking</p>
            )}

            {error && (
              <p className="text-base font-semibold text-clay">
                Something went wrong there. Try again, or write to
                scott@purposeinage.com.
              </p>
            )}
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              ask(input);
            }}
            className="flex items-center gap-2 border-t border-espresso/12 px-4 py-4"
          >
            <label htmlFor="chat-input" className="sr-only">
              Your question
            </label>
            <input
              id="chat-input"
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type your question"
              autoComplete="off"
              className="min-h-[52px] flex-1 rounded-full border-0 bg-espresso/6 px-5 text-base text-espresso outline-none placeholder:text-espresso-soft/70 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-clay"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="grid size-[52px] shrink-0 place-items-center rounded-full bg-clay text-bone disabled:opacity-45"
              aria-label="Send your question"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M3 15L15 9L3 3v4.8L10.5 9L3 10.2V15z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="btn btn-clay shadow-xl"
      >
        <LogoMark className="size-6 shrink-0" strokeWidth={4} />
        <span>{open ? "Close" : "Ask a question"}</span>
      </button>
    </div>
  );
}
