import type { MetadataRoute } from "next"
import { getAllDocs } from "@/data/doc/documents"

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
    }

    return {
      url: `${SITE_INFO.url}${pathPrefix}/${doc.slug}`,
      lastModified: new Date(
        doc.metadata.updatedAt || doc.metadata.createdAt
      ).toISOString(),
    }
  })

  const routes = ["", "/blog", "/gallery", "/projects", "/sponsors"].map(
    (route) => ({
      url: `${SITE_INFO.url}${route}`,
      lastModified: new Date().toISOString(),
    })
  )

  return [...routes, ...docs]
}
