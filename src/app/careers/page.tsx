import { Metadata } from "next"
import Link from "next/link"
import { client } from "@/sanity/lib/client"
import { activeJobsQuery, siteSettingsQuery } from "@/sanity/lib/queries"
import { JobPosting, SiteSettings } from "@/types/sanity"
import PageHero from "@/components/shared/PageHero"
import AnimatedSection from "@/components/shared/AnimatedSection"
import JobAccordion from "@/components/careers/JobAccordion"

export const metadata: Metadata = {
  title: "Careers | MQM Flooring",
  description: "Join our team. Explore open positions at MQM Flooring.",
}

export const revalidate = 60

export default async function CareersPage() {
  const [jobs, settings] = await Promise.all([
    client.fetch<JobPosting[]>(activeJobsQuery),
    client.fetch<SiteSettings>(siteSettingsQuery),
  ])

  return (
    <>
      <PageHero
        title="Careers"
        subtitle="Join our team of skilled professionals and help us deliver exceptional spaces."
      />

      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          {jobs.length > 0 ? (
            <div className="space-y-4">
              <AnimatedSection className="mb-12">
                <p className="text-foreground/70 text-lg">
                  We currently have <span className="text-accent font-medium">{jobs.length} open position{jobs.length !== 1 ? "s" : ""}</span>. Click on a role to learn more and apply.
                </p>
              </AnimatedSection>

              {jobs.map((job, i) => (
                <AnimatedSection key={job._id} delay={i * 0.08}>
                  <JobAccordion job={job} settingsEmail={settings?.email} />
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <AnimatedSection className="text-center py-24">
              <h3 className="text-2xl font-serif text-white mb-4">
                We&apos;re not actively hiring right now
              </h3>
              <p className="text-foreground/60 mb-8">
                Check back soon. In the meantime, feel free to reach out and introduce yourself.
              </p>
              {settings?.email && (
                <Link
                  href={`mailto:${settings.email}`}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-accent text-accent hover:bg-accent hover:text-background transition-colors"
                >
                  {settings.email}
                </Link>
              )}
            </AnimatedSection>
          )}
        </div>
      </section>
    </>
  )
}
