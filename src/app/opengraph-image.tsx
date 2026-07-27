import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Purpose in Age";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  // Not "Purpose in Age": that already sits in the lockup above it.
  return ogImage({
    eyebrow: "The table, the book, the Club",
    headline: "Your career ended.",
    cut: "You didn't.",
  });
}
