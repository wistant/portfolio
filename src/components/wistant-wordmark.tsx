import type * as React from "react"

export function WistantWordmark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 2048 256"
      {...props}
    >
      <text
        x="0"
        y="192"
        fill="currentColor"
        style={{
          fontFamily: "var(--font-geist-pixel), monospace",
          fontWeight: 700,
          fontSize: "180px",
          letterSpacing: "0.02em",
          textTransform: "lowercase",
        }}
      >
        wistant
      </text>
    </svg>
  )
}

export function getWordmarkSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 2048 256"><text x="0" y="192" fill="currentColor" style="font-family: var(--font-geist-pixel), monospace; font-weight: 700; font-size: 180px; letter-spacing: 0.02em; text-transform: lowercase;">wistant</text></svg>`
}
