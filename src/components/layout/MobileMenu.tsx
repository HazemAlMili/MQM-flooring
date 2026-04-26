"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { SiteSettings } from "@/types";
import Image from "next/image";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  settings?: SiteSettings | null;
}

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

export default function MobileMenu({
  isOpen,
  onClose,
  settings,
}: MobileMenuProps) {
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Full-screen primary overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed inset-0 z-50 bg-primary flex flex-col p-6"
          >
            {/* Header row: logo + close */}
            <div className="flex items-center justify-between mb-12">
              <Link
                href="/"
                onClick={onClose}
                className="flex items-center gap-2"
              >
                <Image
                  src="/logo2.svg"
                  alt="Maqam Al-Emaar Logo"
                  width={140}
                  height={56}
                  className="h-14 w-auto brightness-0 invert"
                />
              </Link>
              <button
                onClick={onClose}
                className="p-2 text-white/80 hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Nav links — staggered entrance */}
            <nav className="flex flex-col gap-2 flex-1">
              {navLinks.map((link, i) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: i * 0.06,
                      duration: 0.35,
                      ease: "easeOut",
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={`block text-3xl py-3 border-b border-white/10 transition-colors ${
                        isActive
                          ? "text-white font-bold"
                          : "text-white/80 hover:text-white font-medium"
                      }`}
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.35 }}
              className="mt-8"
            >
              <Link
                href="/contact"
                onClick={onClose}
                className="block w-full py-4 bg-white text-primary text-center font-semibold rounded-xl text-lg hover:bg-white/90 transition-colors shadow-btn"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
