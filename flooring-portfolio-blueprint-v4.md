# Maqam Al-Emaar — Portfolio Website Blueprint v4
**مقام الإعمار | Maqam Al-Emaar**
**Stack:** Next.js 14 (App Router) · Tailwind CSS · Shadcn UI · Framer Motion · Sanity.io v3 · Vercel
**Informed by:** Deep competitive analysis of clc-sa.com

---

## Brand Identity

### Logo
The Maqam Al-Emaar logo is a geometric Arabic calligraphy mark — a diamond-shaped interlocking pattern with building-like vertical forms rising from its centre, accompanied by the Arabic wordmark **مقام الإعمار** and the Latin subtitle **Maqam Al-Emaar**.

**Logo placement rules:**
- **Navbar:** White version of the logo on all backgrounds (the logo mark + both wordmarks stacked)
- **Footer:** White version on the brand-blue footer background
- **Favicon:** The diamond mark only, rendered at 32×32 and 180×180 (Apple touch icon)
- **OG image:** Logo centred on a `#2999CA` background
- **Sanity Studio:** Upload both the white PNG and the black PNG versions as assets in `siteSettings`

### Color Palette

| Role | Hex | Usage |
|---|---|---|
| **Primary Blue** | `#2999CA` | Primary CTA buttons, active nav links, section accents, hero background tint, footer background, badges, dividers — **~80% of brand color usage** |
| **Light Blue** | `#6EB2CB` | Hover states, subtle backgrounds (card tints, section washes), decorative geometric lines — **~10% of brand color usage** |
| **White** | `#FFFFFF` | Page background, text on blue surfaces, card surfaces, logo on dark backgrounds — **dominant base** |
| **Dark Text** | `#1A1A2E` | Primary body text, headings on white — near-black with a slight cool undertone to complement the blue |
| **Muted Text** | `#64748B` | Secondary text, meta labels, placeholders — Slate 500 |
| **Light Surface** | `#F0F7FB` | Subtle section backgrounds (a very light blue wash derived from `#2999CA` at 5% opacity) |
| **Border** | `#DDE9F0` | Card borders, dividers, input outlines — light blue-gray |

### Design Aesthetic
**Clean, modern, professional Arabic construction company.** Light-first (white base), with strong confident use of the primary blue as the structural accent. The geometric logo motif informs the design language — clean lines, diamond/rotated-square decorative elements, structured grid layouts. This is **not** a dark luxury site; it is a bright, trustworthy, B2B-facing professional portfolio that feels contemporary and premium without being heavy.

### Typography
- **Display / Section Headings:** `Cairo` (Google Fonts, variable) — supports both Arabic and Latin, clean geometric strokes that pair perfectly with the logo's geometric character. Use weight 700–800 for headings.
- **Body / UI:** `Inter` (Google Fonts, variable) — highly legible at small sizes, neutral, professional. Weight 400–500 for body, 600 for labels.
- **Arabic body text:** `Cairo` — used for any Arabic content in project descriptions or UI labels
- **Metadata / Labels / Stats:** `JetBrains Mono` — monospace for project stat numbers, category chips, and technical labels

### Motion Signature
Clean, efficient, professional. Entrances use a quick upward fade (400ms, `ease-out`). No heavy parallax. Hero has a gentle `scale(1.02)` Ken Burns effect on the background image. Cards lift with a `translateY(-4px)` + `box-shadow` on hover. Stats counter animates with `easeOut` on scroll entry. Logo marquee uses CSS `animation: marquee` for zero JS overhead.

---

## Reference Site Audit (clc-sa.com)

### What to Replicate

| Observation | Our Implementation |
|---|---|
| Long-scroll homepage with anchor nav | Single narrative landing page, sticky nav with anchor links |
| Project cards → dedicated project detail page | `/projects/[slug]` with SSG |
| Project detail: contract type, area, status, year, client name | All fields in Sanity `project` schema |
| Partner/client logo strip | `ClientLogoMarquee` with CSS infinite scroll |
| Three service categories | `serviceCategory` Sanity document; each → `/services/[slug]` |
| Company profile PDF download | `siteSettings.companyProfilePdf` asset field |
| "Join Us" / Careers in nav | `/careers` route + `jobPosting` schema |
| Contact page with address, phone, email + form | Full contact page + server-side form handler |
| Sister company external link | `siteSettings.sisterCompanyUrl` field |

### What We Do Better

| CLC Weakness | Our Solution |
|---|---|
| Built on Wix — LCP ~4–6s | Next.js SSG + Vercel CDN → target LCP < 1.2s |
| No hero, no value proposition | Full-viewport hero, animated headline, dual CTAs |
| Lighthouse ~40–55 | Target Lighthouse 95+ all categories |
| No project filter | URL-based category filter: `/projects?category=electro-mechanical` |
| Minimal gallery, no lightbox | Full lightbox with keyboard + swipe |
| Generic fonts | `Cairo` + `Inter` (matching brand geometry) |
| No stats bar | Animated counters: Years · Projects · m² · Countries |
| No scroll animations | Framer Motion reveals, Ken Burns hero, card lifts |
| About section = wall of text | Shadcn `Tabs`: Company / Vision / Values / HSE |
| Broken project images | Sanity CDN + `next/image` with LQIP blur-up |
| No per-page SEO | `generateMetadata()` + JSON-LD per page |
| No sitemap / robots.txt | Auto-generated from Sanity data |
| Dated mobile nav | Full-screen animated mobile menu overlay |
| No form validation | React Hook Form + Zod + inline errors |
| Minimal footer | 3-column footer with logo, links, contact info |
| No structured data | `LocalBusiness` + `CreativeWork` JSON-LD |

---

## Folder Structure

