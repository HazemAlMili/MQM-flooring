import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { PortableText } from "@portabletext/react"
import { client } from "@/sanity/lib/client"
import { projectBySlugQuery, allProjectSlugsQuery } from "@/sanity/lib/queries"
import { Project } from "@/types/sanity"
import PageHero from "@/components/shared/PageHero"
import SanityImage from "@/components/shared/SanityImage"
import AnimatedSection from "@/components/shared/AnimatedSection"
import { MapPin, Calendar, Maximize2, User, Layers, ArrowLeft } from "lucide-react"

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(allProjectSlugsQuery)
  return slugs.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const project = await client.fetch<Project>(projectBySlugQuery, { slug: resolvedParams.slug })

  if (!project) return { title: "Not Found" }

  return {
    title: project.seoTitle || `${project.title} | MQM Flooring`,
    description: project.seoDescription || project.summary || `Details about ${project.title}`,
  }
}

// Custom Portable Text Components
const portableTextComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="text-foreground/80 leading-relaxed mb-6 text-lg">{children}</p>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-serif text-white mt-12 mb-6">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-serif text-white mt-8 mb-4">{children}</h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-accent pl-6 italic my-8 text-xl text-foreground/90">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-6 mb-8 space-y-2 text-foreground/80 text-lg">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal pl-6 mb-8 space-y-2 text-foreground/80 text-lg">{children}</ol>
    ),
  },
}

const statusColors: Record<string, string> = {
  Completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  Ongoing: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  "Under Review": "bg-sky-500/10 text-sky-400 border-sky-500/30",
}

export default async function ProjectDetailPage({ params }: Props) {
  const resolvedParams = await params
  const project = await client.fetch<Project>(projectBySlugQuery, { slug: resolvedParams.slug })

  if (!project) {
    notFound()
  }

  const statusClass = statusColors[project.projectStatus] ?? "bg-white/5 text-foreground/60 border-white/10"

  const specs = [
    { icon: User, label: "Client", value: project.clientName },
    { icon: Calendar, label: "Year", value: project.completionYear?.toString() },
    { icon: MapPin, label: "Location", value: project.location },
    { icon: Maximize2, label: "Area", value: project.totalAreaSqm ? `${project.totalAreaSqm.toLocaleString()} m²` : undefined },
    { icon: Layers, label: "Category", value: project.serviceCategory?.title },
    { icon: Layers, label: "Contract", value: project.contractType },
  ].filter((s) => s.value)

  return (
    <>
      <PageHero
        title={project.title}
        subtitle={project.summary}
      />

      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">

          {/* Back link */}
          <AnimatedSection>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-accent transition-colors mb-12 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Projects
            </Link>
          </AnimatedSection>

          {/* Hero cover image */}
          {project.coverImage && (
            <AnimatedSection>
              <div className="relative h-[50vh] md:h-[60vh] w-full mb-16 rounded-sm overflow-hidden">
                <SanityImage
                  image={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Status badge */}
                <div className="absolute top-6 right-6">
                  <span className={`text-xs font-medium px-4 py-1.5 border rounded-none uppercase tracking-widest ${statusClass}`}>
                    {project.projectStatus}
                  </span>
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* 2-column layout: description + spec sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

            {/* Left: Rich-text description */}
            <div className="lg:col-span-8">
              <AnimatedSection>
                {project.description ? (
                  <div className="prose prose-invert max-w-none">
                    <PortableText
                      value={project.description}
                      components={portableTextComponents}
                    />
                  </div>
                ) : (
                  <p className="text-foreground/50 text-lg">
                    Detailed project description coming soon.
                  </p>
                )}
              </AnimatedSection>
            </div>

            {/* Right: Spec grid */}
            <div className="lg:col-span-4">
              <AnimatedSection delay={0.2} className="sticky top-32 space-y-8">
                {specs.length > 0 && (
                  <div className="bg-surface-subtle/60 border border-white/5 p-8 rounded-sm">
                    <h3 className="text-xl font-serif text-white mb-6 pb-4 border-b border-white/10 tracking-wide">
                      Project Specifications
                    </h3>
                    <dl className="space-y-5">
                      {specs.map(({ icon: Icon, label, value }) => (
                        <div key={label} className="flex items-start gap-4">
                          <div className="w-8 h-8 bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                            <Icon className="w-4 h-4 text-accent" />
                          </div>
                          <div>
                            <dt className="text-xs text-foreground/40 uppercase tracking-widest mb-0.5">
                              {label}
                            </dt>
                            <dd className="text-foreground/90 font-medium">{value}</dd>
                          </div>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}

                {/* CTA */}
                <div className="bg-accent p-8 rounded-sm text-background">
                  <h3 className="text-xl font-serif mb-3">Inspired?</h3>
                  <p className="text-background/80 text-sm mb-6 leading-relaxed">
                    Let us bring the same level of craftsmanship to your space.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-block w-full py-3 px-6 bg-background text-foreground text-center text-sm font-medium hover:bg-surface transition-colors"
                  >
                    Start a Conversation
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </div>

          {/* Image Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <AnimatedSection className="mt-24">
              <h2 className="text-3xl font-serif text-white mb-10 pb-4 border-b border-white/10">
                Project Gallery
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.gallery.map((image, i) => (
                  <div
                    key={i}
                    className={`relative overflow-hidden rounded-sm bg-surface ${
                      i === 0 ? "sm:col-span-2 lg:col-span-2 h-80" : "h-64"
                    }`}
                  >
                    <SanityImage
                      image={image}
                      alt={`${project.title} gallery image ${i + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </AnimatedSection>
          )}

        </div>
      </section>
    </>
  )
}
