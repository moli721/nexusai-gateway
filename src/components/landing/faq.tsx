"use client"

import { useState, useRef } from "react"
import { faqs } from "@/lib/landing-data"
import { Plus, Minus, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  AnimatePresence,
} from "motion/react"
import { FadeInView } from "@/components/motion"

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: { question: string; answer: string }
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: 0.1 + index * 0.05,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <motion.button
        onClick={onToggle}
        className={cn(
          "w-full text-left p-6 rounded-2xl transition-all duration-300 relative overflow-hidden group",
          "bg-white/[0.02] backdrop-blur-sm border",
          isOpen
            ? "bg-white/[0.04] border-l-2 border-l-indigo-500 border-white/[0.06]"
            : "border-white/[0.04] hover:bg-white/[0.04] hover:border-white/[0.06]"
        )}
        whileHover={{ scale: shouldReduceMotion ? 1 : 1.005 }}
        whileTap={{ scale: shouldReduceMotion ? 1 : 0.995 }}
      >
        <div className="flex items-start justify-between gap-4 relative z-10">
          <h3 className="text-lg font-semibold text-white pr-8">
            {faq.question}
          </h3>
          <motion.div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300",
              isOpen
                ? "bg-indigo-500 text-white"
                : "bg-white/[0.06] text-zinc-400 group-hover:bg-white/[0.10]"
            )}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="minus"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.15 }}
                >
                  <Minus className="w-4 h-4" />
                </motion.div>
              ) : (
                <motion.div
                  key="plus"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.15 }}
                >
                  <Plus className="w-4 h-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.25, delay: isOpen ? 0.1 : 0 },
              }}
              className="overflow-hidden"
            >
              <motion.p
                className="text-zinc-400 leading-relaxed pr-12 pt-4"
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {faq.answer}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  )
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const sectionRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const smoothBackgroundY = useSpring(backgroundY, { stiffness: 100, damping: 30 })

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="py-32 px-4 relative overflow-hidden"
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ y: shouldReduceMotion ? 0 : smoothBackgroundY }}
      >
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(79,70,229,0.05) 0%, transparent 60%)',
          }}
        />
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <FadeInView delay={0} distance={20}>
            <p className="text-sm font-[family-name:var(--font-manrope)] font-semibold text-indigo-400 tracking-wide uppercase mb-4">
              FAQ
            </p>
          </FadeInView>

          <FadeInView delay={0.1} distance={30}>
            <h2 className="text-4xl sm:text-5xl md:text-[56px] font-bold text-white mb-6 tracking-tight leading-[1.05]">
              Questions?
              <br />
              <span className="text-zinc-500">We have{' '}
                <span className="font-serif italic text-gradient-accent">answers</span>.
              </span>
            </h2>
          </FadeInView>
        </div>

        {/* FAQ items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        {/* Contact CTA */}
        <FadeInView delay={0.4} distance={20}>
          <div className="mt-16 text-center">
            <p className="text-zinc-500 mb-4">
              Still have questions?
            </p>
            <motion.a
              href="/contact"
              className="inline-flex items-center gap-2 text-indigo-400 font-semibold hover:text-indigo-300 transition-colors group"
              whileHover={{ x: 4 }}
            >
              Contact our team
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
        </FadeInView>
      </div>
    </section>
  )
}
