"use client"

import { USER } from "@/data/portfolio/user"

import { AvatarLights } from "@/components/avatar-lights"

import { AvatarLightsToggle } from "./avatar-lights"
import { FlipSentences } from "../../flip-sentences"
import { PronounceMyName } from "./pronounce"
import { VerifiedIcon } from "../../verified-icon"

export function ProfileHeader() {
  return (
    <div className="relative flex flex-col gap-4 border-x border-line p-4 select-none sm:flex-row sm:gap-6 sm:p-6">
      {/* Left side: Avatar Profile */}
      <div className="size-24 shrink-0 overflow-hidden rounded-xl border border-line bg-background p-1 sm:size-28">
        <AvatarLightsToggle className="group/avatar-lights-toggle flex h-full w-full outline-none">
          <AvatarLights
            className="h-full w-full ring-border ring-offset-background group-focus-visible/avatar-lights-toggle:ring-1 group-focus-visible/avatar-lights-toggle:ring-offset-2"
            variants={USER.avatarVariants}
            shape="square"
          />
        </AvatarLightsToggle>
      </div>

      {/* Right side: details */}
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <h1 className="truncate text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                {USER.displayName}
              </h1>
              <VerifiedIcon
                className="size-5 shrink-0 text-[#e1b12c] select-none" // PREMIUM GOLD BADGE
                aria-hidden
              />
            </div>
            <div className="mt-0.5 font-mono text-xs text-muted-foreground">
              @{USER.username}
            </div>
            {/* Scrolling posts/sentences (FlipSentences) directly under handle */}
            <div className="mt-2 flex items-center gap-1.5">
              <span className="flex size-1.5 animate-pulse rounded-full bg-emerald-500" />
              <FlipSentences className="font-mono text-xs text-muted-foreground uppercase">
                {USER.flipSentences}
              </FlipSentences>
            </div>
          </div>

          {/* Action buttons (Contact & Audio Pronunciation) */}
          <div className="flex shrink-0 items-center gap-2">
            {USER.namePronunciationUrl && (
              <PronounceMyName
                namePronunciationUrl={USER.namePronunciationUrl}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
