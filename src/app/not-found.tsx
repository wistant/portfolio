import { NotFound as PageNotFound } from "@/app/(app)/components/notfound"

export const metadata = {
  title: "Page Not Found",
}

export default function NotFound() {
  return <PageNotFound className="h-screen" />
}
