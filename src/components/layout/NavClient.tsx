"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, FileText } from "lucide-react"
import { SiteSettings } from "@/types/sanity"
import { urlFor } from "@/sanity/lib/image"
import MobileMenu from "./MobileMenu"
import { Button } from "@/components/ui/button"

interface NavClientProps {
  settings: SiteSettings | null
}

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
]

export default function NavClient({ settings }: NavClientProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-lg border-b border-white/5 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link href="/" className="relative z-50 flex items-center gap-2">
            {settings?.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={urlFor(settings.logo).width(200).url()}
                alt={settings.siteName || "Logo"}
                className="h-8 md:h-10 w-auto object-contain"
              />
            ) : (
              <span className="text-xl md:text-2xl font-serif font-bold text-accent">
                {settings?.siteName || "MQM Flooring"}
              </span>
            )}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors hover:text-accent ${
                    isActive ? "text-accent" : "text-foreground/80"
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            {settings?.sisterCompanyUrl && settings?.sisterCompanyName && (
              <a
                href={settings.sisterCompanyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-foreground/60 hover:text-foreground transition-colors"
              >
                {settings.sisterCompanyName}
              </a>
            )}
            
            {settings?.companyProfilePdfUrl && (
              <a 
                href={settings.companyProfilePdfUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-8 px-3 text-sm font-medium border border-accent text-accent rounded-lg hover:bg-accent hover:text-background transition-colors"
              >
                <FileText className="w-4 h-4 mr-2" />
                Profile
              </a>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden relative z-50 p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  )
}
