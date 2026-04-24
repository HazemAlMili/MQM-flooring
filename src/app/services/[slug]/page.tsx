import { Metadata } from "next"
import { notFound } from "next/navigation"
import { PortableText } from "@portabletext/react"
import { client } from "@/sanity/lib/client"
import { serviceBySlugQuery, allServicesQuery } from "@/sanity/lib/queries"
import { ServiceCategory } from "@/types/sanity"
import PageHero from "@/components/shared/PageHero"
import SanityImage from "@/components/shared/SanityImage"
import AnimatedSection from "@/components/shared/AnimatedSection"

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const services = await client.fetch<ServiceCategory[]>(allServicesQuery)
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const service = await client.fetch<ServiceCategory>(serviceBySlugQuery, { slug: resolvedParams.slug })
  
  if (!service) return { title: "Not Found" }
  
  return {
    title: `${service.title} | MQM Flooring`,
    description: service.shortDescription || `Details about ${service.title}`,
  }
}

// Custom Portable Text Components for styling
const portableTextComponents = {
  block: {
    normal: ({ children }: any) => <p className="text-foreground/80 leading-relaxed mb-6 text-lg">{children}</p>,
    h2: ({ children }: any) => <h2 className="text-3xl font-serif text-white mt-12 mb-6">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-serif text-white mt-8 mb-4">{children}</h3>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-accent pl-6 italic my-8 text-xl text-foreground/90">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-8 space-y-2 text-foreground/80 text-lg">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-6 mb-8 space-y-2 text-foreground/80 text-lg">{children}</ol>,
  },
}

export default async function ServiceDetailPage({ params }: Props) {
  const resolvedParams = await params
  const service = await client.fetch<ServiceCategory>(serviceBySlugQuery, { slug: resolvedParams.slug })

  if (!service) {
    notFound()
  }

  return (
    <>
      <PageHero 
        title={service.title} 
        subtitle={service.shortDescription}
      />

      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
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
                    <PortableText 
                      value={service.fullDescription} 
                      components={portableTextComponents}
                    />
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
        </div>
      </section>
    </>
  )
}
