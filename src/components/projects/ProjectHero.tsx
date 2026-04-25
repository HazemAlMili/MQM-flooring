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
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-surface" />
        )}
      </motion.div>

      {/* Blue-tinted gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 pb-12 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          {project.serviceCategory?.title && (
            <span className="inline-block bg-white text-primary text-xs font-medium px-3 py-1 rounded-full mb-5">
              {project.serviceCategory.title}
            </span>
          )}
          <h1
            className="text-4xl md:text-6xl font-bold text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {project.title}
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
