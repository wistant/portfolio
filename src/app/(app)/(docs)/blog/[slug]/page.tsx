import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import Script from "next/script"
import { findNeighbour, getAllDocs, getDocBySlug } from "@/data/doc/documents"
import { USER } from "@/data/portfolio/user"
import { getTableOfContents } from "fumadocs-core/content/toc"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import type { BlogPosting as PageSchema, WithContext } from "schema-dts"

import type { Doc } from "@/types/document"
import { SITE_INFO, X_HANDLE } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import { Prose } from "@/components/ui/typography"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/base/ui/tooltip"
import { DocKeyboardShortcuts } from "@/components/doc/doc-keyboard-shortcuts"
import {
  DocContainer,
  DocContentCol,
  DocGrid,
  DocLeftCol,
  DocRightCol,
} from "@/components/doc/doc-layout"
import { LLMCopyButtonWithViewOptions } from "@/components/doc/doc-page-actions"
import { DocPageRoot } from "@/components/doc/doc-page-root"
import { DocShareMenu } from "@/components/doc/doc-share-menu"
import { FramedImage } from "@/components/embed"
import { MDX } from "@/components/mdx"
import { TOCInline } from "@/components/toc-inline"
import { TOCMinimap } from "@/components/toc-minimap"

export const revalidate = false
export const dynamic = "force-static"
export const dynamicParams = true

export async function generateStaticParams() {
  const docs = getAllDocs()
  return docs
    .filter((doc) => !doc.metadata.category || doc.metadata.category === "blog")
    .map((doc) => ({ slug: doc.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const slug = (await params).slug
  const doc = getDocBySlug(slug)

  if (!doc || (doc.metadata.category && doc.metadata.category !== "blog")) {
    return notFound()
  }

  const { title, description, image, createdAt, updatedAt } = doc.metadata

  const postUrl = getDocUrl(doc)
  const ogImage =
    image ||
    `/og/simple?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`

  return {
    title,
    description,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      url: postUrl,
      type: "article",
      publishedTime: new Date(createdAt).toISOString(),
      modifiedTime: new Date(updatedAt).toISOString(),
      images: {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: title,
      },
    },
    twitter: {
      card: "summary_large_image",
      site: X_HANDLE,
      creator: X_HANDLE,
      images: [ogImage],
    },
  }
}

function getPageJsonLd(doc: Doc): WithContext<PageSchema> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: doc.metadata.title,
    description: doc.metadata.description,
    image:
      doc.metadata.image ||
      `/og/simple?title=${encodeURIComponent(doc.metadata.title)}&description=${encodeURIComponent(doc.metadata.description)}`,
    url: `${SITE_INFO.url}${getDocUrl(doc)}`,
    datePublished: new Date(doc.metadata.createdAt).toISOString(),
    dateModified: new Date(doc.metadata.updatedAt).toISOString(),
    author: {
      "@type": "Person",
      name: USER.displayName,
      identifier: USER.username,
      image: USER.avatar,
    },
  }
}

export default async function Page({ params }: PageProps<"/blog/[slug]">) {
  const slug = (await params).slug
  const doc = getDocBySlug(slug)

  if (!doc || (doc.metadata.category && doc.metadata.category !== "blog")) {
    notFound()
  }

  const toc = getTableOfContents(doc.content)

  const allBlogs = getAllDocs().filter(
    (d) => !d.metadata.category || d.metadata.category === "blog"
  )
  const { previous, next } = findNeighbour(allBlogs, slug)

  return (
    <>
      <Script
        id="schema-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd(doc)).replace(/</g, "\\u003c"),
        }}
      />

      <DocKeyboardShortcuts
        previous={previous ? `/blog/${previous.slug}` : null}
        next={next ? `/blog/${next.slug}` : null}
      />

      <DocPageRoot>
        <DocContainer>
          <div className="screen-line-bottom h-px" />

          <div className="flex items-center justify-between p-2 pl-4">
            <Button
              className="h-7 gap-2 border-none px-0 text-muted-foreground hover:text-foreground hover:no-underline"
              variant="link"
              size="sm"
              asChild
            >
              <Link href="/blog">
                <ArrowLeftIcon />
                Blog
              </Link>
            </Button>

            <div className="flex items-center gap-2">
              <LLMCopyButtonWithViewOptions
                markdownUrl={`${getDocUrl(doc)}.mdx`}
                isComponent={doc.metadata.category === "components"}
              />

              <DocShareMenu title={doc.metadata.title} url={getDocUrl(doc)} />

              {previous && (
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <Button
                        className="size-7 border-none"
                        variant="secondary"
                        size="icon-sm"
                        asChild
                      >
                        <Link
                          href={`/blog/${previous.slug}`}
                          aria-label="Previous Post"
                        >
                          <ArrowLeftIcon />
                        </Link>
                      </Button>
                    }
                  />
                  <TooltipContent className="pr-2 pl-3">
                    <div className="flex items-center gap-3">
                      Previous Post
                      <Kbd>
                        <ArrowLeftIcon />
                      </Kbd>
                    </div>
                  </TooltipContent>
                </Tooltip>
              )}

              {next && (
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <Button
                        className="size-7 border-none"
                        variant="secondary"
                        size="icon-sm"
                        asChild
                      >
                        <Link
                          href={`/blog/${next.slug}`}
                          aria-label="Next Post"
                        >
                          <ArrowRightIcon />
                        </Link>
                      </Button>
                    }
                  />
                  <TooltipContent className="pr-2 pl-3">
                    <div className="flex items-center gap-3">
                      Next Post
                      <Kbd>
                        <ArrowRightIcon />
                      </Kbd>
                    </div>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>

          <div className="screen-line-top screen-line-bottom">
            <div
              className={cn(
                "h-8",
                "before:absolute before:left-[-100vw] before:-z-1 before:h-full before:w-[200vw]",
                "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-line)]/56"
              )}
            />
          </div>

          <h1
            data-slot="doc-title"
            className="screen-line-bottom px-4 text-3xl font-semibold tracking-tight text-balance"
          >
            {doc.metadata.title}
          </h1>
        </DocContainer>

        <DocGrid>
          <DocLeftCol />

          <DocContentCol>
            <Prose className="px-(--page-padding) pt-8 [--page-padding:--spacing(4)]">
              <p className="text-muted-foreground">
                {doc.metadata.description}
              </p>

              {doc.metadata.image && (
                <FramedImage
                  src={doc.metadata.image}
                  alt={doc.metadata.title}
                  className="my-6 aspect-video w-full object-cover"
                />
              )}

              <TOCInline className="lg:hidden" items={toc} />

              <div>
                <MDX code={doc.content} />
              </div>
            </Prose>

            <div className="screen-line-top h-4" />
          </DocContentCol>

          <DocRightCol>
            <TOCMinimap items={toc} />
          </DocRightCol>
        </DocGrid>
      </DocPageRoot>
    </>
  )
}

function getDocUrl(doc: Doc) {
  const isComponent = doc.metadata.category === "components"
  return isComponent ? `/components/${doc.slug}` : `/blog/${doc.slug}`
}
