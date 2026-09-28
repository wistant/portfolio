"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { SOCIAL_LINKS } from "@/data/portfolio/social-links"
import { USER } from "@/data/portfolio/user"
import { addQueryParams } from "@/utils/url"
import { MailIcon } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { UTM_PARAMS } from "@/config/site"

const GREETINGS = [
  "Hello,",
  "Bonjour,",
  "Hola,",
  "Ciao,",
  "Konnichiwa,",
  "Olá,",
  "Mwaye,",
  "Hallo,",
]

const ROLES = [
  "Software Architect",
  "Product Engineer",
  "Full-Stack Developer",
  "System Architect",
  "Open Source Builder",
  "DevOps & Infrastructure",
]

export type HeroPhotoSize = "sm" | "md" | "lg" | "xl" | number

const SIZE_CLASSES: Record<"sm" | "md" | "lg" | "xl", string> = {
  sm: "w-[200px] sm:w-[220px] md:w-[230px]",
  md: "w-[220px] sm:w-[245px] md:w-[260px]",
  lg: "w-[250px] sm:w-[275px] md:w-[295px]",
  xl: "w-[280px] sm:w-[310px] md:w-[335px]",
}

function calculateAge(birthDateString: string = "2006-09-11"): number {
  const today = new Date()
  const birth = new Date(birthDateString)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  return age
}

