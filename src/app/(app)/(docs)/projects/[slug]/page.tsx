import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import Script from "next/script"
import {
  findNeighbour,
  getDocBySlug,
  getDocsByCategory,
} from "@/data/doc/documents"
import { USER } from "@/data/portfolio/user"
import { getTableOfContents } from "fumadocs-core/content/toc"
import { ArrowLeftIcon, ArrowRightIcon, LinkIcon } from "lucide-react"
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
import { Icons } from "@/components/icons"
import { MDX } from "@/components/mdx"
import { TOCInline } from "@/components/toc-inline"
import { TOCMinimap } from "@/components/toc-minimap"

export const revalidate = false
export const dynamic = "force-static"
export const dynamicParams = true

export async function generateStaticParams() {
  const docs = getDocsByCategory("projects")
  return docs.map((doc) => ({ slug: doc.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const slug = (await params).slug
  const doc = getDocBySlug(slug)

  if (!doc || doc.metadata.category !== "projects") {
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

export default async function Page({ params }: PageProps<"/projects/[slug]">) {
  const slug = (await params).slug
  const doc = getDocBySlug(slug)

  if (!doc || doc.metadata.category !== "projects") {
    notFound()
  }

  const toc = getTableOfContents(doc.content)

  const allProjects = getDocsByCategory("projects")
  const { previous, next } = findNeighbour(allProjects, slug)

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
        previous={previous ? `/projects/${previous.slug}` : null}
        next={next ? `/projects/${next.slug}` : null}
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
              <Link href="/projects">
                <ArrowLeftIcon />
                Projects
              </Link>
            </Button>

            <div className="flex items-center gap-2">
              <LLMCopyButtonWithViewOptions
                markdownUrl={`${getDocUrl(doc)}.mdx`}
                isComponent={false}
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
                          href={`/projects/${previous.slug}`}
                          aria-label="Previous Project"
                        >
                          <ArrowLeftIcon />
                        </Link>
                      </Button>
                    }
                  />
                  <TooltipContent className="pr-2 pl-3">
                    <div className="flex items-center gap-3">
                      Previous Project
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
                          href={`/projects/${next.slug}`}
                          aria-label="Next Project"
                        >
                          <ArrowRightIcon />
                        </Link>
                      </Button>
                    }
                  />
                  <TooltipContent className="pr-2 pl-3">
                    <div className="flex items-center gap-3">
                      Next Project
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

          <div
            data-slot="doc-title"
            className="screen-line-bottom flex flex-col justify-between gap-4 px-4 py-4 md:flex-row md:items-center md:py-6"
          >
            <h1 className="text-3xl font-semibold tracking-tight text-balance">
              {doc.metadata.title}
            </h1>

            <div className="flex shrink-0 items-center gap-2">
              {doc.metadata.webUrl && (
                <Button variant="outline" size="sm" asChild className="gap-2">
                  <a
                    href={doc.metadata.webUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkIcon className="size-4" />
                    <span>Live Demo</span>
                  </a>
                </Button>
              )}
              {doc.metadata.githubUrl && (
                <Button variant="outline" size="sm" asChild className="gap-2">
                  <a
                    href={doc.metadata.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icons.github className="size-4" />
                    <span>GitHub</span>
                  </a>
                </Button>
              )}
            </div>
          </div>
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
                  className="my-6 aspect-[1570/760] w-full object-cover"
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
  return `/projects/${doc.slug}`
}
