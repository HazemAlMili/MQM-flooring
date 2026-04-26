import Link from "next/link"
import { Project } from "@/types"
import ProjectCard from "@/components/projects/ProjectCard"
import { dummyProjects } from "@/lib/dummyData"

export default async function NotFound() {
  const displayProjects = dummyProjects.slice(0, 3)

  return (
    <div className="pt-32 pb-20 md:py-40 min-h-[80vh] flex flex-col justify-center bg-primary-wash">
      <div className="container mx-auto px-4 md:px-6 text-center">
        {/* Error Header */}
        <h1 
          className="text-8xl md:text-9xl font-bold text-primary mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          404
        </h1>
        <h2 
          className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          الصفحة غير موجودة / Page Not Found
        </h2>
        <p className="text-muted-foreground text-lg max-w-lg mx-auto mb-10 leading-relaxed">
          The page you are looking for doesn&apos;t exist or has been moved. 
          Let&apos;s get you back on track to exploring our premium spaces.
        </p>
        
        <Link 
          href="/"
          className="inline-block bg-primary text-white px-8 py-4 font-semibold rounded-lg hover:bg-primary-hover transition-colors mb-24 shadow-btn"
        >
          ← Back to Home
        </Link>

        {/* Featured Projects Grid */}
        {displayProjects.length > 0 && (
          <div className="text-left mt-12 border-t border-border pt-16">
            <h3 
              className="text-2xl font-bold text-foreground mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Explore Our Recent Work
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {displayProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
