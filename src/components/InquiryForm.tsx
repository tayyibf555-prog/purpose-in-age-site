"use client";

import { useId, useState } from "react";
import { PillButton } from "./Pill";

type Status = "idle" | "sending" | "done" | "error";

const fieldClass =
  "min-h-[62px] w-full rounded-[var(--radius-inner)] border-0 bg-bone px-5 py-4 text-base text-espresso outline-none placeholder:text-espresso-soft/65 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-sand";

/**
 * Speaking and contact enquiries. Goes to a first party route, not an embed,
 * because the Club will need a members area in this codebase within a year.
 */
export function InquiryForm({ subject }: { subject: "speaking" | "general" }) {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    if (!String(data.email).includes("@") || !String(data.name).trim()) {
      setStatus("error");
      setMessage("I need a name and a working email address to reply to.");
      return;
    }

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, subject }),
      });

      if (!response.ok) throw new Error(String(response.status));

      setStatus("done");
      setMessage(
        "Got it. This comes straight to me and I answer most things within a few days.",
      );
      form.reset();
    } catch {
      setStatus("error");
      setMessage(
        "That didn't send. Write to scott@purposeinage.com instead and it will reach me.",
      );
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor={`${id}-name`}
            className="block text-base font-semibold text-bone"
          >
            Your name
          </label>
          <input
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            required
            className={`mt-3 ${fieldClass}`}
          />
        </div>

        <div>
          <label
            htmlFor={`${id}-email`}
            className="block text-base font-semibold text-bone"
          >
            Email address
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            className={`mt-3 ${fieldClass}`}
          />
        </div>
      </div>

      {subject === "speaking" && (
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor={`${id}-date`}
              className="block text-base font-semibold text-bone"
            >
              Date, or roughly when
            </label>
            <input
              id={`${id}-date`}
              name="date"
              className={`mt-3 ${fieldClass}`}
            />
          </div>
          <div>
            <label
              htmlFor={`${id}-audience`}
              className="block text-base font-semibold text-bone"
            >
              Audience and rough size
            </label>
            <input
              id={`${id}-audience`}
              name="audience"
              className={`mt-3 ${fieldClass}`}
            />
          </div>
        </div>
      )}

      <div className="mt-5">
        <label
          htmlFor={`${id}-message`}
          className="block text-base font-semibold text-bone"
        >
          {subject === "speaking"
            ? "Anything else I should know"
            : "What would you like to ask?"}
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={5}
          className={`mt-3 ${fieldClass}`}
        />
      </div>

      <div className="mt-8">
        <PillButton variant="sand" size="lg" disabled={status === "sending"}>
          {status === "sending" ? "Sending" : "Send this to Scott"}
        </PillButton>
      </div>

      <p
        role="status"
        aria-live="polite"
        className={`mt-6 text-base font-semibold ${message ? "" : "sr-only"} ${
          status === "error" ? "text-sand" : "text-bone"
        }`}
      >
        {message}
      </p>
    </form>
  );
}
