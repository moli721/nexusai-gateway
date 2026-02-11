<div align="center">

# ⚡ NexusAI Gateway

**Unified AI API Gateway — One endpoint, all models.**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Auth.js](https://img.shields.io/badge/Auth.js-v5-7C3AED?logo=auth0&logoColor=white)](https://authjs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[English](README.md) | [中文](README.zh-CN.md)

</div>

---

NexusAI is an AI API Gateway that provides unified access to Claude, GPT, Gemini and other models through a single API endpoint. Built with Next.js 15, it features a landing page, documentation, user dashboard, and API key management.

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| 🖥 Framework | Next.js 15 (App Router) |
| 🎨 Styling | Tailwind CSS v4 + shadcn/ui (new-york) |
| 🗄 Database | Prisma + SQLite |
| 🔐 Auth | NextAuth.js v5 (Auth.js) + LinuxDo OAuth |
| ✨ Animation | Motion (Framer Motion) |
| 📝 Language | TypeScript |

## 📋 Features

- 🏠 Landing page with interactive multi-model code examples
- 🔑 LinuxDo OAuth login (PKCE + State)
- 📖 Documentation pages (Quick Start, API Reference)
- 📊 User dashboard with API key management
- 📈 Usage analytics and subscription tracking
- 🛡 JWT-based session with trust level support

## 📁 Project Structure

```
src/
├── app/
│   ├── api/auth/         # NextAuth.js route handlers
│   ├── dashboard/        # Protected dashboard pages
│   ├── docs/             # Documentation pages
│   ├── legal/            # Privacy policy & terms of service
│   ├── about/            # About page
│   └── contact/          # Contact page
├── auth.ts               # NextAuth.js configuration
├── middleware.ts          # Route protection (/dashboard/*)
├── components/
│   ├── landing/          # Landing page sections
│   ├── docs/             # Documentation components
│   ├── legal/            # Legal page layout
│   └── ui/               # shadcn/ui components
├── lib/
│   ├── prisma.ts         # Prisma client
│   ├── landing-data.ts   # Landing page content data
│   └── utils.ts          # Utilities
└── types/                # TypeScript type definitions
prisma/
├── schema.prisma         # Database schema
└── migrations/           # Migration history
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- npm / pnpm / yarn

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in the required values. See [LinuxDo OAuth Setup](#-linuxdo-oauth-setup) below.

### 3. Initialize the database

```bash
npx prisma migrate dev
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 🔐 LinuxDo OAuth Setup

NexusAI uses [LinuxDo Connect](https://connect.linux.do) as its OAuth provider.

### Step 1: Register an OAuth application

1. Go to [https://connect.linux.do](https://connect.linux.do)
2. Log in with your LinuxDo account
3. Create a new OAuth application
4. Set the **Redirect URI** to:
   - Development: `http://localhost:3000/api/auth/callback/linuxdo`
   - Production: `https://your-domain.com/api/auth/callback/linuxdo`
5. Copy the **Client ID** and **Client Secret**

### Step 2: Configure environment variables

Add the following to `.env.local`:

```env
LINUXDO_CLIENT_ID=your_client_id
LINUXDO_CLIENT_SECRET=your_client_secret
```

### Step 3: Generate AUTH_SECRET

```bash
npx auth secret
```

Or generate manually:

```bash
openssl rand -base64 32
```

Add the result to `.env.local`:

```env
AUTH_SECRET=your_generated_secret
```

### How it works

The OAuth flow uses PKCE + State for security:

```
┌──────┐      ┌───────────┐      ┌─────────────────┐
│ User │──1──▶│ NexusAI   │──2──▶│ connect.linux.do│
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

1. User clicks "Login" → redirected to `connect.linux.do/oauth2/authorize`
2. User authorizes on LinuxDo → redirected back with auth code
3. Server exchanges code for token at `connect.linux.do/oauth2/token`
4. Server fetches user profile from `connect.linux.do/api/user`
5. User record created/updated in database via Prisma
6. JWT session issued with `username` and `trustLevel` claims

The user profile includes LinuxDo-specific fields:

| Field | Type | Description |
|-------|------|-------------|
| `username` | `string` | LinuxDo username |
| `trust_level` | `0-4` | Trust level |
| `active` | `boolean` | Account active status |
| `silenced` | `boolean` | Account silenced status |

## 🗄 Database Schema

Core models:

| Model | Description |
|-------|-------------|
| 👤 **User** | User accounts with LinuxDo profile fields |
| 🔗 **Account** | OAuth provider connections |
| 🔑 **ApiKey** | API keys (hashed storage, prefix display) |
| 📊 **UsageRecord** | Per-request usage tracking (model, tokens, cost) |
| 💳 **Subscription** | User subscription plans |

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx prisma studio` | Open Prisma database GUI |
| `npx prisma migrate dev` | Run database migrations |

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variables in project settings
4. For production, switch `DATABASE_URL` to a hosted database (PostgreSQL recommended)

### Self-hosted

```bash
npm run build
npm run start
```

Make sure all environment variables are configured and the database is migrated.

## 📄 License

MIT
