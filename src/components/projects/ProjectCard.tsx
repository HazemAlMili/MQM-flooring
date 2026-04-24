import Link from "next/link"
import { MapPin, Calendar } from "lucide-react"
import { Project } from "@/types/sanity"
import SanityImage from "@/components/shared/SanityImage"

interface ProjectCardProps {
  project: Project
  index?: number
  priority?: boolean
}

const statusConfig: Record<string, { label: string; class: string }> = {
  "Completed": { label: "Completed", class: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  "Ongoing": { label: "Ongoing", class: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  "Under Review": { label: "Under Review", class: "bg-slate-500/20 text-slate-400 border-slate-500/30" },
}

export default function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const status = statusConfig[project.projectStatus] ?? statusConfig["Under Review"]

  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      {/* Image Container */}
      <div className="relative h-72 md:h-80 overflow-hidden bg-surface rounded-sm">
        {project.coverImage ? (
          <SanityImage
            image={project.coverImage}
            alt={project.title}
            fill
            priority={priority}
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-surface-subtle flex items-center justify-center">
            <span className="text-foreground/20 text-sm">No Image</span>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

        {/* Hover overlay: title reveal */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-gradient-to-t from-background/95 to-background/70 p-6">
          <p className="text-white font-serif text-xl">{project.title}</p>
          <p className="text-accent text-sm mt-1">View Project →</p>
        </div>

        {/* Service Category badge */}
        {project.serviceCategory?.title && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-accent text-background text-xs font-medium px-3 py-1 uppercase tracking-widest">
              {project.serviceCategory.title}
            </span>
          </div>
        )}

        {/* Status pill */}
        {project.projectStatus && (
          <div className="absolute top-4 right-4 z-10">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${status.class}`}>
              {status.label}
            </span>
          </div>
        )}
      </div>

      {/* Card Info */}
      <div className="py-5 space-y-2">
        <h3 className="text-xl font-serif text-white group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        {project.summary && (
          <p className="text-foreground/60 text-sm leading-relaxed line-clamp-2">{project.summary}</p>
        )}
        <div className="flex items-center gap-4 text-xs text-foreground/50">
          {project.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {project.location}
            </span>
          )}
          {project.completionYear && (
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {project.completionYear}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
