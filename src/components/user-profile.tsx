import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { TrustLevelBadge } from "@/components/trust-level-badge"
import type { TrustLevel } from "@/types/linuxdo"

interface UserProfileProps {
  user: {
    id: string
    name?: string | null
    image?: string | null
    username: string
    trustLevel: number
  }
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <Card className="overflow-hidden border-white/50 bg-white/80 shadow-xl backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-900/80">
      {/* 顶部渐变背景 */}
      <div className="h-24 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

      <CardContent className="relative px-6 pb-6">
        {/* 头像 - 悬浮在渐变背景上 */}
        <div className="-mt-12 mb-4">
          <Avatar className="h-24 w-24 border-4 border-white shadow-lg dark:border-zinc-900">
            <AvatarImage src={user.image || undefined} alt={user.name || "用户头像"} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-2xl text-white">
              {user.name?.charAt(0) || user.username?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* 用户信息 */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                {user.name || user.username}
              </h2>
              <TrustLevelBadge level={user.trustLevel as TrustLevel} />
            </div>
            <p className="mt-1 text-zinc-500 dark:text-zinc-400">@{user.username}</p>
          </div>

          {/* 统计信息 */}
          <div className="grid grid-cols-3 gap-4 rounded-2xl bg-zinc-100/80 p-4 dark:bg-zinc-800/50">
            <div className="text-center">
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                {user.trustLevel}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">信任等级</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                -
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">帖子数</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                -
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">获赞数</p>
            </div>
          </div>

          {/* 详细信息 */}
          <div className="space-y-3 border-t border-zinc-200 pt-4 dark:border-zinc-700">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
                用户 ID
              </span>
              <span className="font-mono text-sm text-zinc-700 dark:text-zinc-300">{user.id}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                认证状态
              </span>
              <span className="flex items-center gap-1.5 text-sm text-green-600 dark:text-green-400">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                已认证
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
