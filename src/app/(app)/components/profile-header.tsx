"use client"

import { USER } from "@/data/portfolio/user"
import { urlToName } from "@/utils/url"
import {
  LinkIcon,
  MapPinIcon,
  MarsIcon,
  NonBinaryIcon,
  VenusIcon,
} from "lucide-react"

import type { User } from "@/types/user"
import { AvatarLights } from "@/components/avatar-lights"
import { Button } from "@/components/base/ui/button"

import { AvatarLightsToggle } from "./avatar-lights-toggle"
import { FlipSentences } from "./flip-sentences"
// Import interactive metadata items from Overview
import { CurrentLocalTimeItem } from "./overview/current-local-time-item"
import { EmailItem } from "./overview/email-item"
import { PhoneItem } from "./overview/phone-item"
import { PronounceMyName } from "./pronounce-my-name"
import { VerifiedIcon } from "./verified-icon"

function getGenderIcon(gender: User["gender"]) {
  switch (gender) {
    case "male":
      return <MarsIcon className="size-4 shrink-0 text-muted-foreground/80" />
    case "female":
      return <VenusIcon className="size-4 shrink-0 text-muted-foreground/80" />
    case "non-binary":
      return (
        <NonBinaryIcon className="size-4 shrink-0 text-muted-foreground/80" />
      )
  }
}

export function ProfileHeader() {
  return (
    <div className="relative flex flex-col gap-4 border-x border-line p-4 select-none sm:flex-row sm:gap-6 sm:p-6">
      {/* Left side: Avatar Profile */}
      <div className="size-30 shrink-0 rounded-2xl border border-line bg-background p-1 min-[24rem]:size-32 sm:size-40">
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
        {/* Row: Name, Gold Badge, Handle, and Contact Actions */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <h1 className="truncate text-xl font-bold tracking-tight text-foreground sm:text-3xl">
                {USER.displayName}
              </h1>
              <VerifiedIcon
                className="size-5 shrink-0 text-[#e1b12c] select-none sm:size-5.5" // PREMIUM GOLD BADGE
                aria-hidden
              />
            </div>
            <div className="mt-0.5 font-mono text-xs text-muted-foreground sm:text-sm">
              @{USER.username}
            </div>
          </div>

          {/* Contact Button & Name Pronunciation (Hidden on mobile) */}
          <div className="hidden shrink-0 items-center gap-2 sm:flex">
            {USER.namePronunciationUrl && (
              <PronounceMyName
                namePronunciationUrl={USER.namePronunciationUrl}
              />
            )}

            <Button
              variant="outline"
              size="sm"
              className="h-8.5 rounded-lg border-line font-mono text-xs font-medium tracking-wider text-muted-foreground uppercase hover:bg-muted hover:text-foreground dark:border-input dark:bg-input/30"
            >
              <a href={`mailto:${atob(USER.email)}`}>contact</a>
            </Button>
          </div>
        </div>

        {/* Metadata List */}
        <div className="mt-3 flex flex-col gap-1.5 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:gap-x-4 sm:gap-y-2 [&_.gap-4]:gap-1.5 [&_.size-6]:size-4 [&_.size-6]:border-none [&_.size-6]:bg-transparent [&_.size-6]:shadow-none [&_.size-6]:ring-0 [&_.size-6]:ring-offset-0 [&_a]:text-sm [&_a]:text-foreground [&_a:hover]:underline [&_p]:text-sm [&_svg]:text-muted-foreground/80">
          {/* Location */}
          <div className="flex items-center gap-1.5">
            <div className="flex size-4 shrink-0 items-center justify-center">
              <MapPinIcon className="size-4 text-muted-foreground/80" />
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(USER.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate text-sm hover:underline"
            >
              {USER.address}
            </a>
          </div>

          {/* Website */}
          <div className="flex items-center gap-1.5 text-[#e1b12c] [&_a]:text-[#e1b12c]!">
            <div className="flex size-4 shrink-0 items-center justify-center">
              <LinkIcon className="size-4 text-[#e1b12c]!" />
            </div>
            <a
              href={USER.website}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate text-sm hover:underline"
            >
              {urlToName(USER.website)}
            </a>
          </div>

          {/* Pronouns */}
          <div className="flex items-center gap-1.5">
            <div className="flex size-4 shrink-0 items-center justify-center">
              {getGenderIcon(USER.gender)}
            </div>
            <span className="text-sm">{USER.pronouns}</span>
          </div>

          {/* Current Local Time */}
          <CurrentLocalTimeItem timeZone={USER.timeZone} />

          {/* Phone */}
          <PhoneItem phoneNumber={USER.phoneNumber} />

          {/* Email */}
          <EmailItem email={USER.email} />

          {/* Scrolling posts/sentences (FlipSentences) placed right after the email inside the metadata list box */}
          <div className="flex items-center gap-1.5">
            <div className="flex size-4 shrink-0 items-center justify-center">
              <span className="flex size-1.5 animate-pulse rounded-full bg-emerald-500" />
            </div>
            <FlipSentences children={USER.flipSentences} className="text-sm" />
          </div>
        </div>
      </div>
    </div>
  )
}
