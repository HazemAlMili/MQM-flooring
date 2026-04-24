import Link from "next/link"
import { Layers } from "lucide-react"
import { ServiceCategory } from "@/types/sanity"
import SanityImage from "@/components/shared/SanityImage"

interface ServiceCardProps {
  service: ServiceCategory
  index?: number
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group block h-full relative overflow-hidden rounded-sm bg-surface border border-white/5 hover:border-accent transition-all duration-300"
    >
      {/* Cover Image */}
      <div className="relative h-52 w-full overflow-hidden bg-surface">
        {service.coverImage ? (
          <SanityImage
            image={service.coverImage}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-surface-subtle">
            <Layers className="w-10 h-10 text-accent/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-8">
        <h3 className="text-2xl font-serif text-white mb-3 tracking-wide group-hover:text-accent transition-colors">
          {service.title}
        </h3>
        {service.shortDescription && (
          <p className="text-foreground/70 leading-relaxed line-clamp-3 mb-6">
            {service.shortDescription}
          </p>
        )}
        <span className="text-sm text-accent font-medium tracking-wide flex items-center gap-1 group-hover:gap-2 transition-all">
          Explore →
        </span>
      </div>
    </Link>
  )
}
