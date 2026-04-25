import { CheckCircle } from "lucide-react"
import { ServiceCategory } from "@/types/sanity"
import SanityImage from "@/components/shared/SanityImage"
import AnimatedSection from "@/components/shared/AnimatedSection"
import PortableTextRenderer from "@/components/shared/PortableTextRenderer"

interface ServiceDetailProps {
  service: ServiceCategory
}

export default function ServiceDetail({ service }: ServiceDetailProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
      {/* Main content */}
      <div className="lg:col-span-8">
        <AnimatedSection>
          {service.coverImage && (
            <div className="relative h-[400px] md:h-[500px] w-full mb-12 rounded-xl overflow-hidden shadow-card">
              <SanityImage
                image={service.coverImage}
                alt={service.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="prose prose-slate max-w-none">
            {service.fullDescription ? (
              <PortableTextRenderer value={service.fullDescription} />
            ) : (
              <p className="text-muted-foreground text-lg leading-relaxed">
                Detailed description coming soon.
              </p>
            )}
          </div>
        </AnimatedSection>
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-4">
        <AnimatedSection delay={0.2} className="sticky top-28 space-y-6">
          {/* Capabilities */}
          {service.capabilities && service.capabilities.length > 0 && (
            <div className="bg-surface rounded-xl border border-border p-7 shadow-card">
              <h3
                className="text-xl font-bold text-foreground mb-5 pb-4 border-b border-border"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Core Capabilities
              </h3>
              <ul className="space-y-3">
                {service.capabilities.map((cap, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-sm leading-relaxed">{cap}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA */}
          <div className="bg-primary rounded-xl p-7 text-white">
            <h3
              className="text-xl font-bold mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Start Your Project
            </h3>
            <p className="text-white/70 text-sm mb-5 leading-relaxed">
              Contact our specialists to discuss{" "}
              {service.title.toLowerCase()} requirements for your project.
            </p>
            <a
              href="/contact"
              className="block w-full py-3 px-5 bg-white text-primary text-center font-semibold rounded-lg hover:bg-white/90 transition-colors text-sm"
            >
              Request Consultation
            </a>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
