# Technical Design: NexusAI Landing Page

## 品牌信息

- **名称**: NexusAI
- **定位**: Professional AI API Gateway
- **标语**: Seamless access to AI models with enterprise-grade reliability

---

## 页面结构

```
┌─────────────────────────────────────────────────────────┐
│                      Navigation                          │
│  Logo | Pricing | Docs | FAQ | Theme | Login | Sign Up  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│                      Hero Section                        │
│         Title + Subtitle + CTAs + Code Window           │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│                   Features Section                       │
│              4 Feature Cards (2x2 grid)                 │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│                   Pricing Section                        │
│           Free | Pro | Enterprise Cards                 │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│                     FAQ Section                          │
│              Accordion with 6 questions                 │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                       Footer                             │
│        Product | Company | Legal | Copyright            │
└─────────────────────────────────────────────────────────┘
```

---

## 组件设计

### 1. Navigation (导航栏)

```tsx
// 结构
<nav>
  <Logo /> // NexusAI 品牌
  <NavLinks /> // Pricing, Documentation, FAQ
  <Actions>
    <ModeToggle />
    <LoginButton /> // 未登录
    <UserMenu /> // 已登录
  </Actions>
</nav>

// 样式
- 固定顶部 (sticky top-0)
- 毛玻璃效果 (backdrop-blur-xl)
- 高度 64px (h-16)
- 移动端: 汉堡菜单
```

### 2. Hero Section

```tsx
// 结构
<section>
  <Badge>Now Available</Badge>
  <h1>NexusAI Gateway</h1>
  <h2>Professional AI API Gateway</h2>
  <p>Seamless access to Claude, GPT, and more...</p>
  <CTAs>
    <Button primary>Start Building</Button>
    <Button secondary>Learn More</Button>
  </CTAs>
  <CodeWindow /> // 带打字机动画
</section>

// 样式
- 居中布局
- 渐变背景装饰
- 最大宽度 1200px
```

### 3. Code Window (打字机动画)

```tsx
// 伪代码展示
const codeLines = [
  "import { NexusAI } from 'nexusai';",
  "",
  "const client = new NexusAI({",
  "  apiKey: process.env.NEXUSAI_KEY",
  "});",
  "",
  "const response = await client.chat({",
  "  model: 'claude-3-opus',",
  "  messages: [{ role: 'user', content: 'Hello!' }]",
  "});",
]

// 动画效果
- 逐行显示
- 每行打字机效果
- 语法高亮
```

### 4. Features Section

```tsx
// 4 个功能卡片
const features = [
  {
    icon: <Zap />,
    title: "Lightning Fast",
    description: "Sub-100ms latency with global edge deployment"
  },
  {
    icon: <Shield />,
    title: "Enterprise Security",
    description: "SOC 2 compliant with end-to-end encryption"
  },
  {
    icon: <BarChart />,
    title: "Usage Analytics",
    description: "Real-time monitoring and detailed insights"
  },
  {
    icon: <Layers />,
    title: "Multi-Model Support",
    description: "Access Claude, GPT, Gemini from one API"
  }
]

// 布局
- 桌面: 2x2 网格
- 移动: 单列
```

### 5. Pricing Section

```tsx
// 定价方案
const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    features: [
      "1,000 API calls/month",
      "Community support",
      "Basic analytics",
    ],
    cta: "Get Started",
    highlighted: false
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    features: [
      "50,000 API calls/month",
      "Priority support",
      "Advanced analytics",
      "Custom rate limits",
    ],
    cta: "Start Free Trial",
    highlighted: true // 推荐
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    features: [
      "Unlimited API calls",
      "24/7 dedicated support",
      "SLA guarantee",
      "On-premise deployment",
    ],
    cta: "Contact Sales",
    highlighted: false
  }
]
```

### 6. FAQ Section

```tsx
// FAQ 数据
const faqs = [
  {
    question: "What is NexusAI?",
    answer: "NexusAI is a professional AI API gateway..."
  },
  {
    question: "How does pricing work?",
    answer: "We offer flexible pricing based on usage..."
  },
  {
    question: "What models are supported?",
    answer: "We support Claude, GPT-4, Gemini, and more..."
  },
  {
    question: "Is there an SLA?",
    answer: "Enterprise plans include 99.9% uptime SLA..."
  },
  {
    question: "How do I get started?",
    answer: "Sign up for free and get your API key..."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes, you can cancel your subscription..."
  }
]

// 组件
- 使用 shadcn/ui Accordion
```

### 7. Footer

```tsx
// 结构
<footer>
  <div className="grid grid-cols-4">
    <Brand /> // Logo + 简介
    <ProductLinks /> // Features, Pricing, Docs
    <CompanyLinks /> // About, Blog, Careers
    <LegalLinks /> // Privacy, Terms, Contact
  </div>
  <Copyright>© 2025 NexusAI. All rights reserved.</Copyright>
</footer>
```

---

## 颜色方案

### Light Mode
```css
--background: white
--foreground: zinc-900
--primary: blue-600
--primary-foreground: white
--muted: zinc-100
--accent: purple-600
```

### Dark Mode
```css
--background: zinc-950
--foreground: zinc-50
--primary: blue-500
--primary-foreground: white
--muted: zinc-900
--accent: purple-500
```

---

## 文件结构

```
src/
├── app/
│   ├── page.tsx              # 着陆页 (重写)
│   ├── dashboard/
│   │   └── page.tsx          # 保留
│   └── layout.tsx            # 更新 metadata
├── components/
│   ├── landing/
│   │   ├── hero.tsx          # Hero 区域
│   │   ├── features.tsx      # 功能展示
│   │   ├── pricing.tsx       # 定价卡片
│   │   ├── faq.tsx           # FAQ 手风琴
│   │   ├── footer.tsx        # 页脚
│   │   └── code-window.tsx   # 代码展示 (带动画)
│   ├── landing-navbar.tsx    # 着陆页导航栏
│   └── ... (现有组件保留)
└── lib/
    └── landing-data.ts       # 着陆页数据
```

---

## 需要安装的组件

```bash
npx shadcn@latest add accordion
```

---

## 动画规格

### 打字机效果
```typescript
// 配置
const TYPING_SPEED = 30 // ms per character
const LINE_DELAY = 200 // ms between lines
const INITIAL_DELAY = 500 // ms before start

// 实现方式
- 使用 useState + useEffect
- 逐字符显示
- 支持暂停/重播
```

### 滚动动画
```typescript
// 使用 Intersection Observer
- 元素进入视口时淡入
- 可选: 使用 framer-motion
```
