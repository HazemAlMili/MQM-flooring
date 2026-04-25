"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, ArrowRight, Download } from "lucide-react"

interface HeroProps {
  tagline?: string
  pdfUrl?: string
}

export default function Hero({ tagline, pdfUrl }: HeroProps) {
  const words = ["Elevating Spaces", "with", "Premium", "Construction"]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with Ken Burns */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/og-default.jpg"
          alt="Maqam Al-Emaar Premium Construction"
          fill
          priority
          className="object-cover object-center"
          style={{ animation: "kenBurns 12s ease-in-out infinite alternate" }}
          sizes="100vw"
        />
        {/* Blue-tinted gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/50 to-primary/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 md:px-6 py-20 flex flex-col items-center text-center">
        {/* Headline */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block mr-3"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
          className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl leading-relaxed"
        >
          {tagline ||
            "Specialized in turnkey construction, electro-mechanical works, and safety solutions across the Middle East."}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="/projects"
            className="flex items-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-white/90 transition-all shadow-btn"
            style={{ fontFamily: "var(--font-display)" }}
          >
            View Our Projects
            <ArrowRight className="w-4 h-4" />
          </Link>

          {pdfUrl ? (
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <Download className="w-4 h-4" />
              Download Company Profile
            </a>
          ) : (
            <Link
              href="/contact"
              className="flex items-center gap-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Get a Consultation
            </Link>
          )}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="absolute bottom-8"
          style={{ animation: "bounceY 2s ease-in-out infinite" }}
        >
          <ChevronDown className="w-8 h-8 text-white/60" />
        </motion.div>
      </div>
    </section>
  )
}
