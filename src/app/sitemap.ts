import type { MetadataRoute } from "next"
import { getAllDocs } from "@/data/doc/documents"
import { SPONSORS } from "@/data/sponsor-data"

import { SITE_INFO } from "@/config/site"

export const revalidate = false
export const dynamic = "force-static"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const docs = getAllDocs().map((doc) => {
    let pathPrefix = "/blog"
    if (doc.metadata.category === "projects") {
      pathPrefix = "/projects"
    } else if (doc.metadata.category === "components") {
      pathPrefix = "/components"
    } else if (doc.metadata.category === "certifications") {
      pathPrefix = "/certifications"
    }

    return {
      url: `${SITE_INFO.url}${pathPrefix}/${doc.slug}`,
      lastModified: new Date(
        doc.metadata.updatedAt || doc.metadata.createdAt
      ).toISOString(),
    }
  })

  const routes = [
    "",
    "/blog",
    "/gallery",
    "/projects",
    SPONSORS.length > 0 ? "/sponsors" : null,
    "/certifications",
  ]
    .filter((r): r is string => r !== null)
    .map((route) => ({
      url: `${SITE_INFO.url}${route}`,
      lastModified: new Date().toISOString(),
    }))

  return [...routes, ...docs]
}
