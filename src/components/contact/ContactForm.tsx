"use client"

// This is a skeleton component. 
// The actual functional form with react-hook-form, zod, and Resend API 
// will be implemented in Phase 05.

export default function ContactForm() {
  return (
    <div className="bg-surface/50 p-8 border border-white/5 rounded-sm">
      <h3 className="text-2xl font-serif text-white mb-6">Send Us a Message</h3>
      
      <form className="space-y-6 opacity-50 pointer-events-none">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm text-foreground/70">Full Name</label>
            <input 
              type="text" 
              disabled
              className="w-full bg-background border border-white/10 px-4 py-3 text-white rounded-none"
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-foreground/70">Email Address</label>
            <input 
              type="email" 
              disabled
              className="w-full bg-background border border-white/10 px-4 py-3 text-white rounded-none"
              placeholder="john@example.com"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm text-foreground/70">Phone Number</label>
          <input 
            type="tel" 
            disabled
            className="w-full bg-background border border-white/10 px-4 py-3 text-white rounded-none"
            placeholder="+971 50 123 4567"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-foreground/70">Message</label>
          <textarea 
            disabled
            rows={5}
            className="w-full bg-background border border-white/10 px-4 py-3 text-white rounded-none resize-none"
            placeholder="Tell us about your project..."
          />
        </div>

        <button 
          type="button" 
          disabled
          className="w-full bg-accent text-background py-4 font-medium"
        >
          Form Under Construction
        </button>
      </form>
    </div>
  )
}
