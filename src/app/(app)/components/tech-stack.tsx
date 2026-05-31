import { TECH_STACK } from "@/data/portfolio/tech-stack"

import { Panel, PanelContent } from "./panel"

const KEY_MAP: Record<string, string> = {
  js: "javascript",
  nextjs: "nextdotjs",
  "shadcn-ui": "shadcnui",
  radixui: "radixui",
  "base-ui": "baseui",
  "react-navigation": "react",
  nodejs: "nodedotjs",
  claude: "anthropic",
}

export function TechStack() {
  return (
    <Panel id="stack" className="before:content-none">
      <PanelContent>
        <ul className="flex flex-wrap gap-2">
          {TECH_STACK.map((tech) => {
            const slug = KEY_MAP[tech.key] || tech.key
            return (
              <li key={tech.key} className="flex">
                <a
                  href={tech.href}
                  target="_blank"
                  rel="noopener"
                  aria-label={tech.title}
                  className="flex items-center gap-1.5 rounded-full bg-zinc-50 px-1.5 py-0.5 text-xs tracking-wide text-foreground ring-1 ring-border/80 select-none dark:bg-zinc-900 [&_img]:size-3.5"
                >
                  {tech.theme ? (
                    <>
                      <img
                        className="hidden [html.light_&]:block size-3.5"
                        src={`https://cdn.simpleicons.org/${slug}/09090b`}
                        alt={`${tech.title} light icon`}
                      />
                      <img
                        className="hidden [html.dark_&]:block size-3.5"
                        src={`https://cdn.simpleicons.org/${slug}/f4f4f5`}
                        alt={`${tech.title} dark icon`}
                      />
                    </>
                  ) : (
                    <img
                      className="size-3.5"
                      src={`https://cdn.simpleicons.org/${slug}`}
                      alt={`${tech.title} icon`}
                    />
                  )}
                  {tech.title}
                </a>
              </li>
            )
          })}
        </ul>
      </PanelContent>

      <div className="flex h-px" />
    </Panel>
  )
}
