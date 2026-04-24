import { client } from "@/sanity/lib/client"
import { siteSettingsQuery, partnerLogosQuery } from "@/sanity/lib/queries"
import { SiteSettings, PartnerLogo } from "@/types/sanity"
import Hero from "@/components/home/Hero"
import StatsSection from "@/components/home/StatsSection"
import PartnerMarquee from "@/components/home/PartnerMarquee"

export const revalidate = 60 // Revalidate every minute

export default async function Home() {
  const [settings, partnerLogos] = await Promise.all([
    client.fetch<SiteSettings>(siteSettingsQuery),
    client.fetch<PartnerLogo[]>(partnerLogosQuery)
  ])

  return (
    <>
      <Hero />
      <StatsSection settings={settings} />
      <PartnerMarquee logos={partnerLogos} />
    </>
  );
}
