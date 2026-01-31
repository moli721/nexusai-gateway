"use client"

import { signOut } from "next-auth/react"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { LogOut } from "lucide-react"

export function LogoutButton() {
  return (
    <DropdownMenuItem
      className="cursor-pointer rounded-lg p-3 text-red-600 focus:bg-red-50 focus:text-red-600 dark:text-red-400 dark:focus:bg-red-950 dark:focus:text-red-400"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      <LogOut className="mr-3 h-4 w-4" />
      <span>退出登录</span>
    </DropdownMenuItem>
  )
}
