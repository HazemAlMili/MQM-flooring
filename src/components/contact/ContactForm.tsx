"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2, CheckCircle2 } from "lucide-react"

// Defined exactly as per the blueprint requirements
const contactSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false)
  const [globalError, setGlobalError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setGlobalError(null)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong. Please try again.")
      }

      setIsSuccess(true)
      reset()
    } catch (error: any) {
      setGlobalError(error.message)
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-surface/50 p-8 md:p-12 border border-emerald-500/30 rounded-sm text-center flex flex-col items-center">
        <CheckCircle2 className="w-16 h-16 text-emerald-400 mb-6" />
        <h3 className="text-2xl font-serif text-white mb-4">Message Sent Successfully</h3>
        <p className="text-foreground/70 mb-8">
          Thank you for reaching out. One of our specialists will get back to you shortly.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="px-6 py-3 border border-accent text-accent hover:bg-accent hover:text-background transition-colors font-medium"
        >
          Send Another Message
        </button>
      </div>
    )
  }

  return (
    <div className="bg-surface/50 p-8 border border-white/5 rounded-sm">
      <h3 className="text-2xl font-serif text-white mb-6">Send Us a Message</h3>

      {globalError && (
        <div className="bg-destructive/20 text-red-400 p-4 border border-destructive/30 mb-6 rounded-sm text-sm">
          {globalError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm text-foreground/70">First Name <span className="text-red-400">*</span></label>
            <input
              type="text"
              {...register("firstName")}
              className={`w-full bg-background border px-4 py-3 text-white rounded-none transition-colors focus:outline-none focus:border-accent ${
                errors.firstName ? "border-red-500/50" : "border-white/10"
              }`}
              placeholder="John"
              disabled={isSubmitting}
            />
            {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm text-foreground/70">Last Name <span className="text-red-400">*</span></label>
            <input
              type="text"
              {...register("lastName")}
              className={`w-full bg-background border px-4 py-3 text-white rounded-none transition-colors focus:outline-none focus:border-accent ${
                errors.lastName ? "border-red-500/50" : "border-white/10"
              }`}
              placeholder="Doe"
              disabled={isSubmitting}
            />
            {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm text-foreground/70">Email Address <span className="text-red-400">*</span></label>
            <input
              type="email"
              {...register("email")}
              className={`w-full bg-background border px-4 py-3 text-white rounded-none transition-colors focus:outline-none focus:border-accent ${
                errors.email ? "border-red-500/50" : "border-white/10"
              }`}
              placeholder="john@example.com"
              disabled={isSubmitting}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm text-foreground/70">Phone Number</label>
            <input
              type="tel"
              {...register("phone")}
              className={`w-full bg-background border px-4 py-3 text-white rounded-none transition-colors focus:outline-none focus:border-accent ${
                errors.phone ? "border-red-500/50" : "border-white/10"
              }`}
              placeholder="+971 50 123 4567"
              disabled={isSubmitting}
            />
            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-foreground/70">Subject <span className="text-red-400">*</span></label>
          <input
            type="text"
            {...register("subject")}
            className={`w-full bg-background border px-4 py-3 text-white rounded-none transition-colors focus:outline-none focus:border-accent ${
              errors.subject ? "border-red-500/50" : "border-white/10"
            }`}
            placeholder="Project inquiry"
            disabled={isSubmitting}
          />
          {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm text-foreground/70">Message <span className="text-red-400">*</span></label>
          <textarea
            {...register("message")}
            rows={5}
            className={`w-full bg-background border px-4 py-3 text-white rounded-none resize-none transition-colors focus:outline-none focus:border-accent ${
              errors.message ? "border-red-500/50" : "border-white/10"
            }`}
            placeholder="Tell us about your project..."
            disabled={isSubmitting}
          />
          {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-accent text-background py-4 font-medium hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </button>
      </form>
    </div>
  )
}
