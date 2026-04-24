import { PortableTextBlock } from '@portabletext/types'

export interface SanityImageAsset {
  _id: string
  url: string
  metadata: {
    lqip: string
    dimensions: {
      width: number
      height: number
      aspectRatio: number
    }
  }
}

export interface SanityImage {
  _type: 'image'
  asset: SanityImageAsset
  alt?: string
  caption?: string
}

export interface SiteSettings {
  _id: string
  siteName?: string
  logo?: SanityImage
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
  _id: string
  name: string
  websiteUrl?: string
  logo: SanityImage
}

export interface ServiceCategory {
  _id: string
  title: string
  slug: string
  shortDescription?: string
  fullDescription?: PortableTextBlock[]
  icon?: string
  capabilities?: string[]
  coverImage?: SanityImage
}

export interface Project {
  _id: string
  title: string
  slug: string
  summary?: string
  description?: PortableTextBlock[]
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
  coverImage: SanityImage
  gallery?: SanityImage[]
  seoTitle?: string
  seoDescription?: string
}

export interface JobPosting {
  _id: string
  title: string
  department?: string
  location?: string
  type?: string
  description?: PortableTextBlock[]
  isActive: boolean
  postedDate?: string
}
