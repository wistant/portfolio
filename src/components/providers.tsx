"use client"

import { ProgressProvider } from "@bprogress/next/app"
import { Provider as JotaiProvider } from "jotai"
import ReactLenis from "lenis/react"
import { ThemeProvider } from "next-themes"

import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider as RadixTooltipProvider } from "@/components/ui/tooltip"
import { TooltipProvider as BaseTooltipProvider } from "@/components/base/ui/tooltip"
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts"

if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const orig = console.error
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      (args[0].includes("Encountered a script tag") ||
        args[0].includes("Hydration failed") ||
        args[0].includes("hydration-mismatch") ||
        args[0].includes("error while hydrating"))
    ) {
      return
    }
    orig.apply(console, args)
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root>
      <JotaiProvider>
        <ThemeProvider
          enableSystem
          disableTransitionOnChange
          enableColorScheme
          storageKey="theme"
          defaultTheme="system"
          attribute="class"
        >
          <ProgressProvider
            color="var(--foreground)"
            height="2px"
            delay={500}
            options={{ showSpinner: false }}
          >
            <BaseTooltipProvider>
              <RadixTooltipProvider>{children}</RadixTooltipProvider>
            </BaseTooltipProvider>

            <KeyboardShortcuts />
          </ProgressProvider>

          <Toaster position="top-center" />
        </ThemeProvider>
      </JotaiProvider>
    </ReactLenis>
  )
}
