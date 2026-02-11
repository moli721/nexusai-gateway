"use client"

import { useRef } from "react"
import { features } from "@/lib/landing-data"
import { Zap, Shield, BarChart3, Layers, ArrowUpRight } from "lucide-react"
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from "motion/react"
import {
  FadeInView,
  StaggerContainer,
  StaggerItem,
  CountUp,
} from "@/components/motion"

// Feature card with glass style + hover gradient
function FeatureCard({
  feature,
  index,
  isLarge,
}: {
  feature: (typeof features)[0]
  index: number
  isLarge: boolean
}) {
  const Icon = feature.icon
  const cardRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const glareOpacity = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8])
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
    glareOpacity.set(0.15)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    glareOpacity.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`
        group relative overflow-hidden rounded-3xl perspective-1000
        ${isLarge ? 'lg:col-span-2 lg:row-span-2' : ''}
      `}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: shouldReduceMotion ? 0 : springRotateX,
        rotateY: shouldReduceMotion ? 0 : springRotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ z: 20 }}
    >
      <div
        className={`
          h-full p-8 ${isLarge ? 'lg:p-10' : ''} rounded-3xl overflow-hidden
          bg-black/30 backdrop-blur-xl
          border border-white/[0.06]
          group-hover:border-white/[0.10]
          group-hover:shadow-[0_0_60px_-12px_rgba(99,102,241,0.15)]
          transition-all duration-500
        `}
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

        {/* Hover gradient flow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(79,70,229,0.08) 0%, rgba(124,58,237,0.05) 50%, transparent 100%)',
            backgroundSize: '200% 200%',
          }}
        />

        {/* Icon */}
        <motion.div
          className={`
            ${isLarge ? 'w-16 h-16 mb-8' : 'w-12 h-12 mb-6'}
            rounded-2xl flex items-center justify-center relative
            bg-gradient-to-br from-indigo-500 to-violet-600
            shadow-lg shadow-indigo-500/25
          `}
          whileHover={{
            scale: 1.1,
            boxShadow: '0 20px 40px -10px rgba(99, 102, 241, 0.4)',
          }}
          transition={{ duration: 0.3 }}
        >
          <Icon className={`${isLarge ? 'w-8 h-8' : 'w-6 h-6'} text-white relative z-10`} />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-500 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
        </motion.div>

        {/* Content */}
        <h3
          className={`
            ${isLarge ? 'text-2xl lg:text-3xl' : 'text-xl'}
            font-semibold text-white mb-3 tracking-tight
          `}
        >
          {feature.title}
        </h3>
        <p
          className={`
            ${isLarge ? 'text-base lg:text-lg' : 'text-sm'}
            text-zinc-400 leading-relaxed
          `}
        >
          {feature.description}
        </p>

        {/* Large card extra content */}
        {isLarge && (
          <div className="mt-8 pt-6 border-t border-white/[0.06]">
            <motion.a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors group/link"
              whileHover={{ x: 4 }}
            >
              Learn more
              <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </motion.a>
          </div>
        )}

        {/* Decorative gradient */}
        <motion.div
          className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full pointer-events-none overflow-hidden"
          style={{
            background: 'radial-gradient(circle, rgba(79,70,229,0.15) 0%, transparent 70%)',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  )
}

// Stat item with Rubik font for numbers
function StatItem({
  value,
  label,
  index,
  isLast,
}: {
  value: string
  label: string
  index: number
  isLast: boolean
}) {
  const numericMatch = value.match(/[\d,]+/)
  const numericValue = numericMatch ? parseInt(numericMatch[0].replace(/,/g, '')) : null
  const prefix = value.match(/^[<>]/) ? value[0] : ''
  const suffix = value.match(/[%+]$/) ? value[value.length - 1] : ''

  return (
    <motion.div
      className="text-center group relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: 0.5 + index * 0.1,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <motion.div
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight font-[family-name:var(--font-rubik)]"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        {numericValue !== null ? (
          <>
            {prefix}
            <CountUp end={numericValue} duration={2} />
            {suffix}
          </>
        ) : (
          value
        )}
      </motion.div>
      <div className="text-sm text-zinc-400 font-medium group-hover:text-zinc-300 transition-colors">
        {label}
      </div>
      {/* Subtle divider on desktop (not for last item) */}
      {!isLast && (
        <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-white/[0.06]" />
      )}
    </motion.div>
  )
}

export function Features() {
  const sectionRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const smoothBackgroundY = useSpring(backgroundY, { stiffness: 100, damping: 30 })

  const stats = [
    { value: '99.99%', label: 'Uptime SLA' },
    { value: '<50ms', label: 'Avg Latency' },
    { value: '10M+', label: 'API Calls/Day' },
    { value: '5,000+', label: 'Developers' },
  ]

  return (
    <section
      ref={sectionRef}
      id="features"
      className="py-32 px-4 relative overflow-hidden"
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0 -z-10 overflow-hidden"
        style={{ y: shouldReduceMotion ? 0 : smoothBackgroundY }}
      >
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(79,70,229,0.06) 0%, transparent 60%)',
          }}
        />
      </motion.div>

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <FadeInView delay={0} distance={20}>
            <p className="text-sm font-[family-name:var(--font-manrope)] font-semibold text-indigo-400 tracking-wide uppercase mb-4">
              Why NexusAI
            </p>
          </FadeInView>

          <FadeInView delay={0.1} distance={30}>
            <h2 className="text-4xl sm:text-5xl md:text-[56px] font-bold text-white mb-6 tracking-tight leading-[1.05]">
              Built for{' '}
              <span className="font-serif italic text-gradient-accent">developers</span>
              <br />
              <span className="text-zinc-500">who demand excellence.</span>
            </h2>
          </FadeInView>

          <FadeInView delay={0.2} distance={20}>
            <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto">
              Enterprise-grade infrastructure with developer-first experience.
              Every feature designed to help you ship faster.
            </p>
          </FadeInView>
        </div>

        {/* Bento Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6" staggerDelay={0.1}>
          {features.map((feature, index) => {
            const isLarge = index === 0 || index === 3
            return (
              <StaggerItem key={index}>
                <FeatureCard feature={feature} index={index} isLarge={isLarge} />
              </StaggerItem>
            )
          })}
        </StaggerContainer>

        {/* Stats row */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              value={stat.value}
              label={stat.label}
              index={index}
              isLast={index === stats.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
