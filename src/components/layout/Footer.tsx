import Link from "next/link"
import { dummyServiceCategories } from "@/lib/dummyData"
import { SiteSettings, ServiceCategory } from "@/types"
import { MapPin, Phone, Mail } from "lucide-react"
import Image from "next/image"

export default async function Footer() {

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ]

  const fallbackServices: ServiceCategory[] = [
    { id: '1', title: 'Interior Fit-out', slug: 'fit-out', shortDescription: '' },
    { id: '2', title: 'General Construction', slug: 'construction', shortDescription: '' },
    { id: '3', title: 'Flooring Solutions', slug: 'flooring', shortDescription: '' },
    { id: '4', title: 'Project Management', slug: 'management', shortDescription: '' },
    { id: '5', title: 'Acoustic Panels', slug: 'acoustic', shortDescription: '' },
  ]

  const fallbackSettings: SiteSettings = {
    id: 'settings-1',
    companyTagline: 'Pioneering excellence in construction and interior fit-outs across the Middle East.',
    address: 'Dubai, United Arab Emirates',
    phone: '+971 4 000 0000',
    email: 'info@maqam-alemaar.com',
    linkedinUrl: 'https://linkedin.com',
  }

  const displayServices = dummyServiceCategories.length > 0 ? dummyServiceCategories : fallbackServices
  const displaySettings = fallbackSettings

  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          {/* Column 1: Logo & Tagline */}
          <div className="flex flex-col gap-8 md:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block transition-transform duration-300 origin-left">
              <Image
                src="/logo.svg"
                alt="Maqam Al-Emaar Logo"
                width={240}
                height={96}
                className="h-24 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-white/80 text-sm leading-relaxed max-w-xs font-medium">
              {displaySettings.companyTagline}
            </p>
            {displaySettings.linkedinUrl && (
              <div className="flex gap-4 pt-2">
                <a
                  href={displaySettings.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-all hover:-translate-y-1"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            )}
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col gap-6">
            <h4 className="text-xs font-bold tracking-[0.25em] uppercase text-white/50">
              Navigation
            </h4>
            <nav>
              <ul className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/80 hover:text-white transition-colors text-sm font-semibold inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3: Services */}
          <div className="flex flex-col gap-6">
            <h4 className="text-xs font-bold tracking-[0.25em] uppercase text-white/50">
              Our Services
            </h4>
            <ul className="flex flex-col gap-4">
              {displayServices.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-white/80 hover:text-white transition-colors text-sm font-semibold inline-block"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="flex flex-col gap-6">
            <h4 className="text-xs font-bold tracking-[0.25em] uppercase text-white/50">
              Get in Touch
            </h4>
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4 group cursor-default">
                <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/80 text-sm leading-relaxed font-semibold">
                  {displaySettings.address}
                </span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <a
                  href={`tel:${displaySettings.phone}`}
                  className="text-white/80 text-sm hover:text-white transition-colors font-bold"
                >
                  {displaySettings.phone}
                </a>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <a
                  href={`mailto:${displaySettings.email}`}
                  className="text-white/80 text-sm hover:text-white transition-colors font-bold break-all"
                >
                  {displaySettings.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase">
              © {new Date().getFullYear()} Maqam Al-Emaar. All rights reserved.
            </p>
            <p className="text-white/20 text-[9px] font-bold tracking-widest uppercase">
              مقام الإعمار. جميع الحقوق محفوظة
            </p>
          </div>
          <div className="flex gap-8">
            <Link href="/privacy" className="text-white/40 hover:text-white transition-colors text-[9px] font-bold tracking-widest uppercase">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/40 hover:text-white transition-colors text-[9px] font-bold tracking-widest uppercase">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
