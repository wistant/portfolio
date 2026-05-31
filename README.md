# Wistant Portfolio

![Wistant Portfolio Preview](./public/preview-light.png)

<p align="center">
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" /></a>
  <a href="https://mdxjs.com/"><img src="https://img.shields.io/badge/MDX-1B1F24?style=for-the-badge&logo=mdx&logoColor=yellow" alt="MDX" /></a>
  <a href="https://developer.mozilla.org/docs/Web/JavaScript"><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" /></a>
  <a href="https://ui.shadcn.com/"><img src="https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="shadcn/ui" /></a>
  <a href="https://nextjs.org/docs/app/api-reference/turbopack"><img src="https://img.shields.io/badge/Turbopack-EF2D5E?style=for-the-badge&logo=vercel&logoColor=white" alt="Turbopack" /></a>
</p>

---

## Overview

### Stack

| Layer     | Technology              |
| --------- | ----------------------- |
| Framework | Next.js 16 (App Router) |
| Styling   | Tailwind CSS v4         |
| UI        | shadcn/ui + Radix UI    |
| Content   | MDX (next-mdx-remote)   |
| Runtime   | React 19                |
| Package   | pnpm                    |
| Deploy    | Vercel                  |

### Features

- Clean, modern design with Light/Dark themes
- Component registry powered by the shadcn CLI
- Blog and documentation system via MDX
- SEO-optimized (JSON-LD schema, sitemap, robots.txt)
- AI-ready with [/llms.txt](https://llmstxt.org) support
- Analytics-ready (PostHog / OpenPanel)
- PWA-installable

---

## Project Structure

```
src/
├── app/            # App Router pages, layouts, API routes
├── components/     # Shared UI and domain components
│   ├── portfolio/  # Portfolio-specific sections
│   ├── blog/       # Blog-specific components
│   └── doc/        # Documentation components
├── content/        # MDX content (blog posts, component docs)
├── data/           # Static typed data (portfolio facts, projects...)
├── registry/       # shadcn component registry
├── config/         # Site & registry configuration
├── hooks/          # React hooks
├── lib/            # Core utilities and libraries
├── types/          # Shared TypeScript types
└── utils/          # Pure utility functions
```

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/wistant/portfolio.git
cd portfolio

# Install dependencies
pnpm install

# Start the dev server
pnpm dev
```

> Requires Node.js 22.x and pnpm >= 9.

### Environment Variables

Copy `.env.example` to `.env.local` and fill in the required values:

```bash
cp .env.example .env.local
```

---

## Development Commands

```bash
pnpm dev             # Start the dev server (Turbopack)
pnpm build           # Production build
pnpm lint            # ESLint
pnpm format:write    # Prettier
pnpm check-types     # TypeScript strict check
pnpm registry:build  # Build the shadcn registry
pnpm push            # Run the release orchestrator (tooling/push.sh)
pnpm sync            # Sync branch with GitHub (tooling/sync.sh)
```

---

## CI / CD

This project uses a strict atomic-commit and release pipeline:

| Workflow      | Trigger        | Purpose                               |
| ------------- | -------------- | ------------------------------------- |
| `ci.yml`      | Push / PR      | Lint, typecheck, build validation     |
| `release.yml` | Push to `main` | Changeset versioning + GitHub Release |

Locally, the `tooling/` directory contains:

- `push.sh` — Quality guard before pushing (format, lint, changeset intent)
- `sync.sh` — Rebase-based upstream synchronization
- `make-release-description.sh` — Generates structured release notes from git log

---

## Contributors

<a href="https://github.com/wistant/portfolio/graphs/contributors">
 <img src="https://contrib.rocks/image?repo=wistant/portfolio" alt="Contributors" />
</a>

## Stats

![Alt](https://repobeats.axiom.co/api/embed/09407dc7531d81f1a72a8afa1ee28a9586b0f0c0.svg "Repobeats analytics image")

---

## License

Licensed under the [MIT License](./LICENSE).

You are free to use, fork, and adapt this project. If you do, please remove my personal information before publishing your own version.
