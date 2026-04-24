import AnimatedSection from "./AnimatedSection"

interface PageHeroProps {
  title: string
  subtitle?: string
}

export default function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="bg-surface/50 py-20 md:py-32 border-b border-white/5 relative overflow-hidden">
      {/* Decorative gradient orb */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-serif text-white tracking-wide mb-6">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
        </AnimatedSection>
      </div>
    </section>
  )
}
