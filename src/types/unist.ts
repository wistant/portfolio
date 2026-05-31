export interface UnistNode {
  type: string
  name?: string
  tagName?: string
  value?: string
  properties?: {
    __rawString__?: string
    [key: string]: unknown
  } & NpmCommands
  attributes?: {
    name: string
    value: unknown
    type?: string
  }[]
  children?: UnistNode[]
  __rawString__?: string
}

export interface UnistTree {
  type: string
  children: UnistNode[]
}

export interface NpmCommands {
  __pnpm__?: string
  __yarn__?: string
  __npm__?: string
  __bun__?: string
}
