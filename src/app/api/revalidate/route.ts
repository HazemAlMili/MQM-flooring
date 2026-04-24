import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function POST(req: NextRequest) {
  try {
    // 1. Verify Secret
    const secret = req.nextUrl.searchParams.get("secret")
    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ message: "Invalid revalidation secret" }, { status: 401 })
    }

    // 2. Parse Body
    const body = await req.json()
    const type = body?._type

    if (!type) {
      return NextResponse.json({ message: "Missing _type in payload" }, { status: 400 })
    }

    // 3. Revalidate Paths Based on Type
    switch (type) {
      case "project":
        revalidatePath("/projects", "page") // The projects listing page
        revalidatePath("/projects/[slug]", "page") // The individual project detail
        revalidatePath("/", "page") // Home page features projects
        break
      
      case "serviceCategory":
        revalidatePath("/services", "page") // The services listing page
        revalidatePath("/services/[slug]", "page") // The individual service detail
        revalidatePath("/", "page") // Home page features services
        break
      
      case "siteSettings":
      case "partnerLogo":
        revalidatePath("/", "layout") // Affects navbar, footer, global UI
        break
      
      case "jobPosting":
        revalidatePath("/careers", "page")
        break

      default:
        // For unmapped types, we just return a 200 without revalidating
        return NextResponse.json({ message: `No revalidation rules for type: ${type}` })
    }

    return NextResponse.json({ 
      revalidated: true, 
      type, 
      now: Date.now() 
    })
  } catch (err: any) {
    console.error("Revalidation Error:", err)
    return NextResponse.json({ message: "Internal Server Error", error: err.message }, { status: 500 })
  }
}
