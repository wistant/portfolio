import { LOCAL_ICONS, TECH_STACK } from "@/data/portfolio/tech-stack"

import { Panel, PanelContent } from "./panel"

export function TechStack() {
  return (
    <Panel id="stack" className="before:content-none">
      <PanelContent>
        <ul className="flex flex-wrap gap-2">
          {TECH_STACK.filter((tech) => tech.showInStack !== false).map((tech) => {
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
                  {localIcon && (
                    <img
                      className="size-3.5 rounded-xs object-cover"
                      src={localIcon}
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
