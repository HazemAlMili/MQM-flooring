import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/layout/PageWrapper";

// ── Fonts ──────────────────────────────────────────────────
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

// ── Metadata ───────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://maqam-alemaar.com"
  ),
  title: {
    default: "مقام الإعمار | Maqam Al-Emaar — Premium Construction & Fit-Out",
    template: "%s | Maqam Al-Emaar",
  },
  description:
    "Maqam Al-Emaar delivers turnkey construction, electro-mechanical, and safety & security projects across the Middle East with precision and excellence.",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://maqam-alemaar.com",
    siteName: "مقام الإعمار | Maqam Al-Emaar",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
  },
};

// ── Root Layout ────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "مقام الإعمار | Maqam Al-Emaar",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://maqam-alemaar.com",
    telephone: "+966-XX-XXX-XXXX",
    address: {
      "@type": "PostalAddress",
      addressCountry: "SA",
    },
    logo: "https://maqam-alemaar.com/logo/mqm-logo-blue.png",
  };

  return (
    <html
      lang="en"
      className={`${cairo.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body className="antialiased min-h-screen bg-background text-foreground flex flex-col">
        {/* Global JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <Navbar />
        <main className="flex-1 flex flex-col pt-20">
          <PageWrapper>{children}</PageWrapper>
        </main>
        <Footer />
      </body>
    </html>
  );
}
