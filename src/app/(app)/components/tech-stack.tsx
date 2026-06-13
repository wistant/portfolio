import { TECH_STACK } from "@/data/portfolio/tech-stack"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/base/ui/tooltip"
import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel"

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

const CATEGORY_ORDER = [
  "Frontend",
  "Backend",
  "Backend & Database",
  "Dev Tools",
]

const getCategoryPriority = (tech: typeof TECH_STACK[number]) => {
  for (const cat of CATEGORY_ORDER) {
    if (tech.categories.includes(cat)) {
      return CATEGORY_ORDER.indexOf(cat)
    }
  }
  return 999
}

export function TechStack() {
  const languages = TECH_STACK.filter((tech) =>
    tech.categories.includes("Languages")
  )

  const technologies = TECH_STACK.filter(
    (tech) => !tech.categories.includes("Languages")
  ).sort((a, b) => {
    const prioA = getCategoryPriority(a)
    const prioB = getCategoryPriority(b)
    if (prioA !== prioB) return prioA - prioB
    return TECH_STACK.indexOf(a) - TECH_STACK.indexOf(b)
  })

  return (
    <Panel id="stack">
      <PanelHeader>
        <PanelTitle>Tech Stack</PanelTitle>
      </PanelHeader>

      <PanelContent className="space-y-4">
        {/* Languages Row */}
        {languages.length > 0 && (
          <ul className="flex flex-wrap gap-2 select-none">
            {languages.map((tech) => {
              const slug = KEY_MAP[tech.key] || tech.key
              const owner = tech.github?.split("/")[0] || tech.github
              const logoSrc = owner ? `https://github.com/${owner}.png` : null

              return (
                <li key={tech.key} className="flex">
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <a
                          href={tech.href}
                          target="_blank"
                          rel="noopener"
                          aria-label={tech.title}
                          className="inline-flex items-center gap-1.5 rounded-xs border border-line bg-zinc-50/50 px-2 py-1 text-xs tracking-wide text-foreground shadow-xs transition-all duration-200 hover:bg-accent-muted select-none dark:bg-zinc-950/30 [&_img]:size-3.5 cursor-pointer"
                        >
                          {logoSrc ? (
                            <img
                              className="size-3.5 rounded-full object-cover select-none"
                              src={logoSrc}
                              alt={`${tech.title} icon`}
                              style={{ width: "auto", height: "auto" }}
                            />
                          ) : tech.theme ? (
                            <>
                              <img
                                className="hidden size-3.5 [html.light_&]:block select-none"
                                src={`https://cdn.simpleicons.org/${slug}/09090b`}
                                alt={`${tech.title} light icon`}
                                style={{ width: "auto", height: "auto" }}
                              />
                              <img
                                className="hidden size-3.5 [html.dark_&]:block select-none"
                                src={`https://cdn.simpleicons.org/${slug}/f4f4f5`}
                                alt={`${tech.title} dark icon`}
                                style={{ width: "auto", height: "auto" }}
                              />
                            </>
                          ) : (
                            <img
                              className="size-3.5 select-none"
                              src={`https://cdn.simpleicons.org/${slug}`}
                              alt={`${tech.title} icon`}
                              style={{ width: "auto", height: "auto" }}
                            />
                          )}
                          <span>{tech.title}</span>
                        </a>
                      }
                    />
                    <TooltipContent sideOffset={6} className="font-sans">
                      <p>{tech.title}</p>
                    </TooltipContent>
                  </Tooltip>
                </li>
              )
            })}
          </ul>
        )}

        {/* Technologies Row */}
        {technologies.length > 0 && (
          <ul className="flex flex-wrap gap-2 select-none">
            {technologies.map((tech) => {
              const slug = KEY_MAP[tech.key] || tech.key
              const owner = tech.github?.split("/")[0] || tech.github
              const logoSrc = owner ? `https://github.com/${owner}.png` : null

              return (
                <li key={tech.key} className="flex">
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <a
                          href={tech.href}
                          target="_blank"
                          rel="noopener"
                          aria-label={tech.title}
                          className="inline-flex items-center gap-1.5 rounded-xs border border-line bg-zinc-50/50 px-2 py-1 text-xs tracking-wide text-foreground shadow-xs transition-all duration-200 hover:bg-accent-muted select-none dark:bg-zinc-950/30 [&_img]:size-3.5 cursor-pointer"
                        >
                          {logoSrc ? (
                            <img
                              className="size-3.5 rounded-full object-cover select-none"
                              src={logoSrc}
                              alt={`${tech.title} icon`}
                              style={{ width: "auto", height: "auto" }}
                            />
                          ) : tech.theme ? (
                            <>
                              <img
                                className="hidden size-3.5 [html.light_&]:block select-none"
                                src={`https://cdn.simpleicons.org/${slug}/09090b`}
                                alt={`${tech.title} light icon`}
                                style={{ width: "auto", height: "auto" }}
                              />
                              <img
                                className="hidden size-3.5 [html.dark_&]:block select-none"
                                src={`https://cdn.simpleicons.org/${slug}/f4f4f5`}
                                alt={`${tech.title} dark icon`}
                                style={{ width: "auto", height: "auto" }}
                              />
                            </>
                          ) : (
                            <img
                              className="size-3.5 select-none"
                              src={`https://cdn.simpleicons.org/${slug}`}
                              alt={`${tech.title} icon`}
                              style={{ width: "auto", height: "auto" }}
                            />
                          )}
                          <span>{tech.title}</span>
                        </a>
                      }
                    />
                    <TooltipContent sideOffset={6} className="font-sans">
                      <p>{tech.title}</p>
                    </TooltipContent>
                  </Tooltip>
                </li>
              )
            })}
          </ul>
        )}
      </PanelContent>
    </Panel>
  )
}
