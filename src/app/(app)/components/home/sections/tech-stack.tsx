"use client"

import { LOCAL_ICONS, TECH_STACK } from "@/data/portfolio/tech-stack"
import { motion } from "motion/react"

import {
  FadeIn,
  StaggerGroup,
  StaggerItem,
} from "@/components/animations/fade-in"
import { Panel, PanelContent } from "@/components/panel"

export function TechStack() {
  return (
    <FadeIn>
      <Panel id="stack" className="before:content-none">
        <PanelContent>
          <StaggerGroup className="flex flex-wrap gap-2">
            {TECH_STACK.filter((tech) => tech.showInStack !== false).map(
              (tech) => {
                const localIcon = LOCAL_ICONS[tech.key]

                return (
                  <StaggerItem key={tech.key} className="flex">
                    <motion.a
                      whileHover={{ scale: 1.06, y: -1 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      href={tech.href}
                      target="_blank"
                      rel="noopener"
                      aria-label={tech.title}
                      className="flex items-center gap-1.5 rounded-xs bg-zinc-50 px-1.5 py-0.5 text-xs tracking-wide text-foreground ring-1 ring-border/80 select-none hover:bg-accent-muted dark:bg-zinc-900 [&_img]:size-3.5"
                    >
                      {localIcon && (
                        <img
                          className="size-3.5 rounded-xs object-cover"
                          src={localIcon}
                          alt={`${tech.title} icon`}
                        />
                      )}
                      {tech.title}
                    </motion.a>
                  </StaggerItem>
                )
              }
            )}
          </StaggerGroup>
        </PanelContent>

        <div className="flex h-px" />
      </Panel>
    </FadeIn>
  )
}
