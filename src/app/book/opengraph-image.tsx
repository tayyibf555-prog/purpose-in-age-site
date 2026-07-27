import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "The book";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogImage({ eyebrow: "The book", headline: "A Man's Purpose Never Retires.", cut: "It Evolves." });
}
