"use client"

import { useCallback, useMemo, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { Project, ServiceCategory } from "@/types/sanity"
import ProjectCard from "./ProjectCard"
import { dummyProjects, dummyServiceCategories } from "@/lib/dummyData"

interface ProjectFilterProps {
  projects: Project[]
  services: ServiceCategory[]
}

function ProjectFilterInner({ projects, services }: ProjectFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get("category") ?? "all"

  // TODO: Remove dummy fallback once Sanity is populated
  const displayProjects  = projects.length  > 0 ? projects  : dummyProjects
  const displayServices  = services.length  > 0 ? services  : dummyServiceCategories

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
    if (activeCategory === "all") return displayProjects
    return displayProjects.filter((p) => p.serviceCategory?.slug === activeCategory)
  }, [displayProjects, activeCategory])

  const categories = [
    { label: "All",  slug: "all" },
    ...displayServices.map((s) => ({ label: s.title, slug: s.slug })),
  ]

  return (
    <div>
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-12">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.slug
          return (
            <button
              key={cat.slug}
              onClick={() => setFilter(cat.slug)}
              className={`relative px-5 py-2 text-sm font-medium rounded-full transition-all ${
                isActive
                  ? "bg-primary text-white shadow-btn"
                  : "bg-surface text-muted-foreground border border-border hover:text-primary hover:border-primary"
              }`}
            >
              {cat.label}
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
              <p className="text-muted-foreground text-lg">
                No projects in this category yet.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default function ProjectFilter(props: ProjectFilterProps) {
  return (
    <Suspense
      fallback={
        <div className="text-muted-foreground text-center py-20">
          Loading projects…
        </div>
      }
    >
      <ProjectFilterInner {...props} />
    </Suspense>
  )
}
