export interface SiteSettings {
  id: string
  siteName?: string
  logo?: string
  companyTagline?: string
  companyProfilePdfUrl?: string
  sisterCompanyName?: string
  sisterCompanyUrl?: string
  address?: string
  phone?: string
  mobile?: string
  email?: string
  linkedinUrl?: string
  googleMapsEmbedUrl?: string
  yearsInOperation?: number
  projectsCompleted?: number
  totalAreaDelivered?: number
  countriesOperated?: number
}

export interface PartnerLogo {
  id: string
  name: string
  websiteUrl?: string
  logo: string
}

export interface ServiceCategory {
  id: string
  title: string
  slug: string
  shortDescription?: string
  fullDescription?: string
  icon?: string
  capabilities?: string[]
  coverImage?: string
}

export interface Project {
  id: string
  title: string
  slug: string
  summary?: string
  description?: string
  featured?: boolean
  serviceCategory: {
    title: string
    slug: string
  }
  contractType: string
  projectStatus: 'Completed' | 'Ongoing' | 'Under Review'
  completionYear: number
  clientName?: string
  location?: string
  totalAreaSqm?: number
  projectValue?: number
  coverImage: string
  gallery?: string[]
  seoTitle?: string
  seoDescription?: string
}

export interface JobPosting {
  id: string
  title: string
  department?: string
  location?: string
  type?: string
  description?: string
  isActive: boolean
  postedDate?: string
}
