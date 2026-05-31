import type { MetadataRoute } from "next"
import { getAllDocs } from "@/data/doc/documents"
import { SITE_INFO } from "@/config/site"

export const revalidate = false
export const dynamic = "force-static"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = getAllDocs().map((post) => ({
    url: `${SITE_INFO.url}/blog/${post.slug}`,
    lastModified: new Date(post.metadata.updatedAt).toISOString(),
  }))

  const routes = [
    "",
    "/blog",
    "/sponsors",
    "/testimonials",
  ].map((route) => ({
    url: `${SITE_INFO.url}${route}`,
    lastModified: new Date().toISOString(),
  }))

  return [...routes, ...posts]
}
