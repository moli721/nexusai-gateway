"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { codeLines as defaultCodeLines } from "@/lib/landing-data"

const TYPING_SPEED = 30
const LINE_DELAY = 200
const INITIAL_DELAY = 500

type TokenType = "keyword" | "string" | "identifier" | "bracket" | "comment" | "text"

interface Token {
  type: TokenType
  value: string
}

function tokenize(line: string): Token[] {
  const tokens: Token[] = []

  if (line.startsWith("//") || line.startsWith("#")) {
    return [{ type: "comment", value: line }]
  }

  const regex = /(import|from|const|await|new|export)|('.*?'|".*?")|(\bNexusAI\b|\bOpenAI\b|\bprocess\b|\benv\b|\bclient\b)|([{}()[\]])|([^\s'"{}()[\]]+|\s+)/g
  let match

  while ((match = regex.exec(line)) !== null) {
    if (match[1]) tokens.push({ type: "keyword", value: match[1] })
    else if (match[2]) tokens.push({ type: "string", value: match[2] })
    else if (match[3]) tokens.push({ type: "identifier", value: match[3] })
    else if (match[4]) tokens.push({ type: "bracket", value: match[4] })
    else if (match[5]) tokens.push({ type: "text", value: match[5] })
  }

  return tokens
}

const tokenStyles: Record<TokenType, string> = {
  keyword: "text-purple-500 dark:text-purple-400",
  string: "text-green-500 dark:text-green-400",
  identifier: "text-blue-500 dark:text-blue-400",
  bracket: "text-zinc-400",
  comment: "text-zinc-500 dark:text-zinc-500 italic",
  text: "",
}

function HighlightedLine({ text }: { text: string }) {
  const tokens = useMemo(() => tokenize(text), [text])

  return (
    <>
      {tokens.map((token, i) => (
        <span key={i} className={tokenStyles[token.type]}>
          {token.value}
        </span>
      ))}
    </>
  )
}

interface CodeWindowProps {
  codeLines?: string[]
  filename?: string
  resetKey?: string | number
}

export function CodeWindow({
  codeLines = defaultCodeLines,
  filename = "index.ts",
  resetKey = "default"
}: CodeWindowProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  const resetAnimation = useCallback(() => {
    setDisplayedLines([])
    setCurrentLineIndex(0)
    setCurrentCharIndex(0)
    setIsTyping(false)
  }, [])

  useEffect(() => {
    resetAnimation()
    const timer = setTimeout(() => setIsTyping(true), INITIAL_DELAY)
    return () => clearTimeout(timer)
  }, [resetKey, codeLines, resetAnimation])

  useEffect(() => {
    if (!isTyping) return

    if (currentLineIndex >= codeLines.length) return

    const currentLine = codeLines[currentLineIndex]

    if (currentCharIndex < currentLine.length) {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev]
          newLines[currentLineIndex] = currentLine.slice(0, currentCharIndex + 1)
          return newLines
        })
        setCurrentCharIndex((prev) => prev + 1)
      }, TYPING_SPEED)
      return () => clearTimeout(timer)
    } else if (currentLineIndex < codeLines.length - 1) {
      const timer = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1)
        setCurrentCharIndex(0)
        setDisplayedLines((prev) => [...prev, ""])
      }, LINE_DELAY)
      return () => clearTimeout(timer)
    }
  }, [isTyping, currentLineIndex, currentCharIndex, codeLines])

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl">
        <div className="flex items-center gap-2 px-4 py-3 bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="ml-2 text-sm text-zinc-500 dark:text-zinc-400 font-mono">
            {filename}
          </span>
        </div>
        <div className="bg-zinc-50 dark:bg-zinc-950 p-4 font-mono text-sm leading-relaxed min-h-[280px]">
          {displayedLines.map((line, index) => (
            <div key={index} className="flex">
              <span className="w-8 text-zinc-400 dark:text-zinc-600 select-none text-right pr-4">
                {index + 1}
              </span>
              <span className="text-zinc-800 dark:text-zinc-200">
                <HighlightedLine text={line} />
              </span>
              {index === currentLineIndex && currentLineIndex < codeLines.length && (
                <span className="animate-pulse ml-0.5 w-2 h-5 bg-blue-500 inline-block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
