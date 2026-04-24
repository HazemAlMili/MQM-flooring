import { Metadata } from "next"
import { client } from "@/sanity/lib/client"
import { allProjectsQuery, allServicesQuery } from "@/sanity/lib/queries"
import { Project, ServiceCategory } from "@/types/sanity"
import PageHero from "@/components/shared/PageHero"
import ProjectFilter from "@/components/projects/ProjectFilter"

export const metadata: Metadata = {
  title: "Our Projects | MQM Flooring",
  description: "Explore our portfolio of premium flooring and interior fit-out projects across the Middle East.",
}

export const revalidate = 60

export default async function ProjectsPage() {
  const [projects, services] = await Promise.all([
    client.fetch<Project[]>(allProjectsQuery),
    client.fetch<ServiceCategory[]>(allServicesQuery),
  ])

  return (
    <>
      <PageHero
        title="Our Projects"
        subtitle={`${projects.length} completed and ongoing project${projects.length !== 1 ? "s" : ""} across the Middle East.`}
      />

      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <ProjectFilter projects={projects} services={services} />
        </div>
      </section>
    </>
  )
}
