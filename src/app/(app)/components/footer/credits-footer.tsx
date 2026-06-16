import { SOURCE_CODE_GITHUB_URL } from "@/config/site"

export default function FooterCredits() {
  return (
    <div className="mb-6 flex flex-col items-center justify-center gap-2 px-4 text-center font-mono text-[11px] text-muted-foreground/60 select-none">
      <p className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1">
        <span>Built with care by</span>
        <a
          href="https://x.com/iamwistant"
          target="_blank"
          rel="noopener"
          className="font-medium text-foreground underline decoration-border/60 underline-offset-2 transition-colors hover:decoration-foreground"
        >
          Wistant 🥑👨‍💻
        </a>
        <span>&bull;</span>
        <span>Source available on</span>
        <a
          href={SOURCE_CODE_GITHUB_URL}
          target="_blank"
          rel="noopener"
          className="font-medium text-foreground underline decoration-border/60 underline-offset-2 transition-colors hover:decoration-foreground"
        >
          GitHub
        </a>
      </p>
      <p>
        Inspired by{" "}
        <a
          href="https://chanhdai.com"
          target="_blank"
          rel="noopener"
          className="underline decoration-border/60 underline-offset-2 transition-colors hover:decoration-foreground"
        >
          chanhdai.com
        </a>
        {", "}
        <a
          href="https://nextjs.org"
          target="_blank"
          rel="noopener"
          className="underline decoration-border/60 underline-offset-2 transition-colors hover:decoration-foreground"
        >
          nextjs.org
        </a>
        {" & "}
        <a
          href="https://www.ashutoshtiwari.me/"
          target="_blank"
          rel="noopener"
          className="underline decoration-border/60 underline-offset-2 transition-colors hover:decoration-foreground"
        >
          ashutoshtiwari.me
        </a>
      </p>
    </div>
  )
}
