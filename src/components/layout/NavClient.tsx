"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, FileText, ExternalLink } from "lucide-react";
import { SiteSettings } from "@/types";
import MobileMenu from "./MobileMenu";
import Image from "next/image";

interface NavClientProps {
  settings: SiteSettings | null;
}

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

export default function NavClient({ settings }: NavClientProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-md py-0"
            : "bg-white py-2"
        }`}
      >
        {/* ── Top utility bar ── */}
        {(settings?.sisterCompanyUrl || settings?.companyProfilePdfUrl) && (
          <motion.div 
            animate={{ height: isScrolled ? 0 : 32, opacity: isScrolled ? 0 : 1 }}
            className="bg-primary text-white text-xs overflow-hidden"
          >
            <div className="container mx-auto px-4 md:px-6 h-8 flex items-center justify-end gap-4 text-[10px] md:text-xs">
              {settings.sisterCompanyUrl && settings.sisterCompanyName && (
                <a
                  href={settings.sisterCompanyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-white/80 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  {settings.sisterCompanyName}
                </a>
              )}
              {settings.companyProfilePdfUrl && (
                <a
                  href={settings.companyProfilePdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-white/80 transition-colors"
                >
                  <FileText className="w-3 h-3" />
                  تنزيل الملف التعريفي / Download Profile
                </a>
              )}
            </div>
          </motion.div>
        )}

        {/* ── Main nav bar ── */}
        <div 
          className={`container mx-auto px-4 md:px-6 flex items-center justify-between transition-all duration-500 ${
            isScrolled ? "h-20" : "h-28"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="relative z-50 flex items-center gap-2 shrink-0 transition-transform hover:scale-105 duration-300"
          >
            <Image
              src="/logo2.svg"
              alt="Maqam Al-Emaar Logo"
              width={180}
              height={80}
              className={`transition-all duration-500 w-auto ${
                isScrolled ? "h-14" : "h-20"
              }`}
              priority
            />
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors pb-1 ${
                    isActive
                      ? "text-primary"
                      : "text-foreground/80 hover:text-primary"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className="px-5 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors shadow-btn"
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden relative z-50 p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
            id="mobile-menu-btn"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        settings={settings}
      />
    </>
  );
}
