import { client } from "@/sanity/lib/client"
import { siteSettingsQuery } from "@/sanity/lib/queries"
import { SiteSettings } from "@/types/sanity"
import Link from "next/link"
import Image from "next/image"
import PageHero from "@/components/shared/PageHero"
import AnimatedSection from "@/components/shared/AnimatedSection"
import { ArrowRight } from "lucide-react"

export const revalidate = 60

export default async function Home() {
  const settings = await client.fetch<SiteSettings>(siteSettingsQuery)

  return (
    <>
      <PageHero
        title="Maqam Al-Emaar"
        subtitle={settings?.companyTagline || "Pioneering excellence in construction and interior fit-outs across the Middle East."}
        breadcrumb="Home"
      />

      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">

            {/* Left: text */}
            <div className="space-y-12">
              <AnimatedSection>
                <div className="w-10 h-1 bg-primary rounded-full mb-4" />
                <h2
                  className="text-3xl md:text-4xl font-bold text-foreground mb-5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Our History
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Established with a commitment to transforming spaces, Maqam Al-Emaar has grown from a
                  specialized flooring contractor into a comprehensive construction and fit-out leader. Over
                  the years, we have built a reputation for meticulous craftsmanship, premium materials, and
                  unparalleled reliability. Our portfolio spans luxury residential complexes, high-end
                  commercial offices, and state-of-the-art hospitality venues across the Middle East.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.15}>
                <div className="w-10 h-1 bg-primary rounded-full mb-4" />
                <h2
                  className="text-3xl md:text-4xl font-bold text-foreground mb-5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Our Mission
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  To deliver exceptional built environments that inspire and endure. We strive to exceed
                  client expectations by integrating innovative design with flawless execution, ensuring
                  every project is a testament to our dedication to quality.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <div className="w-10 h-1 bg-primary rounded-full mb-4" />
                <h2
                  className="text-3xl md:text-4xl font-bold text-foreground mb-5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Our Vision
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  To be the foremost choice for premium construction and fit-out solutions across the
                  Middle East, recognized for our artistic precision, sustainable practices, and
                  unwavering integrity.
                </p>
              </AnimatedSection>
            </div>

            {/* Right: image */}
            <AnimatedSection
              delay={0.2}
              className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-card-hover"
            >
              <Image
                src="/og-default.jpg"
                alt="Maqam Al-Emaar team at work"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />

              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 bg-white rounded-xl px-4 py-3 shadow-card">
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono">Since</p>
                <p className="text-2xl font-bold text-primary font-mono">2010+</p>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white text-foreground border-t border-border/50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <AnimatedSection>
            <h2
              className="text-3xl md:text-5xl font-bold mb-5 text-foreground"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Ready to Build Something Great?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
              Let our experts guide you through our comprehensive construction and fit-out services.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-btn hover:-translate-y-1"
              style={{ fontFamily: "var(--font-display)" }}
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
