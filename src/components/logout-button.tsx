"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { LogOut } from "lucide-react"
import { logoutAction } from "@/lib/auth-actions"

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <DropdownMenuItem asChild className="cursor-pointer rounded-xl p-3 text-red-400 focus:bg-red-950/50 focus:text-red-400">
        <button type="submit" className="w-full flex items-center">
          <LogOut className="mr-3 h-4 w-4" />
          <span>Sign Out</span>
        </button>
      </DropdownMenuItem>
    </form>
  )
}
