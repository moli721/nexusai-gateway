"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { plans } from "@/lib/landing-data"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { AnimateOnScroll } from "@/components/animate-on-scroll"

export function Pricing() {
  return (
    <section id="pricing" className="py-20 px-4 bg-zinc-50/50 dark:bg-zinc-900/50">
      <div className="max-w-5xl mx-auto">
        <AnimateOnScroll variant="fade-up" duration={600}>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
              Start free and scale as you grow. No hidden fees.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <AnimateOnScroll
              key={index}
              variant="fade-up"
              delay={index * 150}
              duration={500}
            >
              <Card
                className={cn(
                  "relative h-full border-zinc-200 dark:border-zinc-800 transition-all",
                  plan.highlighted
                    ? "border-blue-500 dark:border-blue-500 shadow-xl scale-105 bg-white dark:bg-zinc-900"
                    : "bg-white/50 dark:bg-zinc-900/50"
                )}
              >
                {plan.highlighted && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 hover:bg-blue-600">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center pb-2">
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                    {plan.name}
                  </h3>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
                      {plan.price}
                    </span>
                    <span className="text-zinc-500 dark:text-zinc-400">
                      {plan.period}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-zinc-600 dark:text-zinc-400">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={cn(
                      "w-full rounded-full",
                      plan.highlighted
                        ? "bg-blue-600 hover:bg-blue-700"
                        : ""
                    )}
                    variant={plan.highlighted ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
