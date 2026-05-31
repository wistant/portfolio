export {}

declare global {
  interface PageProps<T extends string = string> {
    params: Promise<any>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }
}
