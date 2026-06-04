"use client"

import Image from "next/image"
import Zoom from "react-medium-image-zoom"
import "react-medium-image-zoom/dist/styles.css"
import { Skiper } from "./skiper"

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

  return (
    <div className="py-4">
      <Skiper gap={24}>
        {images.map((src, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-2xl border border-line bg-muted/30 aspect-[4/3] w-full"
          >
            <Zoom
              zoomMargin={24}
            >
              <div className="relative size-full cursor-zoom-in">
                <Image
                  src={src}
                  alt={`Gallery capture #${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 50vw"
                  priority={index < 2}
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
              </div>
            </Zoom>
          </div>
        ))}
      </Skiper>
    </div>
  )
}
