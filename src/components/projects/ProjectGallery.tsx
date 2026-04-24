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
      if (e.key === "ArrowLeft") prev()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open, next, prev])

  // Touch/swipe navigation
  useEffect(() => {
    if (!open) return
    let startX = 0
    const onTouchStart = (e: TouchEvent) => { startX = e.touches[0].clientX }
    const onTouchEnd = (e: TouchEvent) => {
      const delta = e.changedTouches[0].clientX - startX
      if (delta > 50) prev()
      if (delta < -50) next()
    }
    window.addEventListener("touchstart", onTouchStart)
    window.addEventListener("touchend", onTouchEnd)
    return () => {
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchend", onTouchEnd)
    }
  }, [open, next, prev])

  if (!images || images.length === 0) return null

  return (
    <>
      {/* Thumbnail Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => { setActiveIndex(i); setOpen(true) }}
            className="relative aspect-square overflow-hidden rounded-sm bg-surface hover:opacity-90 transition-opacity group"
          >
            <SanityImage
              image={img}
              alt={img.alt || `Gallery image ${i + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </button>
        ))}
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-none w-screen h-screen m-0 p-0 bg-background/95 backdrop-blur-md border-none rounded-none flex items-center justify-center">
          {/* Counter */}
          <div className="absolute top-6 right-6 z-20 font-mono text-sm text-foreground/70">
            {activeIndex + 1} / {images.length}
          </div>

          {/* Close */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-6 left-6 z-20 p-2 text-foreground/70 hover:text-foreground transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image */}
          <div className="relative w-full h-full flex items-center justify-center px-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-5xl max-h-[80vh] aspect-video"
              >
                <SanityImage
                  image={images[activeIndex]}
                  alt={images[activeIndex].alt || `Image ${activeIndex + 1}`}
                  fill
                  priority
                  className="object-contain"
                  sizes="90vw"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows (desktop only) */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:flex p-3 text-foreground/70 hover:text-foreground transition-colors bg-white/5 hover:bg-white/10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex p-3 text-foreground/70 hover:text-foreground transition-colors bg-white/5 hover:bg-white/10"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
