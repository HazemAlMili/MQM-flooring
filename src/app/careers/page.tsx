import { Metadata } from "next"
import { client } from "@/sanity/lib/client"
import { activeJobsQuery, siteSettingsQuery } from "@/sanity/lib/queries"
import { JobPosting, SiteSettings } from "@/types/sanity"
import PageHero from "@/components/shared/PageHero"
import JobAccordion from "@/components/careers/JobAccordion"
import AnimatedSection from "@/components/shared/AnimatedSection"

export const metadata: Metadata = {
  title: "Careers | Maqam Al-Emaar",
  description: "Join our team of engineers, project managers, and construction professionals.",
  openGraph: {
    title: "Careers | Maqam Al-Emaar",
    description: "Join our team of engineers, project managers, and construction professionals.",
    images: [{ url: "/og-default.jpg" }],
  },
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
        subtitle="Build your future with Maqam Al-Emaar."
        breadcrumb="Join Us"
      />

      <section className="py-20 md:py-32 bg-primary-wash">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Open Positions
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              We are always looking for driven professionals to join our growing team. 
              Review our current openings below or send us your resume for future consideration.
            </p>
          </AnimatedSection>

          <div className="space-y-4">
            {jobs && jobs.length > 0 ? (
              jobs.map((job, i) => (
                <AnimatedSection key={job._id} delay={i * 0.1}>
                  <JobAccordion job={job} settingsEmail={settings?.email} />
                </AnimatedSection>
              ))
            ) : (
              <AnimatedSection>
                <div className="bg-white border border-border p-12 rounded-xl text-center shadow-card">
                  <h3 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-display)" }}>
                    No Open Positions Currently
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    We aren't actively hiring for specific roles right now, but we are always interested in connecting with talented professionals.
                  </p>
                  <a
                    href={`mailto:${settings?.email || "careers@maqam-alemaar.com"}`}
                    className="inline-flex px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors shadow-btn"
                  >
                    Submit General Application
                  </a>
                </div>
              </AnimatedSection>
            )}
          </div>
          
        </div>
      </section>
    </>
  )
}
