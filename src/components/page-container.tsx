import { cn } from "@/lib/utils"

export function PageContainer({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      data-slot="page-container"
      className={cn(
        "mx-auto border-x border-line pt-12 md:max-w-3xl",
        className
      )}
    >
      {children}
    </div>
  )
}
