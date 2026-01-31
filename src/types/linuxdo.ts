export interface LinuxDoProfile {
  id: number
  username: string
  name: string | null
  avatar_template: string
  active: boolean
  trust_level: 0 | 1 | 2 | 3 | 4
  silenced: boolean
  external_ids?: Record<string, string>
  api_key?: string
}

export type TrustLevel = 0 | 1 | 2 | 3 | 4

export const TRUST_LEVEL_NAMES: Record<TrustLevel, string> = {
  0: '新用户',
  1: '基础用户',
  2: '成员',
  3: '活跃成员',
  4: '领袖',
}

export const TRUST_LEVEL_COLORS: Record<TrustLevel, string> = {
  0: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
  1: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400',
  2: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400',
  3: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400',
  4: 'bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-400',
}
