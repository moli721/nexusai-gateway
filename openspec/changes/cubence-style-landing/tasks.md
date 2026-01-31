# Implementation Tasks: NexusAI Landing Page

## Overview
将现有 LinuxDo OAuth 应用改造为 NexusAI 风格的 AI API 网关着陆页。

---

## Phase 1: 基础设施准备

### Task 1.1: 安装 Accordion 组件
**命令**:
```bash
npx shadcn@latest add accordion -y
```
**验证**: `src/components/ui/accordion.tsx` 存在

### Task 1.2: 创建着陆页数据文件
**文件**: `src/lib/landing-data.ts`
**内容**: 品牌信息、功能列表、定价方案、FAQ 数据
**验证**: 文件存在且导出正确

---

## Phase 2: 组件开发

### Task 2.1: 创建代码展示窗口组件 (带打字机动画)
**文件**: `src/components/landing/code-window.tsx`
**要点**:
- 打字机动画效果
- 语法高亮样式
- 深色/浅色模式支持
**验证**: 组件渲染正常，动画流畅

### Task 2.2: 创建 Hero 区域组件
**文件**: `src/components/landing/hero.tsx`
**要点**:
- 品牌标题和副标题
- CTA 按钮 (Start Building, Learn More)
- 集成 CodeWindow 组件
- 渐变背景装饰
**验证**: 布局正确，响应式

### Task 2.3: 创建功能展示组件
**文件**: `src/components/landing/features.tsx`
**要点**:
- 4 个功能卡片
- 图标 + 标题 + 描述
- 2x2 网格布局
**验证**: 卡片显示正确

### Task 2.4: 创建定价卡片组件
**文件**: `src/components/landing/pricing.tsx`
**要点**:
- Free / Pro / Enterprise 三个方案
- Pro 方案高亮显示
- 功能列表
- CTA 按钮
**验证**: 卡片样式正确，高亮效果明显

### Task 2.5: 创建 FAQ 组件
**文件**: `src/components/landing/faq.tsx`
**要点**:
- 使用 Accordion 组件
- 6 个常见问题
- 展开/收起动画
**验证**: 手风琴功能正常

### Task 2.6: 创建页脚组件
**文件**: `src/components/landing/footer.tsx`
**要点**:
- 4 列布局 (Brand, Product, Company, Legal)
- 链接列表
- 版权信息
**验证**: 布局正确，链接可点击

### Task 2.7: 创建着陆页导航栏
**文件**: `src/components/landing-navbar.tsx`
**要点**:
- 品牌 Logo (NexusAI)
- 导航链接 (Pricing, Docs, FAQ)
- 主题切换 + 登录按钮
- 已登录显示用户菜单
- 移动端汉堡菜单
**验证**: 导航功能正常，响应式

---

## Phase 3: 页面集成

### Task 3.1: 重写着陆页
**文件**: `src/app/page.tsx`
**要点**:
- 集成所有着陆页组件
- 已登录用户不再自动跳转 dashboard
- 页面滚动平滑
**验证**: 页面完整显示所有区域

### Task 3.2: 更新 Layout 元数据
**文件**: `src/app/layout.tsx`
**要点**:
- 更新 title 为 "NexusAI - Professional AI API Gateway"
- 更新 description
**验证**: 浏览器标签显示正确

### Task 3.3: 保留 Dashboard 页面
**文件**: `src/app/dashboard/page.tsx`
**要点**:
- 保持现有功能
- 更新导航栏为新版本
**验证**: Dashboard 功能正常

---

## Phase 4: 样式优化

### Task 4.1: 添加滚动动画
**要点**:
- 元素进入视口时淡入
- 可选使用 CSS 或 framer-motion
**验证**: 滚动时有动画效果

### Task 4.2: 响应式测试与修复
**要点**:
- 测试 375px (移动端)
- 测试 768px (平板)
- 测试 1440px (桌面)
**验证**: 所有断点显示正常

### Task 4.3: 深色/浅色模式测试
**要点**:
- 检查所有组件在两种模式下的显示
- 修复颜色对比度问题
**验证**: 两种模式下视觉效果良好

---

## Dependency Graph

```
Phase 1 (基础设施)
    ↓
Phase 2 (组件开发)
    ├── Task 2.1 (CodeWindow)
    │       ↓
    ├── Task 2.2 (Hero) ← depends on 2.1
    ├── Task 2.3 (Features)
    ├── Task 2.4 (Pricing)
    ├── Task 2.5 (FAQ) ← depends on 1.1
    ├── Task 2.6 (Footer)
    └── Task 2.7 (Navbar)
            ↓
Phase 3 (页面集成) ← depends on all Phase 2
    ↓
Phase 4 (样式优化)
```

---

## Verification Checklist

- [ ] Accordion 组件安装成功
- [ ] 所有着陆页组件创建完成
- [ ] 着陆页显示完整
- [ ] 打字机动画效果正常
- [ ] 导航栏功能正常
- [ ] 定价卡片显示正确
- [ ] FAQ 手风琴功能正常
- [ ] 页脚链接正确
- [ ] 响应式布局正常
- [ ] 深色/浅色模式正常
- [ ] OAuth 登录功能保留
- [ ] Dashboard 页面正常
