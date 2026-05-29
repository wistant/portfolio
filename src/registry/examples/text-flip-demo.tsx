"use client"

import { useRef } from "react"
import { motion, useInView, usePageInView } from "motion/react"

import { TextFlip } from "@/registry/transformed/components/text-flip"

export default function TextFlipDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const isPageInView = usePageInView()
  const isInView = useInView(ref)
  const play = isPageInView && isInView

  return (
    <div ref={ref} className="text-2xl font-medium text-muted-foreground">
      <span>I am a </span>
      <TextFlip
        as={motion.span}
        className="min-w-32 text-foreground"
        play={play}
      >
        <span>Developer</span>
        <span>Designer</span>
        <span>Creator</span>
        <span>Builder</span>
      </TextFlip>
    </div>
  )
}
