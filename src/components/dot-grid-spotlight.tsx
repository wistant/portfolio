"use client"

import React, { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

export type DotGridSpotlightProps = {
  dotColor?: string
  activeDotColor?: string
  spacing?: number
  baseRadius?: number
  activeRadius?: number
  interactionRadius?: number
  activeMaxAlpha?: number
  activeMinAlpha?: number
  className?: string
}

export function DotGridSpotlight({
  dotColor = "rgba(255, 255, 255, 0.05)",
  activeDotColor = "rgba(255, 255, 255, 0.1)",
  spacing = 10,
  baseRadius = 1,
  activeRadius = 2,
  interactionRadius = 128,
  activeMaxAlpha = 1.0,
  activeMinAlpha = 0.5,
  className,
}: DotGridSpotlightProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -1000, y: -1000, isActive: false })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = 0
    let height = 0
    let renderFrameId: number | null = null

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      const offsetX = (width % spacing) / 2
      const offsetY = (height % spacing) / 2

      for (let x = offsetX; x <= width; x += spacing) {
        for (let y = offsetY; y <= height; y += spacing) {
          const dx = x - mouse.current.x
          const dy = y - mouse.current.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          let currentRadius = baseRadius
          let currentColor = dotColor
          let currentAlpha = 1.0

          if (mouse.current.isActive && distance < interactionRadius) {
            const factor = 1 - distance / interactionRadius
            currentRadius = baseRadius + (activeRadius - baseRadius) * factor
            currentColor = activeDotColor
            currentAlpha =
              activeMinAlpha + (activeMaxAlpha - activeMinAlpha) * factor
          }

          ctx.globalAlpha = currentAlpha
          ctx.beginPath()
          ctx.arc(x, y, currentRadius, 0, Math.PI * 2)
          ctx.fillStyle = currentColor
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1.0
    }

    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (!parent) return

      const dpr = window.devicePixelRatio || 1
      width = parent.clientWidth
      height = parent.clientHeight

      if (width === 0 || height === 0) return

      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)

      draw()

      requestAnimationFrame(() => {
        canvas.dataset.ready = "true"
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isActive: true,
      }

      if (renderFrameId === null) {
        renderFrameId = requestAnimationFrame(() => {
          draw()
          renderFrameId = null
        })
      }
    }

    const handleMouseLeave = () => {
      mouse.current.isActive = false
      if (renderFrameId === null) {
        renderFrameId = requestAnimationFrame(() => {
          draw()
          renderFrameId = null
        })
      }
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    const resizeObserver = new ResizeObserver(() => resizeCanvas())
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement)

    resizeCanvas()

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      resizeObserver.disconnect()
      if (renderFrameId !== null) cancelAnimationFrame(renderFrameId)
    }
  }, [
    spacing,
    baseRadius,
    activeRadius,
    interactionRadius,
    dotColor,
    activeDotColor,
    activeMaxAlpha,
    activeMinAlpha,
  ])

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isActive: true,
      }
    }
  }

  const handleMouseLeave = () => {
    mouse.current.isActive = false
  }

  return (
    <canvas
      ref={canvasRef}
      data-ready="false"
      className={cn(
        "pointer-events-auto absolute inset-0 block opacity-0 transition-opacity! duration-500 data-[ready=true]:opacity-100",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    />
  )
}
