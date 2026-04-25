import { client } from "../src/sanity/lib/client"

async function checkProjects() {
  const query = `*[_type == "project"]{title, "slug": slug.current}`
  try {
    const projects = await client.fetch(query)
    console.log("Projects in Sanity:", JSON.stringify(projects, null, 2))
  } catch (err) {
    console.error("Error fetching projects:", err)
  }
}

checkProjects()
