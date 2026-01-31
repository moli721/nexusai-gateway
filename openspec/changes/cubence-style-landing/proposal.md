# OPSX Proposal: Cubence 风格 AI API 网关着陆页

## Context

### 用户需求
将现有的 LinuxDo OAuth 应用改造为类似 Cubence (https://cubence.com/) 的 AI API 网关服务着陆页，保留 OAuth 登录功能。

### 参考网站分析 (Cubence)
- **产品类型**: AI API 网关服务（Claude Code & Codex）
- **设计风格**: 现代 SaaS 着陆页，支持深色/浅色模式
- **页面结构**: 导航栏 → Hero → 功能展示 → 定价 → FAQ → 页脚
- **技术栈**: Next.js + Tailwind CSS

### 现有项目状态
- Next.js 16.1.6 + TypeScript + Tailwind CSS v4
- shadcn/ui 组件库已配置
- LinuxDo OAuth 登录已实现
- 深色/浅色主题切换已实现

---

## Constraint Sets (约束集)

### Hard Constraints (硬约束)

| ID | 约束 | 原因 |
|----|------|------|
| HC-1 | 必须保留 LinuxDo OAuth 登录功能 | 用户明确要求 |
| HC-2 | 必须使用现有技术栈 (Next.js 16 + Tailwind v4) | 项目已配置 |
| HC-3 | 必须支持深色/浅色模式切换 | 参考网站特性 |
| HC-4 | 必须响应式设计 (移动端适配) | 现代 Web 标准 |
| HC-5 | 不得复制 Cubence 的 Logo 或版权内容 | 法律合规 |

### Soft Constraints (软约束)

| ID | 约束 | 原因 |
|----|------|------|
| SC-1 | 优先使用现有 shadcn/ui 组件 | 保持一致性 |
| SC-2 | 遵循现有代码风格 (函数组件 + TypeScript) | 可维护性 |
| SC-3 | 使用 Geist 字体 (已配置) | 视觉一致性 |
| SC-4 | 保持毛玻璃效果设计语言 | 现有设计风格 |

### Dependencies (依赖关系)

| 组件 | 依赖 |
|------|------|
| 着陆页 | 导航栏组件 |
| 定价卡片 | Card 组件 (已有) |
| FAQ 手风琴 | 需安装 Accordion 组件 |
| 登录/注册按钮 | OAuth 认证系统 (已有) |

---

## Requirements (需求规格)

### R1: 导航栏重构
**场景**: 用户访问任意页面时，顶部显示统一导航栏
**验收标准**:
- [ ] 左侧显示品牌 Logo 和名称
- [ ] 中间显示导航链接: Pricing, Documentation, FAQ
- [ ] 右侧显示: 主题切换, Login, Sign Up 按钮
- [ ] 已登录用户显示头像下拉菜单
- [ ] 滚动时导航栏固定在顶部 (sticky)
- [ ] 支持移动端汉堡菜单

### R2: Hero 区域
**场景**: 用户首次访问着陆页，看到产品核心价值主张
**验收标准**:
- [ ] 大标题展示产品名称和核心功能
- [ ] 副标题描述产品价值
- [ ] 两个 CTA 按钮: "Start Building" (主要), "Learn More" (次要)
- [ ] 可选: 代码展示窗口或产品截图
- [ ] 背景使用渐变或装饰元素

### R3: 功能展示区
**场景**: 用户向下滚动，了解产品核心功能
**验收标准**:
- [ ] 展示 3-4 个核心功能卡片
- [ ] 每个卡片包含: 图标, 标题, 描述
- [ ] 支持深色/浅色模式
- [ ] 响应式布局 (桌面 3 列, 移动端 1 列)

### R4: 定价区域
**场景**: 用户想了解产品价格
**验收标准**:
- [ ] 标题 "Simple, Transparent Pricing"
- [ ] 至少 2-3 个定价方案卡片
- [ ] 每个方案显示: 名称, 价格, 功能列表, CTA 按钮
- [ ] 推荐方案高亮显示
- [ ] 支持月付/年付切换 (可选)

### R5: FAQ 区域
**场景**: 用户有常见问题需要解答
**验收标准**:
- [ ] 使用手风琴 (Accordion) 组件
- [ ] 至少 4-6 个常见问题
- [ ] 点击展开/收起答案
- [ ] 支持深色/浅色模式

### R6: 页脚
**场景**: 用户滚动到页面底部
**验收标准**:
- [ ] 分栏布局: Product, Company, Legal
- [ ] 包含必要链接: Privacy Policy, Terms of Service
- [ ] 版权信息
- [ ] 响应式布局

### R7: Dashboard 保留
**场景**: 已登录用户访问 /dashboard
**验收标准**:
- [ ] 保留现有 Dashboard 页面
- [ ] 保留用户资料展示
- [ ] 导航栏显示已登录状态

---

## Success Criteria (成功判据)

1. **视觉一致性**: 着陆页风格与 Cubence 相似度 > 80%
2. **功能完整性**: 所有 R1-R7 需求验收标准通过
3. **响应式**: 在 375px (移动) 和 1440px (桌面) 宽度下正常显示
4. **性能**: Lighthouse Performance 分数 > 80
5. **可访问性**: 支持键盘导航, 颜色对比度符合 WCAG AA

---

## Risks & Mitigations

| 风险 | 影响 | 缓解措施 |
|------|------|----------|
| Accordion 组件未安装 | FAQ 功能受阻 | 使用 shadcn/ui 安装 |
| 品牌名称未确定 | 无法完成 Hero 区域 | 使用占位符，后续替换 |
| 代码展示窗口复杂 | 开发时间增加 | 可简化为静态图片 |

---

## Resolved Questions (已确认)

| 问题 | 答案 |
|------|------|
| 品牌名称 | **NexusAI** |
| 定价数据 | 使用示例数据 (Free/Pro/Enterprise) |
| 代码展示动画 | 需要打字机动画效果 |
| Documentation | 仅放链接，不实现完整页面 |
