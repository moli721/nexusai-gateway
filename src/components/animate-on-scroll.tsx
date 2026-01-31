"use client"

import { ReactNode } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

type AnimationVariant = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "fade" | "scale" | "blur"

interface AnimateOnScrollProps {
  children: ReactNode
  className?: string
  variant?: AnimationVariant
  delay?: number
  duration?: number
  threshold?: number
  triggerOnce?: boolean
}

const variantStyles: Record<AnimationVariant, { initial: string; animate: string }> = {
  "fade-up": {
    initial: "opacity-0 translate-y-8",
    animate: "opacity-100 translate-y-0",
  },
  "fade-down": {
    initial: "opacity-0 -translate-y-8",
    animate: "opacity-100 translate-y-0",
  },
  "fade-left": {
    initial: "opacity-0 translate-x-8",
    animate: "opacity-100 translate-x-0",
  },
  "fade-right": {
    initial: "opacity-0 -translate-x-8",
    animate: "opacity-100 translate-x-0",
  },
  fade: {
    initial: "opacity-0",
    animate: "opacity-100",
  },
  scale: {
    initial: "opacity-0 scale-95",
    animate: "opacity-100 scale-100",
  },
  blur: {
    initial: "opacity-0 blur-sm",
    animate: "opacity-100 blur-0",
  },
}

export function AnimateOnScroll({
  children,
  className,
  variant = "fade-up",
  delay = 0,
  duration = 500,
  threshold = 0.1,
  triggerOnce = true,
}: AnimateOnScrollProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold, triggerOnce })
  const styles = variantStyles[variant]

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all",
        isVisible ? styles.animate : styles.initial,
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// 用于 stagger 动画的容器组件
interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  variant?: AnimationVariant
  duration?: number
  threshold?: number
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 100,
  variant = "fade-up",
  duration = 500,
  threshold = 0.1,
}: StaggerContainerProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold })
  const styles = variantStyles[variant]

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <div
              key={index}
              className={cn(
                "transition-all",
                isVisible ? styles.animate : styles.initial
              )}
              style={{
                transitionDuration: `${duration}ms`,
                transitionDelay: `${index * staggerDelay}ms`,
              }}
            >
              {child}
            </div>
          ))
        : children}
    </div>
  )
}
