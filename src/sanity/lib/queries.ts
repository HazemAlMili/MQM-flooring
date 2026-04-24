import { groq } from 'next-sanity'

export const imageFragment = groq`
  ...,
  asset->{
    _id,
    url,
    metadata {
      lqip,
      dimensions
    }
  }
`

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    ...,
    logo{ ${imageFragment} },
    "companyProfilePdfUrl": companyProfilePdf.asset->url
  }
`

export const partnerLogosQuery = groq`
  *[_type == "partnerLogo"] | order(order asc) {
    _id,
    name,
    websiteUrl,
    logo{ ${imageFragment} }
  }
`

export const allServicesQuery = groq`
  *[_type == "serviceCategory"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    icon,
    coverImage{ ${imageFragment} }
  }
`

export const serviceBySlugQuery = groq`
  *[_type == "serviceCategory" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    fullDescription,
    icon,
    capabilities,
    coverImage{ ${imageFragment} }
  }
`

export const allServiceSlugsQuery = groq`
  *[_type == "serviceCategory" && defined(slug.current)][]{
    "slug": slug.current
  }
`

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(_createdAt desc)[0...6]{
    _id,
    title,
    "slug": slug.current,
    summary,
    serviceCategory->{ title, "slug": slug.current },
    projectStatus,
    completionYear,
    location,
    coverImage{ ${imageFragment} }
  }
`

export const allProjectsQuery = groq`
  *[_type == "project"] | order(completionYear desc, _createdAt desc){
    _id,
    title,
    "slug": slug.current,
    summary,
    serviceCategory->{ title, "slug": slug.current },
    projectStatus,
    completionYear,
    location,
    coverImage{ ${imageFragment} }
  }
`

export const projectsByServiceQuery = groq`
  *[_type == "project" && serviceCategory->slug.current == $categorySlug] | order(completionYear desc, _createdAt desc){
    _id,
    title,
    "slug": slug.current,
    summary,
    serviceCategory->{ title, "slug": slug.current },
    projectStatus,
    completionYear,
    location,
    coverImage{ ${imageFragment} }
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    summary,
    description,
    featured,
    serviceCategory->{ title, "slug": slug.current },
    contractType,
    projectStatus,
    completionYear,
    clientName,
    location,
    totalAreaSqm,
    coverImage{ ${imageFragment} },
    gallery[]{ ${imageFragment} },
    seoTitle,
    seoDescription
  }
`

export const allProjectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)][]{
    "slug": slug.current
  }
`

export const activeJobsQuery = groq`
  *[_type == "jobPosting" && isActive == true] | order(postedDate desc){
    _id,
    title,
    department,
    location,
    type,
    postedDate
  }
`
