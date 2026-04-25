"use client"

import { PartnerLogo } from "@/types/sanity"
import SanityImage from "@/components/shared/SanityImage"

interface PartnerMarqueeProps {
  logos: PartnerLogo[]
}

export default function PartnerMarquee({ logos }: PartnerMarqueeProps) {
  if (!logos || logos.length === 0) return null

  const duplicatedLogos = [...logos, ...logos, ...logos]

  return (
    <section className="py-12 md:py-16 bg-white border-y border-border overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 mb-8 text-center">
        <p
          className="text-xs font-medium tracking-widest uppercase text-muted-foreground"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Trusted By Our Clients
        </p>
      </div>

      <div className="relative flex w-full overflow-hidden">
        {/* Track 1 */}
        <div className="flex w-max animate-marquee space-x-12 px-6">
          {duplicatedLogos.map((partner, index) => (
            <div
              key={`${partner._id}-${index}`}
              className="flex items-center justify-center min-w-[120px] max-w-[180px]"
            >
              <div className="relative w-full h-14 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <SanityImage
                  image={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 120px, 180px"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Track 2 (seamless loop) */}
        <div
          className="flex w-max animate-marquee space-x-12 px-6 absolute top-0"
          aria-hidden="true"
          style={{ left: "100%" }}
        >
          {duplicatedLogos.map((partner, index) => (
            <div
              key={`dup-${partner._id}-${index}`}
              className="flex items-center justify-center min-w-[120px] max-w-[180px]"
            >
              <div className="relative w-full h-14 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <SanityImage
                  image={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 120px, 180px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
