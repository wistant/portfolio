"use client"

import { StickyCard002 } from "./skiper"

interface GalleryProps {
  images: string[]
}

export function Gallery({ images }: GalleryProps) {
  if (!images || images.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-line bg-muted/20 font-mono text-sm text-muted-foreground">
        No captures to display in gallery.
      </div>
    )
  }

  const cards = images.map((src, index) => ({
    id: index,
    image: src,
    alt: `Gallery capture #${index + 1}`,
  }))

  return (
    <div className="py-4">
      <StickyCard002 cards={cards} className="h-[75vh] w-full rounded-3xl overflow-hidden border border-line bg-muted/10" />
    </div>
  )
}
