import type { Metadata, Viewport } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'

const notoSansKR = Noto_Sans_KR({
  variable: '--font-noto-sans-kr',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'TrainUs',
  description: 'TrainUs는 지역 기반의 운동 메이트/트레이너 매칭 플랫폼입니다.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ko-KR"
      className={`${notoSansKR.variable} ${notoSansKR.className} antialiased`}
    >
      <head>
        <meta property="og:title" content="TrainUs" />
        <meta
          property="og:description"
          content="TrainUs는 지역 기반의 운동 메이트/트레이너 매칭 플랫폼입니다."
        />
        <meta property="og:image:alt" content="TrainUs" />
        <meta property="og:image:type" content="image/png" />
        {/* <meta
          property="og:image"
          content="https://ockzfqnjzylkevsdlyfi.supabase.co/storage/v1/object/public/public_file/logos/opengraph-image.png"
        /> */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </head>
      <body className="font-noto-sans-kr">{children}</body>
    </html>
  )
}
