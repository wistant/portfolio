import type { Project } from "@/types/projects"

export const PROJECTS: Project[] = [
  {
    id: "portfolio",
    title: "My personal portfolio",
    period: {
      start: "05.2026",
    },
    link: "https://wistant.me",
    github: "https://github.com/wistant/portfolio",
    skills: [
      "Open Source",
      "TypeScript",
      "Next.js 16",
      "Tailwind CSS v4",
      "shadcn/ui",
      "Vercel",
      "Radix UI",
      "Base UI",
      "Framer Motion",
    ],
    description:
      "My personal digital hub — a pixel-perfect portfolio, blog, and custom shadcn-compatible component registry. Built from scratch on Next.js 16 App Router with Tailwind CSS v4, it features atomic commit discipline, a full MDX content pipeline, and a self-hosted shadcn registry that lets visitors install components directly via the CLI.",
    logo: "https://github.com/wistant.png",
    projectImage:
      "https://raw.githubusercontent.com/wistant/datafiles/main/projects/portfolio/banner.png",
    backgroundImage:
      "bg-gradient-to-br from-neutral-800/20 via-neutral-900 to-emerald-950/20",
    status: "current",
    pinned: true,
    shortDescription:
      "Pixel-perfect portfolio, blog, and self-hosted shadcn component registry built with Next.js 16 and Tailwind CSS v4.",
    themeColor: "#10b981",
  },
  {
    id: "shoperzz",
    title: "Shoperzz — Open Source E-commerce Engine",
    period: {
      start: "05.2026",
    },
    link: "https://shoperzz.dev",
    github: "https://github.com/shoperzz/shoperzz",
    projectImage:
      "https://raw.githubusercontent.com/wistant/datafiles/main/blog/shoperzz-dark.png",
    skills: [
      "Open Source",
      "TypeScript",
      "NestJS",
      "GraphQL",
      "TypeORM",
      "React",
      "Turborepo",
      "pnpm",
      "GitHub Actions",
    ],
    description:
      "A headless, modular e-commerce engine built on NestJS and GraphQL, designed to eliminate architectural debt for TypeScript developers building serious commerce platforms. Shoperzz provides a battle-tested, extensible core — covering order state machines, payment gateways, and event-driven workflows — so teams can ship without rewriting from scratch six months later.",
    backgroundImage:
      "bg-gradient-to-br from-amber-950/30 via-slate-900 to-rose-950/20",
    status: "current",
    pinned: true,
    shortDescription:
      "Modular, headless e-commerce engine on NestJS + GraphQL, built to eliminate architectural debt at scale.",
    themeColor: "#f59e0b",
  },
  {
    id: "sunabase-landing",
    title: "Sunabase — Backend Platform Landing Page",
    period: {
      start: "05.2026",
      end: "05.2026",
    },
    link: "https://wistant-sunabase.vercel.app",
    github: "https://github.com/wistant/sunabase-landing",
    skills: [
      "Next.js",
      "TypeScript",
      "Framer Motion",
      "Tailwind CSS",
      "UI/UX",
      "Design System",
    ],
    description:
      "High-fidelity marketing landing page for Sunabase, a backend-as-a-service platform inspired by Supabase's architecture. Features cinematic scroll animations, glassmorphism components, and a premium dark design system communicating managed Postgres, Zero-Trust Identity, and Edge-Native Workflows.",
    projectImage: "/projects/sunabase/sunabase.png",
    backgroundImage:
      "bg-gradient-to-br from-indigo-900/40 via-slate-900 to-blue-900/40",
    status: "completed",
    shortDescription:
      "Cinematic marketing landing for a backend-as-a-service platform with glassmorphism and scroll animations.",
    themeColor: "#6366f1",
  },
  {
    id: "navi-landing",
    title: "Navi — Futuristic UI Landing Page",
    period: {
      start: "04.2026",
      end: "05.2026",
    },
    link: "https://wistant.vercel.app",
    github: "https://github.com/wistant/navi-landing",
    skills: [
      "Next.js",
      "TypeScript",
      "Three.js",
      "Framer Motion",
      "UI/UX",
      "Animation",
      "Design System",
    ],
    description:
      "A visionary, immersive landing page for Navi — a fictional next-gen interface system inspired by Ghost in the Shell's 'The Wired'. Built with Three.js for WebGL 3D scenes, orchestrated with Framer Motion for cinematic scroll sequences, and wrapped in a futuristic HUD-style design language.",
    projectImage: "/projects/navi-landing/th.png",
    backgroundImage:
      "bg-gradient-to-br from-fuchsia-950/30 via-slate-900 to-cyan-950/30",
    status: "completed",
    shortDescription:
      "Immersive Three.js + Framer Motion landing page with a futuristic HUD design aesthetic.",
    themeColor: "#06b6d4",
  },
  {
    id: "suburbia",
    title: "Suburbia — Custom Skateboard Experience",
    period: {
      start: "03.2026",
      end: "05.2026",
    },
    link: "https://suburbia-wistant.vercel.app/",
    github: "https://github.com/wistant/suburbia",
    skills: [
      "Next.js",
      "TypeScript",
      "Framer Motion",
      "Tailwind CSS",
      "UI/UX",
      "Design System",
      "E-commerce",
    ],
    description:
      "Interactive landing page and storefront for Suburbia, a premium custom skateboard brand. The standout feature is a real-time 3D board customizer where users mix and match decks, trucks, and wheels with live visual feedback. Wrapped in a rebellious, street-art-inspired design system with buttery smooth animations.",
    projectImage: "/projects/suburbia/th.webp",
    backgroundImage:
      "bg-gradient-to-br from-violet-950/30 via-slate-900 to-purple-950/30",
    status: "completed",
    shortDescription:
      "Interactive custom skateboard storefront featuring a real-time board configurator and street-art design.",
    themeColor: "#8b5cf6",
  },
  {
    id: "propellent-landing",
    title: "Propellent — SaaS Analytics Landing Page",
    period: {
      start: "03.2026",
      end: "05.2026",
    },
    link: "https://propellent.app",
    github: "https://github.com/wistant/propellent",
    skills: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Recharts",
      "UI/UX",
      "SaaS",
    ],
    description:
      "Full marketing site and product dashboard for Propellent, a data-driven SaaS analytics platform. Includes live Recharts data visualizations, a polished feature showcase, pricing tiers, and a seamless CTA funnel — all built with a clean, conversion-optimized design. Now fully open source.",
    projectImage: "/projects/propellent-landing/propellent.png",
    backgroundImage:
      "bg-gradient-to-br from-emerald-950/30 via-slate-900 to-teal-950/30",
    status: "completed",
    shortDescription:
      "SaaS analytics landing page and dashboard with live Recharts visualizations and conversion-optimized design.",
    themeColor: "#14b8a6",
  },
  {
    id: "interlock-landing",
    title: "Interlock — DeFi Platform Landing Page",
    period: {
      start: "01.2026",
      end: "05.2026",
    },
    link: "https://wistant-interlock.vercel.app",
    github: "https://github.com/wistant/interlock-landing",
    skills: [
      "Next.js",
      "TypeScript",
      "Framer",
      "Tailwind CSS",
      "UI/UX",
      "FinTech",
    ],
    description:
      "Premium landing page for Interlock, a decentralized finance platform. The design language communicates trust, security, and technical credibility through deep navy gradients, micro-encrypted typography effects, and a carefully composed feature hierarchy. Animated with Framer for fluid, confidence-inspiring transitions.",
    projectImage: "/projects/interlock-landing/th.png",
    backgroundImage:
      "bg-gradient-to-br from-blue-950/30 via-slate-900 to-indigo-950/30",
    status: "completed",
    shortDescription:
      "Premium DeFi platform landing page communicating trust and security through encrypted design motifs.",
    themeColor: "#3b82f6",
  },
  {
    id: "splyt-landing",
    title: "Splyt — Protein Drink Landing Page",
    period: {
      start: "03.2026",
      end: "05.2026",
    },
    link: "https://wistant-splyt.vercel.app",
    github: "https://github.com/wistant/splyt-landing",
    skills: [
      "Next.js",
      "TypeScript",
      "Framer Motion",
      "Tailwind CSS",
      "UI/UX",
      "Brand Storytelling",
    ],
    description:
      "Energetic marketing landing for Splyt, a protein + caffeine sports drink brand targeting gym culture and high-performance athletes. The design is bold and kinetic — vivid color bursts, product-forward hero sections, and scroll-triggered animations that communicate the brand's energy and intensity.",
    projectImage: "/projects/splyt-landing/th.webp",
    backgroundImage:
      "bg-gradient-to-br from-rose-950/30 via-slate-900 to-orange-950/20",
    status: "completed",
    shortDescription:
      "Bold, kinetic sports drink landing page with vivid color bursts and scroll-triggered animations.",
    themeColor: "#f43f5e",
  },
  {
    id: "pizza-landing",
    title: "Pizza — Food Delivery Landing Page",
    period: {
      start: "03.2026",
      end: "05.2026",
    },
    link: "https://wistant-pizza.vercel.app",
    github: "https://github.com/wistant/pizza-landing",
    skills: [
      "Next.js",
      "TypeScript",
      "Framer Motion",
      "Tailwind CSS",
      "UI/UX",
      "Food & Beverage",
    ],
    description:
      "Mouth-watering landing page for a pizza delivery brand, centered entirely on making food look irresistible. Features appetite-triggering hero photography, a clean menu showcase, an order-flow teaser, and warm amber + red brand tones — all crafted to drive online orders.",
    projectImage: "/projects/pizza-landing/th.webp",
    backgroundImage:
      "bg-gradient-to-br from-yellow-950/20 via-slate-900 to-red-950/30",
    status: "completed",
    shortDescription:
      "Appetite-triggering pizza delivery landing page with warm brand tones and order-flow design.",
    themeColor: "#ef4444",
  },
  {
    id: "theline",
    title: "The Line — Brutalist Animation Studio Clone",
    period: {
      start: "06.2026",
      end: "06.2026",
    },
    link: "https://theline-wistant.vercel.app",
    github: "https://github.com/wistant/theline.awwards",
    skills: [
      "Open Source",
      "TypeScript",
      "Next.js",
      "GSAP",
      "Tailwind CSS",
      "UI/UX",
      "Landing Page",
    ],
    description:
      "A pixel-perfect, media-first frontend clone of The Line Animation Studio's portfolio. Built to perfect UI/UX engineering skills on real-world production layouts, it features a custom viewfinder camera HUD (overscan boundaries, action-safe SVG guidelines, aspect crops) and dynamic on-demand lazy-loaded video previews orchestrated with GSAP timelines.",
    projectImage:
      "https://raw.githubusercontent.com/wistant/datafiles/main/projects/theline/header.png",
    backgroundImage:
      "bg-gradient-to-br from-zinc-950 via-neutral-900 to-amber-950/20",
    status: "completed",
    shortDescription:
      "A high-fidelity web clone of The Line Animation Studio's portfolio with custom camera HUD overlays and GSAP timelines.",
    themeColor: "#f59e0b",
  },
].sort((a, b) => {
  // 1. Pinned first
  if (a.pinned && !b.pinned) return -1
  if (!a.pinned && b.pinned) return 1

  // Helper to convert MM.YYYY to timestamp
  const parseDate = (p: { start: string; end?: string }) => {
    if (!p.end) {
      // Ongoing / present — sort above all completed
      return Infinity
    }
    const [month, year] = p.end.split(".")
    return new Date(parseInt(year), parseInt(month) - 1).getTime()
  }

  const dateA = parseDate(a.period)
  const dateB = parseDate(b.period)

  if (dateA !== dateB) {
    return dateB - dateA // Descending (newest first)
  }

  // Fallback to start date descending
  const parseStartDate = (start: string) => {
    const [month, year] = start.split(".")
    return new Date(parseInt(year), parseInt(month) - 1).getTime()
  }

  return parseStartDate(b.period.start) - parseStartDate(a.period.start)
})
