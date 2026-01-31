"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeWindow } from "./code-window"
import { brand, modelTabs } from "@/lib/landing-data"
import { ArrowRight, Sparkles } from "lucide-react"
import { AnimateOnScroll } from "@/components/animate-on-scroll"

export function Hero() {
  const [activeTab, setActiveTab] = useState(modelTabs[0].id)
  const activeModel = modelTabs.find((tab) => tab.id === activeTab) || modelTabs[0]

  return (
    <section className="relative pt-24 pb-20 px-4 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto text-center">
        <AnimateOnScroll variant="fade-down" duration={600}>
          <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            Now Available
          </Badge>
        </AnimateOnScroll>

        <AnimateOnScroll variant="fade-up" delay={100} duration={600}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
            {brand.name}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Gateway
            </span>
          </h1>
        </AnimateOnScroll>

        <AnimateOnScroll variant="fade-up" delay={200} duration={600}>
          <p className="text-xl sm:text-2xl text-zinc-600 dark:text-zinc-400 font-medium mb-4">
            {brand.tagline}
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll variant="fade-up" delay={300} duration={600}>
          <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-500 max-w-2xl mx-auto mb-8">
            {brand.description}. Access Claude, GPT, Gemini and more through a single, unified API.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll variant="fade-up" delay={400} duration={600}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="text-base px-8 py-6 rounded-full">
              Start Building
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 py-6 rounded-full">
              Learn More
            </Button>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll variant="scale" delay={500} duration={700}>
          <div className="space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mx-auto">
                {modelTabs.map((tab) => (
                  <TabsTrigger key={tab.id} value={tab.id}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <CodeWindow
              codeLines={activeModel.codeLines}
              filename={activeModel.filename}
              resetKey={activeTab}
            />
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
