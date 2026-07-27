import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "About Scott D Brown";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogImage({ eyebrow: "About", headline: "My purpose did not retire.", cut: "It changed jobs." });
}
