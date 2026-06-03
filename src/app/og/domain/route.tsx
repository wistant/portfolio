import { readFileSync } from "node:fs"
import { join } from "node:path"
import { ImageResponse } from "next/og"
import { USER } from "@/data/portfolio/user"

const geistMedium = readFileSync(
  join(process.cwd(), "src/assets/fonts/Geist-Medium.ttf")
)

const geistSemiBold = readFileSync(
  join(process.cwd(), "src/assets/fonts/Geist-SemiBold.ttf")
)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const domain = searchParams.get("domain")
  const isForSale = searchParams.get("sale") === "true"

  return new ImageResponse(
    <div tw="flex text-black bg-white w-full h-full p-16">
      <div tw="flex-1 flex flex-col justify-center border-l border-r border-zinc-200">
        <div tw="flex justify-center border-t border-b border-zinc-200">
          <h1
            tw="mt-8 mb-4 ml-8 mr-8"
            style={{
              fontFamily: "GeistSans",
              fontWeight: 600,
              fontSize: 88,
              letterSpacing: "-0.025em",
            }}
          >
            {domain}
          </h1>
        </div>

        <div tw="flex justify-center border-b border-zinc-200">
          <p
            tw="mt-0 mb-0 pt-4 pb-4 pl-8 pr-8"
            style={{
              fontFamily: "GeistSans",
              fontWeight: 500,
              fontSize: 32,
              color: isForSale ? "#22c55e" : "#71717a",
            }}
          >
            {isForSale
              ? "The domain name is for sale"
              : "The website will be launched soon"}
          </p>
        </div>
      </div>

      <div tw="absolute flex inset-y-0 w-px bg-zinc-200 left-16" />
      <div tw="absolute flex inset-y-0 w-px bg-zinc-200 right-16" />
      <div tw="absolute flex inset-x-0 h-px bg-zinc-200 top-16" />
      <div tw="absolute flex inset-x-0 h-px bg-zinc-200 bottom-16" />

      <div tw="absolute flex bottom-16 right-16">
        <img
          src={USER.logo || USER.avatar}
          alt="Logo"
          width={64}
          height={64}
          style={{ borderRadius: 8 }}
        />
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "GeistSans",
          data: geistMedium,
          weight: 500,
        },
        {
          name: "GeistSans",
          data: geistSemiBold,
          weight: 600,
        },
      ],
    }
  )
}
