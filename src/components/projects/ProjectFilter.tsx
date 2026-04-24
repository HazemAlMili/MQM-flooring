"use client"

import { useState, useMemo } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Project } from "@/types/sanity"
import ProjectCard from "./ProjectCard"

interface ProjectFilterProps {
  projects: Project[]
}

export default function ProjectFilter({ projects }: ProjectFilterProps) {
  const [activeFilter, setActiveFilter] = useState("All")

  // Build unique category list dynamically from the fetched projects
  const categories = useMemo(() => {
    const cats = new Set<string>()
    projects.forEach((p) => {
      if (p.serviceCategory?.title) cats.add(p.serviceCategory.title)
    })
    return ["All", ...Array.from(cats)]
  }, [projects])

  const filtered = useMemo(() => {
    if (activeFilter === "All") return projects
    return projects.filter((p) => p.serviceCategory?.title === activeFilter)
  }, [projects, activeFilter])

  return (
    <div>
      {/* Filter Tab Row */}
      <div className="flex flex-wrap gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`relative px-5 py-2.5 text-sm font-medium transition-colors border rounded-none ${
              activeFilter === cat
                ? "border-accent text-accent"
                : "border-white/10 text-foreground/60 hover:border-white/30 hover:text-foreground"
            }`}
          >
            {activeFilter === cat && (
              <motion.div
                layoutId="active-filter"
                className="absolute inset-0 bg-accent/10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10">{cat}</span>
          </button>
        ))}
      </div>

      {/* Project Grid with layout animations */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            filtered.map((project, index) => (
              <ProjectCard key={project._id} project={project} index={index} />
            ))
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full text-center py-20"
            >
              <p className="text-foreground/50 text-lg">
                No projects in this category yet.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
