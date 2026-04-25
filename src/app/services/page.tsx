import { Metadata } from "next"
import { client } from "@/sanity/lib/client"
import { allServicesQuery } from "@/sanity/lib/queries"
import { ServiceCategory } from "@/types/sanity"
import PageHero from "@/components/shared/PageHero"
import ServiceCard from "@/components/services/ServiceCard"

export const metadata: Metadata = {
  title: "Our Services | MQM Flooring",
  description: "Explore our premium flooring and interior fit-out services tailored for luxury residential and commercial spaces.",
  openGraph: {
    title: "Our Services | MQM Flooring",
    description: "Explore our premium flooring and interior fit-out services tailored for luxury residential and commercial spaces.",
    images: [{ url: "/og-default.jpg" }],
  },
}

export const revalidate = 60

export default async function ServicesPage() {
  const services = await client.fetch<ServiceCategory[]>(allServicesQuery)

  return (
    <>
      <PageHero 
        title="Our Services" 
        subtitle="Comprehensive fit-out and flooring solutions engineered for excellence and aesthetic superiority."
      />

      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {services.map((service, index) => (
                <ServiceCard key={service._id} service={service} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-foreground/50 text-lg">No services found. Please add services in the CMS.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
