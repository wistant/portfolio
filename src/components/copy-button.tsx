"use client"

import type { ComponentProps } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Copy, Check, X } from "lucide-react"

import type { Event } from "@/lib/events"
import { trackEvent } from "@/lib/events"
import type { CopyState } from "@/hooks/use-copy-to-clipboard"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { Button } from "@/components/ui/button"

export type CopyStateIconProps = {
  state: CopyState
  idleIcon?: React.ReactNode
  doneIcon?: React.ReactNode
  errorIcon?: React.ReactNode
}

export function CopyStateIcon({
  state,
  idleIcon,
  doneIcon,
  errorIcon,
}: CopyStateIconProps) {
  return (
    <span className="relative flex items-center justify-center size-4">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={state}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.15 }}
          className="flex items-center justify-center size-full"
        >
          {state === "idle" && (idleIcon ?? <Copy className="size-full" />)}
          {state === "done" && (doneIcon ?? <Check className="size-full text-emerald-500" />)}
          {state === "error" && (errorIcon ?? <X className="size-full text-destructive" />)}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export type CopyButtonProps = ComponentProps<typeof Button> & {
  text: string | (() => string)
  onCopySuccess?: (text: string) => void
  onCopyError?: (error: Error) => void
  event?: Event["name"]
} & Omit<CopyStateIconProps, "state">

export function CopyButton({
  size = "icon",
  children,
  text,
  idleIcon,
  doneIcon,
  errorIcon,
  onClick,
  onCopySuccess,
  onCopyError,
  event,
  ...props
}: CopyButtonProps) {
  const { state, copy } = useCopyToClipboard({
    onCopySuccess: (copiedValue) => {
      onCopySuccess?.(copiedValue)
      if (event) {
        trackEvent({
          name: event,
          properties: {
            code: copiedValue,
          },
        })
      }
    },
    onCopyError,
  })

  return (
    <Button
      size={size}
      onClick={(e) => {
        copy(text)
        onClick?.(e)
      }}
      aria-label="Copy"
      {...props}
    >
      <CopyStateIcon
        state={state}
        idleIcon={idleIcon}
        doneIcon={doneIcon}
        errorIcon={errorIcon}
      />
      {children}
    </Button>
  )
}
