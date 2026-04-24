"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useSpring } from "framer-motion"
import { SiteSettings } from "@/types/sanity"

interface StatsSectionProps {
  settings: SiteSettings | null
}

// A local component to handle the animated counting
function AnimatedCounter({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [displayValue, setDisplayValue] = useState(0)

  const spring = useSpring(0, {
    bounce: 0,
    duration: 2000,
  })

  useEffect(() => {
    if (isInView) {
      spring.set(value)
    }
  }, [isInView, spring, value])

  useEffect(() => {
    return spring.on("change", (latest) => {
      setDisplayValue(Math.floor(latest))
    })
  }, [spring])

  return (
    <div ref={ref} className="flex flex-col items-center text-center p-6 border border-white/5 bg-surface/30">
      <div className="text-4xl md:text-5xl font-serif text-accent mb-2">
        {displayValue}+
      </div>
      <div className="text-sm md:text-base text-foreground/70 uppercase tracking-widest">
        {label}
      </div>
    </div>
  )
}

export default function StatsSection({ settings }: StatsSectionProps) {
  if (!settings) return null

  const stats = [
    { value: settings.yearsInOperation || 10, label: "Years in Operation" },
    { value: settings.projectsCompleted || 150, label: "Projects Completed" },
    { value: settings.totalAreaDelivered || 500000, label: "Sqm Delivered" },
    { value: settings.countriesOperated || 5, label: "Countries" },
  ]

  return (
    <section className="py-20 bg-background relative z-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <AnimatedCounter value={stat.value} label={stat.label} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
