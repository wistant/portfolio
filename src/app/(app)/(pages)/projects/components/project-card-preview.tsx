"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { Pin, Star } from "lucide-react"
import { motion } from "motion/react"

import { formatStars } from "@/lib/github"
import { Icons } from "@/components/icons"

const BACKGROUNDS = [
  "/backgrounds/image1.webp",
  "/backgrounds/image2.webp",
  "/backgrounds/image3.webp",
  "/backgrounds/image4.webp",
  "/backgrounds/image5.webp",
  "/backgrounds/image6.webp",
  "/backgrounds/image7.webp",
  "/backgrounds/image8.webp",
]

interface ProjectCardPreviewProps {
  title: string
  projectImage?: string
  backgroundImage?: string
  pinned?: boolean
  cardHover: boolean
  themeColor?: string
  projectId: string
  logo?: string
  stars?: number | null
  backgrounds?: string[]
}

// Convert RGB to HSL, boost saturation for vividness, and convert back to RGB
function boostColor(
  r: number,
  g: number,
  b: number
): { r: number; g: number; b: number } {
  const rNorm = r / 255
  const gNorm = g / 255
  const bNorm = b / 255
  const max = Math.max(rNorm, gNorm, bNorm)
  const min = Math.min(rNorm, gNorm, bNorm)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case rNorm:
        h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)
        break
      case gNorm:
        h = (bNorm - rNorm) / d + 2
        break
      case bNorm:
        h = (rNorm - gNorm) / d + 4
        break
    }
    h /= 6
  }

  // Boost saturation to at least 75% to make the colors vibrant
  const targetS = Math.max(s, 0.75)
  // Keep the lightness in a premium glowing range
  const targetL = Math.max(0.45, Math.min(l, 0.58))

  const hue2rgb = (p: number, q: number, t: number) => {
    let tAdjusted = t
    if (tAdjusted < 0) tAdjusted += 1
    if (tAdjusted > 1) tAdjusted -= 1
    if (tAdjusted < 1 / 6) return p + (q - p) * 6 * tAdjusted
    if (tAdjusted < 1 / 2) return q
    if (tAdjusted < 2 / 3) return p + (q - p) * (2 / 3 - tAdjusted) * 6
    return p
  }

  let finalR, finalG, finalB
  if (targetS === 0) {
    finalR = finalG = finalB = Math.round(targetL * 255)
  } else {
    const q =
      targetL < 0.5
        ? targetL * (1 + targetS)
        : targetL + targetS - targetL * targetS
    const p = 2 * targetL - q
    finalR = Math.round(hue2rgb(p, q, h + 1 / 3) * 255)
    finalG = Math.round(hue2rgb(p, q, h) * 255)
    finalB = Math.round(hue2rgb(p, q, h - 1 / 3) * 255)
  }

  return { r: finalR, g: finalG, b: finalB }
}

// Client-side extraction of the dominant color with saturation boosting
function extractDominantColor(img: HTMLImageElement): string | null {
  try {
    const canvas = document.createElement("canvas")
    canvas.width = 8
    canvas.height = 8
    const ctx = canvas.getContext("2d")
    if (!ctx) return null

    ctx.drawImage(img, 0, 0, 8, 8)
    const imgData = ctx.getImageData(0, 0, 8, 8).data

    let maxSaturation = -1
    let bestColor = null

    for (let i = 0; i < imgData.length; i += 4) {
      const r = imgData[i]
      const g = imgData[i + 1]
      const b = imgData[i + 2]
      const a = imgData[i + 3]
      if (a < 200) continue // Skip transparent

      const max = Math.max(r / 255, g / 255, b / 255)
      const min = Math.min(r / 255, g / 255, b / 255)
      const chroma = max - min
      const saturation = max === 0 ? 0 : chroma / max
      const brightness = max

      // Skip gray, black, or washed-out white
      if (brightness < 0.15 || brightness > 0.95 || saturation < 0.2) {
        continue
      }

      if (saturation > maxSaturation) {
        maxSaturation = saturation
        bestColor = { r, g, b }
      }
    }

    if (bestColor) {
      const boosted = boostColor(bestColor.r, bestColor.g, bestColor.b)
      return `rgb(${boosted.r}, ${boosted.g}, ${boosted.b})`
    }

    // Fallback to average color with boosting
    canvas.width = 1
    canvas.height = 1
    ctx.drawImage(img, 0, 0, 1, 1)
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
    const boostedFallback = boostColor(r, g, b)
    return `rgb(${boostedFallback.r}, ${boostedFallback.g}, ${boostedFallback.b})`
  } catch {
    return null
  }
}

