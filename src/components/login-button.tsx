"use client"

import { Button } from "@/components/ui/button"
import { loginAction } from "@/lib/auth-actions"

export function LoginButton() {
  return (
    <form action={loginAction}>
      <Button
        type="submit"
        className="group relative h-12 overflow-hidden rounded-full bg-white px-8 text-base font-semibold text-black shadow-lg shadow-white/10 transition-all hover:scale-[1.02] hover:shadow-xl hover:bg-zinc-100 active:scale-[0.98] font-[family-name:var(--font-cabin)]"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
          Sign In
        </span>
      </Button>
    </form>
  )
}
