import Link from "next/link"
import Image from "next/image"
import { MapPin, Calendar } from "lucide-react"
import { Project } from "@/types/sanity"
import SanityImage from "@/components/shared/SanityImage"

interface ProjectCardProps {
  project: Project
  index?: number
  priority?: boolean
  isLarge?: boolean
}

const statusConfig: Record<string, { label: string; class: string }> = {
  "Completed":    { label: "Completed",    class: "bg-primary text-white" },
  "Ongoing":      { label: "Ongoing",      class: "bg-primary-light/20 text-primary border border-primary/30" },
  "Under Review": { label: "Under Review", class: "bg-surface text-muted-foreground border border-border" },
}

// Check if the URL is a local path (dummy data) vs Sanity CDN
function isDummyImage(url?: string) {
  return url?.startsWith("/") || url?.startsWith("data:")
}

export default function ProjectCard({
  project,
  priority = false,
  isLarge = false,
}: ProjectCardProps) {
  const status = statusConfig[project.projectStatus] ?? statusConfig["Under Review"]
  const imageUrl = project.coverImage?.asset?.url

  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      {/* Image container */}
      <div
        className={`relative overflow-hidden bg-surface rounded-xl shadow-card group-hover:shadow-card-hover transition-shadow duration-300 ${
          isLarge ? "h-80 md:h-96" : "h-64 md:h-72"
        }`}
      >
        {isDummyImage(imageUrl) ? (
          /* Local / dummy image */
          <Image
            src={imageUrl || "/og-default.jpg"}
            alt={project.title}
            fill
            priority={priority}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes={isLarge ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
          />
        ) : (
          /* Sanity CDN image */
          <SanityImage
            image={project.coverImage}
            alt={project.title}
            fill
            priority={priority}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes={isLarge ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
          />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300" />

        {/* Hover reveal: title + CTA */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-gradient-to-t from-foreground/95 to-foreground/70 p-5">
          <p
            className="text-white font-bold text-lg leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {project.title}
          </p>
          <p className="text-primary-light text-sm mt-1">View Project →</p>
        </div>

        {/* Service category chip — top left */}
        {project.serviceCategory?.title && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-primary-wash text-primary text-xs font-medium px-3 py-1 rounded-full border border-primary/20">
              {project.serviceCategory.title}
            </span>
          </div>
        )}

        {/* Status badge — top right */}
        {project.projectStatus && (
          <div className="absolute top-4 right-4 z-10">
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full font-mono ${status.class}`}
            >
              {status.label}
            </span>
          </div>
        )}
      </div>

      {/* Card info below image */}
      <div className="py-4 space-y-2">
        <h3
          className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {project.title}
        </h3>
        {project.summary && (
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
            {project.summary}
          </p>
        )}
        <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
          {project.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {project.location}
            </span>
          )}
          {project.completionYear && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {project.completionYear}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
