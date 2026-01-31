# Technical Design: LinuxDo OAuth Web Application

## Multi-Model Analysis Summary

### Codex (Backend) 关键洞察

1. **Session 策略**: 推荐使用 `jwt` 策略而非 `database`
   - SQLite 文件锁在高并发下可能成为瓶颈
   - JWT 对 Edge Runtime 更友好
   - 需要在 JWT callback 中传递 `trustLevel` 和 `username`

2. **代理配置**: 使用 undici ProxyAgent
   - 必须复用单一 ProxyAgent 实例，避免 socket 耗尽
   - 所有 Auth.js 调用（包括 JWKS）都需要通过代理
   - 建议添加代理健康检查端点

3. **LinuxDo 特殊处理**:
   - API 不返回 email，需要生成合成 email 或设为 null
   - `avatar_template` 需要替换 `{size}` 为具体尺寸（如 256）
   - 支持 PKCE + state 检查

### Gemini (Frontend) 关键洞察

1. **组件架构**:
   - 页面级使用 Server Components
   - 交互组件（LoginCard, ThemeToggle, LogoutButton）使用 Client Components
   - 通过 props 传递 session 数据，避免瀑布请求

2. **Apple 风格实现**:
   - 毛玻璃效果: `bg-white/70 backdrop-blur-2xl border-white/20`
   - 大圆角: `rounded-xl` 到 `rounded-3xl`
   - 微交互: `hover:scale-[1.02] active:scale-[0.98]`

3. **路由保护**:
   - 使用 `middleware.ts` 在 Edge 层保护路由
   - 未认证用户不会下载受保护页面的 bundle

---

## Resolved Technical Decisions

### D1: Session 策略
**决策**: 使用 `jwt` 策略
**原因**: SQLite 文件锁限制 + Edge 兼容性
**配置**:
```typescript
session: { strategy: "jwt" }
```

### D2: 代理实现
**决策**: undici ProxyAgent 单例模式
**配置**:
```typescript
// src/lib/proxy.ts
import { ProxyAgent, fetch as undiciFetch } from 'undici'

const proxyUrl = process.env.HTTP_PROXY || 'http://127.0.0.1:7890'
const agent = new ProxyAgent(proxyUrl)

export const proxiedFetch: typeof fetch = (url, init = {}) =>
  undiciFetch(url, { ...init, dispatcher: agent }) as unknown as Promise<Response>
```

### D3: 头像 URL 处理
**决策**: 替换 `{size}` 为 `120`（标准尺寸）
**实现**:
```typescript
const getAvatarUrl = (template: string) =>
  template.replace('{size}', '120')
```

### D4: Email 处理
**决策**: 设为 `null`（LinuxDo 不返回 email）
**原因**: 避免生成假 email 导致的潜在问题

### D5: 主题切换
**决策**: next-themes + class 属性
**配置**:
```typescript
<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
```

### D6: 路由保护
**决策**: middleware.ts + auth() 函数
**配置**:
```typescript
// middleware.ts
export { auth as middleware } from "@/auth"
export const config = { matcher: ["/dashboard/:path*"] }
```

---

## Prisma Schema (Final)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  username      String?
  trustLevel    Int?      @default(0)
  silenced      Boolean?  @default(false)
  active        Boolean?  @default(true)
  accounts      Account[]
  sessions      Session[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  session_state     String?
  id_token          String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
```

---

## Auth.js Configuration (Final)

```typescript
// src/auth.ts
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import { proxiedFetch } from "@/lib/proxy"

const linuxDoProvider = {
  id: "linuxdo",
  name: "LinuxDo",
  type: "oauth" as const,
  authorization: {
    url: "https://connect.linux.do/oauth2/authorize",
    params: { scope: "" }
  },
  token: "https://connect.linux.do/oauth2/token",
  userinfo: "https://connect.linux.do/api/user",
  checks: ["pkce", "state"] as const,
  profile(profile: LinuxDoProfile) {
    return {
      id: String(profile.id),
      name: profile.name || profile.username,
      email: null,
      image: profile.avatar_template?.replace("{size}", "120"),
      username: profile.username,
      trustLevel: profile.trust_level,
      silenced: profile.silenced,
      active: profile.active,
    }
  },
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [linuxDoProvider],
  callbacks: {
    jwt({ token, profile }) {
      if (profile) {
        token.username = profile.username
        token.trustLevel = profile.trust_level
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!
        session.user.username = token.username as string
        session.user.trustLevel = token.trustLevel as number
      }
      return session
    },
  },
  session: { strategy: "jwt" },
  // @ts-expect-error undici fetch type mismatch
  fetch: proxiedFetch,
})
```

---

## UI Component Specifications

### Color Palette (Apple-inspired)

```css
/* Light Mode */
--background: 0 0% 100%;
--foreground: 0 0% 3.9%;
--card: 0 0% 100%;
--card-foreground: 0 0% 3.9%;
--primary: 221.2 83.2% 53.3%;
--primary-foreground: 210 40% 98%;

/* Dark Mode */
--background: 0 0% 3.9%;
--foreground: 0 0% 98%;
--card: 0 0% 7%;
--card-foreground: 0 0% 98%;
```

### Glass Card Component

```tsx
// Tailwind classes for glass effect
const glassCard = cn(
  "bg-white/70 dark:bg-zinc-900/70",
  "backdrop-blur-2xl",
  "border border-white/20 dark:border-white/10",
  "shadow-xl",
  "rounded-3xl",
  "p-6"
)
```

### Trust Level Badge Colors

```typescript
const TRUST_LEVEL_COLORS: Record<TrustLevel, string> = {
  0: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  1: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400",
  2: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400",
  3: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400",
  4: "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-400",
}
```

### Animation Specifications

```css
/* Hover scale effect */
.interactive {
  @apply transition-all duration-200 ease-out;
  @apply hover:scale-[1.02] active:scale-[0.98];
}

/* Theme transition */
.theme-transition {
  @apply transition-colors duration-300;
}

/* Focus ring (Apple style) */
.focus-ring {
  @apply focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2;
}
```

---

## Error Handling Strategy

| 场景 | 处理方式 |
|------|----------|
| 代理不可用 | 显示友好错误页面 + 重试按钮 |
| OAuth 授权失败 | 重定向到登录页 + toast 提示 |
| Session 过期 | 自动重定向到登录页 |
| API 字段缺失 | 使用默认值 + 可选链 |
| 头像加载失败 | 显示 fallback 头像（首字母） |
