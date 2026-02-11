"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LoginButton } from "@/components/login-button"
import { LogoutButton } from "@/components/logout-button"
import { brand, navLinks } from "@/lib/landing-data"
import { Menu, X, User, LayoutDashboard, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "motion/react"

interface LandingNavbarProps {
  user?: {
    name?: string | null
    image?: string | null
    username?: string
  } | null
}

export function LandingNavbar({ user }: LandingNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        className={cn(
          "transition-all duration-500 ease-out",
          scrolled
            ? "max-w-4xl mx-auto mt-4 rounded-full bg-black/40 backdrop-blur-2xl border border-white/[0.06] shadow-lg shadow-black/20 px-6 h-14"
            : "max-w-6xl mx-auto px-4 h-16 bg-transparent"
        )}
      >
        <div className="flex h-full items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:shadow-xl group-hover:shadow-indigo-500/30 group-hover:scale-105 transition-all duration-300">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-lg font-semibold text-white">
                {brand.name}
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="px-4 py-2 text-[14px] font-medium text-zinc-400 hover:text-white rounded-full hover:bg-white/[0.06] transition-all duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full hover:ring-2 hover:ring-indigo-500/20 transition-all">
                    <Avatar className="h-9 w-9 ring-2 ring-zinc-700">
                      <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
                      <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-violet-600 text-white text-sm font-medium">
                        {user.name?.charAt(0) || user.username?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 p-2 rounded-2xl bg-zinc-900/90 backdrop-blur-xl border-white/[0.08]" align="end">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04]">
                    <Avatar className="h-12 w-12 ring-2 ring-zinc-700">
                      <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
                      <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-violet-600 text-white font-medium">
                        {user.name?.charAt(0) || user.username?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0">
                      <p className="font-semibold text-sm text-white truncate">
                        {user.name || user.username || "User"}
                      </p>
                      {user.username && (
                        <p className="text-xs text-zinc-400 truncate">
                          @{user.username}
                        </p>
                      )}
                    </div>
                  </div>
                  <DropdownMenuSeparator className="my-2 bg-white/[0.06]" />
                  <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
                    <Link href="/dashboard" className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </span>
                      <ChevronRight className="w-4 h-4 text-zinc-400" />
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-xl cursor-pointer">
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Profile
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-2 bg-white/[0.06]" />
                  <LogoutButton />
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <LoginButton />
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full text-zinc-400 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu - full screen overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 top-0 z-40 bg-black/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="block px-8 py-4 text-2xl font-medium text-zinc-400 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              {!user && (
                <motion.div
                  className="pt-8 mt-4 border-t border-white/[0.06]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <LoginButton />
                </motion.div>
              )}
            </div>

            {/* Close button at top right of overlay */}
            <button
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/[0.06] flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
