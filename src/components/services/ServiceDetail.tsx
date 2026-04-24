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
      {/* Main Content Area */}
      <div className="lg:col-span-8">
        <AnimatedSection>
          {service.coverImage && (
            <div className="relative h-[400px] md:h-[500px] w-full mb-12 rounded-sm overflow-hidden">
              <SanityImage
                image={service.coverImage}
                alt={service.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="prose prose-invert max-w-none">
            {service.fullDescription ? (
              <PortableTextRenderer value={service.fullDescription} />
            ) : (
              <p className="text-foreground/70 text-lg">Detailed description coming soon.</p>
            )}
          </div>
        </AnimatedSection>
      </div>

      {/* Sidebar / Capabilities */}
      <div className="lg:col-span-4">
        <AnimatedSection delay={0.2} className="sticky top-32">
          {service.capabilities && service.capabilities.length > 0 && (
            <div className="bg-surface/50 border border-white/5 p-8 rounded-sm">
              <h3 className="text-2xl font-serif text-white mb-6 pb-4 border-b border-white/10">
                Core Capabilities
              </h3>
              <ul className="space-y-4">
                {service.capabilities.map((cap, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                    <span className="text-foreground/80">{cap}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact CTA in Sidebar */}
          <div className="mt-8 bg-accent p-8 rounded-sm text-background">
            <h3 className="text-2xl font-serif mb-4">Start Your Project</h3>
            <p className="text-background/80 mb-6">
              Contact our specialists to discuss how we can implement {service.title.toLowerCase()} for your space.
            </p>
            <a
              href="/contact"
              className="inline-block w-full py-3 px-6 bg-background text-foreground text-center font-medium hover:bg-surface transition-colors"
            >
              Request Consultation
            </a>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
