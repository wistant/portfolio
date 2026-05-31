"use client"

import { copyToClipboardWithEvent } from "@/utils/copy"
import { decodePhoneNumber, formatPhoneNumber } from "@/utils/string"
import { useTiks } from "@rexa-developer/tiks/react"
import { PhoneIcon } from "lucide-react"
import { useHotkeys } from "react-hotkeys-hook"
import { toast } from "sonner"

import { trackEvent } from "@/lib/events"
import { useIsClient } from "@/hooks/use-is-client"
import { CopyButton } from "@/components/copy-button"

import {
  IntroItem,
  IntroItemContent,
  IntroItemIcon,
  IntroItemLink,
} from "./intro-item"

type PhoneItemProps = {
  phoneNumber: string
}

export function PhoneItem({ phoneNumber }: PhoneItemProps) {
  const isClient = useIsClient()
  const phoneNumberDecoded = decodePhoneNumber(phoneNumber)
  const phoneNumberFormatted = formatPhoneNumber(phoneNumberDecoded)

  const { success } = useTiks()

  useHotkeys("shift+p", () => {
    copyToClipboardWithEvent(phoneNumberDecoded, {
      name: "copy_phone_number",
      properties: {
        method: "keyboard",
        key: "shift+p",
      },
    })
    success()
    toast.success("Phone number copied")
  })

  return (
    <IntroItem className="group">
      <IntroItemIcon>
        <PhoneIcon />
      </IntroItemIcon>

      <IntroItemContent className="flex">
        <IntroItemLink href={isClient ? `tel:${phoneNumberDecoded}` : "#"}>
          {isClient ? phoneNumberFormatted : "+84 123 456 789"}
        </IntroItemLink>
      </IntroItemContent>

      <div className="-translate-x-3 translate-y-px opacity-0 transition-opacity ease-out group-hover:opacity-100">
        <CopyButton
          className="rounded-md border-none text-muted-foreground [&_svg:not([class*='size-'])]:size-4"
          variant="ghost"
          size="icon-xs"
          text={() => phoneNumberDecoded}
          onCopySuccess={() => {
            trackEvent({
              name: "copy_phone_number",
              properties: {
                method: "button",
              },
            })
          }}
        />
      </div>
    </IntroItem>
  )
}
