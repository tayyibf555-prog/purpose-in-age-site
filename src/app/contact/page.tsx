import type { Metadata } from "next";
import { InquiryForm } from "@/components/InquiryForm";
import { Panel } from "@/components/Panel";
import { PageIntro } from "@/components/PageIntro";
import { contact, social } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Questions about the Club, the book, a speaking date, or the ROMEO table. It goes to Scott and he answers it himself.",
};

export default function ContactPage() {
  return (
    <>
      <PageIntro
        headline="This goes to me, and"
        cut="I answer it myself."
        lead={contact.lead}
      />

      <Panel tone="clay">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1fr] lg:gap-20">
          <div>
            {/* Visible eyebrows are gone site wide. These stay for screen
                readers, which otherwise get three undifferentiated lists. */}
            <h2 className="sr-only">Direct</h2>
            <a
              href={`mailto:${contact.email}`}
              className="link on-clay block text-2xl break-words"
            >
              {contact.email}
            </a>
            <a
              href={contact.phoneHref}
              className="link on-clay mt-4 block text-2xl"
            >
              {contact.phone}
            </a>

            <div className="mt-14">
              <h2 className="sr-only">Offices</h2>
              <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
                {contact.offices.map((office) => (
                  <li key={office.label}>
                    <p className="text-sm font-semibold text-sand">
                      {office.label}
                    </p>
                    {office.lines.map((line) => (
                      <p key={line} className="text-lg text-bone">
                        {line}
                      </p>
                    ))}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-14">
              <h2 className="sr-only">Elsewhere</h2>
              <ul className="flex flex-wrap gap-x-8 gap-y-2">
                {social.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link on-clay inline-flex min-h-[44px] items-center text-lg"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <InquiryForm subject="general" />
          </div>
        </div>
      </Panel>
    </>
  );
}