```
maqam-al-emaar/
├── .env.local
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── sanity.config.ts
├── sanity.cli.ts
│
├── public/
│   ├── fonts/                          # JetBrains Mono only (Cairo + Inter via next/font/google)
│   │   └── JetBrainsMono-Variable.woff2
│   ├── logo/
│   │   ├── mqm-logo-white.png          # White version — for nav, footer
│   │   ├── mqm-logo-blue.png           # Blue version — for light backgrounds
│   │   └── mqm-logo-black.png          # Black version — for print / OG
│   ├── company-profile.pdf
│   └── og-default.jpg                  # 1200×630 — logo centred on #2999CA bg
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── about/page.tsx
│   │   ├── services/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── projects/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       ├── page.tsx
│   │   │       └── loading.tsx
│   │   ├── careers/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── api/
│   │   │   ├── contact/route.ts
│   │   │   └── revalidate/route.ts
│   │   ├── admin/[[...tool]]/page.tsx
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── not-found.tsx
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx              # SERVER — white bg, blue accents
│   │   │   ├── NavClient.tsx           # CLIENT — scroll behavior, mobile toggle
│   │   │   ├── MobileMenu.tsx          # CLIENT — full-screen #2999CA overlay
│   │   │   ├── Footer.tsx              # SERVER — #2999CA bg, white text + logo
│   │   │   └── PageWrapper.tsx         # CLIENT — AnimatePresence transitions
│   │   ├── home/
│   │   │   ├── HeroSection.tsx         # CLIENT — blue-tinted hero, animated headline
│   │   │   ├── AboutSection.tsx        # CLIENT — Tabs (Company/Vision/Values/HSE)
│   │   │   ├── ServicesSection.tsx     # SERVER — 3 service cards on light bg
│   │   │   ├── FeaturedProjects.tsx    # SERVER — project grid
│   │   │   ├── StatsBar.tsx            # CLIENT — #2999CA bg, white numbers
│   │   │   ├── ClientLogoMarquee.tsx   # CLIENT — white bg, gray logos → color on hover
│   │   │   └── CtaBanner.tsx           # SERVER — #2999CA bg, white CTA
│   │   ├── projects/
│   │   │   ├── ProjectCard.tsx         # SERVER
│   │   │   ├── ProjectCardClient.tsx   # CLIENT — hover lift + blue overlay
│   │   │   ├── ProjectGrid.tsx         # SERVER
│   │   │   ├── ProjectFilter.tsx       # CLIENT — blue active tab
│   │   │   ├── ProjectHero.tsx         # CLIENT — cover image + blue gradient
│   │   │   ├── ProjectGallery.tsx      # CLIENT — lightbox
│   │   │   └── ProjectMeta.tsx         # SERVER — sidebar metadata card
│   │   ├── services/
│   │   │   ├── ServiceCard.tsx         # SERVER
│   │   │   └── ServiceDetail.tsx       # SERVER
│   │   ├── contact/
│   │   │   ├── ContactForm.tsx         # CLIENT
│   │   │   └── ContactInfo.tsx         # SERVER
│   │   ├── ui/                         # Shadcn (auto-generated)
│   │   └── shared/
│   │       ├── AnimatedSection.tsx     # CLIENT
│   │       ├── SanityImage.tsx         # SERVER
│   │       ├── PortableTextRenderer.tsx # CLIENT
│   │       ├── PageHero.tsx            # SERVER — blue bg, white text
│   │       └── Logo.tsx               # SERVER — renders correct logo variant by prop
│   │
│   ├── sanity/
│   │   ├── schemaTypes/
│   │   │   ├── index.ts
│   │   │   ├── project.ts
│   │   │   ├── serviceCategory.ts
│   │   │   ├── partnerLogo.ts
│   │   │   ├── jobPosting.ts
│   │   │   └── siteSettings.ts
│   │   ├── lib/
│   │   │   ├── client.ts
│   │   │   ├── queries.ts
│   │   │   └── image.ts
│   │   └── structure.ts
│   │
│   ├── hooks/
│   │   ├── useScrollReveal.ts
│   │   └── useFilterState.ts
│   ├── lib/
│   │   ├── utils.ts
│   │   └── metadata.ts
│   └── types/
│       ├── project.ts
│       ├── service.ts
│       └── sanity.ts
```

---

## Component: Server vs Client Reference

| Component | Type | Reason |
|---|---|---|
| `app/layout.tsx` | **Server** | Font loading, global metadata |
| `app/page.tsx` | **Server** | Parallel data fetch, SSG |
| `app/projects/[slug]/page.tsx` | **Server** | SSG + `generateMetadata` |
| `app/services/[slug]/page.tsx` | **Server** | SSG |
| `app/admin/[[...tool]]/page.tsx` | **Client** | Sanity Studio requires browser |
| `Navbar.tsx` | **Server** | Static links, logo |
| `NavClient.tsx` | **Client** | Scroll detection, mobile toggle |
| `MobileMenu.tsx` | **Client** | `AnimatePresence` overlay |
| `Footer.tsx` | **Server** | Static links, contact info, logo |
| `Logo.tsx` | **Server** | Renders correct variant (white/blue/black) via prop |
| `HeroSection.tsx` | **Client** | Ken Burns effect, entrance animations |
| `AboutSection.tsx` | **Client** | Shadcn `Tabs` (stateful) |
| `ServicesSection.tsx` | **Server** | Receives service data as props |
| `ProjectCard.tsx` | **Server** | `next/image`, static markup |
| `ProjectCardClient.tsx` | **Client** | Hover lift + blue overlay animation |
| `ProjectFilter.tsx` | **Client** | `useSearchParams` + `router.push` |
| `ProjectHero.tsx` | **Client** | Cover image + blue gradient overlay |
| `ProjectGallery.tsx` | **Client** | Lightbox state, keyboard, swipe |
| `ProjectMeta.tsx` | **Server** | Metadata sidebar — pure HTML |
| `StatsBar.tsx` | **Client** | `useInView` + number tween |
| `ClientLogoMarquee.tsx` | **Client** | CSS infinite scroll |
| `ContactForm.tsx` | **Client** | `react-hook-form` + `zod` |
| `AnimatedSection.tsx` | **Client** | `whileInView` wrapper |
| `SanityImage.tsx` | **Server** | `urlFor()` + `next/image` |
| `PortableTextRenderer.tsx` | **Client** | `@portabletext/react` |

---

---

# Phase 00 — Bootstrap & Tooling
**Goal:** Scaffold the project, install all dependencies, establish the Maqam Al-Emaar design tokens.
**Estimated time:** Day 1

---

### Task Group: Project Init

- [ ] Run `create-next-app`:
  ```bash
  npx create-next-app@latest maqam-al-emaar \
    --typescript --tailwind --eslint --app --src-dir \
    --import-alias "@/*"
  ```
- [ ] Install CMS and content dependencies:
  ```bash
  npm install next-sanity @sanity/image-url @portabletext/react sanity sanity-plugin-media
  ```
- [ ] Install animation dependencies:
  ```bash
  npm install framer-motion
  ```
- [ ] Install form and validation dependencies:
  ```bash
  npm install react-hook-form @hookform/resolvers zod
  ```
- [ ] Install icons and email:
  ```bash
  npm install lucide-react resend
  ```
