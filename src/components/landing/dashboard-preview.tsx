"use client"

import { motion, useReducedMotion } from "motion/react"
import { FadeInView } from "@/components/motion"
import { Key, BarChart3, Settings, Activity, ChevronDown } from "lucide-react"

export function DashboardPreview() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="py-32 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(79,70,229,0.06) 0%, transparent 60%)',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <FadeInView delay={0} distance={20}>
            <p className="text-sm font-[family-name:var(--font-manrope)] font-semibold text-indigo-400 tracking-wide uppercase mb-4">
              Dashboard
            </p>
          </FadeInView>

          <FadeInView delay={0.1} distance={30}>
            <h2 className="text-4xl sm:text-5xl md:text-[56px] font-bold text-white mb-6 tracking-tight leading-[1.05]">
              See it in{' '}
              <span className="font-serif italic text-gradient-accent">action</span>
            </h2>
          </FadeInView>

          <FadeInView delay={0.2} distance={20}>
            <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto">
              Powerful dashboard, zero complexity. Manage API keys, monitor usage,
              and control everything from one place.
            </p>
          </FadeInView>
        </div>

        {/* Browser frame mockup */}
        <FadeInView delay={0.3} distance={40}>
          <motion.div
            className="relative"
            animate={
              shouldReduceMotion
                ? {}
                : { y: [0, -8, 0] }
            }
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* Glow behind */}
            <div
              className="absolute inset-0 -z-10 blur-[80px] opacity-30"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.3) 0%, transparent 60%)',
                transform: 'scale(1.1) translateY(40px)',
              }}
            />

            {/* Browser frame */}
            <div className="rounded-2xl border border-white/[0.08] shadow-[0_40px_100px_-20px_rgba(99,102,241,0.2)] overflow-hidden bg-zinc-900/80 backdrop-blur-xl">
              {/* macOS header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-zinc-800/80 border-b border-white/[0.06]">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 rounded-md bg-white/[0.04] text-xs text-zinc-500 border border-white/[0.06]">
                    dashboard.nexusai.dev
                  </div>
                </div>
                <div className="w-[52px]" />
              </div>

              {/* Dashboard content - light mode mockup */}
              <div className="bg-[#fafafa] p-6">
                <div className="flex gap-6">
                  {/* Sidebar */}
                  <div className="hidden md:block w-48 flex-shrink-0">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-zinc-200/50">
                      <div className="flex items-center gap-2 mb-6">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                          <span className="text-white font-bold text-[10px]">N</span>
                        </div>
                        <span className="text-sm font-semibold text-zinc-900">NexusAI</span>
                      </div>
                      {[
                        { icon: Key, label: 'API Keys', active: true },
                        { icon: BarChart3, label: 'Usage', active: false },
                        { icon: Activity, label: 'Logs', active: false },
                        { icon: Settings, label: 'Settings', active: false },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium mb-1 ${
                            item.active
                              ? 'bg-indigo-50 text-indigo-700'
                              : 'text-zinc-500 hover:bg-zinc-50'
                          }`}
                        >
                          <item.icon className="w-3.5 h-3.5" />
                          {item.label}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Main content */}
                  <div className="flex-1 min-w-0">
                    {/* Top bar */}
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-zinc-900">API Keys</h3>
                      <button className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-medium">
                        + Create Key
                      </button>
                    </div>

                    {/* API Key cards */}
                    <div className="space-y-3 mb-6">
                      {[
                        { name: 'Production', key: 'nxai_live_****kf92', usage: '2.4M calls', status: 'Active' },
                        { name: 'Development', key: 'nxai_test_****3mxp', usage: '156K calls', status: 'Active' },
                        { name: 'Staging', key: 'nxai_stg_****7bnq', usage: '23K calls', status: 'Paused' },
                      ].map((apiKey) => (
                        <div
                          key={apiKey.name}
                          className="bg-white rounded-xl p-4 shadow-sm border border-zinc-200/50 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                              <Key className="w-4 h-4 text-indigo-600" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-zinc-900">{apiKey.name}</div>
                              <div className="text-xs text-zinc-400 font-mono">{apiKey.key}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-xs text-zinc-500">{apiKey.usage}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              apiKey.status === 'Active'
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-zinc-100 text-zinc-500'
                            }`}>
                              {apiKey.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Usage chart mockup */}
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-zinc-200/50">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-zinc-900">Usage This Month</span>
                        <button className="flex items-center gap-1 text-xs text-zinc-500 border border-zinc-200 rounded-md px-2 py-1">
                          Claude 3 <ChevronDown className="w-3 h-3" />
                        </button>
                      </div>
                      {/* Simple bar chart */}
                      <div className="flex items-end gap-1.5 h-24">
                        {[40, 65, 55, 80, 70, 90, 85, 75, 95, 88, 72, 60].map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-t-sm bg-gradient-to-t from-indigo-500 to-indigo-400 opacity-80"
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>
                      <div className="flex justify-between mt-2 text-[10px] text-zinc-400">
                        <span>Jan</span>
                        <span>Jun</span>
                        <span>Dec</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </FadeInView>
      </div>
    </section>
  )
}
