"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { codeLines as defaultCodeLines } from "@/lib/landing-data"
import { Copy, Check } from "lucide-react"

const TYPING_SPEED = 25
const LINE_DELAY = 150
const INITIAL_DELAY = 400

type TokenType = "keyword" | "string" | "identifier" | "bracket" | "comment" | "text" | "operator" | "number"

interface Token {
  type: TokenType
  value: string
}

function tokenize(line: string): Token[] {
  const tokens: Token[] = []

  if (line.startsWith("//") || line.startsWith("#")) {
    return [{ type: "comment", value: line }]
  }

  const regex = /(import|from|const|await|new|export|let|var|function|return|async)|('.*?'|".*?")|(\bNexusAI\b|\bOpenAI\b|\bprocess\b|\benv\b|\bclient\b|\bresponse\b)|([{}()[\]:,;.])|(\d+)|([=<>!+\-*/&|]+)|([^\s'"{}()[\]:,;.=<>!+\-*/&|]+|\s+)/g
  let match

  while ((match = regex.exec(line)) !== null) {
    if (match[1]) tokens.push({ type: "keyword", value: match[1] })
    else if (match[2]) tokens.push({ type: "string", value: match[2] })
    else if (match[3]) tokens.push({ type: "identifier", value: match[3] })
    else if (match[4]) tokens.push({ type: "bracket", value: match[4] })
    else if (match[5]) tokens.push({ type: "number", value: match[5] })
    else if (match[6]) tokens.push({ type: "operator", value: match[6] })
    else if (match[7]) tokens.push({ type: "text", value: match[7] })
  }

  return tokens
}

const tokenStyles: Record<TokenType, string> = {
  keyword: "text-pink-400",
  string: "text-emerald-400",
  identifier: "text-blue-400",
  bracket: "text-zinc-400",
  comment: "text-zinc-500 italic",
  text: "text-zinc-300",
  operator: "text-amber-400",
  number: "text-orange-400",
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
  const [copied, setCopied] = useState(false)

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

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeLines.join('\n'))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/30 bg-zinc-900 backdrop-blur-xl">
        {/* Window header - macOS style */}
        <div className="flex items-center justify-between px-4 py-3 bg-zinc-800/80 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57] shadow-inner" />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E] shadow-inner" />
              <div className="w-3 h-3 rounded-full bg-[#28C840] shadow-inner" />
            </div>
            <div className="ml-4 flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-zinc-700 flex items-center justify-center">
                <span className="text-[8px] text-zinc-400 font-bold">TS</span>
              </div>
              <span className="text-sm text-zinc-400 font-medium">
                {filename}
              </span>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.06] transition-all duration-200"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-500">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Code content */}
        <div className="relative bg-zinc-950/50 p-5 font-mono text-sm leading-7 min-h-[320px] overflow-x-auto">
          {/* Line numbers gutter */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-zinc-900/80 to-transparent pointer-events-none" />

          {displayedLines.map((line, index) => (
            <div key={index} className="flex group">
              <span className="w-12 text-zinc-600 select-none text-right pr-4 flex-shrink-0 tabular-nums">
                {index + 1}
              </span>
              <span className="flex-1 text-zinc-200">
                <HighlightedLine text={line} />
                {index === currentLineIndex && currentLineIndex < codeLines.length && (
                  <span className="inline-block w-0.5 h-5 bg-indigo-400 ml-0.5 animate-pulse rounded-full align-middle" />
                )}
              </span>
            </div>
          ))}

          {/* Empty lines placeholder */}
          {displayedLines.length < 10 && (
            <div className="opacity-0">
              {Array.from({ length: 10 - displayedLines.length }).map((_, i) => (
                <div key={`placeholder-${i}`} className="h-7" />
              ))}
            </div>
          )}
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-zinc-800/80 border-t border-white/[0.06] text-xs text-zinc-500">
          <div className="flex items-center gap-4">
            <span>TypeScript</span>
            <span>UTF-8</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Ln {displayedLines.length}, Col {currentCharIndex}</span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
