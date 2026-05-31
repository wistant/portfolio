import { addQueryParams } from "@/utils/url"
import type { UnistNode, UnistTree } from "@/types/unist"

function visit(node: UnistNode, handler: (node: UnistNode) => void) {
  if (!node) return
  handler(node)
  if (node.children) {
    for (const child of node.children) {
      visit(child, handler)
    }
  }
}

export function rehypeAddQueryParams(params: Record<string, string>) {
  return (tree: UnistTree) => {
    visit(tree as unknown as UnistNode, (node: UnistNode) => {
      if (
        node.type !== "element" ||
        node?.tagName !== "a" ||
        !node?.properties?.href
      ) {
        return
      }

      const href = node.properties?.href as string | undefined

      if (
        !href ||
        href.startsWith("/") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#")
      ) {
        return
      }

      node.properties.href = addQueryParams(href, params)
    })
  }
}
