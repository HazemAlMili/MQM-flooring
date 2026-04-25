"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { SanityImage as SanityImageType } from "@/types/sanity"
import SanityImage from "@/components/shared/SanityImage"

interface ProjectGalleryProps {
  images: SanityImageType[]
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % images.length)
  }, [images.length])

  const prev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + images.length) % images.length)
  }, [images.length])

  // Keyboard navigation
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next()
      if (e.key === "ArrowLeft")  prev()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open, next, prev])

  // Touch / swipe
  useEffect(() => {
    if (!open) return
    let startX = 0
    const onTouchStart = (e: TouchEvent) => { startX = e.touches[0].clientX }
    const onTouchEnd   = (e: TouchEvent) => {
      const delta = e.changedTouches[0].clientX - startX
      if (delta > 50) prev()
      if (delta < -50) next()
    }
    window.addEventListener("touchstart", onTouchStart)
    window.addEventListener("touchend",   onTouchEnd)
    return () => {
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchend",   onTouchEnd)
    }
  }, [open, next, prev])

  if (!images || images.length === 0) return null

  return (
    <>
      {/* Thumbnail grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            onClick={() => { setActiveIndex(i); setOpen(true) }}
            className="relative aspect-[4/3] overflow-hidden rounded-xl bg-secondary hover:ring-4 hover:ring-primary/20 transition-all duration-300 group shadow-sm hover:shadow-xl"
            aria-label={`Open gallery image ${i + 1}`}
          >
            <SanityImage
              image={img}
              alt={img.alt || `Gallery image ${i + 1}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-white/90 p-3 rounded-full scale-50 group-hover:scale-100 transition-transform duration-300">
                <ChevronRight className="w-5 h-5 text-primary" />
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-none w-screen h-screen m-0 p-0 bg-foreground/95 backdrop-blur-xl border-none rounded-none flex items-center justify-center">
          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50">
            <div className="flex flex-col">
              <span className="text-white/40 text-[10px] font-bold tracking-[0.4em] uppercase mb-1">Project Gallery</span>
              <span className="text-white text-xs font-mono tracking-widest">
                {activeIndex + 1} <span className="text-white/30">/</span> {images.length}
              </span>
            </div>
            
            <button
              onClick={() => setOpen(false)}
              className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all hover:rotate-90"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Active image */}
          <div className="relative w-full h-full flex items-center justify-center p-4 md:p-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-6xl h-full flex items-center justify-center"
              >
                <SanityImage
                  image={images[activeIndex]}
                  alt={images[activeIndex].alt || `Image ${activeIndex + 1}`}
                  fill
                  priority
                  className="object-contain drop-shadow-2xl"
                  sizes="100vw"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          {images.length > 1 && (
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-8 z-50">
              <button
                onClick={prev}
                className="p-4 bg-white/10 hover:bg-primary text-white rounded-full transition-all group"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
              </button>
              
              <div className="flex gap-2">
                {images.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1 transition-all duration-300 rounded-full ${i === activeIndex ? "w-8 bg-primary" : "w-2 bg-white/20"}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="p-4 bg-white/10 hover:bg-primary text-white rounded-full transition-all group"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
