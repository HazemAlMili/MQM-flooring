import { Metadata } from "next"
import { client } from "@/sanity/lib/client"
import { allProjectsQuery } from "@/sanity/lib/queries"
import { Project } from "@/types/sanity"
import PageHero from "@/components/shared/PageHero"
import ProjectFilter from "@/components/projects/ProjectFilter"

export const metadata: Metadata = {
  title: "Our Projects | MQM Flooring",
  description: "Explore our portfolio of premium flooring and interior fit-out projects across the Middle East.",
}

export const revalidate = 60

export default async function ProjectsPage() {
  const projects = await client.fetch<Project[]>(allProjectsQuery)

  return (
    <>
      <PageHero 
        title="Our Projects" 
        subtitle="A curated portfolio of transformative spaces delivered with precision and artistry."
      />

      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <ProjectFilter projects={projects} />
        </div>
      </section>
    </>
  )
}