function Polaroid({
  src,
  size = "md",
  onNext,
}: {
  src: string
  size?: HeroPhotoSize
  onNext: () => void
}) {
  const filename = src.split("/").pop() ?? "me_01.jpeg"

  const sizeClass =
    typeof size === "string" ? (SIZE_CLASSES[size] ?? SIZE_CLASSES.md) : ""
  const sizeStyle =
    typeof size === "number" ? { width: `min(100%, ${size}px)` } : undefined

  return (
    <motion.div
      initial={{ opacity: 0, rotate: -2, y: 20 }}
      animate={{ opacity: 1, rotate: -2, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        rotate: 0,
        y: -6,
        scale: 1.02,
        transition: { type: "spring", stiffness: 260, damping: 20 },
      }}
      onClick={onNext}
      title="Click to cycle photo"
      style={sizeStyle}
      className={`group relative shrink-0 cursor-pointer rounded-xs bg-white p-3 pb-8 shadow-[0_16px_36px_rgba(0,0,0,0.14)] ring-1 ring-black/5 select-none sm:p-3.5 sm:pb-9 dark:bg-neutral-100 dark:shadow-[0_20px_45px_rgba(0,0,0,0.4)] dark:ring-white/10 ${sizeClass}`}
    >
      {/* Photo frame */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xs bg-neutral-200">
        <AnimatePresence mode="wait">
          <motion.div
            key={src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative size-full"
          >
            <Image
              src={src}
              alt={USER.displayName}
              fill
              sizes="(max-width: 768px) 250px, 300px"
              className="object-cover brightness-[0.98] contrast-[1.05] grayscale transition-transform duration-700 ease-out group-hover:scale-105"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Caption styled with Pacifico cursive font */}
      <div className="mt-3 flex items-center justify-center">
        <p className="font-[family-name:var(--font-pacifico)] text-sm tracking-wide text-neutral-700 select-none sm:text-base">
          {filename}
        </p>
      </div>
    </motion.div>
  )
}

export function ProfileHero({
  photos,
  initialIndex = 0,
  photoSize = "md",
}: {
  photos: string[]
  initialIndex?: number
  photoSize?: HeroPhotoSize
}) {
  const [greetingIdx, setGreetingIdx] = useState(0)
  const [roleIdx, setRoleIdx] = useState(0)
  const [photoIdx, setPhotoIdx] = useState(initialIndex)

  const age = useMemo(() => calculateAge(USER.birthDate), [])
  const activePhoto = photos[photoIdx] ?? photos[0] ?? "/gallery/1.jpg"

  const handleNextPhoto = () => {
    if (photos.length > 1) {
      setPhotoIdx((prev) => (prev + 1) % photos.length)
    }
  }

  useEffect(() => {
    const greetingTimer = setInterval(() => {
      setGreetingIdx((prev) => (prev + 1) % GREETINGS.length)
    }, 2800)

    const roleTimer = setInterval(() => {
      setRoleIdx((prev) => (prev + 1) % ROLES.length)
    }, 2500)

    return () => {
      clearInterval(greetingTimer)
      clearInterval(roleTimer)
    }
  }, [])

  return (
    <section className="flex flex-col items-center gap-8 px-4 pt-8 pb-4 md:flex-row md:items-center md:justify-between md:gap-8 md:pt-12 lg:gap-10">
      {/* Polaroid with configurable size */}
      <div className="flex shrink-0 justify-center">
        <Polaroid src={activePhoto} size={photoSize} onNext={handleNextPhoto} />
      </div>

      {/* Text content on right on desktop, centered on mobile */}
      <div className="flex min-w-0 flex-1 flex-col items-center gap-3.5 text-center md:items-start md:text-left">
        {/* Animated Greeting */}
        <div className="relative flex h-14 items-center overflow-hidden sm:h-16">
          <AnimatePresence mode="wait">
            <motion.span
              key={GREETINGS[greetingIdx]}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="py-1 font-serif text-4xl leading-none tracking-tight text-muted-foreground/60 italic select-none sm:text-5xl"
            >
              {GREETINGS[greetingIdx]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Name */}
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
          <span>I am {USER.displayName}</span>
          <motion.span
            whileHover={{ rotate: [0, 16, -10, 16, -6, 12, 0] }}
            transition={{ duration: 0.6 }}
            className="inline-block cursor-grab text-2xl select-none sm:text-3xl"
            role="img"
            aria-label="waving hand"
          >
            👋
          </motion.span>
        </h1>

        {/* Age & Rotating Role Ticker */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-medium text-muted-foreground sm:text-base md:justify-start">
          <span className="font-semibold text-foreground/90">
            {age} years old
          </span>
          <span className="opacity-30">/</span>
          <span className="text-muted-foreground/70">Role:</span>
          <div className="relative flex h-6 items-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={ROLES[roleIdx]}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="font-semibold text-foreground"
              >
                {ROLES[roleIdx]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Bio - larger, comfortable and legible */}
        <p className="text-base leading-relaxed text-muted-foreground/90 sm:text-lg">
          {USER.bio}
        </p>

        {/* Action + Social Links strictly on a single line */}
        <div className="flex max-w-full flex-nowrap items-center gap-1.5 overflow-x-auto pt-1.5">
          <motion.a
            href="mailto:d2lzdGFudGtvZGVAcHJvdG9ubWFpbC5jb20="
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex h-7.5 shrink-0 items-center gap-1 rounded-full bg-foreground px-3 text-xs font-medium text-background shadow-xs transition-opacity hover:opacity-90"
          >
            <MailIcon className="size-3" />
            <span>Say hi</span>
            <span className="text-[10px]">👋</span>
          </motion.a>

          <div className="mx-0.5 h-4 w-px shrink-0 bg-line" />

          {SOCIAL_LINKS.map((link) => (
            <motion.a
              key={link.id ?? link.title}
              href={addQueryParams(link.href, UTM_PARAMS)}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -1.5 }}
              whileTap={{ scale: 0.95 }}
              title={link.title}
              className="flex size-7.5 shrink-0 items-center justify-center rounded-full border border-line bg-background text-muted-foreground shadow-xs transition-colors hover:border-foreground/40 hover:bg-muted/50 hover:text-foreground"
            >
              <img
                src={link.icon}
                alt={link.title}
                width={13}
                height={13}
                className="size-3.5 shrink-0 object-contain dark:invert"
              />
              <span className="sr-only">{link.title}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
