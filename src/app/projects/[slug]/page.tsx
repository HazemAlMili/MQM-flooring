import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { client } from "@/sanity/lib/client"
import { projectBySlugQuery, allProjectSlugsQuery } from "@/sanity/lib/queries"
import { Project } from "@/types/sanity"
import { ArrowLeft, ArrowRight, Share2 } from "lucide-react"
import ProjectHero from "@/components/projects/ProjectHero"
import ProjectMeta from "@/components/projects/ProjectMeta"
import ProjectGallery from "@/components/projects/ProjectGallery"
import PortableTextRenderer from "@/components/shared/PortableTextRenderer"
import AnimatedSection from "@/components/shared/AnimatedSection"
import { dummyProjects } from "@/lib/dummyData"

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(allProjectSlugsQuery)
  const dummySlugs = dummyProjects.map(p => ({ slug: p.slug }))
  return [...slugs, ...dummySlugs]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  let project = await client.fetch<Project>(projectBySlugQuery, { slug: resolvedParams.slug })
  
  if (!project) {
    project = dummyProjects.find(p => p.slug === resolvedParams.slug) as Project
  }

  if (!project) return { title: "Not Found" }

  return {
    title: `${project.seoTitle ?? project.title} | Maqam Al-Emaar`,
    description: project.seoDescription ?? project.summary,
    openGraph: {
      title: project.seoTitle ?? project.title,
      description: project.seoDescription ?? project.summary ?? "",
      images: project.coverImage?.asset?.url ? [{ url: project.coverImage.asset.url }] : [],
    },
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const resolvedParams = await params
  let project = await client.fetch<Project>(projectBySlugQuery, { slug: resolvedParams.slug })

  if (!project) {
    project = dummyProjects.find(p => p.slug === resolvedParams.slug) as Project
  }

  if (!project) notFound()

  // Find next project for navigation
  const allProjects = [...(await client.fetch<Project[]>(allProjectSlugsQuery)), ...dummyProjects]
  const currentIndex = allProjects.findIndex(p => p.slug === resolvedParams.slug)
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary ?? "",
    image: project.coverImage?.asset?.url ?? "",
    creator: { "@type": "Organization", name: "Maqam Al-Emaar" },
    dateCreated: project.completionYear ? `${project.completionYear}` : undefined,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <ProjectHero project={project} />

      <section className="py-20 md:py-32 bg-white relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="container mx-auto px-4 md:px-6">
          {/* Breadcrumb / Back button */}
          <div className="mb-12 flex justify-between items-center">
            <Link 
              href="/projects" 
              className="group flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Projects
            </Link>
            <button className="p-3 rounded-full border border-border hover:bg-secondary transition-colors text-muted-foreground hover:text-primary">
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            {/* Description (Left) */}
            <div className="lg:col-span-8">
              <AnimatedSection>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-px bg-primary" />
                  <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary">Case Study Overview</span>
                </div>
                
                {project.summary && (
                  <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-[1.3] mb-12" style={{ fontFamily: "var(--font-display)" }}>
                    {project.summary}
                  </h2>
                )}

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-16 p-8 bg-secondary rounded-2xl border border-border/50">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-primary/40 uppercase tracking-widest mb-1">Total Area</span>
                    <span className="text-xl font-bold text-foreground">{project.totalAreaSqm?.toLocaleString() ?? "N/A"} m²</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-primary/40 uppercase tracking-widest mb-1">Completion</span>
                    <span className="text-xl font-bold text-foreground">{project.completionYear ?? "Ongoing"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-primary/40 uppercase tracking-widest mb-1">Location</span>
                    <span className="text-xl font-bold text-foreground truncate">{project.location?.split(',')[0]}</span>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-strong:text-foreground">
                  {project.description && (
                    <PortableTextRenderer value={project.description} />
                  )}
                </div>
              </AnimatedSection>

              {/* Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <AnimatedSection delay={0.2} className="mt-24">
                  <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-px bg-primary" />
                      <h3 className="text-sm font-bold tracking-[0.3em] uppercase text-primary">Visual Documentation</h3>
                    </div>
                  </div>
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

      {/* Next Project Navigation */}
      {nextProject && (
        <section className="py-24 bg-foreground overflow-hidden group">
          <Link href={`/projects/${nextProject.slug}`} className="block relative">
            <div className="container mx-auto px-4 md:px-6 text-center">
              <span className="inline-block text-[10px] font-bold tracking-[0.5em] uppercase text-white/40 mb-6 group-hover:text-primary transition-colors">Next Project</span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-10 transition-transform duration-500 group-hover:scale-105" style={{ fontFamily: "var(--font-display)" }}>
                {nextProject.title}
              </h2>
              <div className="flex items-center justify-center gap-4 text-white/60 font-bold tracking-widest uppercase text-xs">
                Explore Work <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </Link>
        </section>
      )}
    </>
  )
}
