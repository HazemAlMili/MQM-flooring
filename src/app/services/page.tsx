import { Metadata } from "next"
import { client } from "@/sanity/lib/client"
import { allServicesQuery } from "@/sanity/lib/queries"
import { ServiceCategory } from "@/types/sanity"
import PageHero from "@/components/shared/PageHero"
import ServiceCard from "@/components/services/ServiceCard"
import AnimatedSection from "@/components/shared/AnimatedSection"
import { dummyServiceCategories } from "@/lib/dummyData"

export const metadata: Metadata = {
  title: "Our Services | Maqam Al-Emaar",
  description: "Explore our comprehensive construction, electro-mechanical, and safety & security services.",
  openGraph: {
    title: "Our Services | Maqam Al-Emaar",
    description: "Explore our comprehensive construction, electro-mechanical, and safety & security services.",
    images: [{ url: "/og-default.jpg" }],
  },
}

export const revalidate = 60

export default async function ServicesPage() {
  const services = await client.fetch<ServiceCategory[]>(allServicesQuery)
  
  // TODO: Remove dummy fallback once Sanity is populated
  const displayServices = services && services.length > 0 ? services : dummyServiceCategories

  return (
    <>
      <PageHero
        title="Our Services"
        subtitle="End-to-end engineering, construction, and fit-out solutions."
        breadcrumb="Expertise"
      />

      <section className="py-20 md:py-32 bg-primary-wash">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {displayServices.map((service, i) => (
              <AnimatedSection key={service._id} delay={i * 0.1}>
                <ServiceCard service={service} index={i} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
