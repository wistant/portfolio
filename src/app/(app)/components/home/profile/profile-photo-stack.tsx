import fs from "fs"
import path from "path"

import { PhotoStack } from "./photo-stack"

export function ProfilePhotoStack() {
  const galleryDir = path.join(process.cwd(), "public/gallery")
  let images: string[] = []

  try {
    images = fs
      .readdirSync(galleryDir)
      .filter((f) => /\.(jpg|jpeg|png|webp|gif)$/i.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
      .slice(0, 3)
      .map((f) => `/gallery/${f}`)
  } catch {
    // Gallery folder missing or empty — render nothing
  }

  if (images.length < 3) return null

  return <PhotoStack images={images as [string, string, string]} />
}
