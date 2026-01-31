"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

interface LegalLayoutProps {
  title: string
  lastUpdated: string
  children: React.ReactNode
}

export function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <header className="sticky top-0 z-50 border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto flex h-16 items-center justify-between px-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <ModeToggle />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            {title}
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Last updated: {lastUpdated}
          </p>
        </div>

        <div className="prose prose-zinc dark:prose-invert max-w-none">
          {children}
        </div>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center">
            © {new Date().getFullYear()} NexusAI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
