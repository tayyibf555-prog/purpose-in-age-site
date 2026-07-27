import type { Metadata } from "next";
import Image from "next/image";
import { Panel, PanelNotch } from "@/components/Panel";
import { PageIntro } from "@/components/PageIntro";
import { Pill } from "@/components/Pill";
import { about, recommendations, timeline } from "@/content/site";

export const metadata: Metadata = {
  title: "About Scott",
  description:
    "Thirty years in marketing and sales, then a stretch as a case manager working with veterans and people with nowhere to sleep. This is the longer version.",
};

export default function AboutPage() {
  return (
    <>
      {/* One section: the landscape carries the title rather than sitting
          underneath a separate panel holding it. */}
      <PageIntro
        headline={about.headline}
        cut={about.cut}
        image={{
          src: "/images/sonoma.jpg",
          alt: "Oak hills above a valley of coastal fog in Sonoma County, early morning.",
        }}
      />

      <Panel>
        <div className="grid gap-12 lg:grid-cols-[20rem_1fr] lg:items-start lg:gap-20">
          {/* The portrait pins while the story scrolls past it. */}
          <div className="lg:sticky lg:top-32">
            <div
              className="relative aspect-square overflow-hidden rounded-[var(--radius-inner)] bg-clay"
              data-anim-clip
            >
              <Image
                src="/images/scott.png"
                alt="Scott D Brown."
                fill
                sizes="(min-width: 1024px) 20rem, 100vw"
                className="scale-95 object-contain"
              />
            </div>
            <p className="mt-6 text-sm text-espresso-soft">
              Scott D Brown, San Francisco and Sonoma County
            </p>
          </div>

          <div className="prose-pia measure">
            {about.body.map((paragraph, index) =>
              // "Nobody plans that in their fifties" is the hinge of the whole
              // piece, so it is set as a pull quote rather than as body copy.
              index === 2 ? (
                <blockquote key={paragraph}>{paragraph}</blockquote>
              ) : (
                <p key={paragraph}>{paragraph}</p>
              ),
            )}
          </div>
        </div>
      </Panel>

      {/*
        The factual spine under the narrative. Every line is a dated role on
        his LinkedIn, which is the point: the story above is checkable.
      */}
      <Panel tone="dark">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div>
            <h2 className="max-w-[14ch] text-4xl">
              Thirty years,{" "}
              <span className="cut text-sand">in order.</span>
            </h2>
          </div>

          <ol>
            {timeline.map((entry) => (
              <li
                key={`${entry.years}-${entry.what}`}
                className="grid gap-2 border-t border-bone/20 py-5 sm:grid-cols-[10rem_1fr] sm:gap-8"
                data-anim="rise"
              >
                <span className="text-sm font-semibold text-sand">
                  {entry.years}
                </span>
                <span className="text-lg text-bone">{entry.what}</span>
              </li>
            ))}
          </ol>
        </div>
      </Panel>

      {/*
        Two real recommendations, lifted from his LinkedIn. Not invented, and
        not a testimonial wall: two is what exists, so two is what ships.
      */}
      <Panel>
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {recommendations.map((item) => (
            <figure key={item.name} data-anim="rise">
              <blockquote className="font-display text-2xl leading-tight font-extrabold tracking-[-0.025em] text-clay">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-base">
                <span className="font-semibold">{item.name}</span>
                <span className="mt-1 block text-espresso-soft">
                  {item.role}, {item.when}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Panel>

      <Panel tone="dark">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <h2 className="text-3xl">
              I am not a doctor,{" "}
              <span className="cut text-sand">and I will not pretend.</span>
            </h2>
          </div>
          <p className="measure self-end text-lg text-bone">
            {about.disclaimer}
          </p>
        </div>
      </Panel>

      <div className="relative">
        <Panel tone="clay" notch="br">
          <h2 className="max-w-[18ch] text-4xl">
            The Club is where this{" "}
            <span className="cut text-sand">actually happens.</span>
          </h2>
          <p className="measure mt-7 text-lg text-bone">
            The writing is the argument. The Club is the room. It is not built
            yet, and the people on the list are the ones helping me decide what
            it should be.
          </p>
        </Panel>
        <PanelNotch corner="br">
          <Pill href="/club" variant="bone" size="lg">
            Join the waitlist
          </Pill>
        </PanelNotch>
      </div>
    </>
  );
}