- [ ] Initialise Shadcn UI — **New York** style, **Slate** base color (pairs with the blue palette), CSS variables **on**:
  ```bash
  npx shadcn-ui@latest init
  ```
- [ ] Add Shadcn components:
  ```bash
  npx shadcn-ui@latest add button badge dialog sheet tabs card input textarea
  ```

---

### Task Group: Config Files

- [ ] Create `.env.local`:
  ```bash
  NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
  NEXT_PUBLIC_SANITY_DATASET=production
  SANITY_API_READ_TOKEN=sk_your_read_token
  SANITY_REVALIDATE_SECRET=a_long_random_string
  CONTACT_EMAIL=info@maqam-alemaar.com
  RESEND_API_KEY=re_your_resend_key
  ```
- [ ] Configure `next.config.ts`:
  ```typescript
  const nextConfig = {
    images: {
      remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
    },
    async headers() {
      return [{
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=()' },
        ],
      }]
    },
  }
  ```
- [ ] Configure `tailwind.config.ts` with the Maqam Al-Emaar brand tokens:
  ```typescript
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        primary:       '#2999CA',   // Primary blue — buttons, accents, nav active
        'primary-hover': '#217EAA', // Darker shade for button hover states
        'primary-light': '#6EB2CB', // Light blue — hover tints, decorative use only (~10%)
        'primary-wash':  '#F0F7FB', // Very light blue wash — section backgrounds

        // Neutrals
        background:    '#FFFFFF',   // Page base
        surface:       '#F8FAFC',   // Subtle card/section background (Slate 50)
        border:        '#DDE9F0',   // Card borders, dividers, input outlines
        foreground:    '#1A1A2E',   // Primary text — near-black, cool undertone
        muted:         '#64748B',   // Secondary text, meta labels (Slate 500)
        'muted-light': '#94A3B8',   // Placeholder text (Slate 400)
      },
      fontFamily: {
        display: ['Cairo', 'sans-serif'],       // Arabic + Latin headings
        body:    ['Inter', 'sans-serif'],        // Latin body text and UI
        arabic:  ['Cairo', 'sans-serif'],        // Arabic body text
        mono:    ['JetBrains Mono', 'monospace'], // Stats, labels, chips
      },
      boxShadow: {
        'card':    '0 1px 3px rgba(41, 153, 202, 0.08), 0 1px 2px rgba(41, 153, 202, 0.06)',
        'card-hover': '0 8px 24px rgba(41, 153, 202, 0.15)',
        'btn':    '0 2px 8px rgba(41, 153, 202, 0.30)',
      },
    },
  }
  ```
- [ ] Verify `tsconfig.json` has `@/*` → `./src/*` path alias

---

### Task Group: Design Tokens & Assets

- [ ] Download `JetBrainsMono-Variable.woff2` → place in `public/fonts/`
- [ ] Place logo files in `public/logo/`:
  - `mqm-logo-white.png` — white version (navbar on blue, footer)
  - `mqm-logo-blue.png` — full-color version (hero on white, cards)
  - `mqm-logo-black.png` — black version (print, light OG fallback)
- [ ] Create `og-default.jpg` (1200×630px) — Maqam Al-Emaar logo centred on `#2999CA` background with subtle diamond pattern overlay
- [ ] Place `company-profile.pdf` in `public/`
- [ ] Add `@font-face` for JetBrains Mono, configure `next/font/google` for Cairo and Inter in `globals.css`
- [ ] Create full directory tree: all `/app` routes, all `/components` sub-folders, `/sanity`, `/hooks`, `/lib`, `/types`
- [ ] Initial git commit:
  ```bash
  git init && git add . && git commit -m "chore: project bootstrap — Maqam Al-Emaar"
  ```

---

---

# Phase 01 — Sanity CMS Setup
**Goal:** Create all schemas, wire the embedded Studio, seed with realistic content.
**Estimated time:** Day 2

---

### Task Group: Sanity Project

