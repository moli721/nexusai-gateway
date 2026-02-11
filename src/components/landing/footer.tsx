"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { brand, footerLinks } from "@/lib/landing-data"
import { Github, Twitter, Linkedin, ArrowUpRight, ArrowRight } from "lucide-react"
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "motion/react"
import { FadeInView, StaggerContainer, StaggerItem } from "@/components/motion"

function AnimatedLink({
  href,
  children,
  external = false,
}: {
  href: string
  children: React.ReactNode
  external?: boolean
}) {
  return (
    <Link
      href={href}
      className="text-sm text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1 group relative"
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-current group-hover:w-full transition-all duration-300" />
      </span>
      {external && (
        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
      )}
    </Link>
  )
}

function SocialIcon({
  icon: Icon,
  href,
  label,
  index,
}: {
  icon: typeof Twitter
  href: string
  label: string
  index: number
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.a
      href={href}
      className="w-10 h-10 rounded-full bg-white/[0.04] flex items-center justify-center text-zinc-400 hover:bg-white/[0.08] hover:text-zinc-200 transition-colors duration-300 relative overflow-hidden group border border-white/[0.06]"
      aria-label={label}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
      whileHover={shouldReduceMotion ? {} : { y: -3, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/20 to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <Icon className="w-4 h-4 relative z-10" />
    </motion.a>
  )
}

function NewsletterForm() {
  const [isFocused, setIsFocused] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.form
      className="relative"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <motion.div
        className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500/30 to-violet-500/30 blur-lg -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isFocused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="flex gap-2 relative">
        <input
          type="email"
          placeholder="Email"
          className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all duration-300"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <motion.button
          type="submit"
          className="px-4 py-2.5 rounded-xl bg-white text-black text-sm font-medium hover:bg-zinc-100 transition-colors relative overflow-hidden group"
          whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <ArrowRight className="w-4 h-4 relative z-10" />
        </motion.button>
      </div>
    </motion.form>
  )
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0])
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })

  return (
    <footer
      ref={footerRef}
      className="relative border-t border-white/[0.06] bg-black/50"
    >
      <div className="section-divider absolute top-0 left-0 right-0" />

      <motion.div
        className="max-w-6xl mx-auto px-4 py-16 lg:py-20"
        style={{
          opacity: shouldReduceMotion ? 1 : opacity,
          y: shouldReduceMotion ? 0 : smoothY,
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2">
            <FadeInView delay={0} distance={20}>
              <Link href="/" className="inline-flex items-center gap-3 group">
                <motion.div
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/25"
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(99, 102, 241, 0.4)' }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-white font-bold text-lg">N</span>
                </motion.div>
                <span className="text-xl font-bold text-white">
                  {brand.name}
                </span>
              </Link>
            </FadeInView>

            <FadeInView delay={0.1} distance={15}>
              <p className="mt-4 text-sm text-zinc-400 max-w-xs leading-relaxed">
                {brand.description}. The unified API gateway for modern AI applications.
              </p>
            </FadeInView>

            <div className="flex items-center gap-3 mt-6">
              {[
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Github, href: '#', label: 'GitHub' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
              ].map((social, index) => (
                <SocialIcon key={social.label} {...social} index={index} />
              ))}
            </div>
          </div>

          {/* Product links */}
          <StaggerContainer className="space-y-3" staggerDelay={0.05}>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide">
              Product
            </h4>
            {footerLinks.product.map((link, index) => (
              <StaggerItem key={index}>
                <AnimatedLink href={link.href} external={link.href.startsWith('http')}>
                  {link.label}
                </AnimatedLink>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Company links */}
          <StaggerContainer className="space-y-3" staggerDelay={0.05}>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide">
              Company
            </h4>
            {footerLinks.company.map((link, index) => (
              <StaggerItem key={index}>
                <AnimatedLink href={link.href}>
                  {link.label}
                </AnimatedLink>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Legal links */}
          <StaggerContainer className="space-y-3" staggerDelay={0.05}>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide">
              Legal
            </h4>
            {footerLinks.legal.map((link, index) => (
              <StaggerItem key={index}>
                <AnimatedLink href={link.href}>
                  {link.label}
                </AnimatedLink>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Newsletter */}
          <div className="overflow-hidden">
            <FadeInView delay={0.2} distance={15}>
              <h4 className="text-sm font-semibold text-white mb-4 tracking-wide">
                Stay Updated
              </h4>
              <p className="text-sm text-zinc-400 mb-4">
                Get the latest updates and news.
              </p>
            </FadeInView>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom bar */}
        <FadeInView delay={0.5} distance={15}>
          <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-zinc-500">
              &copy; {new Date().getFullYear()} {brand.name}. All rights reserved.
            </p>
            <motion.div
              className="flex items-center gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <span className="flex items-center gap-2 text-sm text-zinc-500">
                <motion.span
                  className="w-2 h-2 rounded-full bg-emerald-500"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                All systems operational
              </span>
            </motion.div>
          </div>
        </FadeInView>
      </motion.div>
    </footer>
  )
}
