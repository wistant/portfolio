"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "motion/react"

interface PhotoStackProps {
  images: [string, string, string]
}

const RESTING_ROTATIONS = [-7, 1, 6]

export function PhotoStack({ images }: PhotoStackProps) {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div className="flex items-end justify-center gap-2 px-4 py-6 sm:gap-3">
      {images.map((src, i) => {
        const isHovered = hovered === i
        const isOther = hovered !== null && hovered !== i

        return (
          <motion.div
            key={src}
            onHoverStart={() => setHovered(i)}
            onHoverEnd={() => setHovered(null)}
            animate={{
              rotate: isHovered ? 0 : RESTING_ROTATIONS[i],
              y: isHovered ? -12 : isOther ? 4 : 0,
              scale: isHovered ? 1.07 : isOther ? 0.95 : 1,
              filter: isOther
                ? "brightness(0.6) saturate(0.6)"
                : "brightness(1) saturate(1)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="relative cursor-pointer"
            style={{ zIndex: isHovered ? 10 : 0 }}
          >
            <motion.div
              animate={{
                boxShadow: isHovered
                  ? "0 20px 48px rgba(0,0,0,0.45)"
                  : "0 4px 16px rgba(0,0,0,0.16)",
              }}
              transition={{ duration: 0.22 }}
              // Middle card slightly bigger
              className={`relative overflow-hidden rounded-2xl ${
                i === 1
                  ? "h-52 w-36 sm:h-60 sm:w-44"
                  : "h-44 w-32 sm:h-52 sm:w-40"
              }`}
            >
              <Image
                src={src}
                alt={`Photo ${i + 1}`}
                fill
                sizes="(max-width: 640px) 128px, 176px"
                className="object-cover"
                priority={i === 1}
              />
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}
