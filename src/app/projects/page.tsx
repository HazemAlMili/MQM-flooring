import { Metadata } from "next"
import PageHero from "@/components/shared/PageHero"
import ProjectFilter from "@/components/projects/ProjectFilter"
import { dummyProjects } from "@/lib/dummyData"

export const metadata: Metadata = {
  title: "Our Projects | Maqam Al-Emaar",
  description: "Explore our portfolio of premium construction and fit-out projects across the Middle East.",
  openGraph: {
    title: "Our Projects | Maqam Al-Emaar",
    description: "Explore our portfolio of premium construction and fit-out projects across the Middle East.",
    images: [{ url: "/og-default.jpg" }],
  },
}

export const revalidate = 60

export default async function ProjectsPage() {
  const displayProjects = dummyProjects
  // Need to get services from dummyServiceCategories if available, let's just import dummyServiceCategories
  // Actually, wait, let me just replace the body completely

  return (
    <>
      <PageHero
        title="Our Projects"
        subtitle={`${displayProjects.length} completed and ongoing project${displayProjects.length !== 1 ? "s" : ""} across the Middle East.`}
      />

      <section className="py-20 md:py-32 bg-primary-wash">
        <div className="container mx-auto px-4 md:px-6">
          <ProjectFilter projects={displayProjects} services={[]} />
        </div>
      </section>
    </>
  )
}
