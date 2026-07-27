import type { Metadata } from "next";
import Image from "next/image";
import { EmailCapture } from "@/components/EmailCapture";
import { Panel } from "@/components/Panel";
import { PageIntro } from "@/components/PageIntro";
import { club } from "@/content/site";

export const metadata: Metadata = {
  title: "The Club",
  description:
    "A paid membership for men rebuilding an identity after a long career. Not built yet. Join the waitlist and help decide what it becomes.",
};

export default function ClubPage() {
  return (
    <>
      <PageIntro
        headline="Purpose in Age"
        cut="Club."
        lead={club.lead}
      />

      {/* Capture sits high on this page. It is the primary conversion on the
          site and the reader arrived here already interested. */}
      <Panel tone="clay" id="waitlist">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1fr] lg:gap-20">
          <div>
            <h2 className="text-4xl">
              Hear it first,{" "}
              <span className="cut text-sand">and shape it.</span>
            </h2>
            {club.body.map((paragraph) => (
              <p key={paragraph} className="measure mt-6 text-lg text-bone">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="self-center">
            <EmailCapture
              intent="waitlist"
              label={club.capture.label}
              button={club.capture.button}
              note={club.capture.note}
            />
          </div>
        </div>
      </Panel>

      <section className="relative isolate overflow-hidden rounded-[var(--radius-panel)]">
        <div className="relative aspect-16/9 w-full lg:aspect-21/9">
          <div className="absolute inset-[-7%]" data-anim-drift>
            <Image
              src="/images/table.jpg"
              alt="A worn diner table after a meal, cleared plates pushed aside, two men’s hands resting near heavy coffee mugs."
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <Panel>
        <h2 className="max-w-[18ch] text-4xl">
          Three things I will{" "}
          <span className="cut text-clay">not compromise on.</span>
        </h2>

        {/* Numbered rules, ruled rather than boxed. Identical cards would
            flatten three genuinely different commitments. */}
        <ol className="mt-14">
          {club.principles.map((principle, index) => (
            <li
              key={principle.title}
              className="border-t border-espresso/15 py-9"
              data-anim="rise"
            >
              <div className="grid gap-4 md:grid-cols-[5rem_1fr] md:gap-10">
                <p className="font-display text-2xl font-extrabold text-clay">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div>
                  <h3 className="text-2xl">{principle.title}</h3>
                  <p className="measure mt-3 text-lg">{principle.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Panel>
    </>
  );
}
