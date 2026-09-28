import fs from "fs"
import path from "path"
import { USER } from "@/data/portfolio/user"

import { ProfileHero } from "./profile-hero"

export function ProfileHeroServer() {
  const galleryDir = path.join(process.cwd(), "public/gallery")
  let photos: string[] = []

  try {
    const files = fs
      .readdirSync(galleryDir)
      .filter((f) => /\.(jpg|jpeg|png|webp|gif)$/i.test(f))
      .sort((a, b) =>
        a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
      )

    photos = files.map((f) => `/gallery/${f}`)
  } catch {
    photos = ["/gallery/1.jpg"]
  }

  // Determine initial photo from USER.heroPhoto or fallback to first
  let initialIndex = 0
  if (USER.heroPhoto) {
    const cleanName = USER.heroPhoto.replace(/^\/gallery\//, "").toLowerCase()
    const foundIndex = photos.findIndex((p) =>
      p.toLowerCase().endsWith(cleanName)
    )
    if (foundIndex !== -1) {
      initialIndex = foundIndex
    }
  }

  return (
    <ProfileHero
      photos={photos}
      initialIndex={initialIndex}
      photoSize={USER.heroPhotoSize ?? "md"}
    />
  )
}
