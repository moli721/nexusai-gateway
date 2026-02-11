"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Search, ArrowRight, FileText, Code, BookOpen } from "lucide-react"

interface SearchResult {
  title: string
  description: string
  href: string
  category: string
  icon: typeof FileText
}

const searchData: SearchResult[] = [
  { title: "Getting Started", description: "Quick start guide for NexusAI", href: "/docs/quick-start", category: "Documentation", icon: BookOpen },
  { title: "API Reference", description: "Complete API documentation", href: "/docs/api-reference", category: "Documentation", icon: Code },
  { title: "Authentication", description: "How to authenticate API requests", href: "/docs/quick-start#auth", category: "Documentation", icon: FileText },
  { title: "Pricing", description: "Plans and pricing information", href: "#pricing", category: "Pages", icon: FileText },
  { title: "SDK Installation", description: "Install the NexusAI SDK", href: "/docs/quick-start#install", category: "API Reference", icon: Code },
  { title: "Rate Limits", description: "Understanding rate limits", href: "/docs/api-reference#limits", category: "API Reference", icon: Code },
  { title: "Error Handling", description: "Common errors and solutions", href: "/docs/api-reference#errors", category: "API Reference", icon: Code },
  { title: "About NexusAI", description: "Learn about our mission", href: "/about", category: "Pages", icon: FileText },
  { title: "Contact", description: "Get in touch with us", href: "/contact", category: "Pages", icon: FileText },
]

export function SearchModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredResults = query.trim()
    ? searchData.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      )
    : searchData.slice(0, 6)

  const groupedResults = filteredResults.reduce<Record<string, SearchResult[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {})

  const handleOpen = useCallback(() => {
    setIsOpen(true)
    setQuery("")
    setSelectedIndex(0)
  }, [])

  const handleClose = useCallback(() => {
    setIsOpen(false)
    setQuery("")
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        if (isOpen) handleClose()
        else handleOpen()
      }
      if (e.key === "Escape" && isOpen) {
        handleClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, handleOpen, handleClose])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const handleKeyNavigation = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => Math.min(prev + 1, filteredResults.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => Math.max(prev - 1, 0))
    } else if (e.key === "Enter" && filteredResults[selectedIndex]) {
      handleClose()
      window.location.href = filteredResults[selectedIndex].href
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-xl mx-4 rounded-2xl bg-zinc-900/90 backdrop-blur-xl border border-white/[0.08] shadow-2xl overflow-hidden"
            initial={{ scale: 0.95, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
              <Search className="w-5 h-5 text-zinc-400 flex-shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setSelectedIndex(0)
                }}
                onKeyDown={handleKeyNavigation}
                placeholder="Search documentation, pages..."
                className="flex-1 bg-transparent text-white placeholder:text-zinc-500 outline-none text-base"
              />
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/[0.06] text-zinc-500 text-xs border border-white/[0.06]">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-[400px] overflow-y-auto p-2">
              {Object.entries(groupedResults).length > 0 ? (
                Object.entries(groupedResults).map(([category, items]) => (
                  <div key={category} className="mb-2">
                    <div className="px-3 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wide">
                      {category}
                    </div>
                    {items.map((item) => {
                      const globalIndex = filteredResults.indexOf(item)
                      const Icon = item.icon
                      return (
                        <a
                          key={item.title}
                          href={item.href}
                          onClick={handleClose}
                          className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-colors duration-150 group ${
                            globalIndex === selectedIndex
                              ? "bg-white/[0.06]"
                              : "hover:bg-white/[0.04]"
                          }`}
                          onMouseEnter={() => setSelectedIndex(globalIndex)}
                        >
                          <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center flex-shrink-0 border border-white/[0.06] group-hover:border-indigo-500/30 transition-colors">
                            <Icon className="w-4 h-4 text-zinc-400 group-hover:text-indigo-400 transition-colors" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-white truncate">{item.title}</div>
                            <div className="text-xs text-zinc-500 truncate">{item.description}</div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 opacity-0 group-hover:opacity-100 transition-all" />
                        </a>
                      )
                    })}
                  </div>
                ))
              ) : (
                <div className="py-12 text-center">
                  <p className="text-zinc-500 text-sm">No results found for &ldquo;{query}&rdquo;</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-white/[0.06] text-xs text-zinc-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.06]">&uarr;</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.06]">&darr;</kbd>
                  navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.06]">&crarr;</kbd>
                  open
                </span>
              </div>
              <span>Powered by NexusAI</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
