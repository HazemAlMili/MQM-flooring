import Link from "next/link"
import { client } from "@/sanity/lib/client"
import { siteSettingsQuery } from "@/sanity/lib/queries"
import { SiteSettings } from "@/types/sanity"
import { urlFor } from "@/sanity/lib/image"
import { MapPin, Phone, Mail } from "lucide-react"

export default async function Footer() {
  const settings = await client.fetch<SiteSettings>(siteSettingsQuery)

  const navLinks = [
    { name: "Home",     href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Careers",  href: "/careers" },
    { name: "Contact",  href: "/contact" },
  ]

  return (
    <footer className="bg-primary text-white">
      {/* Top border */}
      <div className="border-t border-white/20" />

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Column 1: Logo & tagline */}
          <div className="space-y-5">
            <Link href="/" className="inline-block">
              {settings?.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={urlFor(settings.logo).width(180).url()}
                  alt={settings.siteName || "Maqam Al-Emaar"}
                  className="h-10 w-auto object-contain brightness-0 invert"
                />
              ) : (
                <span
                  className="text-2xl font-bold text-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {settings?.siteName || "مقام الإعمار"}
                </span>
              )}
            </Link>
            {settings?.companyTagline && (
              <p className="text-white/70 text-sm leading-relaxed max-w-xs">
                {settings.companyTagline}
              </p>
            )}
            <p className="text-white/50 text-xs pt-2">
              © {new Date().getFullYear()} مقام الإعمار. جميع الحقوق محفوظة.
              <br />
              © {new Date().getFullYear()} Maqam Al-Emaar. All rights reserved.
            </p>
          </div>

          {/* Column 2: Quick links */}
          <div className="space-y-5">
            <h3
              className="text-lg font-semibold text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Quick Links
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact info */}
          <div className="space-y-5">
            <h3
              className="text-lg font-semibold text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Contact Us
            </h3>
            <ul className="space-y-4">
              {settings?.address && (
                <li className="flex items-start gap-3 text-white/70 text-sm">
                  <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <span>{settings.address}</span>
                </li>
              )}
              {settings?.phone && (
                <li className="flex items-center gap-3 text-white/70 text-sm">
                  <Phone className="w-4 h-4 text-white shrink-0" />
                  <a
                    href={`tel:${settings.phone.replace(/\s+/g, "")}`}
                    className="hover:text-white transition-colors"
                  >
                    {settings.phone}
                  </a>
                </li>
              )}
              {settings?.email && (
                <li className="flex items-center gap-3 text-white/70 text-sm">
                  <Mail className="w-4 h-4 text-white shrink-0" />
                  <a
                    href={`mailto:${settings.email}`}
                    className="hover:text-white transition-colors"
                  >
                    {settings.email}
                  </a>
                </li>
              )}
              {settings?.linkedinUrl && (
                <li className="pt-2">
                  <a
                    href={settings.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-colors"
                  >

                    {/* LinkedIn */}
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
