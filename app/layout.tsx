import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'Best Construction Company in Konya, Turkey | Gökler İnşaat Yapı',
    template: '%s | Gökler İnşaat Yapı'
  },
  description: 'Gökler İnşaat Yapı - Trusted construction company in Konya, Turkey. We build homes, villas & residential projects with quality workmanship and reliable service. 25+ years experience in residential & commercial construction.',
  keywords: [
    // Primary English Keywords
    'best construction companies in Konya Turkey',
    'construction companies in Konya',
    'house builders in Konya',
    'residential construction contractors Konya',
    'home construction company Konya',
    'builder in Konya Turkey',
    'top contractors in Konya',
    'Konya building contractors',
    'Turkish construction company Konya',
    // Turkish Keywords
    'Konya inşaat firmaları',
    'Konya konut müteahhitleri',
    'Konya ev inşaat şirketleri',
    'Konya villa inşaat firması',
    'Konya anahtar teslim inşaat',
    // Long-tail Keywords
    'affordable house builders in Konya',
    'custom home builders in Konya',
    'reliable construction company in Konya',
    'luxury home construction Konya',
    'commercial residential builders Konya',
    // Location-specific
    'Meram construction companies',
    'Selçuklu house builders',
    'Karatay construction contractors'
  ],
  authors: [{ name: 'Gökler İnşaat Yapı' }],
  creator: 'Gökler İnşaat Yapı',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://goklerinsaatyapi.com',
    siteName: 'Gökler İnşaat Yapı',
    title: 'Best Construction Company in Konya, Turkey | Gökler İnşaat Yapı',
    description: 'Trusted construction company in Konya, Turkey. We build homes, villas & residential projects with quality workmanship and reliable service.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Construction Company in Konya, Turkey | Gökler İnşaat Yapı',
    description: 'Trusted construction company in Konya, Turkey. We build homes, villas & residential projects with quality workmanship.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://goklerinsaatyapi.com',
    languages: {
      'tr-TR': 'https://goklerinsaatyapi.com',
      'en-US': 'https://goklerinsaatyapi.com',
    },
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