// Parse RGB/Hex color and append opacity
function parseColorToRgba(color: string, opacity: number): string {
  if (color.startsWith("rgb")) {
    return color.replace("rgb", "rgba").replace(")", `, ${opacity})`)
  }
  if (color.startsWith("#")) {
    const r = parseInt(color.slice(1, 3), 16)
    const g = parseInt(color.slice(3, 5), 16)
    const b = parseInt(color.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }
  return color
}

// Generate distinct gradient styles based on the project ID hash
function getBackgroundStyle(
  color: string,
  id: string,
  hover: boolean
): React.CSSProperties {
  const alphaBase = hover ? 0.32 : 0.2
  const alphaGlow = hover ? 0.4 : 0.24

  const cBase = parseColorToRgba(color, alphaBase)
  const cGlow = parseColorToRgba(color, alphaGlow)

  // Simple string hash
  const hash = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const patternType = hash % 4

  switch (patternType) {
    case 0:
      // Type 0: Diagonal mesh gradient
      return {
        background: `linear-gradient(135deg, ${cBase} 0%, transparent 60%, ${cGlow} 100%)`,
      }
    case 1:
      // Type 1: Soft central radial glow with mild saturation boost on hover
      return {
        background: `radial-gradient(circle at 50% 30%, ${cGlow} 0%, transparent 70%)`,
        filter: hover ? "saturate(1.2) contrast(1.05)" : undefined,
      }
    case 2:
      // Type 2: Dual split glow (warm left top, cool right bottom)
      return {
        background: `radial-gradient(circle at 15% 20%, ${cBase} 0%, transparent 60%), radial-gradient(circle at 85% 80%, ${cGlow} 0%, transparent 60%)`,
      }
    case 3:
    default:
      // Type 3: Sweeping corner radial sweep
      return {
        background: `radial-gradient(circle at 80% 20%, ${cGlow} 0%, transparent 65%)`,
      }
  }
}

export function ProjectCardPreview({
  title,
  projectImage,
  backgroundImage,
  pinned,
  cardHover,
  themeColor,
  projectId,
  logo,
  stars,
  backgrounds,
}: ProjectCardPreviewProps) {
  const [extractedColor, setExtractedColor] = useState<string | null>(null)

  const selectedBg = useMemo(() => {
    const list = backgrounds && backgrounds.length > 0 ? backgrounds : BACKGROUNDS
    const hash = projectId
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return list[hash % list.length]
  }, [projectId, backgrounds])

  const cardVariants = {
    initial: { y: 2 },
    hover: { y: 10 },
  }

  const defaultBg =
    "bg-gradient-to-br from-indigo-955/20 via-slate-900 to-slate-950"
  const bg = backgroundImage || defaultBg
  const isCssGradient = bg.startsWith("bg-") || bg.startsWith("from-")

  // Use manual theme color if provided, otherwise the automatically extracted color
  let activeColor = themeColor || extractedColor

  // Boost manual themeColor as well if it's hex or rgb
  if (themeColor) {
    try {
      if (themeColor.startsWith("#") && themeColor.length === 7) {
        const r = parseInt(themeColor.slice(1, 3), 16)
        const g = parseInt(themeColor.slice(3, 5), 16)
        const b = parseInt(themeColor.slice(5, 7), 16)
        const boosted = boostColor(r, g, b)
        activeColor = `rgb(${boosted.r}, ${boosted.g}, ${boosted.b})`
      }
    } catch {
      // Keep original on error
    }
  }

  const borderStyle =
    cardHover && activeColor
      ? { borderColor: parseColorToRgba(activeColor, 0.45) }
      : undefined

  const dynamicBackground = activeColor
    ? getBackgroundStyle(activeColor, projectId, cardHover)
    : undefined

  return (
    <div
      style={borderStyle}
      className="relative aspect-video w-full rounded-none border border-line/80 bg-muted/15 p-1 transition-colors duration-300 group-hover:border-line"
    >
      <div className="relative flex h-full w-full items-end justify-center overflow-hidden rounded-none border border-line bg-muted">
        {/* Stars badge — top left */}
        {stars != null && stars > 0 && (
          <div className="absolute top-1.5 left-1.5 z-20 flex items-center gap-1 rounded-full border border-line bg-background/90 px-1.5 py-0.5 shadow-xs select-none">
            <Icons.github className="size-2.5 text-muted-foreground" />
            <span className="flex items-center gap-0.5">
              <Star className="size-2.5 fill-amber-400 text-amber-400" />
              <span className="text-[9px] leading-none font-semibold text-amber-400">
                {formatStars(stars)}
              </span>
            </span>
          </div>
        )}

        {/* Pin icon — top right */}
        {pinned && (
          <div className="absolute top-1.5 right-1.5 z-20 rounded-full border border-line bg-background/90 p-1 text-muted-foreground/85 shadow-xs select-none">
            <Pin className="size-3 rotate-45 fill-muted-foreground/15" />
          </div>
        )}

        {/* Background Image from public/backgrounds */}
        <div className="absolute inset-0 h-full w-full opacity-65 transition-opacity duration-300 group-hover:opacity-85">
          <Image
            src={selectedBg}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Foreground Project Mockup Image or Logo fallback */}
        {projectImage ? (
          <motion.div
            variants={cardVariants}
            initial="initial"
            animate={cardHover ? "hover" : "initial"}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className="relative h-32.5 w-67.5 overflow-hidden rounded-t-lg border border-b-0 border-line bg-background px-1 pt-1 shadow-2xl"
          >
            <Image
              src={projectImage}
              alt={title}
              width={270}
              height={130}
              className="h-full w-full rounded-t-md object-cover object-top"
              unoptimized
              onLoad={(e) => {
                const color = extractDominantColor(e.currentTarget)
                if (color) {
                  setExtractedColor(color)
                }
              }}
            />
          </motion.div>
        ) : logo ? (
          <motion.div
            variants={cardVariants}
            initial="initial"
            animate={cardHover ? "hover" : "initial"}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className="relative flex h-32.5 w-67.5 items-center justify-center rounded-t-lg border border-b-0 border-line bg-background p-4 shadow-2xl"
          >
            <img
              src={logo}
              alt={`${title} logo`}
              className="h-16 w-auto max-w-[60%] object-contain"
              onLoad={(e) => {
                const color = extractDominantColor(e.currentTarget)
                if (color) {
                  setExtractedColor(color)
                }
              }}
            />
          </motion.div>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <span className="font-mono text-[9px] text-muted-foreground">
              NO PREVIEW
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
