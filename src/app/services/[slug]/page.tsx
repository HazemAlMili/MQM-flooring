import { Metadata } from "next"
import { notFound } from "next/navigation"
import { client } from "@/sanity/lib/client"
import { serviceBySlugQuery, allServicesQuery } from "@/sanity/lib/queries"
import { ServiceCategory } from "@/types/sanity"
import PageHero from "@/components/shared/PageHero"
import ServiceDetail from "@/components/services/ServiceDetail"

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
          <ServiceDetail service={service} />
        </div>
      </section>
    </>
  )
}
