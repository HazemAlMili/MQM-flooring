"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Project } from "@/types/sanity";
import SanityImage from "@/components/shared/SanityImage";

interface ProjectHeroProps {
  project: Project;
}

export default function ProjectHero({ project }: ProjectHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 80]);

  return (
    <section
      ref={ref}
      className="relative h-[65vh] min-h-[480px] max-h-[720px] overflow-hidden flex items-end"
    >
      {/* Parallax image */}
      <motion.div className="absolute inset-0" style={{ y }}>
        {project.coverImage ? (
          <SanityImage
            image={project.coverImage}
            alt={project.title}
            fill
            priority
            className="object-cover scale-110"
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-secondary" />
        )}
      </motion.div>

      {/* Modern Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
      <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          {project.serviceCategory?.title && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="bg-primary text-white text-[10px] font-bold tracking-[0.3em] uppercase px-4 py-2 rounded-full shadow-lg">
                {project.serviceCategory.title}
              </span>
              <div className="h-px w-12 bg-white/30" />
            </motion.div>
          )}
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {project.title}
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
