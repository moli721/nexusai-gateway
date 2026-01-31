"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"

export function LoginButton() {
  return (
    <Button
      onClick={() => signIn("linuxdo")}
      className="group relative h-12 w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-8 text-base font-medium text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/30 active:scale-[0.98] dark:shadow-blue-500/10 dark:hover:shadow-blue-500/20"
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
        </svg>
        使用 LinuxDo 登录
      </span>
      <div className="absolute inset-0 -z-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 transition-opacity group-hover:opacity-100" />
    </Button>
  )
}
