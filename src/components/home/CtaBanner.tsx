import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function CtaBanner() {
  return (
    <section className="bg-primary py-20 md:py-28 relative overflow-hidden">
      {/* Decorative diamond shapes */}
      <div
        aria-hidden="true"
        className="absolute -top-16 -right-16 w-64 h-64 border-2 border-white/5 rotate-45 rounded-2xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-12 -left-12 w-48 h-48 border-2 border-white/5 rotate-45 rounded-2xl"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/2 right-1/4 w-32 h-32 bg-white/5 rotate-45 rounded-xl"
      />

      <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
        {/* Arabic + English heading */}
        <h2
          className="text-3xl md:text-5xl font-bold text-white mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          هل لديك مشروع؟
        </h2>
        <h3
          className="text-2xl md:text-4xl font-semibold text-white/90 mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Have a Project in Mind?
        </h3>
        <p className="text-white/70 max-w-xl mx-auto mb-10 text-lg leading-relaxed">
          Our team is ready to deliver excellence — from planning through to handover.
          Let&apos;s build something remarkable together.
        </p>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-white/90 transition-all shadow-btn text-lg"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Get in Touch
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  )
}
