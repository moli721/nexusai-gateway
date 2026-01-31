# Implementation Tasks: NexusAI 剩余功能

## Overview
基于 Cubence 参考网站，完善 NexusAI 项目的剩余功能。

---

## Phase 5: Legal & Static Pages

### Task 5.1: 创建 Legal 页面布局组件
**文件**: `src/components/legal/legal-layout.tsx`
**要点**:
- 统一的 Legal 页面布局
- 包含返回首页链接
- 支持深色/浅色模式
- 响应式设计
**验证**: 组件可正常渲染
**状态**: [x] 完成

### Task 5.2: 创建 Privacy Policy 页面
**文件**: `src/app/legal/privacy-policy/page.tsx`
**要点**:
- 使用 Legal 布局组件
- 包含标准隐私政策条款框架
- 最后更新日期
**验证**: `/legal/privacy-policy` 可访问
**状态**: [x] 完成

### Task 5.3: 创建 Terms of Service 页面
**文件**: `src/app/legal/terms-of-service/page.tsx`
**要点**:
- 使用 Legal 布局组件
- 包含标准服务条款框架
- 最后更新日期
**验证**: `/legal/terms-of-service` 可访问
**状态**: [x] 完成

### Task 5.4: 创建 About 页面
**文件**: `src/app/about/page.tsx`
**要点**:
- 产品介绍
- 使命/愿景
- 响应式布局
**验证**: `/about` 可访问
**状态**: [x] 完成

### Task 5.5: 创建 Contact 页面
**文件**: `src/app/contact/page.tsx`
**要点**:
- 联系方式展示
- 可选: 联系表单
- 响应式布局
**验证**: `/contact` 可访问
**状态**: [x] 完成

### Task 5.6: 更新 Footer 链接
**文件**: `src/lib/landing-data.ts`, `src/components/landing/footer.tsx`
**要点**:
- 更新 footerLinks 中的 href
- Privacy Policy → `/legal/privacy-policy`
- Terms of Service → `/legal/terms-of-service`
- About → `/about`
- Contact → `/contact`
**验证**: Footer 链接可正常跳转
**状态**: [x] 完成

---

## Phase 6: Hero Enhancement

### Task 6.1: 安装 Tabs 组件
**命令**:
```bash
npx shadcn@latest add tabs -y
```
**验证**: `src/components/ui/tabs.tsx` 存在
**状态**: [x] 完成

### Task 6.2: 更新代码示例数据
**文件**: `src/lib/landing-data.ts`
**要点**:
- 添加 Claude Code 代码示例
- 添加 Codex 代码示例
- 导出 modelTabs 数据
**验证**: 数据导出正确
**状态**: [x] 完成

### Task 6.3: 更新 CodeWindow 组件
**文件**: `src/components/landing/code-window.tsx`
**要点**:
- 接收 codeLines 作为 prop
- 支持动态切换代码内容
- 切换时重置打字机动画
**验证**: 组件支持动态代码
**状态**: [x] 完成

### Task 6.4: 更新 Hero 组件
**文件**: `src/components/landing/hero.tsx`
**要点**:
- 添加 Tabs 组件
- Tab 切换时更新 CodeWindow
- 平滑过渡动画
**验证**: Tab 切换正常工作
**状态**: [x] 完成

---

## Phase 7: Documentation

### Task 7.1: 创建 Docs 布局
**文件**: `src/app/docs/layout.tsx`
**要点**:
- 侧边栏导航
- 响应式设计
- 移动端折叠菜单
**验证**: 布局正常渲染
**状态**: [x] 完成

### Task 7.2: 创建 Docs 首页
**文件**: `src/app/docs/page.tsx`
**要点**:
- 快速开始指南
- 功能概览
- 导航到子页面
**验证**: `/docs` 可访问
**状态**: [x] 完成

### Task 7.3: 创建 API Reference 页面
**文件**: `src/app/docs/api-reference/page.tsx`
**要点**:
- API 端点列表
- 请求/响应示例
- 参数说明
**验证**: `/docs/api-reference` 可访问
**状态**: [x] 完成

### Task 7.4: 创建 Quick Start 页面
**文件**: `src/app/docs/quick-start/page.tsx`
**要点**:
- 安装步骤
- 配置说明
- 第一个请求示例
**验证**: `/docs/quick-start` 可访问
**状态**: [x] 完成

### Task 7.5: 创建代码块组件
**文件**: `src/components/docs/code-block.tsx`
**要点**:
- 语法高亮
- 复制按钮
- 支持多语言
**验证**: 代码块可复制
**状态**: [x] 完成

### Task 7.6: 更新导航栏 Docs 链接
**文件**: `src/lib/landing-data.ts`
**要点**:
- 更新 navLinks 中 Docs 的 href 为 `/docs`
**验证**: 导航栏 Docs 链接正确
**状态**: [x] 完成

---

## Phase 8: Database Extension

### Task 8.1: 更新 Prisma Schema
**文件**: `prisma/schema.prisma`
**要点**:
- 添加 ApiKey 模型
- 添加 UsageRecord 模型
- 添加 Subscription 模型
**验证**: Schema 语法正确

### Task 8.2: 运行数据库迁移
**命令**:
```bash
npx prisma migrate dev --name add-api-keys-and-usage
npx prisma generate
```
**验证**: 迁移成功，客户端生成

---

## Phase 9: Dashboard - API Key Management

