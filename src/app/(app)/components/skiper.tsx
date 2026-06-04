"use client"

import React, { useRef, useState, useEffect, useCallback } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface SkiperProps {
  children: React.ReactNode[]
  className?: string
  gap?: number
}

export function Skiper({ children, className, gap = 16 }: SkiperProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const currentTranslate = useRef(0)
  const prevTranslate = useRef(0)

  // Register GSAP plugins & handle scope safety
  const { contextSafe } = useGSAP({ scope: containerRef })

  const getSlideWidth = useCallback(() => {
    if (!trackRef.current) return 0
    const slide = trackRef.current.children[0] as HTMLElement
    return slide ? slide.offsetWidth + gap : 0
  }, [gap])

  const slideTo = useCallback((index: number) => {
    if (!trackRef.current || children.length === 0) return
    const targetIndex = Math.max(0, Math.min(children.length - 1, index))
    setCurrentIndex(targetIndex)

    const slideWidth = getSlideWidth()
    const targetTranslate = -targetIndex * slideWidth

    contextSafe(() => {
      gsap.to(trackRef.current, {
        x: targetTranslate,
        duration: 0.6,
        ease: "power3.out",
        onComplete: () => {
          currentTranslate.current = targetTranslate
          prevTranslate.current = targetTranslate
        }
      })
    })()
  }, [contextSafe, children.length, getSlideWidth])

  const next = useCallback(() => slideTo(currentIndex + 1), [currentIndex, slideTo])
  const prev = useCallback(() => slideTo(currentIndex - 1), [currentIndex, slideTo])

  const handleDragStart = (x: number) => {
    isDragging.current = true
    startX.current = x
    if (trackRef.current) {
      gsap.killTweensOf(trackRef.current)
    }
  }

  const handleDragMove = (x: number) => {
    if (!isDragging.current) return
    const diff = x - startX.current
    const tempTranslate = prevTranslate.current + diff

    // Resistance on bounds
    const maxTranslate = 0
    const minTranslate = -((children.length - 1) * getSlideWidth())
    
    let finalTranslate = tempTranslate
    if (tempTranslate > maxTranslate) {
      finalTranslate = maxTranslate + (tempTranslate - maxTranslate) * 0.25
    } else if (tempTranslate < minTranslate) {
      finalTranslate = minTranslate + (tempTranslate - minTranslate) * 0.25
    }

    currentTranslate.current = finalTranslate
    if (trackRef.current) {
      gsap.set(trackRef.current, { x: finalTranslate })
    }
  }

  const handleDragEnd = () => {
    if (!isDragging.current) return
    isDragging.current = false

    const movedBy = currentTranslate.current - prevTranslate.current
    const slideWidth = getSlideWidth()

    let targetIndex = currentIndex
    if (Math.abs(movedBy) > slideWidth * 0.15) {
      if (movedBy < 0) {
        targetIndex = currentIndex + 1
      } else {
        targetIndex = currentIndex - 1
      }
    }

    slideTo(targetIndex)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [prev, next])

  return (
    <div className={cn("relative w-full overflow-hidden select-none", className)} ref={containerRef}>
      {/* Slides Track */}
      <div
        ref={trackRef}
        className="flex cursor-grab active:cursor-grabbing will-change-transform"
        style={{ gap: `${gap}px` }}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        {children.map((child, index) => (
          <div key={index} className="shrink-0 w-full md:w-[calc(100%-48px)] lg:w-[calc(50%-8px)]">
            {child}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-6 flex items-center justify-between">
        {/* Indicators */}
        <div className="flex gap-1.5">
          {children.map((_, index) => (
            <button
              key={index}
              className={cn(
                "size-2.5 rounded-full bg-muted-foreground/30 transition-all duration-300",
                index === currentIndex && "w-6 bg-foreground"
              )}
              onClick={() => slideTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className="flex size-9 items-center justify-center rounded-full border border-line bg-background text-foreground transition-colors hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous slide"
          >
            <ArrowLeft className="size-4.5" />
          </button>
          <button
            onClick={next}
            disabled={currentIndex === children.length - 1}
            className="flex size-9 items-center justify-center rounded-full border border-line bg-background text-foreground transition-colors hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next slide"
          >
            <ArrowRight className="size-4.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
