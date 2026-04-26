"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Calendar } from "lucide-react"
import { Project } from "@/types"

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

// Removed isDummyImage as images are string URLs now

export default function ProjectCard({
  project,
  index = 0,
  priority = false,
  isLarge = false,
}: ProjectCardProps) {
  const status = statusConfig[project.projectStatus] ?? statusConfig["Under Review"]
  const imageUrl = project.coverImage || "/og-default.jpg"

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      <Link href={`/projects/${project.slug}`} className="group block">
        {/* Image container */}
        <div
          className={`relative overflow-hidden bg-surface rounded-xl shadow-card group-hover:shadow-card-hover transition-all duration-500 ${
            isLarge ? "h-80 md:h-96" : "h-64 md:h-72"
          }`}
        >
            <Image
              src={imageUrl}
              alt={project.title}
              fill
              priority={priority}
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes={isLarge ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
            />

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
              <span className="bg-primary-wash/90 backdrop-blur-sm text-primary text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border border-primary/20">
                {project.serviceCategory.title}
              </span>
            </div>
          )}

          {/* Status badge — top right */}
          {project.projectStatus && (
            <div className="absolute top-4 right-4 z-10">
              <span
                className={`text-[10px] font-bold tracking-widest uppercase px-2.5 py-1.5 rounded-full font-mono shadow-sm ${status.class}`}
              >
                {status.label}
              </span>
            </div>
          )}
        </div>

        {/* Card info below image */}
        <div className="py-5 space-y-3">
          <h3
            className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {project.title}
          </h3>
          {project.summary && (
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
              {project.summary}
            </p>
          )}
          <div className="flex items-center gap-5 text-[10px] font-bold tracking-wider text-muted-foreground/80 uppercase">
            {project.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                {project.location}
              </span>
            )}
            {project.completionYear && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                {project.completionYear}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
