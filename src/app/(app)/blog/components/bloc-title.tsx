import { getDocsByCategory } from "@/data/doc/documents"

import { PanelHeader, PanelTitle, PanelTitleSup } from "@/components/panel"

const allPosts = getDocsByCategory("blog")
export default function BlogBlocTitle() {
  return (
    <PanelHeader>
      <PanelTitle>
        My Blog 📚
        <PanelTitleSup>[{allPosts.length}]</PanelTitleSup>
      </PanelTitle>
    </PanelHeader>
  )
}
