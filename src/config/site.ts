import { USER } from "@/data/portfolio/user"

import type { NavItem } from "@/types/nav"

export const SITE_INFO = {
  name: USER.displayName,
  url: process.env.NEXT_PUBLIC_APP_URL || "https://wistant.me",
  ogImage: USER.ogImage,
  description: USER.bio,
  keywords: USER.keywords,
}

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
}

export const MAIN_NAV: NavItem[] = [
  {
    title: "Projects",
    href: "/projects",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Sponsors",
    href: "/sponsors",
  },
  {
    title: "Gallery",
    href: "/gallery",
  },
]

export const MOBILE_NAV: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  ...MAIN_NAV,
]

export const X_HANDLE = "@iamwistant"
export const GITHUB_USERNAME = "wistant"
export const SOURCE_CODE_GITHUB_REPO = "portfolio"
export const SOURCE_CODE_GITHUB_URL = "https://github.com/wistant/portfolio"

export const SPONSORSHIP_URL = "https://github.com/sponsors/wistant"

export const UTM_PARAMS = {
  utm_source: "wistant.me",
}
