import { Metadata } from "next"
import { SiteSettings } from "@/types"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import PageHero from "@/components/shared/PageHero"
import ContactForm from "@/components/contact/ContactForm"
import AnimatedSection from "@/components/shared/AnimatedSection"
import Logo from "@/components/shared/Logo"

export const metadata: Metadata = {
  title: "Contact Us | Maqam Al-Emaar",
  description: "Get in touch with our construction and engineering specialists.",
  openGraph: {
    title: "Contact Us | Maqam Al-Emaar",
    description: "Get in touch with our construction and engineering specialists.",
    images: [{ url: "/og-default.jpg" }],
  },
}

export const revalidate = 60

export default async function ContactPage() {
  const settings: SiteSettings | null = {
    address: 'Dubai, United Arab Emirates',
    phone: '+971 4 000 0000',
    email: 'info@maqam-alemaar.com',
  } as SiteSettings

  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="We are ready to bring your vision to life."
        breadcrumb="Get in Touch"
      />

      <section className="py-20 md:py-32 bg-primary-wash">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 bg-white rounded-2xl overflow-hidden shadow-card-hover border border-border">
            
            {/* Left panel: Info */}
            <div className="lg:col-span-5 bg-primary p-10 md:p-14 text-white relative overflow-hidden">
              {/* Decorative shapes */}
              <div aria-hidden="true" className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
              <div aria-hidden="true" className="absolute top-12 -left-12 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

              <AnimatedSection className="relative z-10 h-full flex flex-col">
                <div className="mb-12">
                  <Logo variant="white" size="lg" className="mb-8" />
                  <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "var(--font-display)" }}>
                    Corporate Headquarters
                  </h2>
                  <p className="text-white/80 leading-relaxed">
                    Our team of specialists is ready to assist you with your project requirements. Reach out to us through any of the channels below.
                  </p>
                </div>

                <div className="space-y-8 flex-1">
                  {settings?.address && (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-sm text-white/60 uppercase tracking-wider mb-1 font-mono">Address</h4>
                        <p className="leading-relaxed">{settings.address}</p>
                      </div>
                    </div>
                  )}

                  {settings?.phone && (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-sm text-white/60 uppercase tracking-wider mb-1 font-mono">Phone</h4>
                        <p className="leading-relaxed">{settings.phone}</p>
                        {settings.mobile && <p className="leading-relaxed">{settings.mobile}</p>}
                      </div>
                    </div>
                  )}

                  {settings?.email && (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-sm text-white/60 uppercase tracking-wider mb-1 font-mono">Email</h4>
                        <p className="leading-relaxed">{settings.email}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm text-white/60 uppercase tracking-wider mb-1 font-mono">Working Hours</h4>
                      <p className="leading-relaxed">Sun - Thu: 8:00 AM - 6:00 PM</p>
                      <p className="text-white/60 text-sm">Friday & Saturday: Closed</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Right panel: Form */}
            <div className="lg:col-span-7 bg-white p-8 md:p-12 lg:p-16">
              <AnimatedSection delay={0.2}>
                <ContactForm />
              </AnimatedSection>
            </div>

          </div>
        </div>
      </section>

      {/* Map Section */}
      {settings?.googleMapsEmbedUrl && (
        <section className="h-[400px] w-full relative">
          <iframe
            src={settings.googleMapsEmbedUrl}
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Maqam Al-Emaar Office Location"
          />
        </section>
      )}
    </>
  )
}
