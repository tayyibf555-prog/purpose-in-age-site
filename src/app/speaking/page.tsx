import type { Metadata } from "next";
import { InquiryForm } from "@/components/InquiryForm";
import { Panel } from "@/components/Panel";
import { PageIntro } from "@/components/PageIntro";
import { VideoCard } from "@/components/VideoCard";
import { media, speaking } from "@/content/site";

export const metadata: Metadata = {
  title: "Speaking",
  description:
    "Talks for companies with long service employees approaching an exit, and for groups of men who have already walked off that cliff.",
};

export default function SpeakingPage() {
  return (
    <>
      {/* One section, same as /about: the room carries the title. */}
      <PageIntro
        headline="Talks about the cliff at the end of"
        cut="a long career."
        lead={speaking.lead}
        image={{ src: "/images/speaking.jpg", alt: speaking.imageAlt }}
      />

      <Panel>
        <h2 className="max-w-[18ch] text-4xl">
          Three talks, two{" "}
          <span className="cut text-clay">very different rooms.</span>
        </h2>

        <ul className="mt-14">
          {speaking.topics.map((topic) => (
            <li
              key={topic.title}
              className="border-t border-espresso/15 py-10"
              data-anim="rise"
            >
              <div className="grid gap-5 md:grid-cols-[1fr_1.2fr] md:gap-12">
                <div>
                  <h3 className="text-2xl">{topic.title}</h3>
                  <p className="mt-3 text-sm font-semibold text-espresso-soft">
                    {topic.audience}
                  </p>
                </div>
                <p className="measure text-lg">{topic.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </Panel>

      {/*
        Real proof, pulled from the videos already embedded on the current
        site. No invented logos, no audience numbers, no claimed stages. If it
        is listed here, there is a recording behind it.
      */}
      <Panel tone="dark">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <h2 className="max-w-[18ch] text-4xl">
              Recorded interviews{" "}
              <span className="cut text-sand">and panels.</span>
            </h2>
          </div>
          <a
            href={media.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-bone"
          >
            <span>See the channel</span>
            <span className="btn-badge" aria-hidden="true">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path
                  d="M3.5 11.5 11.5 3.5M11.5 3.5H5.2M11.5 3.5v6.3"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div data-anim="rise">
            <VideoCard
              id={media.featured.id}
              title={media.featured.title}
              channel={media.featured.channel}
            />
          </div>
          {media.videos.map((video) => (
            <div key={video.id} data-anim="rise">
              <VideoCard {...video} />
            </div>
          ))}
        </div>

        <p className="measure mt-14 text-base text-bone/85">
          {speaking.proofNote}
        </p>
      </Panel>

      <Panel tone="clay" id="booking">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
          <div>
            <h2 className="text-4xl">
              {speaking.form.heading}
              {". "}
              <span className="cut text-sand">I answer these myself.</span>
            </h2>
            <p className="measure mt-7 text-lg text-bone">
              {speaking.form.note}
            </p>
          </div>
          <div>
            <InquiryForm subject="speaking" />
          </div>
        </div>
      </Panel>
    </>
  );
}
