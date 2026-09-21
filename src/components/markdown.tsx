import { MarkdownAsync } from "react-markdown"
import rehypeExternalLinks from "rehype-external-links"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"

import { UTM_PARAMS } from "@/config/site"
import { rehypeAddQueryParams } from "@/lib/rehype-add-query-params"
import { InlineTag } from "@/components/inline-tag"

export function Markdown({
  components,
  ...props
}: React.ComponentProps<typeof MarkdownAsync>) {
  return (
    <MarkdownAsync
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[
        rehypeRaw,
        [rehypeExternalLinks, { target: "_blank", rel: "nofollow noopener" }],
        [rehypeAddQueryParams, UTM_PARAMS],
      ]}
      components={
        {
          a: (aProps: any) => <InlineTag {...aProps} />,
          tag: (tProps: any) => <InlineTag {...tProps} />,
          Tag: (tProps: any) => <InlineTag {...tProps} />,
          inline: (tProps: any) => <InlineTag {...tProps} />,
          Inline: (tProps: any) => <InlineTag {...tProps} />,
          tech: (tProps: any) => <InlineTag {...tProps} />,
          Tech: (tProps: any) => <InlineTag {...tProps} />,
          inlinetag: (tProps: any) => <InlineTag {...tProps} />,
          InlineTag: (tProps: any) => <InlineTag {...tProps} />,
          ...components,
        } as any
      }
      {...props}
    />
  )
}

