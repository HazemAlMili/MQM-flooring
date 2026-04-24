import { Metadata } from "next"
import Link from "next/link"
import { client } from "@/sanity/lib/client"
import { activeJobsQuery } from "@/sanity/lib/queries"
import { JobPosting } from "@/types/sanity"
import PageHero from "@/components/shared/PageHero"
import AnimatedSection from "@/components/shared/AnimatedSection"
import JobAccordion from "@/components/careers/JobAccordion"

export const metadata: Metadata = {
  title: "Careers | MQM Flooring",
  description:
    "Join MQM Flooring — a team of passionate craftsmen and design specialists delivering premium flooring and fit-out solutions across the Middle East.",
}

export const revalidate = 60

export default async function CareersPage() {
  const jobs = await client.fetch<JobPosting[]>(activeJobsQuery)

  return (
    <>
      <PageHero
        title="Join Our Team"
        subtitle="We are always looking for talented individuals who share our passion for precision, craft, and design excellence."
      />

      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">

          {jobs.length > 0 ? (
            <>
              <AnimatedSection className="mb-12">
                <p className="text-foreground/60 text-lg">
                  {jobs.length} open position{jobs.length !== 1 ? "s" : ""} available
                </p>
              </AnimatedSection>

              <JobAccordion jobs={jobs} />
            </>
          ) : (
            <AnimatedSection>
              {/* Clean empty state */}
              <div className="text-center py-24 border border-white/5 rounded-sm bg-surface/20">
                <div className="w-16 h-16 bg-accent/10 flex items-center justify-center mx-auto mb-6 border border-accent/20">
                  <svg
                    className="w-8 h-8 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-serif text-white mb-4">
                  No Open Positions at This Time
                </h2>
                <p className="text-foreground/50 max-w-md mx-auto mb-8">
                  We are not actively hiring right now, but we are always interested in
                  connecting with exceptional talent. Send us your CV and we will keep
                  you in mind for future opportunities.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-background text-sm font-medium hover:bg-accent/90 transition-colors"
                >
                  Get in Touch
                </Link>
              </div>
            </AnimatedSection>
          )}

          {/* General CTA */}
          {jobs.length > 0 && (
            <AnimatedSection className="mt-16 pt-16 border-t border-white/5 text-center">
              <p className="text-foreground/60 mb-4">
                Don&apos;t see the right role? We&apos;re always open to exceptional talent.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 border border-accent text-accent text-sm font-medium hover:bg-accent hover:text-background transition-colors"
              >
                Send Speculative Application
              </Link>
            </AnimatedSection>
          )}

        </div>
      </section>
    </>
  )
}
