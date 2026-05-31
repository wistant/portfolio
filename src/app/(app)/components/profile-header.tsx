import { USER } from "@/data/portfolio/user"

import { AvatarLights } from "@/components/avatar-lights"

import { AvatarLightsToggle } from "./avatar-lights-toggle"
import { FlipSentences } from "./flip-sentences"
import { PronounceMyName } from "./pronounce-my-name"
import { VerifiedIcon } from "./verified-icon"

export function ProfileHeader() {
  return (
    <div className="screen-line-bottom flex border-x border-line">
      <div className="shrink-0 border-r border-line">
        <AvatarLightsToggle className="group/avatar-lights-toggle mx-0.5 my-0.75 flex outline-none">
          <AvatarLights
            className="ring-border ring-offset-background group-focus-visible/avatar-lights-toggle:ring-1 group-focus-visible/avatar-lights-toggle:ring-offset-2"
            variants={USER.avatarVariants}
          />
        </AvatarLightsToggle>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex grow items-end pb-1 pl-4">
          <div
            className="line-clamp-1 font-mono text-xs text-zinc-300 select-none max-sm:hidden dark:text-zinc-800"
            aria-hidden
          >
            {"text-3xl "}
            <span className="inline dark:hidden">API</span>
            <span className="hidden dark:inline">UI</span>
            {" font-medium"}
          </div>
        </div>

        <div className="border-t border-line">
          <div className="flex items-center gap-2 pl-4">
            <h1 className="-translate-y-px text-3xl font-semibold tracking-tight">
              {USER.displayName}
            </h1>

            <VerifiedIcon
              className="size-4.5 text-info select-none"
              aria-hidden
            />

            {USER.namePronunciationUrl && (
              <PronounceMyName
                namePronunciationUrl={USER.namePronunciationUrl}
              />
            )}
          </div>

          <FlipSentences className="h-12.5 border-t border-line py-1 pl-4 sm:h-9">
            {USER.flipSentences}
          </FlipSentences>
        </div>
      </div>
    </div>
  )
}
