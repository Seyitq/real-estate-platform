import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'Gökler İnşaat | Güvenilir İnşaat Çözümleri',
    template: '%s | Gökler İnşaat'
  },
  description: '25 yılı aşkın tecrübemizle konut, ticari ve endüstriyel projelerde kaliteli inşaat çözümleri sunuyoruz. Anahtar teslim projeler, tadilat ve restorasyon hizmetleri.',
  keywords: ['inşaat', 'müteahhit', 'konut projeleri', 'ticari inşaat', 'tadilat', 'restorasyon', 'Türkiye'],
  authors: [{ name: 'Gökler İnşaat' }],
  creator: 'Gökler İnşaat',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://goklerinsaat.com',
    siteName: 'Gökler İnşaat',
    title: 'Gökler İnşaat | Güvenilir İnşaat Çözümleri',
    description: '25 yılı aşkın tecrübemizle konut, ticari ve endüstriyel projelerde kaliteli inşaat çözümleri sunuyoruz.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gökler İnşaat | Güvenilir İnşaat Çözümleri',
    description: '25 yılı aşkın tecrübemizle konut, ticari ve endüstriyel projelerde kaliteli inşaat çözümleri sunuyoruz.',
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
