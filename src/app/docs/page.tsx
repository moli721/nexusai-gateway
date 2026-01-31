import Link from "next/link"
import { ArrowRight, Rocket, Code, Zap, Shield } from "lucide-react"

export const metadata = {
  title: "Documentation - NexusAI",
  description: "Learn how to integrate NexusAI into your applications",
}

const quickLinks = [
  {
    href: "/docs/quick-start",
    icon: Rocket,
    title: "Quick Start",
    description: "Get up and running in minutes with our step-by-step guide",
  },
  {
    href: "/docs/api-reference",
    icon: Code,
    title: "API Reference",
    description: "Complete API documentation with examples and parameters",
  },
]

const features = [
  {
    icon: Zap,
    title: "Simple Integration",
    description: "Drop-in replacement for OpenAI SDK with multi-model support",
  },
  {
    icon: Shield,
    title: "Enterprise Ready",
    description: "SOC 2 compliant with end-to-end encryption and audit logs",
  },
]

export default function DocsPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
        NexusAI Documentation
      </h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
        Welcome to the NexusAI documentation. Learn how to integrate our unified AI API gateway into your applications.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          Get Started
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {quickLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                className="group p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-md bg-zinc-100 dark:bg-zinc-800">
                    <Icon className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                  </div>
                  <h3 className="font-medium text-zinc-900 dark:text-zinc-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {link.title}
                  </h3>
                  <ArrowRight className="w-4 h-4 ml-auto text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {link.description}
                </p>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          Why NexusAI?
        </h2>
        <div className="space-y-4">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="flex gap-4">
                <div className="p-2 rounded-md bg-zinc-100 dark:bg-zinc-800 h-fit">
                  <Icon className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                </div>
                <div>
                  <h3 className="font-medium text-zinc-900 dark:text-zinc-50 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          Supported Models
        </h2>
        <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <ul className="grid grid-cols-2 gap-2 text-sm text-zinc-600 dark:text-zinc-400 list-none">
            <li>• Claude 3 (Opus, Sonnet, Haiku)</li>
            <li>• GPT-4o, GPT-4 Turbo</li>
            <li>• Gemini Pro, Gemini Flash</li>
            <li>• Llama 3, Mistral</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
