import "server-only"

import fs from "fs"
import path from "path"

export function getBackgroundImages(): string[] {
  try {
    const dirPath = path.join(process.cwd(), "public/backgrounds")
    if (!fs.existsSync(dirPath)) {
      return []
    }
    const files = fs.readdirSync(dirPath)
    return files
      .filter((file) => /\.(webp|png|jpg|jpeg|svg)$/i.test(file))
      .map((file) => `/backgrounds/${file}`)
  } catch (error) {
    console.error("Failed to read backgrounds directory:", error)
    return []
  }
}
