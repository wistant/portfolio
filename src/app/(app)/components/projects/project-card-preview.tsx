"use client"

import Image from "next/image"
import { Pin } from "lucide-react"
import { motion } from "motion/react"

interface ProjectCardPreviewProps {
  title: string
  projectImage?: string
  backgroundImage?: string
  topLabel: string
  pinned?: boolean
  cardHover: boolean
  themeColor?: string
}

export function ProjectCardPreview({
  title,
  projectImage,
  backgroundImage,
  topLabel,
  pinned,
  cardHover,
  themeColor,
}: ProjectCardPreviewProps) {
  const cardVariants = {
    initial: { y: 2 },
    hover: { y: 10 },
  }

  const defaultBg =
    "bg-gradient-to-br from-indigo-955/20 via-slate-900 to-slate-950"
  const bg = backgroundImage || defaultBg
  const isCssGradient = bg.startsWith("bg-") || bg.startsWith("from-")

  const borderStyle =
    cardHover && themeColor ? { borderColor: `${themeColor}40` } : undefined

  return (
    <div
      style={borderStyle}
      className="relative aspect-video w-full rounded-none border border-line/80 bg-muted/15 p-1 transition-colors duration-300 group-hover:border-line"
    >
      <div className="relative flex h-full w-full items-end justify-center overflow-hidden rounded-none border border-line bg-muted">
        {/* Top Label */}
        <span className="absolute top-1.5 left-4 z-20 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase transition-all duration-300 select-none group-hover:left-1/2 group-hover:-translate-x-1/2 group-hover:text-foreground">
          {topLabel}
        </span>

        {/* Pin Icon */}
        {pinned && (
          <div className="absolute top-1.5 right-1.5 z-20 rounded-full border border-line bg-background/90 p-1 text-muted-foreground/85 shadow-xs select-none">
            <Pin className="size-3 rotate-45 fill-muted-foreground/15" />
          </div>
        )}

        {/* Background Gradient/Pattern/Glow */}
        {themeColor ? (
          <motion.div
            style={{
              background: `radial-gradient(110% 110% at 50% 10%, ${themeColor}22 0%, transparent 70%)`,
            }}
            animate={{ opacity: cardHover ? 1.5 : 0.8 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 h-full w-full"
          />
        ) : isCssGradient ? (
          <div
            className={`absolute inset-0 h-full w-full opacity-80 transition-opacity duration-300 group-hover:opacity-100 ${bg}`}
          />
        ) : (
          <div className="absolute inset-0 h-full w-full opacity-80 transition-opacity duration-300 group-hover:opacity-100">
            <Image
              src={bg}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              unoptimized
            />
          </div>
        )}

        {/* Foreground Project Mockup Image */}
        <motion.div
          variants={cardVariants}
          initial="initial"
          animate={cardHover ? "hover" : "initial"}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          className="relative h-32.5 w-67.5 overflow-hidden rounded-t-lg border border-b-0 border-line bg-background px-1 pt-1 shadow-2xl"
        >
          {projectImage ? (
            <Image
              src={projectImage}
              alt={title}
              width={270}
              height={130}
              className="h-full w-full rounded-t-md object-cover object-top"
              unoptimized
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <span className="font-mono text-[9px] text-muted-foreground">
                NO PREVIEW
              </span>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
