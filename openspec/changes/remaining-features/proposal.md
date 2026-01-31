# OPSX Proposal: NexusAI 剩余功能完善

## Context

### 参考网站分析 (Cubence)
通过分析 https://cubence.com/，识别出以下功能模块：

| 功能 | Cubence | 当前项目 | 状态 |
|------|---------|----------|------|
| Landing Page (Hero, Features, Pricing, FAQ, Footer) | ✓ | ✓ | ✅ 已完成 |
| 导航栏 + 主题切换 | ✓ | ✓ | ✅ 已完成 |
| OAuth 登录 | ✓ | ✓ | ✅ 已完成 |
| Dashboard 基础页面 | ✓ | ✓ | ✅ 已完成 |
| 滚动动画 | ✓ | ✓ | ✅ 已完成 |
| Hero Tab 切换 (Claude Code / Codex) | ✓ | ✗ | ❌ 未实现 |
| Legal 页面 (Privacy, Terms) | ✓ | ✗ | ❌ 未实现 |
| Documentation 页面 | ✓ | ✗ | ❌ 未实现 |
| About 页面 | ✓ | ✗ | ❌ 未实现 |
| Contact 页面 | ✓ | ✗ | ❌ 未实现 |
| Blog 页面 | ✓ | ✗ | ❌ 未实现 |
| API Key 管理 | ✓ | ✗ | ❌ 未实现 |
| Usage Analytics | ✓ | ✗ | ❌ 未实现 |
| Billing 管理 | ✓ | ✗ | ❌ 未实现 |

### 用户需求
完善 NexusAI 项目，补充 Cubence 风格网站的剩余功能。

---

## Constraint Sets (约束集)

### Hard Constraints (硬约束)

| ID | 约束 | 原因 |
|----|------|------|
| HC-1 | 必须使用现有技术栈 (Next.js 16 + Tailwind v4 + shadcn/ui) | 项目一致性 |
| HC-2 | 必须保持现有 OAuth 登录功能 | 已实现功能不可破坏 |
| HC-3 | 必须支持深色/浅色模式 | 设计一致性 |
| HC-4 | Legal 页面必须包含真实的法律条款框架 | 合规要求 |
| HC-5 | Dashboard 功能需要用户认证 | 安全要求 |

### Soft Constraints (软约束)

| ID | 约束 | 原因 |
|----|------|------|
| SC-1 | 优先实现 Legal 页面 | 网站上线必需 |
| SC-2 | Documentation 可使用外部链接或简单页面 | 降低复杂度 |
| SC-3 | Blog 可作为可选功能 | 非核心功能 |
| SC-4 | API Key 管理为 Dashboard 核心功能 | 产品核心价值 |

---

## Requirements (需求)

### R1: Hero Tab 切换功能
**场景**: 用户在 Hero 区域切换查看不同 AI 模型的代码示例
**验收标准**:
- [ ] 添加 Tab 组件 (Claude Code / Codex)
- [ ] 切换时代码窗口内容变化
- [ ] 保持打字机动画效果
- [ ] Tab 切换有平滑过渡

### R2: Legal 页面
**场景**: 用户点击页脚的 Privacy Policy 或 Terms of Service
**验收标准**:
- [ ] `/legal/privacy-policy` 页面存在
- [ ] `/legal/terms-of-service` 页面存在
- [ ] 页面包含标准法律条款框架
- [ ] 支持深色/浅色模式
- [ ] 响应式布局

### R3: Documentation 页面
**场景**: 用户点击导航栏的 Docs 链接
**验收标准**:
- [ ] `/docs` 页面存在或跳转到外部文档
- [ ] 包含 API 使用指南
- [ ] 包含快速开始教程
- [ ] 代码示例可复制

### R4: About 页面
**场景**: 用户点击页脚的 About 链接
**验收标准**:
- [ ] `/about` 页面存在
- [ ] 包含产品介绍
- [ ] 包含团队/公司信息
- [ ] 响应式布局

### R5: Contact 页面
**场景**: 用户需要联系支持
**验收标准**:
- [ ] `/contact` 页面存在或提供联系方式
- [ ] 包含联系表单或邮箱链接
- [ ] 响应式布局

### R6: Dashboard - API Key 管理
**场景**: 已登录用户管理 API 密钥
**验收标准**:
- [ ] 显示用户的 API Key 列表
- [ ] 支持创建新 API Key
- [ ] 支持删除 API Key
- [ ] API Key 创建后只显示一次
- [ ] 支持复制 API Key

### R7: Dashboard - Usage Analytics
**场景**: 已登录用户查看 API 使用情况
**验收标准**:
- [ ] 显示 API 调用次数统计
- [ ] 显示 Token 使用量
- [ ] 支持时间范围筛选
- [ ] 图表可视化

### R8: Dashboard - Billing 管理
**场景**: 已登录用户管理账单
**验收标准**:
- [ ] 显示当前套餐
- [ ] 显示账单历史
- [ ] 支持升级/降级套餐
- [ ] 支持支付方式管理

---

## Priority Matrix (优先级矩阵)

