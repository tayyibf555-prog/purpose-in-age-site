import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray lockfile in the home directory makes Next infer the wrong
  // workspace root. Pin it to this project.
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    // YouTube thumbnails for the watch section. Every video is real and
    // already embedded on the current site.
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" },
    ],
  },
};

export default nextConfig;
