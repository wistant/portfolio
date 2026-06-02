import { cn } from "@/lib/utils"

export type AvatarLightsVariants = {
  lightOff: string
  lightOn: string
  darkOff: string
  darkOn: string
}

export function AvatarLights({
  className,
  variants,
  shape = "circle",
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  variants: AvatarLightsVariants
  shape?: "circle" | "square"
}) {
  const roundedClass =
    shape === "square" ? "rounded-2xl sm:rounded-[18%]" : "rounded-full"

  return (
    <div
      className={cn(
        "pointer-events-none relative size-30 min-[24rem]:size-32 sm:size-40",
        roundedClass,
        className
      )}
      {...props}
    >
      <div className="absolute inset-0">
        <AvatarImage
          src={variants.lightOff}
          alt="Avatar with lights off in light mode"
          fetchPriority="high"
          shape={shape}
        />
      </div>

      <AvatarLayer className="in-[.light[data-avatar-lights=on]]:opacity-100">
        <AvatarImage
          src={variants.lightOn}
          alt="Avatar with lights on in light mode"
          fetchPriority="high"
          shape={shape}
        />
      </AvatarLayer>

      <AvatarLayer className="in-[.dark[data-avatar-lights=off]]:opacity-100">
        <AvatarImage
          src={variants.darkOff}
          alt="Avatar with lights off in dark mode"
          fetchPriority="high"
          shape={shape}
        />
      </AvatarLayer>

      <AvatarLayer className="in-[.dark[data-avatar-lights=on]]:opacity-100">
        <AvatarImage
          src={variants.darkOn}
          alt="Avatar with lights on in dark mode"
          fetchPriority="high"
          shape={shape}
        />
      </AvatarLayer>

      <div
        className={cn(
          "pointer-events-none absolute inset-0 inset-ring-1 inset-ring-foreground/10",
          roundedClass
        )}
        aria-hidden
      />
    </div>
  )
}

function AvatarLayer({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "absolute inset-0 opacity-0 transition-opacity! duration-1200 ease-[cubic-bezier(0.42,0,0.58,1)]",
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({
  className,
  src,
  alt,
  shape = "circle",
  ...props
}: React.ComponentProps<"img"> & { shape?: "circle" | "square" }) {
  const roundedClass =
    shape === "square" ? "rounded-2xl sm:rounded-[18%]" : "rounded-full"
  return (
    <img
      className={cn(
        "size-full object-cover select-none",
        roundedClass,
        className
      )}
      src={src}
      alt={alt}
      {...props}
    />
  )
}
