import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Retro Games 3D - Classic Games Collection',
  description: 'Experience 25+ classic games in stunning 3D with leaderboards and multiplayer features',
  keywords: 'games, retro, 3D, tic-tac-toe, classic games, leaderboard',
  authors: [{ name: 'Retro Games 3D Team' }],
  creator: 'Retro Games 3D',
  publisher: 'Retro Games 3D',
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
            {children}
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1a1a1a',
                color: '#fff',
                border: '1px solid #7c3aed',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}