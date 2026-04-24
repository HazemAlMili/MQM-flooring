"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, MapPin, Briefcase, Clock } from "lucide-react"
import { JobPosting } from "@/types/sanity"

interface JobAccordionProps {
  jobs: JobPosting[]
}

function JobItem({ job, isOpen, onToggle }: { job: JobPosting; isOpen: boolean; onToggle: () => void }) {
  return (
    <motion.div
      layout
      className="border border-white/5 hover:border-white/10 transition-colors rounded-sm overflow-hidden"
    >
      {/* Header / Trigger */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-start justify-between gap-6 p-6 md:p-8 text-left group"
      >
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-serif text-white group-hover:text-accent transition-colors mb-3">
            {job.title}
          </h3>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-foreground/50">
            {job.department && (
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-accent/70" />
                {job.department}
              </span>
            )}
            {job.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-accent/70" />
                {job.location}
              </span>
            )}
            {job.type && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-accent/70" />
                {job.type}
              </span>
            )}
          </div>
        </div>

        <div
          className={`w-10 h-10 flex items-center justify-center border border-white/10 shrink-0 transition-all duration-300 ${
            isOpen ? "border-accent bg-accent/10" : "group-hover:border-white/30"
          }`}
        >
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-300 ${
              isOpen ? "rotate-180 text-accent" : "text-foreground/50"
            }`}
          />
        </div>
      </button>

      {/* Collapsible body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-8 pb-8 border-t border-white/5 pt-6 space-y-6">
              {job.postedDate && (
                <p className="text-xs text-foreground/30 uppercase tracking-widest">
                  Posted:{" "}
                  {new Date(job.postedDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              )}

              {/* Placeholder for PortableText description — Phase 05 will add full rich-text support */}
              <p className="text-foreground/70 leading-relaxed">
                We are looking for a talented {job.title} to join our growing team
                {job.location ? ` in ${job.location}` : ""}. If you are passionate
                about delivering world-class interior fit-out and flooring solutions,
                we would love to hear from you.
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-background text-sm font-medium hover:bg-accent/90 transition-colors"
              >
                Apply Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function JobAccordion({ jobs }: JobAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id))

  return (
    <motion.div
      layout
      className="space-y-3"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      }}
    >
      {jobs.map((job) => (
        <motion.div
          key={job._id}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
        >
          <JobItem
            job={job}
            isOpen={openId === job._id}
            onToggle={() => toggle(job._id)}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}
