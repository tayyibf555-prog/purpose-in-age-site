import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/**
 * Shared open graph card.
 *
 * Fonts are read from disk rather than fetched, so a build never depends on
 * Google Fonts being reachable. ImageResponse wants ttf or otf; the woff2 that
 * the Google CSS API serves to a modern user agent will not load.
 *
 * The wave is inlined as a path rather than imported from the Logo component,
 * because Satori renders a subset of SVG and does not run React components the
 * way the browser does. Keep the two in sync by hand; it is one string.
 */
const WAVE =
  "M3 30C14 30.5 22 29 27 25C30 22.5 31.5 19 33 16A9.6 9.6 0 0 1 52.2 16A7.1 7.1 0 0 1 38 16A5.1 5.1 0 0 1 48.2 16A3.5 3.5 0 0 1 41.2 16A2.25 2.25 0 0 1 45.7 16";

const CLAY = "#5C2A20";
const CLAY_DEEP = "#431D16";
const BONE = "#F3EFE8";
const SAND = "#D8B78C";

async function font(file: string) {
  return readFile(join(process.cwd(), "src/assets/fonts", file));
}

export async function ogImage({
  eyebrow,
  headline,
  cut,
}: {
  eyebrow: string;
  headline: string;
  /** Trailing phrase, set in the Didone italic. Keep it short. */
  cut?: string;
}) {
  const [archivo, italicCut] = await Promise.all([
    font("archivo-800.ttf"),
    font("vollkorn-italic-600.ttf"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: CLAY,
          padding: "72px 80px",
          fontFamily: "Archivo",
        }}
      >
        {/* Recessed panel edge, echoing the site's stacked panels. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(135deg, ${CLAY} 0%, ${CLAY_DEEP} 100%)`,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="112" height="63" viewBox="0 0 64 36" fill="none">
            <path
              d={WAVE}
              stroke={SAND}
              strokeWidth={2.4}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div
            style={{
              fontSize: 26,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: BONE,
            }}
          >
            Purpose in Age
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div
            style={{
              fontSize: 24,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: SAND,
            }}
          >
            {eyebrow}
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "baseline",
              gap: 18,
              fontSize: 78,
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              color: BONE,
              maxWidth: 980,
            }}
          >
            <span>{headline}</span>
            {cut && (
              <span
                style={{
                  fontFamily: "ItalicCut",
                  fontStyle: "italic",
                  // Only a touch larger than the grotesque. Vollkorn already
                  // sets optically large, unlike the Didone this replaced.
                  fontSize: 82,
                  color: SAND,
                }}
              >
                {cut}
              </span>
            )}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 24, color: BONE }}>
          Scott D Brown, San Francisco and Sonoma County
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Archivo", data: archivo, style: "normal", weight: 800 },
        { name: "ItalicCut", data: italicCut, style: "italic", weight: 600 },
      ],
    },
  );
}
