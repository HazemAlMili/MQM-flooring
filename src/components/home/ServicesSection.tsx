import Link from "next/link"
import { Building2, Zap, ShieldCheck, ArrowRight } from "lucide-react"
import { ServiceCategory } from "@/types"
import AnimatedSection from "@/components/shared/AnimatedSection"
import { dummyServiceCategories } from "@/lib/dummyData"

interface ServicesSectionProps {
  services: ServiceCategory[]
}

// Fallback icon map
const iconMap: Record<string, React.ElementType> = {
  "building-2":    Building2,
  "zap":           Zap,
  "shield-check":  ShieldCheck,
}

function getIcon(name?: string) {
  if (!name) return Building2
  return iconMap[name] ?? Building2
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  // TODO: Remove dummy fallback once Sanity is populated
  const displayServices = services.length > 0 ? services : dummyServiceCategories

  return (
    <section className="py-20 md:py-32 bg-primary-wash">
      <div className="container mx-auto px-4 md:px-6">

        {/* Section heading */}
        <AnimatedSection className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="w-10 h-1 bg-primary rounded-full mx-auto" />
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Our Services
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Comprehensive construction and fit-out solutions engineered for excellence across every sector.
          </p>
        </AnimatedSection>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {displayServices.map((service, i) => {
            const Icon = getIcon(service.icon)
            return (
              <AnimatedSection key={service.id} delay={i * 0.1}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group block h-full bg-white rounded-xl border border-border p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                    <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
                  {service.shortDescription && (
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                      {service.shortDescription}
                    </p>
                  )}

                  {/* Link */}
                  <span className="inline-flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                    Explore
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
