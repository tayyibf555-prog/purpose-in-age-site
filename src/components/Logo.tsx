/**
 * Purpose in Age logo.
 *
 * The wave was designed by generating candidates with an image model, picking
 * the strongest, then rebuilding it as vector. Generated output is raster: it
 * cannot scale for print, cannot be recoloured with currentColor, and carries
 * the small wobbles and uneven stroke weights that show up badly at size. So
 * the generated mark set the form and this path reproduces it exactly.
 *
 * The structure, matching the original and the chosen candidate:
 *
 *   a long low tail entering from the left
 *   rising through an S curve
 *   wrapping over the top of the coil
 *   down the right side
 *   spiralling inward for two and a half turns
 *
 * The thing that makes it read as a breaking wave rather than a swoosh is that
 * the line wraps the full outside of the coil before it starts spiralling in.
 * An earlier version coiled immediately and read as a leaf.
 *
 * Coil geometry: alternating semicircles about (44, 16) with radii falling
 * 11, 8.2, 6.0, 4.2, 2.8, 1.7. Each arc's radius is the mean of its two
 * endpoint distances, which is what keeps the spiral smooth rather than
 * stepped.
 *
 * OPTICAL SIZING
 * Two cuts of one gesture, sharing an identical tail so the silhouette never
 * changes. Only the turn count does. This is the same problem a type family
 * solves with optical sizes: the inner turns fill in below roughly 34px, and
 * that is a function of stroke weight against inner radius, not of drawing.
 *
 *   display  2.5 turns. The real mark. 34px and above.
 *   compact  1.5 turns, heavier stroke. Below that, and the favicon.
 */

const TAIL = "M3 30C14 30.5 22 29 27 25C30 22.5 31.5 19 33 16";

/** 2.5 turns. */
const COIL_DISPLAY =
  "A9.6 9.6 0 0 1 52.2 16A7.1 7.1 0 0 1 38 16A5.1 5.1 0 0 1 48.2 16A3.5 3.5 0 0 1 41.2 16A2.25 2.25 0 0 1 45.7 16";

/** 1.5 turns. Stops before the centre closes up. */
const COIL_COMPACT =
  "A9.6 9.6 0 0 1 52.2 16A7.1 7.1 0 0 1 38 16A5.1 5.1 0 0 1 48.2 16";

export function LogoMark({
  className = "",
  cut = "display",
  strokeWidth,
}: {
  className?: string;
  cut?: "display" | "compact";
  /** Overrides the per-cut default. Raise it as the mark gets smaller. */
  strokeWidth?: number;
}) {
  const display = cut === "display";

  return (
    <svg
      viewBox="0 0 64 36"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d={TAIL + (display ? COIL_DISPLAY : COIL_COMPACT)}
        stroke="currentColor"
        strokeWidth={strokeWidth ?? (display ? 2.1 : 3.2)}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Horizontal lockup, for the header where the mark sits around 48px. */
export function Logo({
  className = "",
  markClassName = "text-clay",
  size = "md",
}: {
  className?: string;
  markClassName?: string;
  size?: "sm" | "md";
}) {
  const mark = size === "sm" ? "w-10" : "w-12";
  const type = size === "sm" ? "text-[0.92rem]" : "text-[1.05rem]";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark
        cut="display"
        strokeWidth={2.6}
        className={`${mark} shrink-0 ${markClassName}`}
      />
      <span
        className={`font-display leading-none font-extrabold uppercase ${type}`}
        style={{ letterSpacing: "0.07em" }}
      >
        Purpose in Age
      </span>
    </span>
  );
}

/**
 * The full stacked lockup, closest to the original: wave, name, descriptor.
 * Large enough for the display cut, so this shows the real spiral.
 */
export function LogoStacked({
  className = "",
  markClassName = "text-clay",
  ruleClassName = "bg-current",
  tagClassName = "text-clay",
}: {
  className?: string;
  markClassName?: string;
  ruleClassName?: string;
  tagClassName?: string;
}) {
  return (
    <span className={`inline-flex flex-col items-center gap-4 ${className}`}>
      <LogoMark cut="display" className={`w-32 ${markClassName}`} />

      <span className="flex flex-col items-center gap-2.5">
        <span
          className="font-display text-[1.5rem] leading-none font-extrabold uppercase"
          style={{ letterSpacing: "0.09em" }}
        >
          Purpose in Age
        </span>

        {/* Stands in for the pair of rules flanking the original descriptor. */}
        <span className="flex w-full items-center gap-3">
          <span className={`h-px flex-1 opacity-30 ${ruleClassName}`} />
          <span
            className={`text-[0.7rem] leading-none font-semibold uppercase ${tagClassName}`}
            style={{ letterSpacing: "0.3em" }}
          >
            Movement Wave
          </span>
          <span className={`h-px flex-1 opacity-30 ${ruleClassName}`} />
        </span>
      </span>
    </span>
  );
}
