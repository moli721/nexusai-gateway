"use client"

import { Card, CardContent } from "@/components/ui/card"
import { features } from "@/lib/landing-data"
import { AnimateOnScroll } from "@/components/animate-on-scroll"

export function Features() {
  return (
    <section id="features" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <AnimateOnScroll variant="fade-up" duration={600}>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
              Why Choose NexusAI?
            </h2>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
              Built for developers who demand reliability, speed, and flexibility.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <AnimateOnScroll
                key={index}
                variant="fade-up"
                delay={index * 100}
                duration={500}
              >
                <Card className="h-full border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-400">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}
