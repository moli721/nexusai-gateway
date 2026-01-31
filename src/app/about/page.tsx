import Link from "next/link"
import { ArrowLeft, Zap, Shield, Globe, Users } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <header className="sticky top-0 z-50 border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto flex h-16 items-center justify-between px-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <ModeToggle />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
            About NexusAI
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Empowering developers with seamless access to the world&apos;s most powerful AI models.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-4">
            At NexusAI, we believe that AI should be accessible to every developer, regardless of
            their technical background or resources. Our mission is to simplify AI integration by
            providing a unified gateway to multiple AI models through a single, elegant API.
          </p>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            We handle the complexity of managing multiple AI providers, so you can focus on
            building amazing products that leverage the power of artificial intelligence.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Unified API
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Access Claude, GPT, Gemini, and more through a single, consistent API interface.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
              <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Enterprise Security
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Bank-grade encryption, SOC 2 compliance, and robust access controls.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
              <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Global Infrastructure
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Low-latency access from anywhere with our globally distributed network.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
              <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Developer First
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Comprehensive documentation, SDKs, and responsive support.
              </p>
            </div>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Join thousands of developers building with NexusAI.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:opacity-90 transition-opacity"
          >
            Start Building Today
          </Link>
        </section>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center">
            © {new Date().getFullYear()} NexusAI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
