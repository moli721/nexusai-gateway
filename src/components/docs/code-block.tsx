"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  className?: string
}

export function CodeBlock({ code, language = "typescript", filename, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setCopyError(false)
        setTimeout(() => setCopied(false), 2000)
      } else {
        const textArea = document.createElement("textarea")
        textArea.value = code
        textArea.style.position = "fixed"
        textArea.style.opacity = "0"
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand("copy")
        document.body.removeChild(textArea)
        setCopied(true)
        setCopyError(false)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch {
      setCopyError(true)
      setTimeout(() => setCopyError(false), 2000)
    }
  }

  return (
    <div className={cn("rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden", className)}>
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
          <span className="text-sm text-zinc-600 dark:text-zinc-400 font-mono">{filename}</span>
          <span className="text-xs text-zinc-500 dark:text-zinc-500 uppercase">{language}</span>
        </div>
      )}
      <div className="relative">
        <pre className="p-4 bg-zinc-50 dark:bg-zinc-950 overflow-x-auto">
          <code className={cn("text-sm font-mono text-zinc-800 dark:text-zinc-200", `language-${language}`)}>
            {code}
          </code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2 rounded-md bg-zinc-200/50 dark:bg-zinc-800/50 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Copy code"
        >
          {copyError ? (
            <Copy className="w-4 h-4 text-red-500" />
          ) : copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4 text-zinc-500" />
          )}
        </button>
      </div>
    </div>
  )
}
