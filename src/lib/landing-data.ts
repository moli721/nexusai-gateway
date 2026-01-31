import { Zap, Shield, BarChart3, Layers } from "lucide-react"

export const brand = {
  name: "NexusAI",
  tagline: "Professional AI API Gateway",
  description: "Seamless access to AI models with enterprise-grade reliability",
}

export const navLinks = [
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "/docs" },
  { label: "FAQ", href: "#faq" },
]

export const codeLines = [
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

export const modelTabs = [
  {
    id: "nexusai",
    label: "NexusAI SDK",
    filename: "index.ts",
    codeLines: [
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
    ],
  },
  {
    id: "claude",
    label: "Claude Code",
    filename: "claude.ts",
    codeLines: [
      "// Use NexusAI as Claude Code backend",
      "export ANTHROPIC_BASE_URL=https://api.nexusai.dev",
      "export ANTHROPIC_API_KEY=your_nexusai_key",
      "",
      "// Then run Claude Code normally",
      "claude --model claude-sonnet-4",
      "",
      "// All requests route through NexusAI",
    ],
  },
  {
    id: "codex",
    label: "Codex CLI",
    filename: "codex.sh",
    codeLines: [
      "# Configure Codex to use NexusAI",
      "export OPENAI_BASE_URL=https://api.nexusai.dev/v1",
      "export OPENAI_API_KEY=your_nexusai_key",
      "",
      "# Run Codex with any supported model",
      "codex --model gpt-4o",
      "",
      "# Seamless multi-model access",
    ],
  },
  {
    id: "openai",
    label: "OpenAI SDK",
    filename: "openai.ts",
    codeLines: [
      "import OpenAI from 'openai';",
      "",
      "const client = new OpenAI({",
      "  baseURL: 'https://api.nexusai.dev/v1',",
      "  apiKey: process.env.NEXUSAI_KEY",
      "});",
      "",
      "const response = await client.chat.completions.create({",
      "  model: 'gpt-4o',",
      "  messages: [{ role: 'user', content: 'Hello!' }]",
      "});",
    ],
  },
]

export const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Sub-100ms latency with global edge deployment",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 compliant with end-to-end encryption",
  },
  {
    icon: BarChart3,
    title: "Usage Analytics",
    description: "Real-time monitoring and detailed insights",
  },
  {
    icon: Layers,
    title: "Multi-Model Support",
    description: "Access Claude, GPT, Gemini from one API",
  },
]

export const plans = [
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
    highlighted: false,
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
    highlighted: true,
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
    highlighted: false,
  },
]

export const faqs = [
  {
    question: "What is NexusAI?",
    answer: "NexusAI is a professional AI API gateway that provides seamless access to multiple AI models including Claude, GPT-4, and Gemini through a single, unified API. We handle the complexity of model routing, rate limiting, and failover so you can focus on building great products.",
  },
  {
    question: "How does pricing work?",
    answer: "We offer flexible pricing based on your usage. The Free tier includes 1,000 API calls per month, perfect for testing and small projects. Pro plans start at $29/month with 50,000 calls. Enterprise customers get custom pricing with unlimited calls and dedicated support.",
  },
  {
    question: "What models are supported?",
    answer: "We support all major AI models including Claude 3 (Opus, Sonnet, Haiku), GPT-4, GPT-3.5, Gemini Pro, and more. New models are added regularly, and you can switch between them with a single parameter change.",
  },
  {
    question: "Is there an SLA?",
    answer: "Enterprise plans include a 99.9% uptime SLA with guaranteed response times. We also provide dedicated support channels and priority incident response for enterprise customers.",
  },
  {
    question: "How do I get started?",
    answer: "Getting started is easy! Sign up for a free account, grab your API key from the dashboard, and start making requests. Our documentation includes quickstart guides for all major programming languages.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees. Your access will continue until the end of your current billing period.",
  },
]

export const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Documentation", href: "/docs" },
    { label: "API Reference", href: "/docs/api-reference" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/legal/privacy-policy" },
    { label: "Terms of Service", href: "/legal/terms-of-service" },
    { label: "Cookie Policy", href: "#" },
  ],
}
