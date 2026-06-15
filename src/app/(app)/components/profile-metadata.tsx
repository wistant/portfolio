"use client"

import { USER } from "@/data/portfolio/user"
import { MapPinIcon, MarsIcon, NonBinaryIcon, VenusIcon } from "lucide-react"

import type { User } from "@/types/user"

import { CurrentLocalTimeItem } from "./overview/current-local-time-item"
import { EmailItem } from "./overview/email-item"
import {
  IntroItem,
  IntroItemContent,
  IntroItemIcon,
  IntroItemLink,
} from "./overview/intro-item"
import { PhoneItem } from "./overview/phone-item"

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

export function ProfileMetadata() {
  return (
    <div className="relative grid grid-cols-1 gap-x-6 gap-y-4 border-x border-b border-line p-4 before:absolute before:inset-x-0 before:top-0 before:border-t before:border-dashed before:border-line sm:grid-cols-2 sm:p-6 md:grid-cols-3">
      {/* Location */}
      <IntroItem>
        <IntroItemIcon>
          <MapPinIcon />
        </IntroItemIcon>
        <IntroItemContent>
          <IntroItemLink
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(USER.address)}`}
          >
            {USER.address}
          </IntroItemLink>
        </IntroItemContent>
      </IntroItem>

      {/* Website */}
      {/*<IntroItem>
        <IntroItemIcon>
          <LinkIcon className="text-[#e1b12c]!" />
        </IntroItemIcon>
        <IntroItemContent>
          <IntroItemLink href={USER.website} className="text-[#e1b12c]!">
            {urlToName(USER.website)}
          </IntroItemLink>
        </IntroItemContent>
      </IntroItem>*/}

      {/* Pronouns */}
      <IntroItem>
        <IntroItemIcon>{getGenderIcon(USER.gender)}</IntroItemIcon>
        <IntroItemContent className="text-muted-foreground">
          {USER.pronouns}
        </IntroItemContent>
      </IntroItem>

      {/* Local Time */}
      <CurrentLocalTimeItem timeZone={USER.timeZone} />

      {/* Phone */}
      <PhoneItem phoneNumber={USER.phoneNumber} />

      {/* Email */}
      <EmailItem email={USER.email} />
    </div>
  )
}
