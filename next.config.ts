import type { NextConfig } from "next";

const imageHosts = [
  "static.wixstatic.com",
  "prioritysounds.co.uk",
  "images.squarespace-cdn.com",
  "headbox-media.imgix.net",
  "images.mediapro.tv",
  "atriumaudio.com",
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: imageHosts.map((hostname) => ({
      protocol: "https" as const,
      hostname,
      port: "",
      pathname: "/**",
    })),
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
