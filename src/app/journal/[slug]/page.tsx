import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EmailCapture } from "@/components/EmailCapture";
import { Panel } from "@/components/Panel";
import { formatDate } from "@/lib/format";
import { journal } from "@/content/site";

type Params = { slug: string };

export function generateStaticParams() {
  return journal.posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = journal.posts.find((entry) => entry.slug === slug);

  if (!post) return { title: "Not found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { type: "article", publishedTime: post.date },
  };
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = journal.posts.find((entry) => entry.slug === slug);

  // The existing site returns the homepage for every post URL, which is why
  // none of Scott's writing is reachable. A real 404 is the fix.
  if (!post) notFound();

  const others = journal.posts.filter((entry) => entry.slug !== post.slug);

  return (
    <>
      <article>
        <Panel className="pt-16 sm:pt-20 md:pt-28">
          <Link href="/journal" className="link text-base">
            Back to the journal
          </Link>

          <h1 className="mt-10 max-w-[18ch] text-4xl">{post.title}</h1>

          <div className="mt-9 flex flex-wrap gap-x-8 gap-y-2">
            <p className="text-sm font-semibold text-espresso-soft">
              {formatDate(post.date)}
            </p>
            <p className="text-sm font-semibold text-espresso-soft">
              {post.readingTime} read
            </p>
          </div>

          <div className="prose-pia measure mt-14">
            {post.body.map((paragraph, index) =>
              // The opening line of each of these pieces is the hook, so it is
              // set as a standfirst rather than as body copy.
              index === 0 ? (
                <p
                  key={paragraph}
                  className="font-display text-2xl leading-tight font-extrabold tracking-[-0.03em]"
                >
                  {paragraph}
                </p>
              ) : (
                <p key={paragraph}>{paragraph}</p>
              ),
            )}
          </div>
        </Panel>
      </article>

      <Panel tone="clay">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1fr] lg:gap-20">
          <div>
            <h2 className="text-3xl">
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

      {others.length > 0 && (
        <Panel>
          <ul className="">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/journal/${other.slug}`}
                  className="group block border-t border-espresso/15 py-8"
                >
                  <div className="grid gap-3 md:grid-cols-[11rem_1fr] md:gap-12">
                    <p className="text-sm font-semibold text-espresso-soft">
                      {formatDate(other.date)}
                    </p>
                    <div>
                      <h3 className="text-2xl transition-colors group-hover:text-clay">
                        {other.title}
                      </h3>
                      <p className="measure mt-3 text-lg">{other.excerpt}</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Panel>
      )}
    </>
  );
}
