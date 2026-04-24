import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/layout/PageWrapper";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://mqmflooring.com'),
  title: "Premium Flooring & Fit-Out | MQM Flooring",
  description: "Specialized in luxury flooring, raised floors, and complete interior fit-out solutions across the Middle East.",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://mqmflooring.com",
    siteName: "MQM Flooring",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Base Schema.org LocalBusiness JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "MQM Flooring",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://mqmflooring.com",
    telephone: "+971 50 123 4567",
    address: {
      "@type": "PostalAddress",
      addressCountry: "AE",
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" />
      </head>
      <body className="antialiased min-h-screen bg-background text-foreground flex flex-col font-sans">
        {/* Global JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1 flex flex-col pt-24">
            <PageWrapper>
              {children}
            </PageWrapper>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
