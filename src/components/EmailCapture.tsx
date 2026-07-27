"use client";

import { useId, useState } from "react";
import { PillButton } from "./Pill";

type Status = "idle" | "sending" | "done" | "error";

/**
 * Every email capture on the site.
 *
 * Sand is reserved for these moments, so it means something when it appears.
 * Sand fill carries espresso label text at 9.33:1.
 *
 * Capture blocks only ever sit on a dark ground (clay-deep or espresso), so
 * only the light treatment is implemented.
 */
export function EmailCapture({
  intent,
  label,
  button,
  note,
}: {
  intent: "waitlist" | "chapter-one" | "journal" | "newsletter";
  label: string;
  button: string;
  note?: string;
}) {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = new FormData(form).get("email");

    if (typeof email !== "string" || !email.includes("@")) {
      setStatus("error");
      setMessage("That address does not look right. Check it and try again.");
      return;
    }

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, intent }),
      });

      if (!response.ok) throw new Error(String(response.status));

      setStatus("done");
      setMessage(
        intent === "chapter-one"
          ? "Sent. Chapter one is on its way to that address."
          : "You're on the list. I'll be in touch before anything goes public.",
      );
      form.reset();
    } catch {
      setStatus("error");
      setMessage(
        "That didn't go through. Try again, or write to scott@purposeinage.com and I'll add you myself.",
      );
    }
  };

  return (
    <div className="w-full max-w-xl">
      <form onSubmit={onSubmit} noValidate>
        <label
          htmlFor={`${id}-email`}
          className="block text-lg font-semibold text-bone"
        >
          {label}
        </label>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            aria-describedby={note ? `${id}-note` : undefined}
            aria-invalid={status === "error"}
            className="min-h-[62px] flex-1 rounded-full border-0 bg-bone px-6 text-base text-espresso outline-none placeholder:text-espresso-soft/65 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-sand"
          />

          <PillButton
            variant="sand"
            size="lg"
            disabled={status === "sending"}
            className="shrink-0 disabled:opacity-70"
          >
            {status === "sending" ? "Sending" : button}
          </PillButton>
        </div>
      </form>

      {note && (
        <p id={`${id}-note`} className="mt-4 text-sm text-bone/85">
          {note}
        </p>
      )}

      {/* Status is announced, not signalled by color alone. */}
      <p
        role="status"
        aria-live="polite"
        className={`mt-4 text-base font-semibold ${message ? "" : "sr-only"} ${
          status === "error" ? "text-sand" : "text-bone"
        }`}
      >
        {message}
      </p>
    </div>
  );
}
