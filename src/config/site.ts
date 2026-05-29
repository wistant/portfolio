import type { NavItem } from "@/types/nav"
import { USER } from "@/features/portfolio/data/user"

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
    title: "Blocks",
    href: "/blocks",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Sponsors",
    href: "/sponsors",
  },
]

export const MOBILE_NAV: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  ...MAIN_NAV,
]

export const X_HANDLE = "@iamnwistant"
export const GITHUB_USERNAME = "wistant"
export const SOURCE_CODE_GITHUB_REPO = "portfolio"
export const SOURCE_CODE_GITHUB_URL = "https://github.com/wistant/portfolio"

export const SPONSORSHIP_URL = "https://github.com/sponsors/witant"

export const UTM_PARAMS = {
  utm_source: "wistant.me",
}
