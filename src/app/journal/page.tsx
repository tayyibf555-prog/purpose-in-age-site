import type { Metadata } from "next";
import Link from "next/link";
import { EmailCapture } from "@/components/EmailCapture";
import { Panel } from "@/components/Panel";
import { PageIntro } from "@/components/PageIntro";
import { formatDate } from "@/lib/format";
import { journal } from "@/content/site";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Short pieces about the second half, mostly first person. Where the LinkedIn writing lands so it stops disappearing into a feed.",
};

export default function JournalPage() {
  const posts = [...journal.posts].sort((a, b) =>
    b.date.localeCompare(a.date),
  );

  return (
    <>
      <PageIntro
        headline="Writing about the second half,"
        cut="week by week."
        lead={journal.lead}
      />

      <Panel>
        <ul>
          {posts.map((post) => (
            <li key={post.slug} data-anim="rise">
              <Link
                href={`/journal/${post.slug}`}
                className="group block border-b border-espresso/15 py-10 first:border-t"
              >
                <div className="grid gap-4 md:grid-cols-[11rem_1fr] md:gap-12">
                  <div>
                    <p className="text-sm font-semibold text-espresso-soft">
                      {formatDate(post.date)}
                    </p>
                    <p className="mt-1 text-sm text-espresso-soft">
                      {post.readingTime} read
                    </p>
                  </div>
                  <div>
                    <h2 className="text-3xl transition-colors group-hover:text-clay">
                      {post.title}
                    </h2>
                    <p className="measure mt-4 text-lg">{post.excerpt}</p>
                    <p className="link mt-5 inline-block text-base">
                      Read this one
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel tone="clay">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1fr] lg:gap-20">
          <div>
            <h2 className="text-4xl">
              A short piece{" "}
              <span className="cut text-sand">most weeks.</span>
            </h2>
          </div>
          <div className="self-center">
            <EmailCapture
              intent="journal"
              label="Your email address"
              button="Send me the writing"
              note="Nothing else, and no forwarding of your address to anyone."
            />
          </div>
        </div>
      </Panel>
    </>
  );
}
