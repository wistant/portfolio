import { EXPERIENCES } from "@/data/portfolio/experiences"
import { ChevronDownIcon } from "lucide-react"

import type { Experience } from "@/types/experiences"
import { Button } from "@/components/base/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/base/ui/collapsible"

import { Panel, PanelHeader, PanelTitle } from "@/components/panel"
import { ExperienceItem } from "./experience-item"

const MAX = 3

export function Experiences() {
  return (
    <Panel id="experience">
      <PanelHeader>
        <PanelTitle>Work Experiences 💼</PanelTitle>
      </PanelHeader>

      <div className="pr-2 pl-4">
        <ExperienceList experiences={EXPERIENCES.slice(0, MAX)} />
      </div>

      {EXPERIENCES.length > MAX && (
        <Collapsible className="group/collapsible">
          <CollapsibleContent render={<div className="pr-2 pl-4" />}>
            <ExperienceList experiences={EXPERIENCES.slice(MAX)} />
          </CollapsibleContent>

          <div className="flex h-12 items-center justify-center">
            <CollapsibleTrigger
              render={
                <Button className="gap-2 border-none pr-2.5 pl-3" size="sm">
                  <span className="hidden group-data-closed/collapsible:block">
                    Show More
                  </span>

                  <span className="hidden group-data-open/collapsible:block">
                    Show Less
                  </span>

                  <ChevronDownIcon className="group-data-open/collapsible:rotate-180" />
                </Button>
              }
            />
          </div>
        </Collapsible>
      )}
    </Panel>
  )
}

function ExperienceList({ experiences }: { experiences: Experience[] }) {
  return (
    <>
      {experiences.map((experience) => (
        <ExperienceItem key={experience.id} experience={experience} />
      ))}
    </>
  )
}
