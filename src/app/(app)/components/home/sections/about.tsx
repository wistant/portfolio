import { USER } from "@/data/portfolio/user"

import { Prose } from "@/components/ui/typography"
import { Markdown } from "@/components/markdown"
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/components/panel"

export function About() {
  return (
    <Panel id="about">
      <PanelHeader>
        <PanelTitle>About me 👨‍💻</PanelTitle>
      </PanelHeader>

      <PanelContent>
        <Prose className="text-justify">
          <Markdown>{USER.about}</Markdown>
        </Prose>
      </PanelContent>
    </Panel>
  )
}
