import Link from "next/link"
import { client } from "@/sanity/lib/client"
import { featuredProjectsQuery } from "@/sanity/lib/queries"
import { Project } from "@/types/sanity"
import ProjectCard from "@/components/projects/ProjectCard"

export default async function NotFound() {
  // Fetch up to 3 featured projects for the 404 page
  // If this fails, we just show an empty grid, but it shouldn't fail.
  let featuredProjects: Project[] = []
  try {
    const projects = await client.fetch<Project[]>(featuredProjectsQuery)
    featuredProjects = projects.slice(0, 3)
  } catch (error) {
    console.error("Failed to fetch featured projects for 404 page", error)
  }

  return (
    <div className="pt-32 pb-20 md:py-40 min-h-[80vh] flex flex-col justify-center">
      <div className="container mx-auto px-4 md:px-6 text-center">
        {/* Error Header */}
        <h1 className="text-8xl md:text-9xl font-serif text-accent mb-6">404</h1>
        <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-foreground/70 text-lg max-w-lg mx-auto mb-10">
          The page you are looking for doesn't exist or has been moved. 
          Let's get you back on track to exploring our premium spaces.
        </p>
        
        <Link 
          href="/"
          className="inline-block bg-accent text-background px-8 py-4 font-medium hover:bg-accent/90 transition-colors mb-24"
        >
          Return to Homepage
        </Link>

        {/* Featured Projects Grid */}
        {featuredProjects.length > 0 && (
          <div className="text-left mt-12 border-t border-white/10 pt-16">
            <h3 className="text-2xl font-serif text-white mb-8">
              Explore Our Recent Work
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
