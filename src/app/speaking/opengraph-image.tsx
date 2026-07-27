import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Speaking";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogImage({ eyebrow: "Speaking", headline: "Talks about the cliff at the end of", cut: "a long career." });
}