| 优先级 | 需求 | 原因 |
|--------|------|------|
| P0 (必须) | R2: Legal 页面 | 网站上线法律合规必需 |
| P1 (重要) | R1: Hero Tab 切换 | 提升首页体验 |
| P1 (重要) | R6: API Key 管理 | 产品核心功能 |
| P2 (一般) | R3: Documentation | 用户引导 |
| P2 (一般) | R4: About 页面 | 品牌建设 |
| P2 (一般) | R5: Contact 页面 | 用户支持 |
| P3 (可选) | R7: Usage Analytics | 增值功能 |
| P3 (可选) | R8: Billing 管理 | 商业化功能 |

---

## Implementation Phases (实施阶段)

### Phase 5: Legal & Static Pages
- Task 5.1: 创建 Legal 页面布局组件
- Task 5.2: 创建 Privacy Policy 页面
- Task 5.3: 创建 Terms of Service 页面
- Task 5.4: 创建 About 页面
- Task 5.5: 创建 Contact 页面
- Task 5.6: 更新 Footer 链接

### Phase 6: Hero Enhancement
- Task 6.1: 添加 Tab 组件到 Hero
- Task 6.2: 创建多模型代码示例数据
- Task 6.3: 实现 Tab 切换动画

### Phase 7: Documentation
- Task 7.1: 创建 Docs 页面结构
- Task 7.2: 编写 API 文档内容
- Task 7.3: 添加代码示例组件

### Phase 8: Dashboard Enhancement
- Task 8.1: 设计 API Key 数据模型
- Task 8.2: 创建 API Key 管理 UI
- Task 8.3: 实现 API Key CRUD 接口
- Task 8.4: 创建 Usage Analytics UI (可选)
- Task 8.5: 创建 Billing 管理 UI (可选)

---

## File Structure (文件结构)

```
src/
├── app/
│   ├── legal/
│   │   ├── layout.tsx           # Legal 页面布局
│   │   ├── privacy-policy/
│   │   │   └── page.tsx         # 隐私政策
│   │   └── terms-of-service/
│   │       └── page.tsx         # 服务条款
│   ├── about/
│   │   └── page.tsx             # 关于页面
│   ├── contact/
│   │   └── page.tsx             # 联系页面
│   ├── docs/
│   │   ├── page.tsx             # 文档首页
│   │   └── [...slug]/
│   │       └── page.tsx         # 文档子页面
│   └── dashboard/
│       ├── page.tsx             # Dashboard 首页 (已有)
│       ├── api-keys/
│       │   └── page.tsx         # API Key 管理
│       ├── usage/
│       │   └── page.tsx         # 使用统计
│       └── billing/
│           └── page.tsx         # 账单管理
├── components/
│   ├── landing/
│   │   ├── hero.tsx             # 更新: 添加 Tab 切换
│   │   └── code-window.tsx      # 更新: 支持多模型
│   ├── legal/
│   │   └── legal-layout.tsx     # Legal 页面布局
│   └── dashboard/
│       ├── api-key-list.tsx     # API Key 列表
│       ├── api-key-create.tsx   # 创建 API Key
│       └── usage-chart.tsx      # 使用统计图表
└── lib/
    └── landing-data.ts          # 更新: 添加多模型代码示例
```

---

## Database Schema Extension (数据库扩展)

```prisma
// 新增 API Key 模型
model ApiKey {
  id        String   @id @default(cuid())
  name      String
  key       String   @unique
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  lastUsed  DateTime?

  @@index([userId])
}

// 新增 Usage 记录模型 (可选)
model UsageRecord {
  id        String   @id @default(cuid())
  apiKeyId  String
  apiKey    ApiKey   @relation(fields: [apiKeyId], references: [id], onDelete: Cascade)
  tokens    Int
  model     String
  createdAt DateTime @default(now())

  @@index([apiKeyId])
  @@index([createdAt])
}
```

---

## Success Criteria (成功判据)

1. **Legal 合规**: Privacy Policy 和 Terms of Service 页面可访问
2. **功能完整**: Hero Tab 切换正常工作
3. **Dashboard 增强**: API Key 管理功能可用
4. **响应式**: 所有新页面在移动端正常显示
5. **主题支持**: 所有新页面支持深色/浅色模式

---

## Risks & Mitigations (风险与缓解)

| 风险 | 影响 | 缓解措施 |
|------|------|----------|
| Legal 内容不专业 | 法律风险 | 使用标准模板，建议用户咨询律师 |
| API Key 安全性 | 数据泄露 | 只在创建时显示完整 Key，存储 Hash |
| Dashboard 复杂度增加 | 开发周期延长 | 分阶段实现，P3 功能可选 |

---

## Resolved Questions (已确认)

| 问题 | 用户选择 |
|------|----------|
| Documentation 级别 | 多页文档（快速开始、API 参考、示例等） |
| Dashboard 功能 | API Key 管理 + Usage Analytics + Billing 管理 |
| Blog 功能 | 不需要 |

## Open Questions (待确认)

1. **API Key**: 是否需要限制每个用户的 API Key 数量？
2. **Usage Analytics**: 是否需要实时统计，还是每日汇总？
3. **Billing**: 是否需要集成真实支付系统（Stripe 等）？
