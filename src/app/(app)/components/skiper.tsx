"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import ReactLenis from "lenis/react"

import { cn } from "@/lib/utils"

interface CardData {
  id: number | string
  image: string
  alt?: string
}

interface StickyCard002Props {
  cards: CardData[]
  className?: string
  containerClassName?: string
  imageClassName?: string
}

const StickyCard002 = ({
  cards,
  className,
  containerClassName,
  imageClassName,
}: StickyCard002Props) => {
  const container = useRef(null)
  const imageRefs = useRef<(HTMLImageElement | null)[]>([])

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)

      const imageElements = imageRefs.current
      const totalCards = imageElements.length

      if (!imageElements[0]) return

      gsap.set(imageElements[0], { y: "0%", scale: 1, rotation: 0 })

      for (let i = 1; i < totalCards; i++) {
        if (!imageElements[i]) continue
        gsap.set(imageElements[i], { y: "100%", scale: 1, rotation: 0 })
      }

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".sticky-cards",
          start: "top top",
          end: `+=${window.innerHeight * (totalCards - 1)}`,
          pin: true,
          scrub: 0.5,
          pinSpacing: true,
        },
      })

      for (let i = 0; i < totalCards - 1; i++) {
        const currentImage = imageElements[i]
        const nextImage = imageElements[i + 1]
        const position = i
        if (!currentImage || !nextImage) continue

        scrollTimeline.to(
          currentImage,
          {
            scale: 0.7,
            rotation: 5,
            duration: 1,
            ease: "none",
          },
          position
        )

        scrollTimeline.to(
          nextImage,
          {
            y: "0%",
            duration: 1,
            ease: "none",
          },
          position
        )
      }

      const resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh()
      })

      if (container.current) {
        resizeObserver.observe(container.current)
      }

      return () => {
        resizeObserver.disconnect()
        scrollTimeline.kill()
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
    },
    { scope: container }
  )

  return (
    <div className={cn("relative h-full w-full", className)} ref={container}>
      <div className="sticky-cards relative flex h-full w-full items-center justify-center overflow-hidden p-3 lg:p-8">
        <div
          className={cn(
            "relative h-[90%] w-full max-w-sm overflow-hidden rounded-lg sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl",
            containerClassName
          )}
        >
          {cards.map((card, i) => (
            <img
              key={card.id}
              src={card.image}
              alt={card.alt || ""}
              className={cn(
                "absolute h-full w-full rounded-4xl object-cover",
                imageClassName
              )}
              ref={(el) => {
                imageRefs.current[i] = el
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// Example usage component with default data
const Skiper17 = () => {
  const defaultCards = [
    {
      id: 1,
      image: "/images/lummi/img14.png",
    },
    {
      id: 2,
      image: "/images/lummi/img15.png",
    },
    {
      id: 3,
      image: "/images/lummi/img29.png",
    },
    {
      id: 4,
      image: "/images/lummi/img21.png",
    },
    {
      id: 5,
      image: "/images/lummi/img27.png",
    },
  ]

  return (
    <ReactLenis root>
      <div className="h-full w-full">
        <StickyCard002 cards={defaultCards} />
      </div>
    </ReactLenis>
  )
}

export { Skiper17, StickyCard002 }

/**
 * Skiper 17 StickyCard_002 — React + Gsap + scrollTrigger
 * We respect the original creators. This is an inspired rebuild with our own taste and does not claim any ownership.
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.in
 * Twitter: https://x.com/Gur__vi
 */
