import type { Metadata } from "next"
import Link from "next/link"
import { getDocsByCategory } from "@/data/doc/documents"
import { addQueryParams } from "@/utils/url"
import { Grip, LayoutDashboard } from "lucide-react"

import { registryConfig } from "@/config/registry"
import { UTM_PARAMS, X_HANDLE } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/base/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/base/ui/tooltip"
import { ComponentIcon, Icons } from "@/components/icons"
import {
  PageHeading,
  PageHeadingTagline,
  PageHeadingTitle,
} from "@/components/page-heading"
import { RegistryCommandAnimated } from "@/components/registry-command-animated"

import {
  ComponentItem,
  ComponentItemDot,
  ComponentItemIcon,
  ComponentItemTitle,
} from "./component-item"

const title = "Components"
const description = "Pixel-perfect, uniquely crafted."

const ogImage = `/og/simple?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/components",
  },
  openGraph: {
    url: "/components",
    type: "website",
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

// const addRegistryCode = `\`\`\`bash
// npx shadcn@latest registry add ${registryConfig.namespace}
// \`\`\``

export default function Page() {
  const posts = getDocsByCategory("components")

  const trustedRegistryUrl = addQueryParams(
    "https://ui.shadcn.com/docs/directory",
    {
      q: registryConfig.namespace,
      ...UTM_PARAMS,
    }
  )

  return (
    <div>
      <PageHeading>
        <PageHeadingTagline>Components</PageHeadingTagline>
        <PageHeadingTitle>Pixel-perfect, uniquely crafted.</PageHeadingTitle>
      </PageHeading>

      <div className="h-4" />

      <div className="screen-line-top screen-line-bottom">
        <RegistryCommandAnimated />
      </div>

      <Separator />

      <div className="screen-line-bottom h-px" />

      <div className="flex items-center gap-1.5 p-1.5 pl-4">
        <div className="flex flex-1">
          <span className="text-sm font-medium text-muted-foreground">
            {posts.length} components
          </span>
        </div>

        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                className="size-7"
                variant="outline"
                size="icon-sm"
                aria-label="List"
              >
                <Grip />
              </Button>
            }
          />
          <TooltipContent>
            <p>List</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                className="size-7 border-none text-muted-foreground"
                variant="ghost"
                size="icon-sm"
                nativeButton={false}
                render={<Link href="/components/showcase" />}
                aria-label="Showcase"
              >
                <LayoutDashboard />
              </Button>
            }
          />
          <TooltipContent>
            <p>Showcase</p>
          </TooltipContent>
        </Tooltip>

        {/* <Dialog>
          <DialogTrigger
            render={
              <Button
                className="h-7 gap-1.5 border-none pr-2.5 pl-2"
                variant="secondary"
                size="sm"
              >
                <PlusIcon />
                Add
              </Button>
            }
          />

          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add Registry</DialogTitle>
              <DialogDescription className="text-balance">
                Run this command to add{" "}
                <a
                  className="text-foreground link-underline"
                  href={trustedRegistryUrl}
                  target="_blank"
                  rel="noopener"
                >
                  {registryConfig.namespace}
                </a>{" "}
                to your project.
              </DialogDescription>
            </DialogHeader>

            <div className="overflow-auto *:data-rehype-pretty-code-figure:my-0">
              <MDX code={addRegistryCode} />
            </div>

            <DialogFooter>
              <DialogClose render={<Button>Done</Button>} />
            </DialogFooter>
          </DialogContent>
        </Dialog> */}
      </div>

      <div className="screen-line-bottom h-px" />

      <div className="relative">
        <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-1 max-sm:hidden sm:grid-cols-2 md:grid-cols-3">
          <div className="border-r border-line" />
          <div className="border-r border-line max-md:hidden" />
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {posts
            .slice()
            .sort((a, b) =>
              a.metadata.title.localeCompare(b.metadata.title, "en", {
                sensitivity: "base",
              })
            )
            .map((c) => (
              <li
                key={c.slug}
                className={cn(
                  "max-sm:screen-line-bottom",
                  "sm:max-md:nth-[2n+1]:screen-line-bottom",
                  "md:nth-[3n+1]:screen-line-bottom"
                )}
              >
                <ComponentItem href={`/components/${c.slug}`}>
                  <ComponentItemIcon>
                    <ComponentIcon variant={c.slug} />
                    {(c.metadata.new || c.metadata.updated) && (
                      <ComponentItemDot
                        aria-label={c.metadata.new ? "New" : "Updated"}
                      />
                    )}
                  </ComponentItemIcon>
                  <ComponentItemTitle as="h2">
                    {c.metadata.title}
                  </ComponentItemTitle>
                </ComponentItem>
              </li>
            ))}
        </ul>
      </div>

      <div
        className={cn(
          "relative before:absolute before:left-[-100vw] before:-z-1 before:h-full before:w-[200vw]",
          "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-line)]/56"
        )}
      >
        <div className="flex justify-center p-4">
          <a
            className="flex h-7 items-center gap-1 rounded-full bg-primary pr-2.5 pl-2 text-sm font-medium whitespace-nowrap text-primary-foreground select-none [&>svg]:pointer-events-none [&>svg]:size-4 [&>svg]:shrink-0"
            href={trustedRegistryUrl}
            target="_blank"
            rel="noopener"
          >
            <Icons.trustedRegistry />
            Trusted Registry
          </a>
        </div>
      </div>

      <div className="screen-line-bottom h-px" />
      <div className="h-4" />
    </div>
  )
}

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-full",
        "before:absolute before:left-[-100vw] before:-z-1 before:h-8 before:w-[200vw]",
        "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-line)]/56",
        className
      )}
    />
  )
}
