import { getDocsByCategory } from "@/data/doc/documents"

import { SITE_INFO } from "@/config/site"

export const revalidate = false
export const dynamic = "force-static"

export function GET() {
  const itemsXml = getDocsByCategory("blog")
    .map(
      (doc) =>
        `<item>
          <title>${doc.metadata.title}</title>
          <link>${SITE_INFO.url}/blog/${doc.slug}</link>
          <description>${doc.metadata.description || ""}</description>
          <pubDate>${new Date(doc.metadata.createdAt).toISOString()}</pubDate>
        </item>`
    )
    .join("\n")

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>Blog | ${SITE_INFO.name}</title>
      <link>${SITE_INFO.url}/blog</link>
      <description>Writing about code, design, and everything in between.</description>
      ${itemsXml}
    </channel>
  </rss>`

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "text/xml",
    },
  })
}
