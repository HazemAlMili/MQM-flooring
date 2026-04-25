import AnimatedSection from "./AnimatedSection"

interface PageHeroProps {
  title: string
  subtitle?: string
  breadcrumb?: string
}

export default function PageHero({ title, subtitle, breadcrumb }: PageHeroProps) {
  return (
    <section className="bg-primary py-20 md:py-28 relative overflow-hidden">
      {/* Decorative shapes */}
      <div
        aria-hidden="true"
        className="absolute -top-20 -right-20 w-72 h-72 border-2 border-white/5 rotate-45 rounded-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-16 -left-16 w-48 h-48 bg-white/5 rotate-45 rounded-2xl"
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection className="max-w-3xl">
          {breadcrumb && (
            <p className="text-white/60 text-sm font-mono uppercase tracking-widest mb-4">
              {breadcrumb}
            </p>
          )}
          <h1
            className="text-4xl md:text-6xl font-bold text-white mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
        </AnimatedSection>
      </div>
    </section>
  )
}
