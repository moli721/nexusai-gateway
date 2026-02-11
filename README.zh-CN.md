<div align="center">

# ⚡ NexusAI Gateway

**统一 AI API 网关 — 一个端点，所有模型。**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Auth.js](https://img.shields.io/badge/Auth.js-v5-7C3AED?logo=auth0&logoColor=white)](https://authjs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[English](README.md) | [中文](README.zh-CN.md)

</div>

---

NexusAI 是一个 AI API 网关，通过统一的 API 端点提供对 Claude、GPT、Gemini 等模型的访问。基于 Next.js 15 构建，包含落地页、文档、用户仪表盘和 API Key 管理功能。

## 🛠 技术栈

| 层级 | 技术 |
|------|-----|
| 🖥 框架 | Next.js 15 (App Router) |
| 🎨 样式 | Tailwind CSS v4 + shadcn/ui (new-york) |
| 🗄 数据库 | Prisma + SQLite |
| 🔐 认证 | NextAuth.js v5 (Auth.js) + LinuxDo OAuth |
| ✨ 动画 | Motion (Framer Motion) |
| 📝 语言 | TypeScript |

## 📋 功能特性

- 🏠 落地页，含交互式多模型代码示例
- 🔑 LinuxDo OAuth 登录（PKCE + State）
- 📖 文档页面（快速开始、API 参考）
- 📊 用户仪表盘，支持 API Key 管理
- 📈 用量分析和订阅追踪
- 🛡 基于 JWT 的会话，支持信任等级

## 📁 项目结构

```
src/
├── app/
│   ├── api/auth/         # NextAuth.js 路由处理
│   ├── dashboard/        # 受保护的仪表盘页面
│   ├── docs/             # 文档页面
│   ├── legal/            # 隐私政策和服务条款
│   ├── about/            # 关于页面
│   └── contact/          # 联系页面
├── auth.ts               # NextAuth.js 配置
├── middleware.ts          # 路由保护（/dashboard/*）
├── components/
│   ├── landing/          # 落地页各区块
│   ├── docs/             # 文档组件
│   ├── legal/            # 法律页面布局
│   └── ui/               # shadcn/ui 组件
├── lib/
│   ├── prisma.ts         # Prisma 客户端
│   ├── landing-data.ts   # 落地页内容数据
│   └── utils.ts          # 工具函数
└── types/                # TypeScript 类型定义
prisma/
├── schema.prisma         # 数据库模型定义
└── migrations/           # 迁移记录
```

## 🚀 快速开始

### 前置要求

- Node.js >= 18
- npm / pnpm / yarn

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

```bash
cp .env.example .env.local
```

编辑 `.env.local`，填入所需配置。详见下方 [LinuxDo OAuth 配置](#-linuxdo-oauth-配置)。

### 3. 初始化数据库

```bash
npx prisma migrate dev
```

### 4. 启动开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果。

## 🔐 LinuxDo OAuth 配置

NexusAI 使用 [LinuxDo Connect](https://connect.linux.do) 作为 OAuth 认证提供方。

### 第一步：注册 OAuth 应用

1. 访问 [https://connect.linux.do](https://connect.linux.do)
2. 使用 LinuxDo 账号登录
3. 创建新的 OAuth 应用
4. 设置 **回调地址 (Redirect URI)**：
   - 开发环境: `http://localhost:3000/api/auth/callback/linuxdo`
   - 生产环境: `https://your-domain.com/api/auth/callback/linuxdo`
5. 复制 **Client ID** 和 **Client Secret**

### 第二步：配置环境变量

在 `.env.local` 中添加：

```env
LINUXDO_CLIENT_ID=your_client_id
LINUXDO_CLIENT_SECRET=your_client_secret
```

### 第三步：生成 AUTH_SECRET

```bash
npx auth secret
```

或手动生成：

```bash
openssl rand -base64 32
```

将结果添加到 `.env.local`：

```env
AUTH_SECRET=your_generated_secret
```

### 工作原理

OAuth 流程使用 PKCE + State 保障安全：

```
┌──────┐      ┌───────────┐      ┌─────────────────┐
│ 用户 │──1──▶│ NexusAI   │──2──▶│ connect.linux.do│
│      │◀─6──│ (Next.js) │◀─5──│  /oauth2/token   │
└──────┘      └───────────┘      └─────────────────┘
                    │  ▲                │  ▲
                    3  4                │  │
                    ▼  │                ▼  │
               ┌──────────┐     ┌─────────────────┐
               │  Prisma  │     │ connect.linux.do│
               │ (SQLite) │     │   /api/user     │
               └──────────┘     └─────────────────┘
```

1. 用户点击「登录」→ 跳转到 `connect.linux.do/oauth2/authorize`
2. 用户在 LinuxDo 授权 → 携带授权码跳回
3. 服务端用授权码换取 token（`connect.linux.do/oauth2/token`）
4. 服务端获取用户信息（`connect.linux.do/api/user`）
5. 通过 Prisma 创建/更新数据库中的用户记录
6. 签发 JWT 会话，包含 `username` 和 `trustLevel` 字段

用户信息包含 LinuxDo 特有字段：

| 字段 | 类型 | 说明 |
|------|------|------|
| `username` | `string` | LinuxDo 用户名 |
| `trust_level` | `0-4` | 信任等级 |
| `active` | `boolean` | 账号是否激活 |
| `silenced` | `boolean` | 账号是否被禁言 |

## 🗄 数据库模型

核心模型：

| 模型 | 说明 |
|------|------|
| 👤 **User** | 用户账户，含 LinuxDo 个人信息字段 |
| 🔗 **Account** | OAuth 提供方连接记录 |
| 🔑 **ApiKey** | API 密钥（哈希存储，前缀展示） |
| 📊 **UsageRecord** | 逐请求用量记录（模型、token 数、费用） |
| 💳 **Subscription** | 用户订阅计划 |

## 📜 可用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 生产构建 |
| `npm run start` | 启动生产服务器 |
| `npm run lint` | 运行 ESLint |
| `npx prisma studio` | 打开 Prisma 数据库管理界面 |
| `npx prisma migrate dev` | 执行数据库迁移 |

## 🌐 部署

### Vercel（推荐）

1. 推送代码到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 在项目设置中配置环境变量
4. 生产环境建议将 `DATABASE_URL` 切换为托管数据库（推荐 PostgreSQL）

### 自部署

```bash
npm run build
npm run start
```

确保所有环境变量已配置，数据库已完成迁移。

## 📄 许可证

MIT
