# NexusAI Gateway

## 项目概述
NexusAI 是一个专业的 AI API 网关 Landing Page，提供统一访问 Claude、GPT、Gemini 等模型的能力。

## 技术栈
- Next.js 15 (App Router)
- Tailwind CSS v4
- shadcn/ui (new-york style)
- Prisma + SQLite
- LinuxDo OAuth 认证

## 当前进度

### 已完成
- [x] Phase 1-4: 基础 Landing Page（Hero、Features、Pricing、FAQ、Footer）
- [x] Phase 5: Legal & Static Pages
  - `src/components/legal/legal-layout.tsx` - 法律页面布局
  - `src/app/legal/privacy-policy/page.tsx` - 隐私政策
  - `src/app/legal/terms-of-service/page.tsx` - 服务条款
  - `src/app/about/page.tsx` - 关于页面
  - `src/app/contact/page.tsx` - 联系页面
  - Footer 链接已更新
- [x] Phase 6: Hero Enhancement
  - `src/components/ui/tabs.tsx` - shadcn Tabs 组件
  - `src/lib/landing-data.ts` - 添加 modelTabs 多模型代码示例
  - `src/components/landing/code-window.tsx` - 支持动态代码和动画重置
  - `src/components/landing/hero.tsx` - 集成 Tabs 切换
- [x] Phase 7: Documentation
  - `src/components/docs/code-block.tsx` - 代码块组件（复制按钮）
  - `src/app/docs/layout.tsx` - Docs 布局（侧边栏导航）
  - `src/app/docs/page.tsx` - Docs 首页
  - `src/app/docs/quick-start/page.tsx` - 快速开始指南
  - `src/app/docs/api-reference/page.tsx` - API 参考文档
- [x] Phase 8: Database Extension
  - `prisma/schema.prisma` - 添加 ApiKey、UsageRecord、Subscription 模型
  - `prisma/migrations/20260131131317_add_api_keys_and_usage/` - 数据库迁移

### 待完成
- [ ] Phase 9: Dashboard - API Key Management
- [ ] Phase 10: Dashboard - Usage Analytics
- [ ] Phase 11: Dashboard - Billing

## 下次继续
运行 `/ccg:spec-impl` 开始 Phase 9: Dashboard - API Key Management

## 任务文件
详细任务列表: `openspec/changes/remaining-features/tasks.md`

## GitHub
https://github.com/moli721/nexusai-gateway
