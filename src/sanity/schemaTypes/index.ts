import { projectSchema } from './project'
import { serviceCategorySchema } from './serviceCategory'
import { partnerLogoSchema } from './partnerLogo'
import { jobPostingSchema } from './jobPosting'
import { siteSettingsSchema } from './siteSettings'

export const schemaTypes = [
  projectSchema,
  serviceCategorySchema,
  partnerLogoSchema,
  jobPostingSchema,
  siteSettingsSchema,
]
