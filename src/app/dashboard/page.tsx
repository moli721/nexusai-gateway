import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { UserProfile } from "@/components/user-profile"
import { Card, CardContent } from "@/components/ui/card"

export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    redirect("/")
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      {/* 背景装饰 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-400/20 blur-3xl dark:from-blue-500/5 dark:to-cyan-500/5" />
        <div className="absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 blur-3xl dark:from-purple-500/5 dark:to-pink-500/5" />
      </div>

      <Navbar user={session.user} />

      <main className="relative z-10 container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          {/* 欢迎区域 */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                欢迎回来，{session.user.name || session.user.username}
              </h1>
              <p className="mt-1 text-zinc-500 dark:text-zinc-400">
                这是你的个人仪表盘
              </p>
            </div>
          </div>

          {/* 主要内容区域 */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* 用户资料卡片 - 占两列 */}
            <div className="md:col-span-2">
              <UserProfile user={session.user} />
            </div>

            {/* 快捷操作卡片 */}
            <div className="space-y-6">
              <Card className="border-white/50 bg-white/80 shadow-xl backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-900/80">
                <CardContent className="p-6">
                  <h3 className="mb-4 font-semibold text-zinc-900 dark:text-zinc-100">
                    快捷操作
                  </h3>
                  <div className="space-y-3">
                    <a
                      href="https://linux.do"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl bg-zinc-100 p-3 text-sm text-zinc-700 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      访问 LinuxDo 社区
                    </a>
                    <a
                      href="https://linux.do/u/me/preferences/account"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl bg-zinc-100 p-3 text-sm text-zinc-700 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      账号设置
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-white/50 bg-white/80 shadow-xl backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-900/80">
                <CardContent className="p-6">
                  <h3 className="mb-4 font-semibold text-zinc-900 dark:text-zinc-100">
                    登录状态
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      已通过 OAuth 认证
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
