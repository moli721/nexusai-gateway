# OPSX Proposal: LinuxDo OAuth Web Application

## Context

用户需要创建一个完整的前后端 Web 应用，集成 LinuxDo Connect OAuth 登录功能。参考 cubence.com 的设计风格，采用 Apple 风格 UI + shadcn/ui 组件库。

### 用户需求
- 使用 LinuxDo OAuth 登录
- 展示用户 ID、头像、信任等级
- 支持登出
- 支持主题切换 (Light/Dark)
- Apple 风格 UI 设计
- 用户数据持久化到数据库

### 已知约束（用户提供）
- 回调地址：`http://localhost:3000/api/auth/callback/linuxdo`
- 代理要求：`http://127.0.0.1:7890` 访问 `connect.linux.do`
- OAuth 端点：
  - 授权：`https://connect.linux.do/oauth2/authorize`
  - Token：`https://connect.linux.do/oauth2/token`
  - 用户信息：`https://connect.linux.do/api/user`
- 环境变量：`LINUXDO_CLIENT_ID`, `LINUXDO_CLIENT_SECRET`

---

## LinuxDo API 用户信息结构（已确认）

| 字段 | 说明 |
|------|------|
| `id` | 用户唯一标识（不可变） |
| `username` | 论坛用户名 |
| `name` | 论坛用户昵称（可变） |
| `avatar_template` | 用户头像模板URL（支持多种尺寸） |
| `active` | 账号活跃状态 |
| `trust_level` | 信任等级（0-4） |
| `silenced` | 禁言状态 |
| `external_ids` | 外部ID关联信息 |
| `api_key` | API访问密钥 |

**头像 URL 处理**：`avatar_template` 格式为模板字符串，需替换 `{size}` 为具体尺寸（如 120）。

---

## Constraint Sets (约束集合)

### C1: 技术栈约束 (Hard Constraints)

| ID | 约束 | 原因 |
|----|------|------|
| C1.1 | 必须使用 Next.js 14+ App Router | 用户指定 |
| C1.2 | 必须使用 TypeScript strict mode | 用户指定 + 类型安全 |
| C1.3 | 必须使用 Tailwind CSS | 用户指定 |
| C1.4 | 必须使用 shadcn/ui 组件库 | 用户指定 |
| C1.5 | 必须使用 NextAuth.js v5 (Auth.js) | OAuth 处理最佳实践 |
| C1.6 | 必须使用 SQLite + Prisma | 用户选择的数据库方案 |

### C2: OAuth 集成约束 (Hard Constraints)

| ID | 约束 | 原因 |
|----|------|------|
| C2.1 | 回调路由必须是 `/api/auth/callback/linuxdo` | 用户已在 LinuxDo 配置 |
| C2.2 | 所有到 `connect.linux.do` 的请求必须通过代理 `http://127.0.0.1:7890` | 网络限制 |
| C2.3 | 必须使用 `undici` ProxyAgent 实现代理 | Auth.js 官方推荐方案 |
| C2.4 | 必须实现自定义 OAuth Provider（非内置） | LinuxDo 不是 Auth.js 内置 provider |
| C2.5 | Token 端点使用 POST + `application/x-www-form-urlencoded` | OAuth2 标准 |
| C2.6 | 头像 URL 需处理 `avatar_template` 模板替换 | LinuxDo API 特性 |

### C3: UI/UX 约束 (Soft Constraints)

| ID | 约束 | 原因 |
|----|------|------|
| C3.1 | 采用 Apple Human Interface Guidelines 风格 | 用户指定 |
| C3.2 | 使用系统字体栈（SF Pro 风格） | Apple 风格要求 |
| C3.3 | 支持 Light/Dark 模式切换 | 用户要求 |
| C3.4 | 使用毛玻璃效果 (backdrop-blur) | Apple 风格特征 |
| C3.5 | 圆角设计 (rounded-2xl/3xl) | Apple 风格特征 |
| C3.6 | 微交互动画 (transition, hover effects) | 用户体验提升 |
| C3.7 | 响应式设计 (mobile-first) | 现代 Web 标准 |
| C3.8 | 展示用户信任等级 (trust_level 0-4) | 用户要求 |

### C4: 数据库约束 (Hard Constraints)

| ID | 约束 | 原因 |
|----|------|------|
| C4.1 | 使用 Prisma ORM | 用户选择 |
| C4.2 | 使用 SQLite 数据库 | 用户选择 |
| C4.3 | 存储用户基本信息 + OAuth 账户关联 | Auth.js 适配器要求 |
| C4.4 | 数据库文件存储在 `prisma/dev.db` | Prisma 默认约定 |

### C5: 安全约束 (Hard Constraints)

