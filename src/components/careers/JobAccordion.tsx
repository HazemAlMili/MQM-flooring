"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, MapPin, Briefcase, Building2, Link, Calendar } from "lucide-react"
import { JobPosting } from "@/types/sanity"

interface JobAccordionProps {
  job: JobPosting
  settingsEmail?: string
}

export default function JobAccordion({ job, settingsEmail }: JobAccordionProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-white/10 bg-surface/30 rounded-sm overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start justify-between gap-4 p-6 md:p-8 text-left hover:bg-white/5 transition-colors"
      >
        <div className="flex-1 space-y-3">
          <h3 className="text-xl font-serif text-white">{job.title}</h3>
          <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/60">
            {job.department && (
              <span className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4" />
                {job.department}
              </span>
            )}
            {job.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                {job.location}
              </span>
            )}
            {job.type && (
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4" />
                <span className="border border-accent/40 text-accent text-xs px-2 py-0.5 rounded-full">
                  {job.type}
                </span>
              </span>
            )}
            {job.postedDate && (
              <span className="flex items-center gap-1.5 text-xs">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(job.postedDate).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
              </span>
            )}
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 mt-1"
        >
          <ChevronDown className="w-5 h-5 text-foreground/50" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-8 pb-8 border-t border-white/10 pt-6">
              {job.description && (
                <div className="text-foreground/70 leading-relaxed space-y-3 mb-8">
                  {/* Simple text rendering for job descriptions */}
                  <p className="text-foreground/70">Please contact us for full job details and requirements.</p>
                </div>
              )}

              <a
                href={`mailto:${settingsEmail ?? "careers@mqmflooring.com"}?subject=Application: ${job.title}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-background font-medium hover:bg-accent/90 transition-colors"
              >
                <Link className="w-4 h-4" />
                Apply Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