### Task 9.1: 创建 API Key 工具函数
**文件**: `src/lib/api-keys.ts`
**要点**:
- 生成 API Key 函数
- Hash 存储函数
- 验证函数
**验证**: 函数可正常调用

### Task 9.2: 创建 API Key 列表组件
**文件**: `src/components/dashboard/api-key-list.tsx`
**要点**:
- 显示 API Key 列表
- 显示名称、创建时间、最后使用时间
- 删除按钮
**验证**: 组件正常渲染

### Task 9.3: 创建 API Key 创建对话框
**文件**: `src/components/dashboard/api-key-create-dialog.tsx`
**要点**:
- 输入 Key 名称
- 显示生成的 Key (仅一次)
- 复制按钮
**验证**: 对话框功能正常

### Task 9.4: 创建 API Key API 路由
**文件**: `src/app/api/api-keys/route.ts`
**要点**:
- GET: 获取用户的 API Key 列表
- POST: 创建新 API Key
**验证**: API 可正常调用

### Task 9.5: 创建 API Key 删除路由
**文件**: `src/app/api/api-keys/[id]/route.ts`
**要点**:
- DELETE: 删除指定 API Key
**验证**: 删除功能正常

### Task 9.6: 创建 API Keys 页面
**文件**: `src/app/dashboard/api-keys/page.tsx`
**要点**:
- 集成 API Key 列表组件
- 集成创建对话框
- 页面标题和说明
**验证**: `/dashboard/api-keys` 可访问

### Task 9.7: 更新 Dashboard 导航
**文件**: `src/app/dashboard/page.tsx` 或新建侧边栏组件
**要点**:
- 添加 API Keys 导航链接
- 添加 Usage 导航链接
- 添加 Billing 导航链接
**验证**: 导航链接可点击

---

## Phase 10: Dashboard - Usage Analytics

### Task 10.1: 安装图表库
**命令**:
```bash
npm install recharts
```
**验证**: `package.json` 包含 recharts

### Task 10.2: 创建 Usage API 路由
**文件**: `src/app/api/usage/route.ts`
**要点**:
- GET: 获取用户使用统计
- 支持时间范围参数
**验证**: API 返回正确数据

### Task 10.3: 创建 Usage Chart 组件
**文件**: `src/components/dashboard/usage-chart.tsx`
**要点**:
- 使用 recharts 绑制图表
- 显示 API 调用次数
- 显示 Token 使用量
**验证**: 图表正常渲染

### Task 10.4: 创建 Usage 页面
**文件**: `src/app/dashboard/usage/page.tsx`
**要点**:
- 时间范围选择器
- 使用统计卡片
- 图表展示
**验证**: `/dashboard/usage` 可访问

---

## Phase 11: Dashboard - Billing

### Task 11.1: 创建 Billing 数据模型
**文件**: `prisma/schema.prisma` (更新)
**要点**:
- 添加 Subscription 模型
- 添加 Invoice 模型
**验证**: Schema 语法正确

### Task 11.2: 创建 Billing API 路由
**文件**: `src/app/api/billing/route.ts`
**要点**:
- GET: 获取当前订阅信息
- POST: 更新订阅
**验证**: API 可正常调用

### Task 11.3: 创建 Plan Card 组件
**文件**: `src/components/dashboard/plan-card.tsx`
**要点**:
- 显示当前套餐
- 升级/降级按钮
**验证**: 组件正常渲染

### Task 11.4: 创建 Invoice List 组件
**文件**: `src/components/dashboard/invoice-list.tsx`
**要点**:
- 显示账单历史
- 下载发票链接
**验证**: 组件正常渲染

### Task 11.5: 创建 Billing 页面
**文件**: `src/app/dashboard/billing/page.tsx`
**要点**:
- 当前套餐卡片
- 账单历史列表
- 支付方式管理 (可选)
**验证**: `/dashboard/billing` 可访问

---

## Dependency Graph

```
Phase 5 (Legal & Static Pages)
    ↓
Phase 6 (Hero Enhancement)
    ↓
Phase 7 (Documentation)
    ↓
Phase 8 (Database Extension)
    ↓
Phase 9 (API Key Management) ← depends on Phase 8
    ↓
Phase 10 (Usage Analytics) ← depends on Phase 8, 9
    ↓
Phase 11 (Billing) ← depends on Phase 8
```

---

## Verification Checklist

### Phase 5
- [x] Legal 布局组件创建
- [x] Privacy Policy 页面可访问
- [x] Terms of Service 页面可访问
- [x] About 页面可访问
- [x] Contact 页面可访问
- [x] Footer 链接更新

### Phase 6
- [x] Tabs 组件安装
- [x] Hero Tab 切换正常
- [x] 代码窗口内容切换
- [x] 打字机动画重置

### Phase 7
- [x] Docs 布局创建
- [x] Docs 首页可访问
- [x] API Reference 页面可访问
- [x] Quick Start 页面可访问
- [x] 代码块可复制

### Phase 8
- [ ] Prisma Schema 更新
- [ ] 数据库迁移成功

### Phase 9
- [ ] API Key 列表显示
- [ ] API Key 创建功能
- [ ] API Key 删除功能
- [ ] API Key 复制功能

### Phase 10
- [ ] recharts 安装
- [ ] Usage API 正常
- [ ] 图表正常渲染
- [ ] 时间范围筛选

### Phase 11
- [ ] Billing 数据模型
- [ ] 当前套餐显示
- [ ] 账单历史显示
