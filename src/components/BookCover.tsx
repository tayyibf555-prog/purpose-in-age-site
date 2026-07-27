import Image from "next/image";
import { LogoMark } from "./Logo";
import { book, site } from "@/content/site";

/**
 * The book cover, composed rather than flattened into an image.
 *
 * Typography is live text in the real brand fonts, so it stays crisp at any
 * size, can be corrected in one edit when the title is confirmed, and the
 * whole thing is one 316KB photograph rather than a baked 3MB artwork.
 *
 * PLACEHOLDER: the title is still unconfirmed. Scott's own materials use both
 * "Never Retires" and "Doesn't Retire", and a cover is the single worst place
 * to guess. Confirm with Leaders Press before this is shown to anyone.
 */
export function BookCover({ className = "" }: { className?: string }) {
  return (
    // @container so the type scales with the cover, not the viewport. The same
    // component then works as a full-size cover and as a thumbnail.
    <div
      className={`@container relative aspect-2/3 overflow-hidden rounded-[var(--radius-inner)] bg-espresso shadow-2xl ${className}`}
    >
      <Image
        src="/images/book-cover-art.jpg"
        alt=""
        fill
        sizes="(min-width: 1024px) 30vw, 80vw"
        className="object-cover"
      />

      {/* Scrim, weighted hard to the foot where the title sits and clearing
          entirely at the top so the wave reads. The art is already dark and
          moody, so anything heavier than this loses the photograph. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-espresso from-18% via-espresso/35 via-55% to-transparent"
      />

      <div className="relative flex h-full flex-col justify-between p-[7%]">
        <div className="flex items-center gap-2">
          <LogoMark
            cut="compact"
            strokeWidth={3.4}
            className="w-[18%] text-sand"
          />
          <span
            className="font-display text-[clamp(0.5rem,1.5cqw,0.7rem)] leading-none font-extrabold uppercase text-bone/90"
            style={{ letterSpacing: "0.16em" }}
          >
            Purpose in Age
          </span>
        </div>

        <div>
          <h3 className="text-[clamp(1.4rem,4.2cqw,2.6rem)] leading-[1.02] font-extrabold tracking-[-0.03em] text-bone">
            A Man&rsquo;s Purpose
            <br />
            Never Retires.
            <br />
            <span className="cut text-sand">It Evolves.</span>
          </h3>

          <div className="mt-[8%] h-px w-full bg-bone/30" />

          <p
            className="mt-[5%] text-[clamp(0.55rem,1.7cqw,0.85rem)] leading-none font-semibold uppercase text-bone"
            style={{ letterSpacing: "0.22em" }}
          >
            {site.author}
          </p>
          <p className="mt-[3%] text-[clamp(0.5rem,1.4cqw,0.7rem)] text-bone/70">
            {book.publisher}
          </p>
        </div>
      </div>
    </div>
  );
}
