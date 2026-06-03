import type { NextConfig } from "next"

import { SOCIAL_LINKS } from "./src/data/portfolio/social-links"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["next-mdx-remote"],
  allowedDevOrigins: ["ncdai.localhost", "ncdai.local"],
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.chanhdai.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
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
      const slug = link.title.toLowerCase().replace(/[^a-z0-9]/g, "")
      const aliases = [slug]
      if (slug === "xtwitter") {
        aliases.push("x", "twitter")
      }
      if (slug === "github") {
        aliases.push("git")
      }
      if (slug === "telegram") {
        aliases.push("tg")
      }
      if (slug === "bluesky") {
        aliases.push("bsky")
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
        source: "/:section(blog|components)/:slug.mdx",
        destination: "/doc.mdx/:slug",
      },
      {
        source: "/:section(blog|components)/:slug",
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
