"use client"

interface ProjectCardHeaderProps {
  title: string
  status?: string
}

export function ProjectCardHeader({ title, status }: ProjectCardHeaderProps) {
  // Status Color Mapping
  const getStatusColor = (status: string | undefined) => {
    if (!status)
      return {
        dot: "bg-zinc-400 dark:bg-zinc-600",
        text: "text-muted-foreground",
      }
    switch (status.toLowerCase()) {
      case "ongoing":
      case "current":
      case "live":
        return {
          dot: "bg-emerald-500 animate-pulse",
          text: "text-emerald-500 font-semibold",
        }
      case "building":
        return {
          dot: "bg-amber-500 animate-pulse",
          text: "text-amber-500 font-semibold",
        }
      case "completed":
        return { dot: "bg-blue-500", text: "text-blue-500 font-semibold" }
      default:
        return {
          dot: "bg-zinc-400 dark:bg-zinc-600",
          text: "text-muted-foreground",
        }
    }
  }

  const statusColors = getStatusColor(status)

  return (
    <div className="mt-3 flex items-center justify-between px-1">
      <h3 className="text-sm leading-snug font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
        {title}
      </h3>
      {status && (
        <div
          className={`flex items-center gap-1.5 text-[10px] font-semibold tracking-wider uppercase select-none ${statusColors.text}`}
        >
          <span className={`size-1.5 rounded-full ${statusColors.dot}`} />
          <span>{status}</span>
        </div>
      )}
    </div>
  )
}
