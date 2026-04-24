"use client"

import { useCallback, useMemo, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { Project, ServiceCategory } from "@/types/sanity"
import ProjectCard from "./ProjectCard"

interface ProjectFilterProps {
  projects: Project[]
  services: ServiceCategory[]
}

function ProjectFilterInner({ projects, services }: ProjectFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get("category") ?? "all"

  const setFilter = useCallback(
    (slug: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (slug === "all") {
        params.delete("category")
      } else {
        params.set("category", slug)
      }
      router.push(`/projects?${params.toString()}`, { scroll: false })
    },
    [router, searchParams]
  )

  const filtered = useMemo(() => {
    if (activeCategory === "all") return projects
    return projects.filter((p) => p.serviceCategory?.slug === activeCategory)
  }, [projects, activeCategory])

  const categories = [
    { label: "All", slug: "all" },
    ...services.map((s) => ({ label: s.title, slug: s.slug })),
  ]

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-12">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.slug
          return (
            <button
              key={cat.slug}
              onClick={() => setFilter(cat.slug)}
              className={`relative px-5 py-2.5 text-sm font-medium transition-colors border rounded-none ${
                isActive
                  ? "border-accent text-accent"
                  : "border-white/10 text-foreground/60 hover:border-white/30 hover:text-foreground"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-filter-pill"
                  className="absolute inset-0 bg-accent/10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          )
        })}
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            filtered.map((project, index) => (
              <motion.div
                key={project._id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
              >
                <ProjectCard project={project} priority={index < 3} />
              </motion.div>
            ))
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full text-center py-20"
            >
              <p className="text-foreground/50 text-lg">No projects in this category yet.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default function ProjectFilter(props: ProjectFilterProps) {
  return (
    <Suspense fallback={<div className="text-foreground/50 text-center py-20">Loading projects...</div>}>
      <ProjectFilterInner {...props} />
    </Suspense>
  )
}
