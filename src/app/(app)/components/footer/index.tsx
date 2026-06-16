import FooterCredits from "./credits-footer"
import FooterCopyRight from "./footer-copyright"
import FooterDock from "./interactive-dock"

export function SiteFooter() {
  return (
    <footer className="max-w-screen overflow-x-hidden px-2 pb-16">
      <div className="screen-line-top mx-auto border-x border-line pt-12 group-has-data-[slot=layout-wide]/layout:container md:max-w-3xl">
        <FooterCredits />
        <FooterDock />
        <FooterCopyRight />
        {/*Grid Corner Highlights */}
        <div className="*:absolute *:z-2 *:flex *:size-2 *:border *:border-line *:bg-background">
          <div className="bottom-[-3.5px] left-[-4.5px]" />
          <div className="right-[-4.5px] bottom-[-3.5px]" />
        </div>
      </div>
    </footer>
  )
}
