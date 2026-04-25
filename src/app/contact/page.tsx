import { Metadata } from "next"
import { client } from "@/sanity/lib/client"
import { siteSettingsQuery } from "@/sanity/lib/queries"
import { SiteSettings } from "@/types/sanity"
import PageHero from "@/components/shared/PageHero"
import AnimatedSection from "@/components/shared/AnimatedSection"
import ContactForm from "@/components/contact/ContactForm"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us | MQM Flooring",
  description: "Get in touch with MQM Flooring for premium flooring and interior fit-out solutions.",
  openGraph: {
    title: "Contact Us | MQM Flooring",
    description: "Get in touch with MQM Flooring for premium flooring and interior fit-out solutions.",
    images: [{ url: "/og-default.jpg" }],
  },
}

export const revalidate = 60

export default async function ContactPage() {
  const settings = await client.fetch<SiteSettings>(siteSettingsQuery)

  return (
    <>
      <PageHero 
        title="Contact Us" 
        subtitle="Let's discuss how we can bring your vision to life."
      />

      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left Column: Form */}
            <AnimatedSection>
              <ContactForm />
            </AnimatedSection>

            {/* Right Column: Info & Map */}
            <div className="space-y-12">
              <AnimatedSection delay={0.2} className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {settings?.address && (
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="text-white font-serif text-lg mb-2">Our Office</h4>
                      <p className="text-foreground/70 text-sm leading-relaxed">{settings.address}</p>
                    </div>
                  </div>
                )}

                {settings?.phone && (
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20">
                      <Phone className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="text-white font-serif text-lg mb-2">Call Us</h4>
                      <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="text-foreground/70 text-sm hover:text-accent transition-colors">
                        {settings.phone}
                      </a>
                    </div>
                  </div>
                )}

                {settings?.email && (
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20">
                      <Mail className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="text-white font-serif text-lg mb-2">Email Us</h4>
                      <a href={`mailto:${settings.email}`} className="text-foreground/70 text-sm hover:text-accent transition-colors block">
                        {settings.email}
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-white font-serif text-lg mb-2">Working Hours</h4>
                    <p className="text-foreground/70 text-sm">Mon - Fri: 9:00 AM - 6:00 PM</p>
                    <p className="text-foreground/70 text-sm">Sat - Sun: Closed</p>
                  </div>
                </div>
              </AnimatedSection>

              {/* Google Maps iframe */}
              {settings?.googleMapsEmbedUrl && (
                <AnimatedSection delay={0.4} className="h-[300px] w-full bg-surface border border-white/5 relative grayscale hover:grayscale-0 transition-all duration-500">
                  <iframe
                    src={settings.googleMapsEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Office Location Map"
                    className="absolute inset-0"
                  />
                </AnimatedSection>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