- [ ] Create new Sanity project at [sanity.io/manage](https://sanity.io/manage) — note **Project ID** and **Dataset**
- [ ] Copy both values into `.env.local`
- [ ] Create `sanity.config.ts`:
  ```typescript
  import { defineConfig } from 'sanity'
  import { structureTool } from 'sanity/structure'
  import { visionTool } from '@sanity/vision'
  import { media } from 'sanity-plugin-media'
  import { schemaTypes } from '@/sanity/schemaTypes'

  export default defineConfig({
    name: 'maqam-al-emaar',
    title: 'مقام الإعمار — Studio',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET!,
    plugins: [structureTool(), visionTool(), media()],
    schema: { types: schemaTypes },
  })
  ```
- [ ] Create `sanity.cli.ts`
- [ ] Create embedded Studio route `src/app/admin/[[...tool]]/page.tsx`:
  ```typescript
  "use client"
  import { NextStudio } from 'next-sanity/studio'
  import config from '../../../../sanity.config'
  export const dynamic = 'force-dynamic'
  export default function StudioPage() {
    return <NextStudio config={config} />
  }
  ```

---

### Task Group: Schema Files

- [ ] **`src/sanity/schemaTypes/project.ts`** — 4 field groups:

  **Content:** `title` (string, required, max 80), `slug` (from title), `summary` (text, max 200, required), `description` (blocks array), `featured` (boolean, default false)

  **Details:** `serviceCategory` (reference → serviceCategory, required), `contractType` (string, required — e.g. "Turnkey", "MEP Works"), `projectStatus` (radio: Completed / Ongoing / Under Review, default Completed), `completionYear` (number, required), `clientName` (string), `location` (string — e.g. "Riyadh, Saudi Arabia"), `totalAreaSqm` (number), `projectValue` (number, internal only)

  **Media:** `coverImage` (image, hotspot enabled, required, nested `alt` string required), `gallery` (array of images, each with `alt` and `caption`, max 20 items)

  **SEO:** `seoTitle` (string, max 60), `seoDescription` (text, max 160)

- [ ] **`src/sanity/schemaTypes/serviceCategory.ts`** — fields: `title`, `slug`, `shortDescription` (max 180), `fullDescription` (blocks), `icon` (string — Lucide icon name e.g. `"building-2"`), `coverImage` (image + alt), `capabilities` (array of strings), `order` (number, for sort order)

- [ ] **`src/sanity/schemaTypes/partnerLogo.ts`** — fields: `name`, `logo` (image + alt, required), `websiteUrl` (url, optional), `order` (number)

- [ ] **`src/sanity/schemaTypes/jobPosting.ts`** — fields: `title`, `department` (select: Engineering / Safety & Security / Administration / Site Operations / Other), `location`, `type` (Full-Time / Part-Time / Contract), `description` (blocks), `isActive` (boolean, default true), `postedDate` (date)

- [ ] **`src/sanity/schemaTypes/siteSettings.ts`** — singleton document: `siteName` ("مقام الإعمار | Maqam Al-Emaar"), `logoWhite` (image), `logoBlue` (image), `companyTagline` (string), `companyProfilePdf` (file), `sisterCompanyName`, `sisterCompanyUrl`, `address`, `phone`, `mobile`, `email`, `linkedinUrl`, `googleMapsEmbedUrl`, `yearsInOperation` (number), `projectsCompleted` (number), `totalAreaDelivered` (number), `countriesOperated` (number)

- [ ] Wire all schemas in `src/sanity/schemaTypes/index.ts`

---

### Task Group: Sanity Lib

- [ ] Create `src/sanity/lib/client.ts`:
  ```typescript
  import { createClient } from 'next-sanity'
  export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: '2024-01-01',
    useCdn: true,
  })
  ```
- [ ] Create `src/sanity/lib/image.ts` — `urlFor()` builder using `@sanity/image-url`
- [ ] Create `src/sanity/lib/queries.ts` with a shared `imageFragment` and all named GROQ queries:
  - `siteSettingsQuery` — all fields, PDF asset URL resolved
  - `partnerLogosQuery` — ordered by `order asc`
  - `allServicesQuery` — card fields, ordered by `order asc`
  - `serviceBySlugQuery` — full detail + capabilities
  - `allServiceSlugsQuery` — for `generateStaticParams`
  - `featuredProjectsQuery` — `featured == true`, newest 6
  - `allProjectsQuery` — all projects, card fields
  - `projectsByServiceQuery` — filtered by `$categorySlug`
  - `projectBySlugQuery` — full detail with gallery
  - `allProjectSlugsQuery` — for `generateStaticParams`
  - `activeJobsQuery` — `isActive == true`, by date desc
- [ ] Create TypeScript interfaces in `src/types/`: `SanityImage`, `Project`, `ServiceCategory`, `JobPosting`, `SiteSettings`, `PartnerLogo`

---

### Task Group: Seed Data

- [ ] Run `npm run dev` → visit `http://localhost:3000/admin` → confirm all 5 schemas load
- [ ] Create **1x siteSettings** — fill company name ("مقام الإعمار | Maqam Al-Emaar"), upload `logoWhite.png` and `logoBlue.png`, fill all contact fields and stat counters
- [ ] Create **3x serviceCategory** — General Contracting, Electro-Mechanical, Safety & Security — add Lucide icon names, write capabilities lists
- [ ] Create **10–15x partnerLogo** — upload real transparent PNG logos, set order
- [ ] Create **8–12x project** — mark 6 as `featured: true`, vary categories and statuses, upload real cover images and 4–8 gallery images per project
- [ ] Create **2–3x jobPosting** with `isActive: true`
- [ ] Test all GROQ queries in Vision tab — confirm shapes match TypeScript types

---

---

# Phase 02 — Layout Shell
**Goal:** Navigation, footer, Logo component, page wrapper, and all shared utility components.
**Estimated time:** Day 3

---

### Task Group: Root Layout

- [ ] `src/app/layout.tsx` — Server Component: configure `next/font/google` for `Cairo` (weights 400, 600, 700, 800) and `Inter` (weights 400, 500, 600), apply as CSS variables (`--font-display`, `--font-body`). Set default metadata with `metadataBase`, `title`, `description`, `openGraph` pointing to `og-default.jpg`
- [ ] `src/app/globals.css` — CSS custom properties for all brand tokens, `@font-face` for JetBrains Mono (`font-display: swap`), body defaults:
  ```css
  body {
    background-color: #FFFFFF;
    color: #1A1A2E;
    font-family: var(--font-body);
  }
  ```
- [ ] `src/components/shared/Logo.tsx` — Server Component accepting `variant: 'white' | 'blue' | 'black'` and `size: 'sm' | 'md' | 'lg'` props. Renders `next/image` of the correct logo file from `public/logo/`. Default size `md` = 140px wide. Includes both the mark and Arabic/Latin wordmarks.

---

### Task Group: Navigation

- [ ] `src/components/layout/Navbar.tsx` — Server Component: fetch `siteSettings` for PDF URL and logo assets. Render white `background-color: #ffffff` nav bar with a `border-b border-border` separator. Pass data to `NavClient`.
- [ ] `src/components/layout/NavClient.tsx` — Client Component:
  - Top utility bar: Sister Company link + "تنزيل الملف التعريفي / Download Profile" → PDF
  - Sticky main nav: `<Logo variant="blue" size="sm" />` on the left
  - Desktop links: `foreground` text, `primary` color + bottom underline on active (`usePathname`)
  - On scroll past 80px: add `shadow-sm` to nav
  - Hamburger icon (Lucide `Menu`) on mobile → `setMenuOpen(true)`
  - Entrance: `motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}`
- [ ] `src/components/layout/MobileMenu.tsx` — Client Component:
  - `fixed inset-0 bg-primary z-50` (full-screen `#2999CA` overlay)
  - `<Logo variant="white" />` at top-left
  - White nav links, staggered `motion.li` entrance (`delay: index * 0.06`)
  - `X` close button (white Lucide `X`) top-right
  - Close on route change via `usePathname()` effect

---

### Task Group: Footer, Wrapper & Shared

- [ ] `src/components/layout/Footer.tsx` — Server Component:
  - `bg-primary` (`#2999CA`) background, all text white
  - 3-column grid: (1) `<Logo variant="white" />` + tagline + copyright, (2) navigation links (white text, `hover:text-white/80`), (3) address + phone + email + LinkedIn icon
  - Top: thin white/20 separator line
  - Bottom bar: copyright `© {year} مقام الإعمار. جميع الحقوق محفوظة.`

- [ ] `src/components/layout/PageWrapper.tsx` — Client Component: `AnimatePresence mode="wait"` + `motion.div key={pathname}` fade transition (`opacity: 0 → 1`, 250ms)

- [ ] `src/components/shared/AnimatedSection.tsx` — Client Component:
  ```typescript
  // Variants: opacity 0→1, y 24→0, duration 400ms ease-out, once, margin -60px
  ```

- [ ] `src/components/shared/SanityImage.tsx` — Server Component: `urlFor(image).width(w*2).height(h*2).auto('format').quality(85).url()`, pass `blurDataURL={image.asset.metadata.lqip}`, `placeholder="blur"`

- [ ] `src/components/shared/PageHero.tsx` — Server Component: reusable inner-page hero — `bg-primary` background, white `<h1>` in Cairo 700, white subtitle, optional breadcrumb. Used on `/projects`, `/services`, `/careers`, `/contact`.

- [ ] Test responsive layout across: 375px (iPhone SE), 768px (iPad), 1280px (laptop), 1440px (desktop)

---

---

# Phase 03 — Homepage
**Goal:** All 8 homepage sections — long-scroll narrative landing page.
**Estimated time:** Days 4–6

---

### Task Group: Data Layer

- [ ] `src/app/page.tsx` — Server Component, `export const revalidate = 60`, all data in one parallel fetch:
  ```typescript
  const [settings, logos, services, projects] = await Promise.all([
    client.fetch(siteSettingsQuery),
    client.fetch(partnerLogosQuery),
    client.fetch(allServicesQuery),
    client.fetch(featuredProjectsQuery),
  ])
  const stats = [
    { label: 'Years in Operation', value: settings.yearsInOperation, suffix: '+' },
    { label: 'Projects Completed',  value: settings.projectsCompleted, suffix: '+' },
    { label: 'Total m² Delivered',  value: settings.totalAreaDelivered, suffix: 'k+' },
    { label: 'Countries',           value: settings.countriesOperated },
  ]
  ```

---

### Task Group: Hero Section

- [ ] `src/components/home/HeroSection.tsx` — Client Component:
  - Full-viewport (`min-h-screen`) with a high-res project cover image as background
  - CSS `animation: kenBurns 12s ease-in-out infinite alternate` — slow `scale(1.0 → 1.06)` on the bg image
  - Dark gradient overlay (`from-primary/80 via-primary/40 to-transparent`) to make text readable
  - `<Logo variant="white" />` — not needed here (logo is in navbar), but white branding elements
  - Cairo 700 headline (white, 4xl–7xl responsive) with staggered word-by-word `motion.span` entrance
  - Company tagline from `settings.companyTagline` — white, Inter, muted opacity
  - Two CTAs:
    - Primary: white bg + `text-primary` "View Our Projects" → `/projects`
    - Secondary: white border + white text "Download Company Profile" → PDF
  - Scroll-down indicator: animated `ChevronDown` in white, `animate-bounce`

---

### Task Group: Stats Bar

- [ ] `src/components/home/StatsBar.tsx` — Client Component:
  - `bg-primary` (`#2999CA`) background, all text white
  - 4-column grid with vertical dividers (`border-r border-white/20`)
  - `AnimatedNumber`: `useMotionValue(0)` → `animate(motionValue, value, { duration: 2.5, ease: 'easeOut' })` triggered `useInView(ref, { once: true })`
  - Numbers: `font-mono text-5xl font-bold text-white`
  - Labels: `font-body text-xs tracking-widest uppercase text-white/70`

---

### Task Group: About & Services

- [ ] `src/components/home/AboutSection.tsx` — Client Component:
  - `bg-white` section, 2-column layout: left = image of company/team, right = content
  - Shadcn `Tabs` with `primary`-colored active indicator: **Company** / **Vision & Mission** / **Core Values** / **HSE Policy**
  - Tab triggers: `text-muted` inactive, `text-primary border-b-2 border-primary` active
  - Content: `PortableTextRenderer` for each tab's body text
  - Section heading: Cairo 700, `text-foreground`; accent line: 3px `bg-primary` left border

- [ ] `src/components/home/ServicesSection.tsx` — Server Component:
  - `bg-primary-wash` (`#F0F7FB`) section background
  - Section heading + thin `#2999CA` underline accent (40px wide, centered)
  - 3-column card grid: each card = white `bg-white` with `shadow-card`, `rounded-xl`, `border border-border`
  - Card content: Lucide icon in `text-primary` (24px), title in Cairo 700, `shortDescription` in Inter, "Explore →" link in `text-primary hover:text-primary-hover`
  - Hover: `shadow-card-hover translateY(-2px)` transition

---

### Task Group: Featured Projects

- [ ] `src/components/home/FeaturedProjects.tsx` — Server Component:
  - `bg-white` section
  - Section heading + "View All Projects →" link in `text-primary` aligned right
  - Asymmetric grid: 1 large card (col-span-2) + 2 stacked cards on desktop; 1-col on mobile

- [ ] `src/components/projects/ProjectCard.tsx` — Server Component:
  - `rounded-xl overflow-hidden` card, `shadow-card`
  - `next/image` cover with `priority={index < 3}`, `placeholder="blur"` with LQIP
  - Status badge: Completed = `bg-primary text-white`, Ongoing = `bg-primary-light text-foreground`, Under Review = `bg-surface text-muted` — all `rounded-full px-2 py-0.5 text-xs font-mono`
  - Service category chip in `bg-primary-wash text-primary`
  - Year label in `font-mono text-muted text-xs`

- [ ] `src/components/projects/ProjectCardClient.tsx` — Client Component:
  - Wraps `ProjectCard` in `motion.div`
  - On hover: `y: -4px`, `shadow-card-hover` transition 200ms
  - Overlay: dark `bg-foreground/60` slides up from bottom on hover revealing project title in white Cairo 700 + "View Project →" in `text-primary-light`

---

### Task Group: Partners & CTA

- [ ] `src/components/home/ClientLogoMarquee.tsx` — Client Component:
  - `bg-white` section, `border-y border-border`
  - Section label: "Trusted By Our Clients" — Inter, `text-muted`, uppercase, tracking-widest
  - Duplicate logos array for seamless CSS loop
  - `motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 35, ease: 'linear', repeat: Infinity }}`
  - Each logo: `grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300`

- [ ] `src/components/home/CtaBanner.tsx` — Server Component:
  - `bg-primary` background, white text
  - Cairo 700 heading: "هل لديك مشروع؟ / Have a Project in Mind?"
  - Inter sub-copy: "Our team is ready to deliver excellence."
  - White button with `text-primary` → `/contact`
  - Subtle background: rotated diamond shapes in `white/5` echoing the logo geometry

- [ ] Wrap all sections in `<AnimatedSection>` — verify all scroll-reveal animations trigger correctly
- [ ] Run Lighthouse locally — target Performance ≥ 90 before moving on

---

---

# Phase 04 — Projects Listing
**Goal:** `/projects` page with category filter, responsive grid, and skeleton loader.
**Estimated time:** Day 7

---

### Task Group: Page & Data

- [ ] `src/app/projects/page.tsx` — Server Component, `revalidate = 60`:
  - Read `searchParams.category` for server-side initial state
  - Parallel fetch: `allProjectsQuery` + `allServicesQuery`
  - Render `<PageHero title="مشاريعنا / Our Projects" subtitle={`${projects.length} projects`} />`

---

### Task Group: Filter

- [ ] `src/components/projects/ProjectFilter.tsx` — Client Component:
  - Tab row: "All" + one tab per service category
  - Active tab: `bg-primary text-white rounded-full` pill style
  - Inactive: `text-muted hover:text-primary` transition
  - `useSearchParams()` reads `?category=`; `router.push({ scroll: false })` writes it
  - `useMemo` filters the full projects array client-side — no re-fetch on filter change

---

### Task Group: Grid & Loading

- [ ] `src/components/projects/ProjectGrid.tsx` — `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- [ ] Confirm all `ProjectCard` instances show: LQIP blur-up cover, title, service badge, status pill, year, location
- [ ] `src/app/projects/loading.tsx` — `animate-pulse` skeleton: gray rectangles matching the 3-col card grid layout, using `bg-primary-wash` for the shimmer blocks

---

---

# Phase 05 — Project Detail Page
**Goal:** Parallax hero, metadata sidebar, Portable Text body, lightbox gallery, per-page SEO.
**Estimated time:** Days 8–9

---

### Task Group: Route & SEO

- [ ] `src/app/projects/[slug]/page.tsx` — Server Component:
  - `generateStaticParams()` → `allProjectSlugsQuery`
  - `export const revalidate = 60`
  - `generateMetadata()` → dynamic title, description, OG image from `coverImage.asset.url`
  - JSON-LD `CreativeWork` structured data injected as `<script type="application/ld+json">`:
    ```json
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "name": "Project Title",
      "description": "Project summary",
      "image": "https://cdn.sanity.io/...",
      "creator": { "@type": "Organization", "name": "مقام الإعمار" }
    }
    ```
  - `notFound()` if no data returned

---

### Task Group: Page Components

- [ ] `src/components/projects/ProjectHero.tsx` — Client Component:
  - Full-bleed `coverImage` (`h-[60vh]`) using `SanityImage priority={true}`
  - Gradient overlay: `from-primary/70 via-primary/20 to-transparent` bottom-up
  - Project title in Cairo 700 white overlaid at bottom
  - Service category badge: `bg-white text-primary` pill

- [ ] `src/components/projects/ProjectMeta.tsx` — Server Component:
  - Sticky sidebar card: `bg-white border border-border rounded-xl shadow-card sticky top-24`
  - Header bar: `bg-primary text-white text-xs font-mono tracking-widest uppercase px-4 py-3 rounded-t-xl` label "Project Details / تفاصيل المشروع"
  - 7 metadata rows with `border-b border-border`:
    - Contract Type, Service Category, Client, Location, Total Area (m²), Completion Year, Status
  - Status badge colors: Completed = `bg-primary text-white`, Ongoing = `bg-primary-light/30 text-primary`, Under Review = `bg-surface text-muted`

- [ ] `src/components/shared/PortableTextRenderer.tsx` — Client Component with custom component map:
  - `h2`: Cairo 700, `text-2xl text-foreground mt-8 mb-4`
  - `h3`: Cairo 600, `text-xl text-foreground mt-6 mb-3`
  - `blockquote`: `border-l-4 border-primary pl-4 italic text-muted my-4`
  - `normal`: Inter 400, `text-base leading-relaxed text-muted mb-4`

---

### Task Group: Lightbox Gallery

- [ ] `src/components/projects/ProjectGallery.tsx` — Client Component:
  - Thumbnail grid: `grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3`
  - Each thumbnail: `aspect-square object-cover rounded-lg`, hover `ring-2 ring-primary`
  - Click → open Shadcn `Dialog` (`max-w-5xl`)

- [ ] Lightbox features:
  - `AnimatePresence` fade between images (`opacity: 0 → 1`, 200ms)
  - Keyboard: `ArrowLeft` / `ArrowRight` navigate, `Escape` closes
  - Touch: `touchstart` → `touchend` deltaX > 50px triggers prev/next
  - Image counter: `"3 / 12"` in `font-mono text-white bg-primary/80 px-2 py-1 rounded` — top-right corner
  - Prev/Next arrow buttons: `bg-primary text-white rounded-full p-2` with Lucide `ChevronLeft` / `ChevronRight`

---

---

# Phase 06 — Services, Careers & Contact
**Goal:** All remaining public-facing pages + API routes.
**Estimated time:** Day 10

---

### Task Group: Services Pages

- [ ] `src/app/services/page.tsx` — Server Component, `revalidate = 60`: `<PageHero>` + 3-column `ServiceCard` grid on `bg-primary-wash`
- [ ] `src/components/services/ServiceCard.tsx` — Server Component: white card, `bg-primary` icon circle (Lucide icon in white), Cairo 700 title, `shortDescription`, "Explore →" in `text-primary`
- [ ] `src/app/services/[slug]/page.tsx` — Server Component: `generateStaticParams`, `generateMetadata`, `revalidate = 60`, fetch service detail + related projects
- [ ] `src/components/services/ServiceDetail.tsx` — Server Component:
  - Full-width `PageHero` with service title
  - `PortableTextRenderer` for `fullDescription`
  - Capabilities checklist: each item prefixed with `text-primary` `CheckCircle` Lucide icon
  - "Related Projects" heading + mini 3-col `ProjectGrid`

---

### Task Group: Careers Page

- [ ] `src/app/careers/page.tsx` — Server Component, `revalidate = 60`: fetch `activeJobsQuery`
- [ ] Job card layout: white card, `border-l-4 border-primary` left accent, title in Cairo 700, department badge in `bg-primary-wash text-primary`, location + type in `font-mono text-muted text-xs`
- [ ] "Apply Now" button: `bg-primary text-white` → `mailto:${email}?subject=Application for: ${job.title}`
- [ ] Empty state: centered, friendly Arabic + English message, `<Logo variant="blue" />`, contact email link

---

### Task Group: Contact Page

- [ ] `src/app/contact/page.tsx` — Server Component: fetch `siteSettings`, 2-column layout
- [ ] `src/components/contact/ContactInfo.tsx` — Server Component:
  - `bg-primary` left panel (`text-white`) — `<Logo variant="white" />` at top
  - `MapPin`, `Phone`, `Smartphone`, `Mail` Lucide icons (white) with values
  - Google Maps `<iframe>` below on mobile (reorders to below form)
- [ ] `src/components/contact/ContactForm.tsx` — Client Component:
  - White right panel, Cairo 700 heading "تواصل معنا / Get in Touch"
  - Fields: `firstName` + `lastName` (side by side), `email`, `subject`, `message` (textarea, min-h 120px)
  - All inputs: `border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary` outline
  - Error messages: `text-red-500 text-xs mt-1`
  - Submit button: `w-full bg-primary hover:bg-primary-hover text-white font-body font-600 py-3 rounded-lg shadow-btn transition-colors`
  - Success: replace form with `text-primary` checkmark + "شكراً لتواصلك! / Thank you for reaching out!" message
- [ ] `src/app/api/contact/route.ts` — Zod server-side re-validation → Resend `emails.send()` → `{ success: true }`

---

---

# Phase 07 — SEO & Performance Hardening
**Goal:** Perfect Lighthouse scores, complete SEO coverage, security headers.
**Estimated time:** Day 11

---

### Task Group: Technical SEO

- [ ] `src/app/sitemap.ts` — parallel fetch project + service slugs, assign priorities:
  - `/` = 1.0, `/projects` + `/services` = 0.9, detail pages = 0.8, `/about` + `/contact` = 0.7, `/careers` = 0.6
- [ ] `src/app/robots.ts` — `Disallow: /admin`, `Allow: /`, sitemap URL
- [ ] `src/app/not-found.tsx` — `bg-primary-wash` background, `<Logo variant="blue" />`, Cairo 700 "404", message in both Arabic and English, "← Back to Home" button in `bg-primary text-white`
- [ ] Add `LocalBusiness` JSON-LD to `src/app/layout.tsx`:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "مقام الإعمار | Maqam Al-Emaar",
    "url": "https://maqam-alemaar.com",
    "telephone": "+966-XX-XXX-XXXX",
    "address": { "@type": "PostalAddress", "addressCountry": "SA" },
    "logo": "https://maqam-alemaar.com/logo/mqm-logo-blue.png"
  }
  ```
