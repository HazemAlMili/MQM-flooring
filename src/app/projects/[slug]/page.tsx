import { Metadata } from "next"
import { notFound } from "next/navigation"
import { client } from "@/sanity/lib/client"
import { projectBySlugQuery, allProjectSlugsQuery } from "@/sanity/lib/queries"
import { Project } from "@/types/sanity"
import ProjectHero from "@/components/projects/ProjectHero"
import ProjectMeta from "@/components/projects/ProjectMeta"
import ProjectGallery from "@/components/projects/ProjectGallery"
import PortableTextRenderer from "@/components/shared/PortableTextRenderer"
import AnimatedSection from "@/components/shared/AnimatedSection"

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(allProjectSlugsQuery)
  return slugs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const project = await client.fetch<Project>(projectBySlugQuery, { slug: resolvedParams.slug })

  if (!project) return { title: "Not Found" }

  return {
    title: `${project.seoTitle ?? project.title} | MQM Flooring`,
    description: project.seoDescription ?? project.summary,
    openGraph: {
      title: project.seoTitle ?? project.title,
      description: project.seoDescription ?? project.summary ?? "",
      images: project.coverImage?.asset?.url
        ? [{ url: project.coverImage.asset.url }]
        : [],
    },
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const resolvedParams = await params
  const project = await client.fetch<Project>(projectBySlugQuery, { slug: resolvedParams.slug })

  if (!project) notFound()

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary ?? "",
    image: project.coverImage?.asset?.url ?? "",
    creator: {
      "@type": "Organization",
      name: "MQM Flooring",
    },
    dateCreated: project.completionYear ? `${project.completionYear}` : undefined,
  }

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Parallax Hero */}
      <ProjectHero project={project} />

      {/* Main Content */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

            {/* Description (Left) */}
            <div className="lg:col-span-8">
              <AnimatedSection>
                {project.summary && (
                  <p className="text-xl text-foreground/80 leading-relaxed mb-10 pb-10 border-b border-white/10">
                    {project.summary}
                  </p>
                )}
                {project.description && (
                  <PortableTextRenderer value={project.description} />
                )}
              </AnimatedSection>

              {/* Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <AnimatedSection delay={0.2} className="mt-16">
                  <h2 className="text-3xl font-serif text-white mb-8">Project Gallery</h2>
                  <ProjectGallery images={project.gallery} />
                </AnimatedSection>
              )}
            </div>

            {/* Sticky Sidebar (Right) */}
            <div className="lg:col-span-4">
              <AnimatedSection delay={0.15}>
                <ProjectMeta project={project} />
              </AnimatedSection>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
