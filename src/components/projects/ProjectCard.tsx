"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { MapPin, Calendar, Maximize2 } from "lucide-react"
import { Project } from "@/types/sanity"
import SanityImage from "@/components/shared/SanityImage"

interface ProjectCardProps {
  project: Project
  index?: number
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
    >
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="relative h-72 md:h-80 overflow-hidden bg-surface rounded-sm">
          {project.coverImage ? (
            <SanityImage
              image={project.coverImage}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-surface flex items-center justify-center">
              <Maximize2 className="w-12 h-12 text-foreground/20" />
            </div>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-accent text-background text-xs font-medium px-3 py-1 uppercase tracking-widest">
              {project.serviceCategory?.title || project.contractType}
            </span>
          </div>
        </div>

        <div className="py-5 space-y-3">
          <h3 className="text-xl font-serif text-white group-hover:text-accent transition-colors">
            {project.title}
          </h3>

          {project.summary && (
            <p className="text-foreground/60 text-sm leading-relaxed line-clamp-2">
              {project.summary}
            </p>
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
    </motion.div>
  )
}
