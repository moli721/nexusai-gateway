"use client"

import { ReactNode, useRef, useEffect, useState } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
  MotionValue,
} from "motion/react"
import { cn } from "@/lib/utils"

// ============================================
// FadeInView - Scroll-triggered fade animation
// ============================================
interface FadeInViewProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  distance?: number
  once?: boolean
}

export function FadeInView({
  children,
  className,
  delay = 0,
  duration = 0.6,
  direction = "up",
  distance = 30,
  once = true,
}: FadeInViewProps) {
  const shouldReduceMotion = useReducedMotion()

  const directionOffset = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  }

  const initial = shouldReduceMotion
    ? { opacity: 0 }
    : { opacity: 0, ...directionOffset[direction] }

  const animate = shouldReduceMotion
    ? { opacity: 1 }
    : { opacity: 1, x: 0, y: 0 }

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once, margin: "-50px" }}
      transition={{
        duration: shouldReduceMotion ? 0.3 : duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

// ============================================
// StaggerContainer - Stagger children animations
// ============================================
interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  once?: boolean
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  once = true,
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

// ============================================
// StaggerItem - Child item for StaggerContainer
// ============================================
interface StaggerItemProps {
  children: ReactNode
  className?: string
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      variants={{
        hidden: shouldReduceMotion
          ? { opacity: 0 }
          : { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

// ============================================
// ParallaxSection - Scroll parallax effect
// ============================================
interface ParallaxSectionProps {
  children: ReactNode
  className?: string
  speed?: number // Negative = slower, Positive = faster
  offset?: [string, string]
}

export function ParallaxSection({
  children,
  className,
  speed = 0.5,
  offset = ["start end", "end start"],
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100])
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      ref={ref}
      className={cn("parallax-layer", className)}
      style={{ y: shouldReduceMotion ? 0 : smoothY }}
    >
      {children}
    </motion.div>
  )
}

// ============================================
// Card3D - 3D tilt effect on hover
// ============================================
interface Card3DProps {
  children: ReactNode
  className?: string
  intensity?: number
  glare?: boolean
}

export function Card3D({
  children,
  className,
  intensity = 10,
  glare = true,
}: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-0.5, 0.5], [intensity, -intensity])
  const rotateY = useTransform(x, [-0.5, 0.5], [-intensity, intensity])

  const springConfig = { stiffness: 300, damping: 30 }
  const springRotateX = useSpring(rotateX, springConfig)
  const springRotateY = useSpring(rotateY, springConfig)

  const glareX = useTransform(x, [-0.5, 0.5], [100, 0])
  const glareY = useTransform(y, [-0.5, 0.5], [100, 0])
  const glareOpacity = useMotionValue(0)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (shouldReduceMotion || !ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    x.set((e.clientX - centerX) / rect.width)
    y.set((e.clientY - centerY) / rect.height)
    glareOpacity.set(0.15)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
    glareOpacity.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={cn("perspective-1000", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: shouldReduceMotion ? 0 : springRotateX,
        rotateY: shouldReduceMotion ? 0 : springRotateY,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
      {glare && !shouldReduceMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-inherit"
          style={{
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.3) 0%, transparent 60%)`,
            opacity: glareOpacity,
          }}
        />
      )}
    </motion.div>
  )
}

// ============================================
// CountUp - Animated number counter
// ============================================
interface CountUpProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
  decimals?: number
}

export function CountUp({
  end,
  duration = 2,
  prefix = "",
  suffix = "",
  className,
  decimals = 0,
}: CountUpProps) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) {
      setCount(end)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const startTime = performance.now()
          const animate = (currentTime: number) => {
            const elapsed = (currentTime - startTime) / 1000
            const progress = Math.min(elapsed / duration, 1)
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * end))

            if (progress < 1) {
              requestAnimationFrame(animate)
            } else {
              setCount(end)
            }
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [end, duration, hasAnimated, shouldReduceMotion])

  const formattedCount = decimals > 0 ? count.toFixed(decimals) : count

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formattedCount}
      {suffix}
    </span>
  )
}

// ============================================
// GlowingBorder - Animated glowing border
// ============================================
interface GlowingBorderProps {
  children: ReactNode
  className?: string
  colors?: string[]
  blur?: number
  animate?: boolean
}

export function GlowingBorder({
  children,
  className,
  colors = ["rgba(0,122,255,0.6)", "rgba(88,86,214,0.6)", "rgba(175,82,222,0.6)"],
  blur = 12,
  animate = true,
}: GlowingBorderProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className={cn("relative", className)}>
      <motion.div
        className="absolute -inset-[2px] rounded-inherit -z-10"
        style={{
          background: `linear-gradient(135deg, ${colors.join(", ")})`,
          backgroundSize: "200% 200%",
          filter: `blur(${blur}px)`,
        }}
        animate={
          animate && !shouldReduceMotion
            ? {
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }
            : {}
        }
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      {children}
    </div>
  )
}

// ============================================
// FloatingOrb - Animated background orb
// ============================================
interface FloatingOrbProps {
  className?: string
  color?: string
  size?: number
  blur?: number
  delay?: number
}

export function FloatingOrb({
  className,
  color = "rgba(0,122,255,0.15)",
  size = 600,
  blur = 0,
  delay = 0,
}: FloatingOrbProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className={cn("absolute rounded-full pointer-events-none", className)}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: blur > 0 ? `blur(${blur}px)` : undefined,
      }}
      animate={
        shouldReduceMotion
          ? {}
          : {
              y: [0, -30, 0],
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.8, 0.5],
            }
      }
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  )
}

// ============================================
// TextReveal - Character-by-character reveal
// ============================================
interface TextRevealProps {
  text: string
  className?: string
  delay?: number
  staggerDelay?: number
}

export function TextReveal({
  text,
  className,
  delay = 0,
  staggerDelay = 0.03,
}: TextRevealProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <span className={className}>{text}</span>
  }

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                delay: delay + index * staggerDelay,
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              },
            },
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}

// ============================================
// ScrollProgress - Scroll progress indicator
// ============================================
interface ScrollProgressProps {
  className?: string
  color?: string
}

export function ScrollProgress({
  className,
  color = "rgb(0, 122, 255)",
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className={cn("fixed top-0 left-0 right-0 h-1 origin-left z-50", className)}
      style={{
        scaleX,
        backgroundColor: color,
      }}
    />
  )
}
