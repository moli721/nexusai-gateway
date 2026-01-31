# Implementation Tasks: LinuxDo OAuth Web Application

## Overview
零决策可执行任务列表。每个任务都有明确的输入、输出和验证标准。

---

## Phase 1: 项目初始化

### Task 1.1: 创建 Next.js 项目
**命令**:
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```
**验证**: `package.json` 存在且包含 `next`, `react`, `typescript`

### Task 1.2: 安装核心依赖
**命令**:
```bash
npm install next-auth@beta @prisma/client @auth/prisma-adapter undici next-themes
npm install -D prisma
```
**验证**: `package.json` 包含所有依赖

### Task 1.3: 初始化 Prisma
**命令**:
```bash
npx prisma init --datasource-provider sqlite
```
**验证**: `prisma/schema.prisma` 存在

---

## Phase 2: 数据库配置

### Task 2.1: 编写 Prisma Schema
**文件**: `prisma/schema.prisma`
**内容**: 见 design.md 中的完整 schema
**验证**: `npx prisma validate` 通过

### Task 2.2: 运行数据库迁移
**命令**:
```bash
npx prisma migrate dev --name init
```
**验证**: `prisma/dev.db` 存在

### Task 2.3: 生成 Prisma Client
**命令**:
```bash
npx prisma generate
```
**验证**: `node_modules/.prisma/client` 存在

### Task 2.4: 创建 Prisma 单例
**文件**: `src/lib/prisma.ts`
**内容**:
```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

---

## Phase 3: shadcn/ui 配置

### Task 3.1: 初始化 shadcn/ui
**命令**:
```bash
npx shadcn@latest init -d
```
**选项**:
- Style: Default
- Base color: Zinc
- CSS variables: Yes
**验证**: `components.json` 存在

### Task 3.2: 安装 UI 组件
**命令**:
```bash
npx shadcn@latest add button avatar card badge dropdown-menu
```
**验证**: `src/components/ui/` 包含所有组件文件

---

## Phase 4: Auth.js 配置

### Task 4.1: 创建代理工具
**文件**: `src/lib/proxy.ts`
**内容**:
```typescript
import { ProxyAgent, fetch as undiciFetch } from 'undici'

const proxyUrl = process.env.HTTP_PROXY || 'http://127.0.0.1:7890'
const agent = new ProxyAgent(proxyUrl)

export const proxiedFetch: typeof fetch = (url, init = {}) =>
  undiciFetch(url, { ...init, dispatcher: agent }) as unknown as Promise<Response>
```

### Task 4.2: 创建类型定义
**文件**: `src/types/linuxdo.ts`
**内容**:
```typescript
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
```

### Task 4.3: 扩展 Auth.js 类型
**文件**: `src/types/next-auth.d.ts`
**内容**:
```typescript
import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      username: string
      trustLevel: number
    } & DefaultSession["user"]
  }

  interface Profile {
    username: string
    trust_level: number
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username?: string
    trustLevel?: number
  }
}
```

### Task 4.4: 创建 Auth.js 配置
**文件**: `src/auth.ts`
**内容**: 见 design.md 中的完整配置

### Task 4.5: 创建 API 路由
**文件**: `src/app/api/auth/[...nextauth]/route.ts`
**内容**:
```typescript
import { handlers } from "@/auth"
export const { GET, POST } = handlers
```

### Task 4.6: 创建 Middleware
**文件**: `src/middleware.ts`
**内容**:
```typescript
export { auth as middleware } from "@/auth"

export const config = {
  matcher: ["/dashboard/:path*"]
}
```

---

## Phase 5: 主题配置

