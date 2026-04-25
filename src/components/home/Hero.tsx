"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background with dark overlay */}
      <div className="absolute inset-0 z-0 bg-background">
        <Image 
          src="/og-default.jpg" 
          alt="Premium Flooring and Fit-outs" 
          fill 
          priority 
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* We use a heavy dark gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 py-20 flex flex-col items-center text-center mt-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-serif text-white tracking-wide mb-6 leading-tight">
            Elevating Spaces with <span className="text-accent italic">Premium</span> Fit-Outs
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <p className="text-lg md:text-xl text-foreground/80 mb-10 leading-relaxed">
            Specialized in luxury flooring, raised floors, and complete interior fit-out solutions for commercial and residential sectors across the Middle East.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-4 bg-accent text-background font-medium hover:bg-accent/90 transition-colors rounded-none flex items-center justify-center gap-2"
          >
            Get a Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/projects"
            className="w-full sm:w-auto px-8 py-4 border border-white/20 text-white hover:bg-white/5 transition-colors rounded-none flex items-center justify-center"
          >
            View Our Work
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
