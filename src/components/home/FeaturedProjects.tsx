import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Project } from "@/types"
import ProjectCard from "@/components/projects/ProjectCard"
import { dummyProjects } from "@/lib/dummyData"
import AnimatedSection from "@/components/shared/AnimatedSection"

interface FeaturedProjectsProps {
  projects: Project[]
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  // TODO: Remove dummy fallback once Sanity is populated
  const displayProjects = projects.length > 0 ? projects : dummyProjects

  const featured = displayProjects.slice(0, 5)
  const [large, ...small] = featured

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6">

        {/* Header */}
        <AnimatedSection className="flex items-end justify-between mb-12">
          <div>
            <div className="w-10 h-1 bg-primary rounded-full mb-4" />
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Featured Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="hidden md:flex items-center gap-1 text-primary text-sm font-medium hover:gap-2 transition-all"
          >
            View All Projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </AnimatedSection>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Large card (col-span-2 on lg) */}
          {large && (
            <AnimatedSection className="lg:col-span-2" delay={0}>
              <ProjectCard project={large} priority={true} isLarge />
            </AnimatedSection>
          )}

          {/* Two stacked cards */}
          <div className="flex flex-col gap-6">
            {small.slice(0, 2).map((project, i) => (
              <AnimatedSection key={project.id} delay={0.1 + i * 0.1}>
                <ProjectCard project={project} />
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Mobile "View All" link */}
        <AnimatedSection delay={0.3} className="mt-8 text-center md:hidden">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-primary font-medium"
          >
            View All Projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </AnimatedSection>

      </div>
    </section>
  )
}
