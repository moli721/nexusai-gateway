"use client"

import { useState, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeWindow } from "./code-window"
import { brand, modelTabs } from "@/lib/landing-data"
import { ArrowRight, ChevronRight, Play } from "lucide-react"
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from "motion/react"
import { FadeInView } from "@/components/motion"

const trustLogos = ['Vercel', 'Stripe', 'Linear', 'Notion', 'Figma', 'Supabase', 'Resend', 'Clerk']

export function Hero() {
  const [activeTab, setActiveTab] = useState(modelTabs[0].id)
  const activeModel = modelTabs.find((tab) => tab.id === activeTab) || modelTabs[0]
  const sectionRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const textY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const codeWindowY = useTransform(scrollYProgress, [0, 1], [0, 50])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const smoothTextY = useSpring(textY, { stiffness: 100, damping: 30 })
  const smoothCodeWindowY = useSpring(codeWindowY, { stiffness: 100, damping: 30 })

  // 3D tilt for code window
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5])
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 })

  const handleCodeWindowMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set((e.clientX - centerX) / rect.width)
    mouseY.set((e.clientY - centerY) / rect.height)
  }

  const handleCodeWindowMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  // Word-by-word animation for headline
  const line1Words = ["One", "API."]
  const line2Words = ["Every", "AI", "Model."]

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100vh] flex flex-col justify-center pt-20 pb-32 px-4 overflow-hidden"
    >
      {/* Background: dot grid pattern */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
        {/* Radial gradient fade */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(79,70,229,0.08) 0%, transparent 60%)',
          }}
        />
      </div>

      <motion.div
        className="max-w-6xl mx-auto text-center relative z-10"
        style={{
          y: shouldReduceMotion ? 0 : smoothTextY,
          opacity: shouldReduceMotion ? 1 : opacity,
        }}
      >
        {/* Announcement badge */}
        <FadeInView delay={0} direction="down" distance={20}>
          <div className="mb-8">
            <Badge
              variant="secondary"
              className="px-4 py-2 text-sm font-medium bg-white/[0.06] backdrop-blur-md border border-white/[0.08] shadow-lg hover:bg-white/[0.08] hover:scale-[1.02] transition-all duration-300 cursor-pointer group rounded-full"
            >
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-zinc-300">Now supporting Claude 4 &amp; GPT-5</span>
              <ChevronRight className="w-3.5 h-3.5 ml-2 text-zinc-400 group-hover:translate-x-1 transition-transform" />
            </Badge>
          </div>
        </FadeInView>

        {/* Main headline - word-by-word wave animation */}
        <div className="mb-6">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[84px] font-bold tracking-tight leading-[0.98]">
            {/* Line 1: "One API." */}
            <span className="block text-white">
              {line1Words.map((word, i) => (
                <motion.span
                  key={`l1-${i}`}
                  className="inline-block mr-[0.3em]"
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.3 + i * 0.06,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </span>

            {/* Line 2: "Every AI Model." */}
            <span className="block mt-2">
              {line2Words.map((word, i) => (
                <motion.span
                  key={`l2-${i}`}
                  className={`inline-block mr-[0.3em] ${
                    i >= 1
                      ? "font-serif italic bg-gradient-to-r from-indigo-400 via-violet-400 to-blue-400 bg-clip-text text-transparent"
                      : "text-white"
                  }`}
                  style={i >= 1 ? { backgroundSize: '200% 200%' } : undefined}
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                  animate={
                    i >= 1
                      ? {
                          opacity: 1,
                          y: 0,
                          backgroundPosition: shouldReduceMotion ? undefined : ['0% 50%', '100% 50%', '0% 50%'],
                        }
                      : { opacity: 1, y: 0 }
                  }
                  transition={
                    i >= 1
                      ? {
                          opacity: { delay: 0.3 + (line1Words.length + i) * 0.06, duration: 0.6 },
                          y: { delay: 0.3 + (line1Words.length + i) * 0.06, duration: 0.6 },
                          backgroundPosition: { duration: 5, repeat: Infinity, ease: 'linear' },
                        }
                      : {
                          delay: 0.3 + (line1Words.length + i) * 0.06,
                          duration: 0.6,
                          ease: [0.16, 1, 0.3, 1],
                        }
                  }
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>
        </div>

        {/* Subheadline */}
        <FadeInView delay={0.5} distance={30}>
          <p className="text-[20px] text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Access Claude, GPT-4, Gemini, and more through a single, unified API.
            Enterprise-grade reliability with sub-100ms latency.
          </p>
        </FadeInView>

        {/* CTA Buttons */}
        <FadeInView delay={0.6} distance={30}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                className="text-base px-8 py-7 rounded-full bg-white text-black hover:bg-zinc-100 shadow-xl shadow-white/10 hover:shadow-2xl transition-all duration-300 font-[family-name:var(--font-cabin)] font-semibold"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 py-7 rounded-full border-white/10 text-zinc-300 hover:bg-white/[0.06] hover:text-white transition-all duration-300 font-[family-name:var(--font-cabin)] font-semibold"
              >
                <Play className="mr-2 w-4 h-4" />
                Watch Demo
              </Button>
            </motion.div>
          </div>
        </FadeInView>

        {/* Code Window with 3D Tilt Effect */}
        <FadeInView delay={0.7} distance={50}>
          <motion.div style={{ y: shouldReduceMotion ? 0 : smoothCodeWindowY }}>
            {/* Model selector tabs */}
            <div className="mb-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mx-auto bg-white/[0.04] backdrop-blur-xl p-1.5 rounded-full border border-white/[0.06] shadow-lg">
                  {modelTabs.map((tab) => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="rounded-full px-5 py-2.5 text-sm font-medium text-zinc-400 data-[state=active]:bg-white/[0.1] data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300"
                    >
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {/* Enhanced Code Window with 3D + multi-layer glow */}
            <motion.div
              className="relative perspective-1000"
              onMouseMove={handleCodeWindowMouseMove}
              onMouseLeave={handleCodeWindowMouseLeave}
              style={{
                rotateX: shouldReduceMotion ? 0 : springRotateX,
                rotateY: shouldReduceMotion ? 0 : springRotateY,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Multi-layer glow */}
              <div
                className="absolute inset-0 -z-10 blur-3xl opacity-40 animate-glow-pulse"
                style={{
                  background: 'linear-gradient(135deg, rgba(79,70,229,0.4) 0%, rgba(124,58,237,0.4) 50%, rgba(37,99,235,0.4) 100%)',
                  transform: 'scale(0.95) translateY(30px)',
                }}
              />
              <div
                className="absolute inset-0 -z-20 blur-[80px] opacity-20"
                style={{
                  background: 'linear-gradient(135deg, rgba(79,70,229,0.5) 0%, rgba(37,99,235,0.5) 100%)',
                  transform: 'scale(1.1) translateY(40px)',
                }}
              />

              <CodeWindow
                codeLines={activeModel.codeLines}
                filename={activeModel.filename}
                resetKey={activeTab}
              />
            </motion.div>
          </motion.div>
        </FadeInView>

        {/* Trust Bar - Infinite Marquee */}
        <FadeInView delay={0.9} distance={30}>
          <div className="mt-16">
            <p className="text-sm text-zinc-500 mb-6 font-medium">
              Trusted by developers at
            </p>
            <div className="relative overflow-hidden">
              {/* Fade masks */}
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10" />

              <div className="flex animate-marquee">
                {/* Duplicate content for seamless loop */}
                {[...trustLogos, ...trustLogos].map((company, index) => (
                  <span
                    key={`${company}-${index}`}
                    className="text-lg sm:text-xl font-semibold text-zinc-100 tracking-tight opacity-40 hover:opacity-70 transition-opacity cursor-default mx-8 sm:mx-12 whitespace-nowrap flex-shrink-0"
                  >
                    {company}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FadeInView>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-zinc-500 cursor-pointer"
          whileHover={{ scale: 1.1 }}
          onClick={() => {
            document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-zinc-700 flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-3 bg-zinc-500 rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
