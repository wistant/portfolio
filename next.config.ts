import type { NextConfig } from "next"

import { SOCIAL_LINKS } from "./src/data/portfolio/social-links"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["next-mdx-remote"],
  allowedDevOrigins: ["wistant.localhost", "wistant.local"],
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "images.credly.com",
        port: "",
      },
    ],
    qualities: [75, 100],
  },
  compiler:
    process.env.NODE_ENV === "production"
      ? {
          removeConsole: {
            exclude: ["error"],
          },
        }
      : undefined,
  async redirects() {
    const socialRedirects = SOCIAL_LINKS.flatMap((link) => {
      const primarySlug =
        link.id || link.title.toLowerCase().replace(/[^a-z0-9]/g, "")
      const aliases = [primarySlug]
      if (
        primarySlug === "x" ||
        primarySlug === "twitter" ||
        primarySlug === "xtwitter"
      ) {
        if (!aliases.includes("x")) aliases.push("x")
        if (!aliases.includes("twitter")) aliases.push("twitter")
      }
      if (primarySlug === "github" || primarySlug === "git") {
        if (!aliases.includes("github")) aliases.push("github")
        if (!aliases.includes("git")) aliases.push("git")
      }
      if (primarySlug === "telegram" || primarySlug === "tg") {
        if (!aliases.includes("telegram")) aliases.push("telegram")
        if (!aliases.includes("tg")) aliases.push("tg")
      }
      if (primarySlug === "bluesky" || primarySlug === "bsky") {
        if (!aliases.includes("bluesky")) aliases.push("bluesky")
        if (!aliases.includes("bsky")) aliases.push("bsky")
      }
      return aliases.map((alias) => ({
        source: `/${alias}`,
        destination: link.href,
        permanent: false,
      }))
    })

    return socialRedirects
  },
  async rewrites() {
    return [
      {
        source: "/:section(blog|components|certifications)/:slug.mdx",
        destination: "/doc.mdx/:slug",
      },
      {
        source: "/:section(blog|components|certifications)/:slug",
        destination: "/doc.mdx/:slug",
        has: [
          {
            type: "header",
            key: "accept",
            value: "(?<accept>.*text/markdown.*)",
          },
        ],
      },
      {
        source: "/rss",
        destination: "/blog/rss",
      },
      {
        source: "/registry/rss",
        destination: "/components/rss",
      },
    ]
  },
}

export default nextConfig
