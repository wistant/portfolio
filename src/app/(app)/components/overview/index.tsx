import { USER } from "@/data/portfolio/user"
import { Panel, PanelContent } from "../panel"
import { JobItem } from "./job-item"

export function Overview() {
  return (
    <Panel className="after:content-none">
      <PanelContent className="space-y-2.5">
        {USER.jobs.map((job, index) => {
          return (
            <JobItem
              key={index}
              title={job.title}
              company={job.company}
              website={job.website}
              experienceId={job.experienceId}
            />
          )
        })}
      </PanelContent>
    </Panel>
  )
}

