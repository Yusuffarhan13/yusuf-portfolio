import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Yusuf Farhan | The Teenage Architect of Tomorrow\'s Intelligence',
  description: 'Portfolio of Yusuf Farhan - 15-year-old AI researcher building the future of intelligence. Creator of APOLA AI, AGI researcher, and international award winner.',
  keywords: 'Yusuf Farhan, AI, AGI, Artificial Intelligence, APOLA AI, Sri Lanka, Machine Learning, Neural Networks',
  authors: [{ name: 'Yusuf Farhan', url: 'https://apolaai.com' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  openGraph: {
    title: 'Yusuf Farhan | AI Architect',
    description: 'Building the future of intelligence at age 15',
    type: 'website',
    locale: 'en_US',
    siteName: 'Yusuf Farhan Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yusuf Farhan | AI Architect',
    description: 'Building the future of intelligence at age 15',
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
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-cosmos-dark text-white overflow-x-hidden`}>
        {children}
      </body>
    </html>
  )
}