import Link from "next/link"
import { client } from "@/sanity/lib/client"
import { siteSettingsQuery } from "@/sanity/lib/queries"
import { SiteSettings } from "@/types/sanity"
import { urlFor } from "@/sanity/lib/image"
import { MapPin, Phone, Mail, Globe } from "lucide-react"

export default async function Footer() {
  const settings = await client.fetch<SiteSettings>(siteSettingsQuery)

  return (
    <footer className="bg-surface border-t border-accent mt-20">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Column 1: Logo & Info */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              {settings?.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={urlFor(settings.logo).width(200).url()}
                  alt={settings.siteName || "Logo"}
                  className="h-10 w-auto object-contain"
                />
              ) : (
                <span className="text-2xl font-serif font-bold text-accent">
                  {settings?.siteName || "MQM Flooring"}
                </span>
              )}
            </Link>
            {settings?.companyTagline && (
              <p className="text-foreground/70 max-w-sm">
                {settings.companyTagline}
              </p>
            )}
            <p className="text-sm text-foreground/50 pt-4">
              &copy; {new Date().getFullYear()} {settings?.siteName || "MQM Flooring"}. All rights reserved.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-serif font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Services", href: "/services" },
                { name: "Projects", href: "/projects" },
                { name: "Careers", href: "/careers" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-6">
            <h3 className="text-lg font-serif font-semibold text-white">Contact Us</h3>
            <ul className="space-y-4">
              {settings?.address && (
                <li className="flex items-start gap-3 text-foreground/70">
                  <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span>{settings.address}</span>
                </li>
              )}
              {settings?.phone && (
                <li className="flex items-center gap-3 text-foreground/70">
                  <Phone className="w-5 h-5 text-accent shrink-0" />
                  <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="hover:text-accent transition-colors">
                    {settings.phone}
                  </a>
                </li>
              )}
              {settings?.email && (
                <li className="flex items-center gap-3 text-foreground/70">
                  <Mail className="w-5 h-5 text-accent shrink-0" />
                  <a href={`mailto:${settings.email}`} className="hover:text-accent transition-colors">
                    {settings.email}
                  </a>
                </li>
              )}
              {settings?.linkedinUrl && (
                <li className="flex items-center gap-3 pt-2">
                  <a
                    href={settings.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/5 rounded-full hover:bg-accent hover:text-background transition-colors text-foreground/70"
                    aria-label="LinkedIn"
                  >
                    <Globe className="w-5 h-5" />
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