- [ ] Audit all `generateMetadata()` — every page: unique title (≤60 chars), description (≤160 chars), `openGraph.images`
- [ ] Add `<link rel="preconnect" href="https://cdn.sanity.io" />` + `<link rel="preconnect" href="https://fonts.googleapis.com" />` in `layout.tsx`

---

### Task Group: Performance

- [ ] `next/image` audit — every `<Image>` must have:
  - Correct `sizes` matching actual rendered width per breakpoint
  - `priority={true}` on all above-the-fold images (hero, first 3 project cards)
  - Explicit `width` + `height` to prevent CLS
  - Descriptive `alt` text
- [ ] Font audit — verify `font-display: swap` on JetBrains Mono `@font-face`, Cairo + Inter loaded via `next/font/google` (auto-optimised)
- [ ] Security headers — confirm all 4 headers are present in `next.config.ts` (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)
- [ ] Run `npm run build && npm start`, then Lighthouse on: `/`, `/projects`, a project detail page
- [ ] Fix all flagged issues. Do not proceed to Phase 08 until Lighthouse Performance ≥ 90 locally

---

---

# Phase 08 — Vercel Deployment
**Goal:** Deploy to production, configure env vars, wire ISR webhook.
**Estimated time:** Day 12

---

### Task Group: Deploy

