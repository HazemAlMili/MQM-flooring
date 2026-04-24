import { defineField, defineType } from 'sanity'

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
    }),
    defineField({
      name: 'companyTagline',
      title: 'Company Tagline',
      type: 'string',
    }),
    defineField({
      name: 'companyProfilePdf',
      title: 'Company Profile PDF',
      type: 'file',
    }),
    defineField({
      name: 'sisterCompanyName',
      title: 'Sister Company Name',
      type: 'string',
    }),
    defineField({
      name: 'sisterCompanyUrl',
      title: 'Sister Company URL',
      type: 'url',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'mobile',
      title: 'Mobile Number',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
    }),
    defineField({
      name: 'googleMapsEmbedUrl',
      title: 'Google Maps Embed URL',
      type: 'url',
    }),
    defineField({
      name: 'yearsInOperation',
      title: 'Years in Operation',
      type: 'number',
    }),
    defineField({
      name: 'projectsCompleted',
      title: 'Projects Completed',
      type: 'number',
    }),
    defineField({
      name: 'totalAreaDelivered',
      title: 'Total Area Delivered',
      type: 'number',
    }),
    defineField({
      name: 'countriesOperated',
      title: 'Countries Operated',
      type: 'number',
    }),
  ],
})
