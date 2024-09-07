import './globals.css'
import type { Metadata } from 'next'
import ModeProvider from '../components/context/ModeProvider'
import { Inter } from 'next/font/google'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Weathery - The Weather App',
  description: 'A Weather info app - built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="./favicon.ico" />
        <title>Weathery - A Weather info app</title>
      </Head>
      <ModeProvider>
        <body className={inter.className}>{children}</body>
      </ModeProvider>
    </html>
  )
}
