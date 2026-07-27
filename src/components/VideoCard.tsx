import Image from "next/image";

/**
 * A real YouTube video, linked out rather than embedded.
 *
 * Embedding nine iframes would drag the page down and hand Google a tracking
 * cookie before the reader has agreed to anything. A thumbnail that links out
 * costs one image and behaves predictably.
 *
 * hqdefault is 480x360 and always exists. YouTube letterboxes 16:9 frames into
 * it, so `object-cover` inside a 16:9 box crops the bars back off. maxresdefault
 * is 1280x720 and is used only where it is known to exist.
 */
function thumb(id: string, size: "hq" | "max") {
  return `https://i.ytimg.com/vi/${id}/${
    size === "max" ? "maxresdefault" : "hqdefault"
  }.jpg`;
}

function PlayBadge({ large = false }: { large?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={[
        "absolute grid place-items-center rounded-full bg-bone text-espresso",
        "transition-transform duration-300 group-hover:scale-108",
        large
          ? "bottom-5 left-5 h-16 w-16 sm:bottom-7 sm:left-7 sm:h-20 sm:w-20"
          : "bottom-4 left-4 h-12 w-12",
      ].join(" ")}
    >
      <svg
        width={large ? 22 : 16}
        height={large ? 24 : 18}
        viewBox="0 0 16 18"
        fill="currentColor"
      >
        <path d="M15 8.13a1 1 0 0 1 0 1.74l-13.5 7.7A1 1 0 0 1 0 16.7V1.3A1 1 0 0 1 1.5.43Z" />
      </svg>
    </span>
  );
}

export function FeaturedVideo({
  id,
  title,
  channel,
  blurb,
}: {
  id: string;
  title: string;
  channel: string;
  blurb: string;
}) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <div className="relative aspect-16/9 overflow-hidden rounded-[var(--radius-inner)] bg-espresso">
        <Image
          src={thumb(id, "max")}
          alt=""
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-103"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-espresso/70 via-transparent to-transparent"
        />
        <PlayBadge large />
      </div>

      <p className="mt-7 text-sm font-semibold text-sand">{channel}</p>
      <h3 className="mt-3 text-3xl">{title}</h3>
      <p className="measure mt-4 text-lg text-bone/90">{blurb}</p>
      <span className="link mt-5 inline-block text-base">Watch on YouTube</span>
    </a>
  );
}

export function VideoCard({
  id,
  title,
  channel,
}: {
  id: string;
  title: string;
  channel: string;
}) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <div className="relative aspect-16/9 overflow-hidden rounded-[var(--radius-inner)] bg-espresso">
        <Image
          src={thumb(id, "hq")}
          alt=""
          fill
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-103"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-espresso/65 via-transparent to-transparent"
        />
        <PlayBadge />
      </div>

      <p className="mt-5 text-sm font-semibold text-sand">{channel}</p>
      <h3 className="mt-2 text-xl leading-snug font-semibold">{title}</h3>
    </a>
  );
}
