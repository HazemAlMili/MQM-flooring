import { Metadata } from "next"
import Link from "next/link"
import PageHero from "@/components/shared/PageHero"
import AnimatedSection from "@/components/shared/AnimatedSection"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us | MQM Flooring",
  description: "Learn about our history, mission, and vision in delivering premium flooring and fit-out solutions.",
  openGraph: {
    title: "About Us | MQM Flooring",
    description: "Learn about our history, mission, and vision in delivering premium flooring and fit-out solutions.",
    images: [{ url: "/og-default.jpg" }],
  },
}

export default function AboutPage() {
  return (
    <>
      <PageHero 
        title="About Us" 
        subtitle="Pioneering Excellence in Premium Flooring and Interior Fit-Outs Since Inception."
      />

      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
            
            {/* Left side text */}
            <div className="space-y-12">
              <AnimatedSection>
                <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">Our History</h2>
                <p className="text-foreground/70 leading-relaxed">
                  Established with a commitment to transforming spaces, MQM Flooring has grown from a specialized flooring contractor into a comprehensive interior fit-out leader. Over the years, we have built a reputation for meticulous craftsmanship, premium materials, and unparalleled reliability. Our portfolio spans luxury residential complexes, high-end commercial offices, and state-of-the-art hospitality venues.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">Our Mission</h2>
                <p className="text-foreground/70 leading-relaxed">
                  To deliver exceptional interior environments that inspire and endure. We strive to exceed client expectations by integrating innovative design with flawless execution, ensuring every project is a testament to our dedication to quality.
                </p>
              </AnimatedSection>
              
              <AnimatedSection delay={0.4}>
                <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">Our Vision</h2>
                <p className="text-foreground/70 leading-relaxed">
                  To be the foremost choice for premium flooring and fit-out solutions across the Middle East, recognized for our artistic precision, sustainable practices, and unwavering integrity.
                </p>
              </AnimatedSection>
            </div>

            {/* Right side image placeholder */}
            <AnimatedSection delay={0.3} className="relative h-[600px] w-full rounded-sm overflow-hidden bg-surface">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                style={{ backgroundImage: "url('/og-default.jpg')" }}
              />
              <div className="absolute inset-0 border border-white/10" />
            </AnimatedSection>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent text-background">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-serif mb-6">Ready to Transform Your Space?</h2>
            <p className="text-background/80 max-w-2xl mx-auto mb-10 text-lg">
              Let our experts guide you through our premium material selections and comprehensive fit-out services.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-background text-foreground hover:bg-surface transition-colors font-medium rounded-none"
            >
              Contact Us Today
              <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
