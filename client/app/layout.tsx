import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BlockOps',
  description: 'AI-driven trading bot for TON meme coins',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <header className="bg-primary text-primary-foreground p-4">
            <h1 className="text-2xl font-bold">BlockOps</h1>
          </header>
          <nav className="bg-secondary">
            <ul className="flex justify-around p-2">
              <li><Link href="/" className="text-secondary-foreground hover:underline">Home</Link></li>
              <li><Link href="/trends" className="text-secondary-foreground hover:underline">Trends</Link></li>
              <li><Link href="/activity" className="text-secondary-foreground hover:underline">Activity</Link></li>
              <li><Link href="/settings" className="text-secondary-foreground hover:underline">Settings</Link></li>
            </ul>
          </nav>
          <main className="flex-grow p-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}