import { KEY_MAP, LOCAL_ICONS, TECH_STACK } from "@/data/portfolio/tech-stack"

import { Panel, PanelContent } from "./panel"

export function TechStack() {
  return (
    <Panel id="stack" className="before:content-none">
      <PanelContent>
        <ul className="flex flex-wrap gap-2">
          {TECH_STACK.map((tech) => {
            const slug = KEY_MAP[tech.key] || tech.key
            const owner = tech.github?.split("/")[0] || tech.github
            const logoSrc = owner ? `https://github.com/${owner}.png` : null
            const localIcon = LOCAL_ICONS[tech.key]

            return (
              <li key={tech.key} className="flex">
                <a
                  href={tech.href}
                  target="_blank"
                  rel="noopener"
                  aria-label={tech.title}
                  className="flex items-center gap-1.5 rounded-xs bg-zinc-50 px-1.5 py-0.5 text-xs tracking-wide text-foreground ring-1 ring-border/80 select-none dark:bg-zinc-900 [&_img]:size-3.5"
                >
                  {localIcon ? (
                    <img
                      className="size-3.5 rounded-xs object-cover"
                      src={localIcon}
                      alt={`${tech.title} icon`}
                    />
                  ) : logoSrc ? (
                    <img
                      className="size-3.5 rounded-xs object-cover"
                      src={logoSrc}
                      alt={`${tech.title} icon`}
                    />
                  ) : tech.theme ? (
                    <>
                      <img
                        className="hidden size-3.5 [html.light_&]:block"
                        src={`https://cdn.simpleicons.org/${slug}/09090b`}
                        alt={`${tech.title} light icon`}
                      />
                      <img
                        className="hidden size-3.5 [html.dark_&]:block"
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
