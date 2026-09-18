"use client"

import React from "react"
import { motion, type HTMLMotionProps } from "motion/react"

interface FadeInProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  distance?: number
  className?: string
  once?: boolean
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.35,
  direction = "up",
  distance = 12,
  className,
  once = true,
  ...props
}: FadeInProps) {
  const getDirectionOffset = () => {
    switch (direction) {
      case "up":
        return { y: distance, x: 0 }
      case "down":
        return { y: -distance, x: 0 }
      case "left":
        return { x: distance, y: 0 }
      case "right":
        return { x: -distance, y: 0 }
      default:
        return { x: 0, y: 0 }
    }
  }

  const offset = getDirectionOffset()

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-20px" }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

interface StaggerGroupProps {
  children: React.ReactNode
  staggerDelay?: number
  delay?: number
  className?: string
  once?: boolean
  margin?: string
  as?: "div" | "ul" | "ol"
}

export function StaggerGroup({
  children,
  staggerDelay = 0.06,
  delay = 0,
  className,
  once = true,
  margin = "-30px",
  as = "div",
}: StaggerGroupProps) {
  const commonProps = {
    initial: "hidden" as const,
    whileInView: "visible" as const,
    viewport: { once, margin },
    variants: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: delay,
        },
      },
    },
    className,
  }

  if (as === "ul") {
    return <motion.ul {...commonProps}>{children}</motion.ul>
  }
  if (as === "ol") {
    return <motion.ol {...commonProps}>{children}</motion.ol>
  }
  return <motion.div {...commonProps}>{children}</motion.div>
}

interface StaggerItemProps {
  children: React.ReactNode
  distance?: number
  duration?: number
  className?: string
  as?: "div" | "li"
}

export function StaggerItem({
  children,
  distance = 14,
  duration = 0.35,
  className,
  as = "div",
}: StaggerItemProps) {
  const commonProps = {
    variants: {
      hidden: { opacity: 0, y: distance },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration,
          ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
        },
      },
    },
    className,
  }

  if (as === "li") {
    return <motion.li {...commonProps}>{children}</motion.li>
  }
  return <motion.div {...commonProps}>{children}</motion.div>
}
