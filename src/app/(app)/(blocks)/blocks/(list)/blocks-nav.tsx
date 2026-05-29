"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import type { NavItem } from "@/types/nav"
import { blockCategories } from "@/config/registry"

const NAV_ITEMS: NavItem[] = [
  {
    href: "/blocks",
    title: "All",
  },
  ...blockCategories.map((category) => ({
    href: `/blocks/${category.name}`,
    title: category.title,
  })),
]

export function BlocksNav() {
  const pathname = usePathname()

  return (
    <nav className="no-scrollbar flex max-w-full items-center overflow-x-auto overflow-y-clip overscroll-x-contain scroll-fade-effect-x pr-2 whitespace-nowrap">
      {NAV_ITEMS.map(({ href, title }) => (
        <Link
          key={href}
          href={href}
          data-active={href === pathname}
          className="border-r border-line p-4 font-mono text-[.8125rem]/4 font-medium tracking-wide text-muted-foreground uppercase transition-[color,background-color] ease-out hover:bg-accent-muted data-active:bg-accent-muted data-active:text-foreground"
        >
          {title}
        </Link>
      ))}
    </nav>
  )
}
