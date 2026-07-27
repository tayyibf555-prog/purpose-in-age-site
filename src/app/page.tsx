import Image from "next/image";
import Link from "next/link";
import { EmailCapture } from "@/components/EmailCapture";
import { Marquee } from "@/components/Marquee";
import { Panel, PanelNotch } from "@/components/Panel";
import { Pill } from "@/components/Pill";
import { FeaturedVideo, VideoCard } from "@/components/VideoCard";
import { formatDate } from "@/lib/format";
import {
  book,
  credentials,
  home,
  journal,
  media,
  network,
  romeo,
} from "@/content/site";

/**
 * Nine sections, each a deliberately different shape.
 *
 * The first pass made every section the same two-column headline-and-body
 * panel, which read as one idea repeated nine times. The fix is structural,
 * not decorative: a bare statement with no panel at all, a horizontal fact
 * strip, a feature grid, a ruled editorial list, an overlapping panel. The
 * material sequence still never repeats back to back.
 *
 * photo+bone, clay(bare), bone, dark, photo+bone, clay, bone, dark, photo
 */
export default function HomePage() {
  const posts = journal.posts.slice(0, 3);
  const cards = media.videos.slice(0, 4);

  return (
    <>
      {/* 1. Hero. Photo with the bone panel riding up into it. */}
      <section>
        <div className="relative isolate min-h-[78svh] overflow-hidden rounded-[var(--radius-panel)] md:min-h-[88svh]">
          <div className="absolute inset-[-7%]" data-anim-drift>
            <Image
              src="/images/hero-table.jpg"
              alt={home.hero.imageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-r from-espresso/85 from-5% via-espresso/45 via-45% to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-espresso/70 to-transparent"
          />

          <div className="relative flex min-h-[78svh] flex-col justify-end p-6 pb-14 sm:p-10 md:min-h-[88svh] md:p-14 md:pb-24">

            <h1 className="measure-display text-display" data-anim-lines>
              <span className="line-mask">
                <span className="block" data-anim="line">
                  Your career
                </span>
              </span>
              <span className="line-mask">
                <span className="block" data-anim="line">
                  ended.
                </span>
              </span>
              <span className="line-mask">
                <span className="cut block text-sand" data-anim="line">
                  You didn&rsquo;t.
                </span>
              </span>
            </h1>

            <div className="mt-11 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7">
              <Pill href={home.hero.primary.href} variant="bone" size="lg">
                {home.hero.primary.label}
              </Pill>
              <Link
                href={home.hero.secondary.href}
                className="link on-clay inline-flex min-h-[48px] items-center text-lg"
              >
                {home.hero.secondary.label}
              </Link>
            </div>
          </div>
        </div>

        <div className="relative z-10 -mt-8 px-0 sm:-mt-14 sm:px-8 md:px-16">
          <div className="relative">
            <Panel notch="br">
              <div className="grid items-center gap-8 sm:grid-cols-[auto_1fr] sm:gap-10 lg:gap-14">
                {/* His face, immediately under the hero. The whole site is
                    built on him being a real person, so he appears early. */}
                <div className="relative size-28 shrink-0 overflow-hidden rounded-full bg-clay sm:size-36 lg:size-44">
                  <Image
                    src="/images/scott.png"
                    alt="Scott D Brown."
                    fill
                    sizes="176px"
                    className="object-contain"
                  />
                </div>

                <div>
                  <p className="measure mt-5 text-xl text-espresso sm:text-2xl">
                    {home.hero.lead}
                  </p>
                </div>
              </div>
            </Panel>
            <PanelNotch corner="br">
              <Pill href="/about" variant="clay">
                Read my story
              </Pill>
            </PanelNotch>
          </div>
        </div>
      </section>

      {/*
        2. Bare clay. No panel at all, which is the point: after two panels
        the page needs to open out before it closes back in.
      */}
      <section className="on-clay px-2 py-20 sm:px-8 sm:py-28 md:px-14 md:py-36">
        <div data-anim="rise">
          <h2 className="max-w-[15ch] text-display">
            Nobody warns you about{" "}
            <span className="cut text-sand">the Monday after.</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-x-16 gap-y-10 border-t border-bone/25 pt-12 md:grid-cols-2">
          {home.problem.body.map((paragraph) => (
            <p key={paragraph} className="text-xl text-bone" data-anim="rise">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* 3. Bone. Portrait beside the claim, then the facts as a strip. */}
      <Panel>
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1fr] lg:gap-20">
          {/*
            The portrait is a transparent circular cutout, so it sits on a clay
            field rather than being cropped into a rectangle. object-contain,
            not cover, or the circle gets clipped.
          */}
          <div
            className="relative aspect-square overflow-hidden rounded-[var(--radius-inner)] bg-clay"
            data-anim-clip
          >
            <Image
              src="/images/scott.png"
              alt="Scott D Brown."
              fill
              sizes="(min-width: 1024px) 34vw, 100vw"
              className="scale-95 object-contain"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h2 className="max-w-[16ch] text-4xl">
              I&rsquo;m a marketer,{" "}
              <span className="cut text-clay">not a therapist.</span>
            </h2>
            <p className="measure mt-8 text-lg">{home.credibility.body[0]}</p>
            <p className="measure mt-6 text-lg">{home.credibility.body[1]}</p>
            <div className="mt-10">
              <Pill href={home.credibility.cta.href} variant="clay">
                {home.credibility.cta.label}
              </Pill>
            </div>
          </div>
        </div>

        <dl className="mt-16 grid gap-x-10 gap-y-12 border-t border-espresso/15 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {credentials.map((item) => (
            <div key={item.figure} data-anim="rise">
              <dt className="font-display text-2xl leading-none font-extrabold tracking-[-0.03em] text-clay">
                {item.figure}
              </dt>
              <dd className="mt-4 text-base text-espresso-soft">
                {item.label}
              </dd>
            </div>
          ))}
        </dl>
      </Panel>

      {/* 4. Dark. Watch and listen. Real videos, linked out, not embedded. */}
      <Panel tone="dark">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <h2 className="max-w-[18ch] text-4xl">
              {media.headline} <span className="cut text-sand">{media.cut}</span>
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

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <div data-anim="rise">
            <FeaturedVideo {...media.featured} />
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:content-start">
            {cards.map((video) => (
              <div key={video.id} data-anim="rise">
                <VideoCard {...video} />
              </div>
            ))}
          </div>
        </div>
      </Panel>

      {/* 5. Photo. The table, with the two real chapters. */}
      <section className="relative isolate overflow-hidden rounded-[var(--radius-panel)]">
        <div className="absolute inset-[-7%]" data-anim-drift>
          <Image
            src="/images/table.jpg"
            alt={home.table.imageAlt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-br from-espresso/60 to-espresso/20"
        />

        <div className="relative flex justify-end p-4 sm:p-8 md:p-12 lg:min-h-[42rem] lg:items-center">
          <div className="relative w-full lg:max-w-[46rem]">
            <Panel notch="br" animate={false}>
              <h2 className="text-3xl">
                {romeo.headline}{" "}
                <span className="cut text-clay">{romeo.cut}</span>
              </h2>
              <p className="measure mt-7 text-lg">{romeo.body}</p>

              <ul className="mt-10">
                {romeo.chapters.map((chapter) => (
                  <li key={chapter.href}>
                    <a
                      href={chapter.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-baseline justify-between gap-6 border-t border-espresso/15 py-5"
                    >
                      <span>
                        <span className="block text-xl font-semibold transition-colors group-hover:text-clay">
                          {chapter.name}
                        </span>
                        <span className="mt-1 block text-base text-espresso-soft">
                          {chapter.note}
                        </span>
                      </span>
                      <span aria-hidden="true" className="text-clay">
                        &rarr;
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Panel>
            <PanelNotch corner="br">
              <Pill href="/club" variant="clay">
                Join the waitlist
              </Pill>
            </PanelNotch>
          </div>
        </div>
      </section>

      {/* 6. Clay. The Club. Primary conversion. */}
      <Panel tone="clay" id="waitlist">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1fr] lg:gap-20">
          <div>
            <h2 className="text-4xl">
              Purpose in Age <span className="cut text-sand">Club</span>
            </h2>
            <p className="measure mt-7 text-lg text-bone">
              {home.club.body[0]}
            </p>

            <ul className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {home.club.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-base text-bone"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-sand"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="self-center">
            <EmailCapture
              intent="waitlist"
              label={home.club.capture.label}
              button={home.club.capture.button}
              note={home.club.capture.note}
            />
          </div>
        </div>
      </Panel>

      {/*
        7. Full bleed, square edged, edge to edge. Deliberately not a rounded
        panel: after six of them the page needs a hard break, and this is the
        one section that earns going wall to wall.
      */}
      <section className="bleed bg-espresso py-20 sm:py-28">
        <div className="px-6 sm:px-12 md:px-20">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <h2 className="max-w-[16ch] text-4xl text-bone">
                {network.headline}{" "}
                <span className="cut text-sand">{network.cut}</span>
              </h2>
            </div>
            <p className="measure-tight text-lg text-bone/85">{network.lead}</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-5">
          <Marquee people={network.people} speed={72} />
          <Marquee people={[...network.people].reverse()} reverse speed={86} />
        </div>
      </section>

      {/* 8. Bone. Journal, as a ruled editorial list. */}
      <Panel>
        <div className="flex flex-wrap items-end justify-between gap-7">
          <div>
            <h2 className="text-4xl">
              What I&rsquo;m working on{" "}
              <span className="cut text-clay">lately.</span>
            </h2>
          </div>
          <Pill href={home.journal.cta.href} variant="clay">
            {home.journal.cta.label}
          </Pill>
        </div>

        <ul className="mt-14">
          {posts.map((post) => (
            <li key={post.slug} data-anim="rise">
              <Link
                href={`/journal/${post.slug}`}
                className="group block border-t border-espresso/15 py-9"
              >
                <div className="grid gap-4 md:grid-cols-[10rem_1fr] md:gap-10">
                  <p className="text-sm font-semibold text-espresso-soft">
                    {formatDate(post.date)}
                  </p>
                  <div>
                    <h3 className="text-2xl transition-colors group-hover:text-clay">
                      {post.title}
                    </h3>
                    <p className="measure mt-3 text-lg">{post.excerpt}</p>
                    <p className="mt-3 text-sm font-semibold text-espresso-soft">
                      {post.readingTime} read
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Panel>

      {/* 8. Dark. The book, with the chapter list inline. */}
      <Panel tone="dark">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <h2 className="text-balance text-4xl">
              A Man&rsquo;s Purpose Never Retires.{" "}
              <span className="cut text-sand">It Evolves.</span>
            </h2>
            <p className="measure mt-7 text-lg text-bone">
              {home.book.body[1]}
            </p>
            <div className="mt-10">
              <Pill href="/book#chapter-one" variant="sand">
                Read chapter one
              </Pill>
            </div>
          </div>

          <ol className="lg:pt-4">
            {book.chapters.map((chapter) => (
              <li
                key={chapter.n}
                className="flex gap-6 border-t border-bone/20 py-5"
              >
                <span className="w-8 shrink-0 text-sm font-semibold text-sand">
                  {chapter.n}
                </span>
                <span className="text-lg text-bone">{chapter.title}</span>
              </li>
            ))}
          </ol>
        </div>
      </Panel>

      {/* 9. Photo. Two other ways in. */}
      <section className="relative isolate overflow-hidden rounded-[var(--radius-panel)]">
        <div className="absolute inset-[-7%]" data-anim-drift>
          <Image
            src="/images/sonoma.jpg"
            alt="Oak hills above a valley of coastal fog in Sonoma County, early morning."
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-r from-clay-deep/90 via-clay-deep/60 to-clay-deep/25"
        />

        <div className="relative p-6 py-16 sm:p-12 md:p-16 md:py-24">
          <div className="on-clay max-w-[46rem]">
            <h2 className="text-4xl">
              Book me to speak,{" "}
              <span className="cut text-sand">or just write to me.</span>
            </h2>
            <p className="measure mt-7 text-lg text-bone">
              {home.closing.body}
            </p>
            <div className="mt-11 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7">
              <Pill href={home.closing.primary.href} variant="bone" size="lg">
                {home.closing.primary.label}
              </Pill>
              <Link
                href={home.closing.secondary.href}
                className="link on-clay inline-flex min-h-[48px] items-center text-lg"
              >
                {home.closing.secondary.label}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
