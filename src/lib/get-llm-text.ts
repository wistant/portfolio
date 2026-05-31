import { format } from "date-fns"
import { remarkHeading } from "fumadocs-core/mdx-plugins/remark-heading"
import { remark } from "remark"
import remarkGfm from "remark-gfm"
import remarkMdx from "remark-mdx"

import type { Doc } from "@/types/document"

const processor = remark()
  .use(remarkMdx)
  .use(remarkGfm)
  .use(remarkHeading)

export async function getLLMText(doc: Doc) {
  const processed = await processor.process({
    value: doc.content,
  })

  return `# ${doc.metadata.title}

${doc.metadata.description}

${processed.value}

Last updated on ${format(new Date(doc.metadata.updatedAt), "MMMM d, yyyy")}`
}
