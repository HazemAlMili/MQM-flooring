"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Box, Layers, LayoutGrid, Paintbrush } from "lucide-react"
import { ServiceCategory } from "@/types/sanity"

interface ServiceCardProps {
  service: ServiceCategory
  index?: number
}

// Map text icon names from Sanity to Lucide icons
const IconMap: Record<string, React.ElementType> = {
  box: Box,
  layers: Layers,
  grid: LayoutGrid,
  paintbrush: Paintbrush,
}

export default function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const IconComponent = (service.icon && IconMap[service.icon.toLowerCase()]) || Layers

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group"
    >
      <Link 
        href={`/services/${service.slug}`}
        className="block h-full p-8 bg-surface/30 border border-white/5 hover:border-accent hover:bg-surface transition-all duration-300 rounded-sm relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <ArrowRight className="w-6 h-6 text-accent" />
        </div>
        
        <div className="w-14 h-14 bg-accent/10 flex items-center justify-center mb-8 border border-accent/20 group-hover:bg-accent/20 transition-colors">
          <IconComponent className="w-7 h-7 text-accent" />
        </div>
        
        <h3 className="text-2xl font-serif text-white mb-4 tracking-wide group-hover:text-accent transition-colors">
          {service.title}
        </h3>
        
        {service.shortDescription && (
          <p className="text-foreground/70 leading-relaxed line-clamp-3">
            {service.shortDescription}
          </p>
        )}
      </Link>
    </motion.div>
  )
}
