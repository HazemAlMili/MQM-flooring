import { client } from "@/sanity/lib/client"
import {
  siteSettingsQuery,
  partnerLogosQuery,
  allServicesQuery,
  featuredProjectsQuery,
} from "@/sanity/lib/queries"
import { SiteSettings, PartnerLogo, ServiceCategory, Project } from "@/types/sanity"

import Hero            from "@/components/home/Hero"
import StatsSection    from "@/components/home/StatsSection"
import AboutSection    from "@/components/home/AboutSection"
import ServicesSection from "@/components/home/ServicesSection"
import FeaturedProjects from "@/components/home/FeaturedProjects"
import PartnerMarquee  from "@/components/home/PartnerMarquee"
import CtaBanner       from "@/components/home/CtaBanner"

export const revalidate = 60

export default async function Home() {
  const [settings, partnerLogos, services, featuredProjects] = await Promise.all([
    client.fetch<SiteSettings>(siteSettingsQuery),
    client.fetch<PartnerLogo[]>(partnerLogosQuery),
    client.fetch<ServiceCategory[]>(allServicesQuery),
    client.fetch<Project[]>(featuredProjectsQuery),
  ])

  return (
    <>
      {/* 1. Hero */}
      <Hero
        tagline={settings?.companyTagline}
        pdfUrl={settings?.companyProfilePdfUrl}
      />

      {/* 2. Stats bar */}
      <StatsSection settings={settings} />

      {/* 3. About (Tabs) */}
      <AboutSection />

      {/* 4. Services */}
      <ServicesSection services={services ?? []} />

      {/* 5. Featured Projects */}
      <FeaturedProjects projects={featuredProjects ?? []} />

      {/* 6. Partner marquee */}
      <PartnerMarquee logos={partnerLogos ?? []} />

      {/* 7. CTA Banner */}
      <CtaBanner />
    </>
  )
}
