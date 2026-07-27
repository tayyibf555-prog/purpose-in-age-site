import type { Metadata } from "next";
import { BookCover } from "@/components/BookCover";
import { EmailCapture } from "@/components/EmailCapture";
import { Panel } from "@/components/Panel";
import { Pill } from "@/components/Pill";
import { book } from "@/content/site";

export const metadata: Metadata = {
  title: "The book",
  description:
    "A book for the man who has just finished a long career, and is quietly working out what the next twenty years are for. Chapter one is free.",
};

export default function BookPage() {
  return (
    <>
      {/* The cover sits beside the title rather than under a separate panel. */}
      <Panel className="pt-16 sm:pt-20 md:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <BookCover className="mx-auto w-full max-w-[22rem] lg:mx-0" />

          <div>
            <h1 className="max-w-[16ch] text-4xl">
              A Man&rsquo;s Purpose Never Retires.{" "}
              <span className="cut text-clay">It Evolves.</span>
            </h1>
            <p className="measure mt-8 text-xl text-espresso sm:text-2xl">
              {book.lead}
            </p>
            <p className="mt-8 text-sm font-semibold text-espresso-soft">
              Published by {book.publisher}
            </p>
            <div className="mt-10">
              <Pill href="#chapter-one" variant="clay">
                Read chapter one
              </Pill>
            </div>
          </div>
        </div>
      </Panel>

      <Panel tone="dark">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <h2 className="text-3xl">
              Not a retirement book.{" "}
              <span className="cut text-sand">A book about identity.</span>
            </h2>
          </div>
          <div className="measure self-end">
            {book.body.map((paragraph) => (
              <p key={paragraph} className="mt-6 text-lg text-bone first:mt-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Panel>

      <Panel>
        <h2 className="max-w-[16ch] text-4xl">
          What is <span className="cut text-clay">inside.</span>
        </h2>

        {/* A ruled list, not a grid of identical cards. */}
        <ul className="mt-14">
          {book.chapters.map((chapter) => (
            <li
              key={chapter.n}
              className="border-t border-espresso/15 py-8"
              data-anim="rise"
            >
              <div className="grid gap-3 md:grid-cols-[7rem_1fr] md:gap-10">
                <p className="text-sm font-semibold text-espresso-soft">
                  Chapter {chapter.n}
                </p>
                <div>
                  <h3 className="text-2xl">{chapter.title}</h3>
                  <p className="measure mt-3 text-lg">{chapter.blurb}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Panel>

      {/* The lead magnet. Sand is reserved for exactly this. */}
      <Panel tone="clay" id="chapter-one">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1fr] lg:gap-20">
          <div>
            <h2 className="text-4xl">
              Read chapter one,{" "}
              <span className="cut text-sand">the Monday after.</span>
            </h2>
            <p className="measure mt-7 text-lg text-bone">
              It is the chapter most men tell me they recognized immediately.
              Give me an address and it is yours.
            </p>
          </div>
          <div className="self-center">
            <EmailCapture
              intent="chapter-one"
              label={book.capture.label}
              button={book.capture.button}
              note={book.capture.note}
            />
          </div>
        </div>
      </Panel>

      {/*
        No retailer links until the publication date and listings are
        confirmed. The current site's dead CTAs are one of the specific
        problems this rebuild exists to fix, so nothing ships as a stub.
      */}
      <Panel>
        <p className="measure mt-7 text-xl">{book.buyNote}</p>
      </Panel>
    </>
  );
}
