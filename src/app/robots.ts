import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  // If NEXT_PUBLIC_SITE_URL is defined use it, otherwise fallback
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mqmflooring.com"

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
