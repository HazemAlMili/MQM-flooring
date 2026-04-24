import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { Resend } from "resend"

// Initialize Resend
// Note: If RESEND_API_KEY is not defined, sending will fail gracefully if handled
const resend = new Resend(process.env.RESEND_API_KEY || "missing-api-key")

// The same schema used on the client
const contactSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(5),
  message: z.string().min(20),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Server-side validation
    const parsed = contactSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data.", details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { firstName, lastName, email, phone, subject, message } = parsed.data

    // If no API key is present, log and return error (or fake success for dev)
    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY is not set. Simulating successful form submission.")
      return NextResponse.json({ success: true, simulated: true }, { status: 200 })
    }

    const recipient = process.env.CONTACT_EMAIL

    if (!recipient) {
      console.error("CONTACT_EMAIL is not set in environment variables.")
      return NextResponse.json(
        { error: "Server configuration error. Contact email not set." },
        { status: 500 }
      )
    }

    // Send the email
    const data = await resend.emails.send({
      from: "Website Contact Form <onboarding@resend.dev>", // Default testing domain
      to: recipient,
      subject: `New Website Enquiry: ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Website Contact Submission</h2>
          <p><strong>From:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <br/>
          <h3 style="color: #333;">Message:</h3>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 4px; white-space: pre-wrap;">
            ${message}
          </div>
        </div>
      `,
    })

    if (data.error) {
      console.error("Resend API Error:", data.error)
      return NextResponse.json(
        { error: "Failed to send email. Please try again later." },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, id: data.data?.id }, { status: 200 })
    
  } catch (error) {
    console.error("Contact API Route Error:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    )
  }
}