### Task 5.1: 创建 ThemeProvider
**文件**: `src/components/theme-provider.tsx`
**内容**:
```typescript
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

### Task 5.2: 创建主题切换组件
**文件**: `src/components/mode-toggle.tsx`
**内容**:
```typescript
"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-full"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">切换主题</span>
    </Button>
  )
}
```

---

## Phase 6: 布局与页面

### Task 6.1: 更新根布局
**文件**: `src/app/layout.tsx`
**要点**:
- 包裹 ThemeProvider
- 添加 suppressHydrationWarning
- 配置系统字体

### Task 6.2: 创建 Landing Page
**文件**: `src/app/page.tsx`
**要点**:
- 检查 session 状态
- 已登录重定向到 dashboard
- 未登录显示登录按钮

### Task 6.3: 创建 Dashboard Page
**文件**: `src/app/dashboard/page.tsx`
**要点**:
- Server Component
- 获取 session
- 传递用户数据给子组件

### Task 6.4: 创建 Loading 状态
**文件**: `src/app/dashboard/loading.tsx`
**要点**:
- Skeleton 组件
- 毛玻璃效果

---

## Phase 7: 业务组件

### Task 7.1: 创建 Navbar
**文件**: `src/components/navbar.tsx`
**要点**:
- Logo
- 主题切换
- 用户菜单（已登录）/ 登录按钮（未登录）

### Task 7.2: 创建 LoginButton
**文件**: `src/components/login-button.tsx`
**要点**:
- 调用 signIn("linuxdo")
- Apple 风格按钮

### Task 7.3: 创建 LogoutButton
**文件**: `src/components/logout-button.tsx`
**要点**:
- 调用 signOut()
- 确认对话框（可选）

### Task 7.4: 创建 UserProfile
**文件**: `src/components/user-profile.tsx`
**要点**:
- 显示头像、用户名、信任等级
- 毛玻璃卡片效果

### Task 7.5: 创建 TrustLevelBadge
**文件**: `src/components/trust-level-badge.tsx`
**要点**:
- 根据等级显示不同颜色
- 显示等级名称

---

## Phase 8: 环境配置

### Task 8.1: 创建环境变量文件
**文件**: `.env.local`
**内容**:
```env
LINUXDO_CLIENT_ID=your_client_id
LINUXDO_CLIENT_SECRET=your_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_generated_secret
HTTP_PROXY=http://127.0.0.1:7890
DATABASE_URL="file:./dev.db"
```

### Task 8.2: 生成 NEXTAUTH_SECRET
**命令**:
```bash
openssl rand -base64 32
```

---

## Phase 9: 验证与测试

### Task 9.1: 启动开发服务器
**命令**:
```bash
npm run dev
```
**验证**: http://localhost:3000 可访问

### Task 9.2: 测试 OAuth 流程
**步骤**:
1. 点击登录按钮
2. 跳转到 LinuxDo 授权页面
3. 授权后回调
4. 显示用户信息

### Task 9.3: 测试主题切换
**步骤**:
1. 点击主题切换按钮
2. 验证 Light/Dark 模式切换

### Task 9.4: 测试登出
**步骤**:
1. 点击登出按钮
2. 验证 session 清除
3. 重定向到首页

---

## Dependency Graph

```
Phase 1 (项目初始化)
    ↓
Phase 2 (数据库配置)
    ↓
Phase 3 (shadcn/ui 配置)
    ↓
Phase 4 (Auth.js 配置)
    ↓
Phase 5 (主题配置)
    ↓
Phase 6 (布局与页面)
    ↓
Phase 7 (业务组件)
    ↓
Phase 8 (环境配置)
    ↓
Phase 9 (验证与测试)
```

---

## Verification Checklist

- [ ] Next.js 项目创建成功
- [ ] 所有依赖安装完成
- [ ] Prisma 数据库迁移成功
- [ ] shadcn/ui 组件安装完成
- [ ] Auth.js 配置正确
- [ ] 代理配置正确
- [ ] 主题切换功能正常
- [ ] OAuth 登录流程完整
- [ ] 用户信息正确显示
- [ ] 登出功能正常
- [ ] 响应式布局正常
- [ ] Dark/Light 模式正常
