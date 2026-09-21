import { MarkdownAsync } from "react-markdown"
import rehypeExternalLinks from "rehype-external-links"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"

import { UTM_PARAMS } from "@/config/site"
import { rehypeAddQueryParams } from "@/lib/rehype-add-query-params"
import { InlineTag } from "@/components/inline-tag"

type MarkdownProps = React.ComponentProps<typeof MarkdownAsync>
type MarkdownComponents = NonNullable<MarkdownProps["components"]>
type TagProps = React.ComponentProps<typeof InlineTag> & { node?: unknown }

function renderTag(props: TagProps) {
  const { node, ...rest } = props
  void node
  return <InlineTag {...rest} />
}

export function Markdown({ components, ...props }: MarkdownProps) {
  const mergedComponents: MarkdownComponents = {
    a: renderTag,
    tag: renderTag,
    Tag: renderTag,
    inline: renderTag,
    Inline: renderTag,
    tech: renderTag,
    Tech: renderTag,
    inlinetag: renderTag,
    InlineTag: renderTag,
    ...components,
  } as unknown as MarkdownComponents

  return (
    <MarkdownAsync
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[
        rehypeRaw,
        [rehypeExternalLinks, { target: "_blank", rel: "nofollow noopener" }],
        [rehypeAddQueryParams, UTM_PARAMS],
      ]}
      components={mergedComponents}
      {...props}
    />
  )
}
