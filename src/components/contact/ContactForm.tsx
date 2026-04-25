"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2, CheckCircle2 } from "lucide-react"

const contactSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName:  z.string().min(2, "Last name must be at least 2 characters"),
  email:     z.string().email("Please enter a valid email address"),
  phone:     z.string().optional(),
  subject:   z.string().min(5, "Subject must be at least 5 characters"),
  message:   z.string().min(20, "Message must be at least 20 characters"),
})

type ContactFormData = z.infer<typeof contactSchema>

const inputClass = (hasError: boolean) =>
  `w-full border rounded-lg px-4 py-3 text-foreground bg-white placeholder:text-muted-light transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
    hasError ? "border-red-400" : "border-border"
  }`

export default function ContactForm() {
  const [isSuccess, setIsSuccess]     = useState(false)
  const [globalError, setGlobalError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) })

  const onSubmit = async (data: ContactFormData) => {
    setGlobalError(null)
    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(data),
      })
      const result = await res.json()
      if (!res.ok) throw new Error(result.error || "Something went wrong.")
      setIsSuccess(true)
      reset()
    } catch (err: unknown) {
      setGlobalError(err instanceof Error ? err.message : "Unexpected error")
    }
  }

  /* ── Success state ── */
  if (isSuccess) {
    return (
      <div className="bg-primary-wash border border-primary/20 rounded-xl p-10 text-center flex flex-col items-center">
        <CheckCircle2 className="w-16 h-16 text-primary mb-5" />
        <h3
          className="text-2xl font-bold text-foreground mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          شكراً لتواصلك!
        </h3>
        <p className="text-muted-foreground mb-2">Thank you for reaching out.</p>
        <p className="text-muted-foreground mb-8">
          One of our specialists will get back to you shortly.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-white rounded-lg transition-colors font-medium text-sm"
        >
          Send Another Message
        </button>
      </div>
    )
  }

  /* ── Form ── */
  return (
    <div className="bg-white border border-border rounded-xl p-8 shadow-card">
      <h3
        className="text-2xl font-bold text-foreground mb-1"
        style={{ fontFamily: "var(--font-display)" }}
      >
        تواصل معنا
      </h3>
      <p className="text-muted-foreground text-sm mb-7">Get in Touch</p>

      {globalError && (
        <div className="bg-red-50 text-red-600 border border-red-200 p-4 rounded-lg mb-6 text-sm">
          {globalError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* First / Last name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("firstName")}
              className={inputClass(!!errors.firstName)}
              placeholder="John"
              disabled={isSubmitting}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("lastName")}
              className={inputClass(!!errors.lastName)}
              placeholder="Doe"
              disabled={isSubmitting}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Email / Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              {...register("email")}
              className={inputClass(!!errors.email)}
              placeholder="john@example.com"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Phone Number</label>
            <input
              type="tel"
              {...register("phone")}
              className={inputClass(!!errors.phone)}
              placeholder="+966 50 000 0000"
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* Subject */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">
            Subject <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("subject")}
            className={inputClass(!!errors.subject)}
            placeholder="Project inquiry"
            disabled={isSubmitting}
          />
          {errors.subject && (
            <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>
          )}
        </div>

        {/* Message */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("message")}
            rows={5}
            className={`${inputClass(!!errors.message)} resize-none`}
            placeholder="Tell us about your project…"
            disabled={isSubmitting}
          />
          {errors.message && (
            <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary-hover text-white py-4 font-semibold rounded-lg shadow-btn transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending…
            </>
          ) : (
            "Send Message"
          )}
        </button>
      </form>
    </div>
  )
}
