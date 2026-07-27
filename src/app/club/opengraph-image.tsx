import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "The Purpose in Age Club";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogImage({ eyebrow: "The Club", headline: "Purpose in Age", cut: "Club." });
}
