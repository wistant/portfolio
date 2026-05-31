import type * as React from "react"

export function WistantMark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 512 256"
      aria-hidden
      {...props}
    >
      <path
        fill="currentColor"
        d="M0 0h64v192H0zm64 192h64v64H64zm64-128h64v128h-64zm64 128h64v64h-64zm64-192h64v192h-64zm64 0h64v256h-64zm64 64h64v128h-64zm64-64h64v64h-64zm0 192h64v64h-64z"
      />
    </svg>
  )
}

export function getMarkSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 512 256"><path fill="currentColor" d="M0 0h64v192H0zm64 192h64v64H64zm64-128h64v128h-64zm64 128h64v64h-64zm64-192h64v192h-64zm64 0h64v256h-64zm64 64h64v128h-64zm64-64h64v64h-64zm0 192h64v64h-64z"/></svg>`
}