- [ ] Push to GitHub:
  ```bash
  git add . && git commit -m "feat: complete build — Maqam Al-Emaar" && git push origin main
  ```
- [ ] Import at [vercel.com/new](https://vercel.com/new) — select repo — framework auto-detected as Next.js
- [ ] Add all 6 environment variables in **Vercel Dashboard → Settings → Environment Variables** (Production + Preview + Development)
- [ ] Deploy — verify build passes, check runtime logs for errors
- [ ] Confirm `/admin` (Sanity Studio) is accessible on the Vercel URL

---

### Task Group: Sanity Integration

- [ ] Add Vercel production URL to Sanity CORS: **Sanity Manage → API → CORS Origins** → Add `https://your-project.vercel.app`

- [ ] Create `src/app/api/revalidate/route.ts`:
  ```typescript
  export async function POST(req: NextRequest) {
    const secret = req.nextUrl.searchParams.get('secret')
    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
    }
    const { _type } = await req.json()
    if (_type === 'project') {
      revalidatePath('/projects', 'layout')
      revalidatePath('/projects/[slug]', 'page')
      revalidatePath('/', 'page')
    }
    if (_type === 'serviceCategory') {
      revalidatePath('/services', 'layout')
      revalidatePath('/services/[slug]', 'page')
      revalidatePath('/', 'page')
    }
    if (_type === 'siteSettings' || _type === 'partnerLogo') {
      revalidatePath('/', 'layout')
    }
    return NextResponse.json({ revalidated: true, type: _type })
  }
  ```

- [ ] Configure Sanity webhook: **Sanity Dashboard → API → Webhooks → Add**:
  - URL: `https://your-project.vercel.app/api/revalidate?secret=YOUR_SECRET`
  - Triggers: create, update, delete on `project`, `serviceCategory`, `siteSettings`, `partnerLogo`

- [ ] **Test ISR:** publish a new project in Studio → confirm it appears live within ~60 seconds

---

---

# Phase 09 — Custom Domain
**Goal:** Point Hostinger DNS to Vercel, provision free SSL.
**Estimated time:** 1–2 hours + propagation wait

---

### Task Group: Vercel Side

- [ ] **Vercel Dashboard → Project → Settings → Domains** → Add apex domain + `www` subdomain
- [ ] Note DNS records from Vercel: **A Record** `@` → `76.76.21.21` and **CNAME** `www` → `cname.vercel-dns.com`
- [ ] Set canonical domain preference in Vercel (apex vs www) — the other auto-redirects with 301

---

### Task Group: Hostinger DNS

- [ ] Log in to **Hostinger hPanel → Domains → DNS Zone Editor**
- [ ] Delete any pre-existing A record for `@`
- [ ] Add **A Record**: Host = `@` → `76.76.21.21`, TTL = 3600
- [ ] Add **CNAME Record**: Host = `www` → `cname.vercel-dns.com`, TTL = 3600
- [ ] Save — propagation: typically 15–60 min, up to 48h
- [ ] Verify with:
  ```bash
  dig maqam-alemaar.com A
  dig www.maqam-alemaar.com CNAME
  ```
- [ ] Confirm `https://maqam-alemaar.com` and `https://www.maqam-alemaar.com` resolve with valid SSL (auto-provisioned by Vercel via Let's Encrypt)
- [ ] Update `metadataBase` in `layout.tsx` to the real production domain and redeploy
- [ ] Update Sanity CORS origins to include the custom domain
- [ ] Update the Sanity webhook URL to use the custom domain

---

---

# Phase 10 — Launch & Monitoring
**Goal:** Index, analytics, final QA, client handoff.
**Estimated time:** Launch day

---

### Task Group: Search & Analytics

- [ ] **Google Search Console** — add property, verify domain via Hostinger DNS TXT record, submit sitemap, request indexing for `/`, `/projects`, `/services`, and the 6 featured project pages
- [ ] Install Vercel Analytics: `npm install @vercel/analytics` → add `<Analytics />` to `layout.tsx`
- [ ] Install Vercel Speed Insights: `npm install @vercel/speed-insights` → add `<SpeedInsights />` to `layout.tsx`

---

### Task Group: Final QA

- [ ] Final Lighthouse on production — targets: **Performance ≥ 95 · Accessibility 100 · Best Practices 100 · SEO 100**
- [ ] Test on real **iOS Safari** (iPhone) and **Android Chrome**
- [ ] Cross-browser desktop: Chrome, Safari, Firefox, Edge
- [ ] RTL/Arabic text — verify Cairo renders correctly and any Arabic content is properly `dir="rtl"` scoped
- [ ] Test contact form end-to-end: submit → email received at `CONTACT_EMAIL`
- [ ] Test Sanity Studio at `/admin`: add a project, mark it featured, confirm it appears on homepage within 60s
- [ ] Verify all external links work: Sister Company, LinkedIn, PDF download
- [ ] Verify `sitemap.xml` at `/sitemap.xml` and `robots.txt` at `/robots.txt`
- [ ] Check `og-default.jpg` renders correctly in the [OpenGraph Debugger](https://developers.facebook.com/tools/debug/)

---

### Task Group: Client Handoff

- [ ] Write `CLIENT_GUIDE.md` in Arabic + English:
  - How to log in to Studio at `/admin`
  - How to add a new project (cover image, gallery, all metadata fields)
  - How to update the partner logo strip
  - How to update site stats (years in operation, project count, etc.)
  - How to update the company profile PDF
  - How to mark a project as Featured (appears on homepage)
  - How to post a new job listing
  - Support contact for technical issues
- [ ] Set up **Vercel Weekly Digest** email notification (Dashboard → Settings → Notifications)
- [ ] Tag release:
  ```bash
  git tag v1.0.0 && git push --tags
  ```

---

---

## Appendix A — Brand Color Quick Reference

```css
/* Use these as Tailwind class names in the project */

bg-primary          /* #2999CA — main brand blue */
bg-primary-hover    /* #217EAA — button hover */
bg-primary-light    /* #6EB2CB — light blue, decorative use only (~10%) */
bg-primary-wash     /* #F0F7FB — very light blue section backgrounds */
bg-background       /* #FFFFFF — page base */
bg-surface          /* #F8FAFC — subtle card/section background */

text-primary        /* #2999CA */
text-foreground     /* #1A1A2E — primary body text */
text-muted          /* #64748B — secondary text */
text-muted-light    /* #94A3B8 — placeholders */

border-border       /* #DDE9F0 — card borders, dividers */

shadow-card         /* subtle blue-tinted shadow */
shadow-card-hover   /* lifted blue shadow on hover */
shadow-btn          /* CTA button glow shadow */
```

## Appendix B — Logo Usage Rules

| Location | Variant | Background |
|---|---|---|
| Navbar (desktop + mobile) | `blue` version | `#FFFFFF` white navbar |
| Mobile menu overlay | `white` version | `#2999CA` blue overlay |
| Footer | `white` version | `#2999CA` blue footer |
| Hero section | `white` version | Dark-tinted image |
| OG image (`og-default.jpg`) | `white` version | `#2999CA` background |
| Favicon | Diamond mark only | Transparent / `#2999CA` |
| Company PDF header | `blue` version | White document |
| Studio branding | `blue` version | White Studio UI |

## Appendix C — Environment Variables

```bash
# .env.local — never commit to git

NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=sk_your_read_token
SANITY_REVALIDATE_SECRET=a_long_random_string
CONTACT_EMAIL=info@maqam-alemaar.com
RESEND_API_KEY=re_your_resend_key
```

## Appendix D — Full Package List

```bash
# CMS & content
npm install next-sanity @sanity/image-url @portabletext/react sanity sanity-plugin-media

# Animation
npm install framer-motion

# Forms & validation
npm install react-hook-form @hookform/resolvers zod

# Icons
npm install lucide-react

# Email
npm install resend

# Observability (post Phase 08)
npm install @vercel/analytics @vercel/speed-insights

# Dev
npm install -D prettier @types/node
```

## Appendix E — CLC vs Maqam Al-Emaar Final Comparison

| Dimension | CLC (clc-sa.com) | Maqam Al-Emaar |
|---|---|---|
| Platform | Wix | Next.js 14 (fully custom) |
| Lighthouse Performance | ~40–55 | Target ≥ 95 |
| LCP | ~4–6 seconds | Target < 1.2 seconds |
| Design | Dated Wix aesthetic | Clean, modern, professional — `#2999CA` brand blue |
| Logo placement | Inconsistent | Systematic: white-on-blue, blue-on-white rules |
| Hero | None — no CTA | Cinematic, Ken Burns, animated Cairo headline, dual CTAs |
| Stats bar | None | 4-metric animated counter on `bg-primary` band |
| Project filter | None | Category tabs with URL state + `useMemo` |
| Project detail gallery | 1–2 images | Full lightbox, keyboard, swipe, image counter |
| Scroll animations | None | Framer Motion reveals, card hover-lift |
| Mobile nav | Dated Wix widget | Full-screen `#2999CA` overlay with staggered links |
| Typography | Generic | Cairo (Arabic/Latin display) + Inter (body) |
| Contact form | Basic, no validation | RHF + Zod, inline errors, success state, Resend API |
| Footer | One copyright line | Rich 3-column — white on `#2999CA` with logo |
| Per-page SEO | Generic `<title>` | Dynamic `generateMetadata()` + JSON-LD per page |
| Sitemap | None | Auto-generated from Sanity |
| CMS | Wix backend | Embedded Sanity Studio at `/admin` |
| Arabic support | Partial | Cairo font, `dir="rtl"` scoped, bilingual UI |
| ISR | None | 60-second revalidation via Sanity webhook |
| Hosting | Wix hosting | Vercel + Analytics + Speed Insights |
