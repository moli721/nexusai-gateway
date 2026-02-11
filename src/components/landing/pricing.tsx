"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { plans } from "@/lib/landing-data"
import { Check, Sparkles, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
  AnimatePresence,
} from "motion/react"
import { FadeInView } from "@/components/motion"

// Animated price display
function AnimatedPrice({
  price,
  billingCycle,
}: {
  price: string
  billingCycle: 'monthly' | 'yearly'
}) {
  const shouldReduceMotion = useReducedMotion()

  const displayPrice = billingCycle === 'yearly' && price !== 'Custom'
    ? `$${Math.round(parseInt(price.replace('$', '')) * 0.8)}`
    : price

  return (
    <motion.span
      key={displayPrice}
      className="text-5xl lg:text-6xl font-bold tracking-tight inline-block text-white"
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={shouldReduceMotion ? {} : { opacity: 0, y: -20, scale: 0.9 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {displayPrice}
    </motion.span>
  )
}

// Pricing card with glass style
function PricingCard({
  plan,
  index,
  billingCycle,
}: {
  plan: (typeof plans)[0]
  index: number
  billingCycle: 'monthly' | 'yearly'
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const isHighlighted = plan.highlighted

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const glareOpacity = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-6, 6])
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 })

  const glareX = useTransform(mouseX, [-0.5, 0.5], [100, 0])
  const glareY = useTransform(mouseY, [-0.5, 0.5], [100, 0])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set((e.clientX - centerX) / rect.width)
    mouseY.set((e.clientY - centerY) / rect.height)
    glareOpacity.set(isHighlighted ? 0.2 : 0.1)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    glareOpacity.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative perspective-1000",
        isHighlighted ? "md:-mt-4 md:mb-4" : ""
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: 0.2 + index * 0.1,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: shouldReduceMotion ? 0 : springRotateX,
        rotateY: shouldReduceMotion ? 0 : springRotateY,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Animated glow for highlighted card */}
      {isHighlighted && (
        <motion.div
          className="absolute -inset-[2px] rounded-3xl -z-10"
          style={{
            background: 'linear-gradient(135deg, rgba(79,70,229,0.6) 0%, rgba(124,58,237,0.6) 25%, rgba(37,99,235,0.6) 50%, rgba(124,58,237,0.6) 75%, rgba(79,70,229,0.6) 100%)',
            backgroundSize: '200% 200%',
            filter: 'blur(15px)',
          }}
          animate={
            shouldReduceMotion
              ? {}
              : { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }
          }
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
      )}

      <div
        className={cn(
          "h-full rounded-3xl p-8 lg:p-10 transition-all duration-500 relative overflow-hidden",
          "bg-black/30 backdrop-blur-xl border",
          isHighlighted
            ? "border-indigo-500/30 shadow-2xl"
            : "border-white/[0.06] hover:border-white/[0.10] hover:shadow-xl"
        )}
      >
        {/* Glare effect */}
        {!shouldReduceMotion && (
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.2) 0%, transparent 60%)`,
              opacity: glareOpacity,
            }}
          />
        )}

        {/* Badge */}
        {isHighlighted && (
          <motion.div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-xs font-semibold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <Sparkles className="w-3 h-3" />
            Most Popular
          </motion.div>
        )}

        {/* Plan name */}
        <h3 className="text-xl font-semibold text-white mb-2">
          {plan.name}
        </h3>

        {/* Price */}
        <div className="mb-6 h-[72px] flex items-end">
          <AnimatePresence mode="wait">
            <AnimatedPrice
              key={`${plan.price}-${billingCycle}`}
              price={plan.price}
              billingCycle={billingCycle}
            />
          </AnimatePresence>
          <span className="text-base ml-1 mb-2 text-zinc-400">
            {plan.period}
          </span>
        </div>

        {/* Features */}
        <ul className="space-y-4 mb-8">
          {plan.features.map((feature, featureIndex) => (
            <motion.li
              key={featureIndex}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.4 + index * 0.1 + featureIndex * 0.05,
                duration: 0.4,
              }}
            >
              <motion.div
                className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                  isHighlighted
                    ? "bg-indigo-500/20"
                    : "bg-indigo-500/10"
                )}
                whileHover={{ scale: 1.2 }}
              >
                <Check className={cn(
                  "w-3 h-3",
                  isHighlighted ? "text-indigo-400" : "text-indigo-400"
                )} />
              </motion.div>
              <span className="text-sm leading-relaxed text-zinc-400">
                {feature}
              </span>
            </motion.li>
          ))}
        </ul>

        {/* CTA Button */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            className={cn(
              "w-full py-6 rounded-full text-base font-semibold transition-all duration-300 relative overflow-hidden group",
              isHighlighted
                ? "bg-white text-black hover:bg-zinc-100 shadow-lg hover:shadow-xl"
                : "bg-white/[0.06] text-white border border-white/[0.10] hover:bg-white/[0.10]"
            )}
          >
            {/* Shine effect */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="relative flex items-center justify-center">
              {plan.cta}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  const sectionRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const smoothBackgroundY = useSpring(backgroundY, { stiffness: 100, damping: 30 })

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="py-32 px-4 relative overflow-hidden"
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ y: shouldReduceMotion ? 0 : smoothBackgroundY }}
      >
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(79,70,229,0.05) 0%, transparent 60%)',
          }}
        />
      </motion.div>

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <FadeInView delay={0} distance={20}>
            <p className="text-sm font-[family-name:var(--font-manrope)] font-semibold text-indigo-400 tracking-wide uppercase mb-4">
              Pricing
            </p>
          </FadeInView>

          <FadeInView delay={0.1} distance={30}>
            <h2 className="text-4xl sm:text-5xl md:text-[56px] font-bold text-white mb-6 tracking-tight leading-[1.05]">
              Simple,{' '}
              <span className="font-serif italic text-gradient-accent">transparent</span>
              <br />
              <span className="text-zinc-500">pricing.</span>
            </h2>
          </FadeInView>

          <FadeInView delay={0.2} distance={20}>
            <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
              Start free and scale as you grow. No hidden fees, no surprises.
            </p>
          </FadeInView>

          {/* Billing toggle */}
          <FadeInView delay={0.3} distance={20}>
            <div className="inline-flex items-center gap-3 p-1.5 rounded-full bg-white/[0.04] border border-white/[0.06]">
              <motion.button
                onClick={() => setBillingCycle('monthly')}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 relative",
                  billingCycle === 'monthly'
                    ? "text-white"
                    : "text-zinc-400 hover:text-zinc-200"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {billingCycle === 'monthly' && (
                  <motion.div
                    className="absolute inset-0 bg-white/[0.1] rounded-full shadow-md"
                    layoutId="billingToggle"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">Monthly</span>
              </motion.button>
              <motion.button
                onClick={() => setBillingCycle('yearly')}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 relative",
                  billingCycle === 'yearly'
                    ? "text-white"
                    : "text-zinc-400 hover:text-zinc-200"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {billingCycle === 'yearly' && (
                  <motion.div
                    className="absolute inset-0 bg-white/[0.1] rounded-full shadow-md"
                    layoutId="billingToggle"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  Yearly
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
                    -20%
                  </span>
                </span>
              </motion.button>
            </div>
          </FadeInView>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              plan={plan}
              index={index}
              billingCycle={billingCycle}
            />
          ))}
        </div>

        {/* Bottom note */}
        <FadeInView delay={0.6} distance={20}>
          <p className="text-center text-sm text-zinc-500 mt-12">
            All plans include 14-day free trial. No credit card required.
          </p>
        </FadeInView>
      </div>
    </section>
  )
}