| ID | 约束 | 原因 |
|----|------|------|
| C5.1 | 必须配置 `NEXTAUTH_SECRET` | Session 加密必需 |
| C5.2 | 必须配置 `NEXTAUTH_URL` | 回调 URL 验证 |
| C5.3 | 敏感信息只能存储在服务端环境变量 | 安全最佳实践 |
| C5.4 | 使用 database session 策略 | 配合 Prisma 适配器 |

### C6: 项目结构约束 (Conventions)

| ID | 约束 | 原因 |
|----|------|------|
| C6.1 | 使用 `src/` 目录结构 | Next.js 推荐 |
| C6.2 | 组件放置在 `src/components/` | 标准约定 |
| C6.3 | UI 组件放置在 `src/components/ui/` | shadcn/ui 约定 |
| C6.4 | Auth 配置放置在 `src/auth.ts` | Auth.js 约定 |
| C6.5 | API 路由使用 `src/app/api/` | App Router 约定 |
| C6.6 | Prisma schema 放置在 `prisma/schema.prisma` | Prisma 约定 |

---

## Dependencies (依赖关系)

```
[项目初始化] create-next-app
    ↓
[安装核心依赖] next-auth, @prisma/client, prisma, undici
    ↓
[配置 Prisma] schema + migrate + generate
    ↓
[配置 shadcn/ui] init + 安装组件 (button, avatar, card, dropdown-menu, badge)
    ↓
[配置 Auth.js] 自定义 LinuxDo Provider + Prisma Adapter + 代理设置
    ↓
[创建页面] Landing Page, Dashboard/Profile Page
    ↓
[实现组件] Navbar, LoginButton, UserProfile, LogoutButton, TrustLevelBadge
```

---

## Risks & Mitigations (风险与缓解)

| 风险 | 影响 | 缓解措施 |
|------|------|----------|
| 代理连接失败 | OAuth 流程中断 | 添加错误处理 + 用户友好提示 |
| Token 刷新机制未知 | 可能需要重新登录 | 暂不实现 refresh token |
| 网络延迟 | 用户体验下降 | 添加 loading 状态 |
| avatar_template 格式变化 | 头像显示异常 | 添加 fallback 头像 |

---

## Success Criteria (成功判据)

| ID | 判据 | 验证方式 |
|----|------|----------|
| SC1 | 点击登录按钮跳转到 LinuxDo 授权页面 | 手动测试 |
| SC2 | 授权后正确回调并获取用户信息 | 检查数据库 |
| SC3 | 页面正确显示用户 ID、头像、信任等级 | 视觉验证 |
| SC4 | 点击登出按钮清除 session 并跳转 | 手动测试 |
| SC5 | UI 符合 Apple 风格设计 | 视觉验证 |
| SC6 | 响应式布局在移动端正常显示 | 设备测试 |
| SC7 | Dark/Light 模式切换正常 | 手动测试 |
| SC8 | 用户数据正确持久化到 SQLite | 数据库查询验证 |

---

## File Structure (预期文件结构)

```
├── prisma/
│   ├── schema.prisma           # Prisma schema (User, Account, Session)
│   └── dev.db                  # SQLite database file
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with ThemeProvider
│   │   ├── page.tsx            # Landing page
│   │   ├── dashboard/
│   │   │   └── page.tsx        # Protected dashboard
│   │   └── api/
│   │       └── auth/
│   │           └── [...nextauth]/
│   │               └── route.ts # Auth.js route handler
│   ├── auth.ts                 # Auth.js configuration
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   └── dropdown-menu.tsx
│   │   ├── navbar.tsx          # Navigation bar
│   │   ├── login-button.tsx    # Login CTA
│   │   ├── user-profile.tsx    # User info display
│   │   ├── logout-button.tsx   # Logout action
│   │   ├── trust-level-badge.tsx # Trust level indicator
│   │   ├── theme-provider.tsx  # Dark mode provider
│   │   └── mode-toggle.tsx     # Theme switcher
│   ├── lib/
│   │   ├── utils.ts            # Utility functions (cn)
│   │   └── prisma.ts           # Prisma client singleton
│   └── types/
│       └── linuxdo.ts          # LinuxDo user types
├── .env.local                  # Environment variables
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind configuration
└── components.json             # shadcn/ui configuration
```

---

## Environment Variables

```env
# .env.local
LINUXDO_CLIENT_ID=your_client_id
LINUXDO_CLIENT_SECRET=your_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_generated_secret
HTTP_PROXY=http://127.0.0.1:7890
DATABASE_URL="file:./dev.db"
```

---

## TypeScript Types

```typescript
// src/types/linuxdo.ts
export interface LinuxDoUser {
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
```

---

## Design Reference

参考 cubence.com 设计风格：
- 现代简约风格，大量留白
- 深色/浅色模式支持
- 清晰的信息层级
- 代码美学元素（可选）
- 专业可信度感
