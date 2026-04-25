"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, MapPin, Briefcase, Building2, Calendar } from "lucide-react"
import { JobPosting } from "@/types/sanity"

interface JobAccordionProps {
  job: JobPosting
  settingsEmail?: string
}

export default function JobAccordion({ job, settingsEmail }: JobAccordionProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-border bg-white rounded-xl shadow-card overflow-hidden">
      {/* Left accent bar */}
      <div className="flex">
        <div className="w-1 bg-primary shrink-0" />
        <div className="flex-1">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-start justify-between gap-4 p-6 md:p-7 text-left hover:bg-surface transition-colors"
          >
            <div className="flex-1 space-y-3">
              <h3
                className="text-xl font-bold text-foreground"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {job.title}
              </h3>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                {job.department && (
                  <span className="flex items-center gap-1.5 bg-primary-wash text-primary px-3 py-1 rounded-full text-xs font-medium border border-primary/10">
                    <Building2 className="w-3.5 h-3.5" />
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
                    <span className="border border-primary/30 text-primary text-xs px-2 py-0.5 rounded-full">
                      {job.type}
                    </span>
                  </span>
                )}
                {job.postedDate && (
                  <span className="flex items-center gap-1.5 text-xs font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(job.postedDate).toLocaleDateString("en-GB", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                )}
              </div>
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="shrink-0 mt-1"
            >
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
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
                <div className="px-6 md:px-7 pb-7 border-t border-border pt-5">
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    Please contact us for full job details and requirements.
                  </p>
                  <a
                    href={`mailto:${settingsEmail ?? "careers@maqam-alemaar.com"}?subject=Application: ${job.title}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors text-sm"
                  >
                    Apply Now
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
