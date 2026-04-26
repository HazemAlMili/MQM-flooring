"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, useSpring } from "framer-motion"
import { SiteSettings } from "@/types"

interface StatsSectionProps {
  settings: SiteSettings | null
}

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [display, setDisplay] = useState(0)

  const spring = useSpring(0, { bounce: 0, duration: 2500 })

  useEffect(() => {
    if (isInView) spring.set(value)
  }, [isInView, spring, value])

  useEffect(() => {
    return spring.on("change", (latest) => setDisplay(Math.floor(latest)))
  }, [spring])

  return (
    <div ref={ref} className="text-5xl md:text-6xl font-bold text-white font-mono">
      {display.toLocaleString()}{suffix}
    </div>
  )
}

export default function StatsSection({ settings }: StatsSectionProps) {
  if (!settings) return null

  const stats = [
    { label: "Years in Operation",  value: settings.yearsInOperation  || 10,     suffix: "+" },
    { label: "Projects Completed",  value: settings.projectsCompleted || 150,    suffix: "+" },
    { label: "Sqm Delivered",       value: settings.totalAreaDelivered || 500,   suffix: "k+" },
    { label: "Countries",           value: settings.countriesOperated  || 5 },
  ]

  return (
    <section className="bg-primary py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center py-10 px-6 ${
                i < stats.length - 1 ? "border-r border-white/20" : ""
              }`}
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <div
                className="text-xs text-white/70 uppercase tracking-widest mt-3"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
