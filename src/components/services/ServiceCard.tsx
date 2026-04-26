import Link from "next/link"
import { Building2, Zap, ShieldCheck, ArrowRight } from "lucide-react"
import { ServiceCategory } from "@/types"
import Image from "next/image"

interface ServiceCardProps {
  service: ServiceCategory
  index?: number
}

const iconMap: Record<string, React.ElementType> = {
  "building-2":   Building2,
  "zap":          Zap,
  "shield-check": ShieldCheck,
}

function getIcon(name?: string) {
  if (!name) return Building2
  return iconMap[name] ?? Building2
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const Icon = getIcon(service.icon)

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group block h-full relative overflow-hidden rounded-xl bg-white border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
    >
      {/* Cover image */}
      <div className="relative h-52 w-full overflow-hidden bg-surface">
        {service.coverImage ? (
          <Image
            src={service.coverImage}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-primary-wash">
            <Icon className="w-10 h-10 text-primary/40" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-7">
        {/* Icon circle */}
        <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary transition-colors duration-300">
          <Icon className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-300" />
        </div>

        <h3
          className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {service.title}
        </h3>
        {service.shortDescription && (
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-5">
            {service.shortDescription}
          </p>
        )}
        <span className="inline-flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
          Explore
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  )
}
