import localFont from "next/font/local"
import { GeistMono } from "geist/font/mono"
import { GeistPixelSquare } from "geist/font/pixel"
import { GeistSans } from "geist/font/sans"

import { cn } from "@/lib/utils"

const fontSans = GeistSans
const fontMono = GeistMono

const fontSerif = localFont({
  src: "../assets/fonts/charter_regular.woff2",
  weight: "400",
  fallback: ["Georgia", "serif"],
  variable: "--font-serif",
})

// const fontPixel = localFont({
//   src: "../assets/fonts/DepartureMono-Regular.woff2",
//   weight: "400",
//   fallback: ["monospace"],
//   variable: "--font-pixel",
// })

const pixelatedMSSansSerif = localFont({
  src: [
    {
      path: "../assets/fonts/ms_sans_serif.woff2",
      weight: "400",
    },
    {
      path: "../assets/fonts/ms_sans_serif_bold.woff2",
      weight: "700",
    },
  ],
  fallback: ["Arial"],
  variable: "--font-98cn",
})

export const fontVariables = cn(
  fontSans.variable,
  fontMono.variable,
  fontSerif.variable,
  GeistPixelSquare.variable,
  pixelatedMSSansSerif.variable,
  "[--font-sans:var(--font-geist-sans)]",
  "[--font-mono:var(--font-geist-mono)]"
)
