"use client"

import { PartnerLogo } from "@/types/sanity"
import SanityImage from "@/components/shared/SanityImage"

interface PartnerMarqueeProps {
  logos: PartnerLogo[]
}

export default function PartnerMarquee({ logos }: PartnerMarqueeProps) {
  if (!logos || logos.length === 0) return null

  // Duplicate logos array a few times to ensure smooth infinite scroll
  // if there are only a few logos uploaded.
  const duplicatedLogos = [...logos, ...logos, ...logos]

  return (
    <section className="py-12 md:py-16 bg-surface/50 border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 mb-8 text-center">
        <h2 className="text-sm md:text-base font-medium tracking-widest uppercase text-foreground/50">
          Trusted by Industry Leaders
        </h2>
      </div>

      <div className="relative flex w-full overflow-hidden">
        <div className="flex w-max animate-marquee space-x-12 px-6">
          {duplicatedLogos.map((partner, index) => (
            <div
              // Using index in key because of array duplication
              key={`${partner._id}-${index}`}
              className="flex items-center justify-center min-w-[120px] max-w-[200px]"
            >
              <div className="relative w-full h-16 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <SanityImage
                  image={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 120px, 200px"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Duplicate track for seamless infinite scroll */}
        <div className="flex w-max animate-marquee space-x-12 px-6 absolute top-0" aria-hidden="true" style={{ left: "100%" }}>
          {duplicatedLogos.map((partner, index) => (
            <div
              key={`dup-${partner._id}-${index}`}
              className="flex items-center justify-center min-w-[120px] max-w-[200px]"
            >
              <div className="relative w-full h-16 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <SanityImage
                  image={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 120px, 200px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
