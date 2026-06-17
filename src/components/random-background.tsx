"use client"

import { useEffect, useState } from "react"

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

export function RandomBackground() {
  const [bg, setBg] = useState("")

  useEffect(() => {
    // Pick a random background image on client mount
    const randomIndex = Math.floor(Math.random() * BACKGROUNDS.length)
    setBg(BACKGROUNDS[randomIndex])
  }, [])

  if (!bg) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-50 h-full w-full opacity-[0.04] transition-opacity duration-1000 dark:opacity-[0.015]"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    />
  )
}
