# Premium Flooring Portfolio — Build Blueprint v3
**Stack:** Next.js 14 (App Router) · Tailwind CSS · Shadcn UI · Framer Motion · Sanity.io v3 · Vercel
**Informed by:** Deep competitive analysis of clc-sa.com

---

## Reference Site Audit (clc-sa.com)

### What to Replicate

| Observation | Our Implementation |
|---|---|
| Single-page anchored homepage (Home, About, Services, Projects all scroll) | One long narrative landing page with sticky nav anchor links |
| Project cards → dedicated project detail page | `/projects/[slug]` route with full SSG |
| Project detail: contract type, area, status, year, client name | All 6 fields modelled in Sanity `project` schema |
| Partners/clients logo marquee strip | Animated `ClientLogoMarquee` with CSS infinite scroll |
| Three service categories | `serviceCategory` as a Sanity document; each gets `/services/[slug]` |
| Company profile PDF download in nav | `siteSettings.companyProfilePdf` field |
| "Join Us" / Careers in nav | `/careers` route + `jobPosting` schema |
| Contact page with address, phone, email + form | Full contact page with server-side form + Zod validation |
| Sister company external link | `siteSettings.sisterCompanyUrl` field |

### What to Improve (Our Advantages Over CLC)

| CLC Weakness | Our Solution |
|---|---|
| Built on Wix — slow LCP (~4–6s), no HTML control | Next.js SSG + Vercel CDN — target LCP < 1.2s |
| No hero section, no clear value proposition | Full-viewport cinematic hero with animated headline + dual CTAs |
| Wix bloated JS (~2MB+), Lighthouse ~40–55 | Target Lighthouse 95+ across all four categories |
| No project filter by service type | URL-based filter: `/projects?category=electro-mechanical` |
| Project gallery: 1–2 images, no lightbox | Full-screen lightbox with keyboard + swipe navigation |
| Generic Wix typography | `Cormorant Garamond` display + `DM Sans` body (self-hosted) |
| No social proof / stats bar | Animated counters: Years · Projects · m² Delivered · Countries |
| No scroll animations | Framer Motion: staggered reveals, parallax hero, hover cards |
| No dark mode | Dark-first design with `#0A0A0A` base + `#C9A96E` bronze accent |
| About section is a wall of text | Shadcn `Tabs`: Company / Vision & Mission / Core Values / HSE Policy |
| Broken project images (empty-state placeholder) | Sanity CDN + `next/image` with LQIP blur-up, zero broken states |
| No per-page SEO metadata | `generateMetadata()` per page + per project with dynamic OG images |
| No `sitemap.xml` or `robots.txt` | `app/sitemap.ts` + `app/robots.ts` auto-generated from Sanity |
| Dated mobile navigation | Full-screen Framer Motion mobile menu overlay |
| Contact form with no validation | React Hook Form + Zod with inline errors + success/error toast |
| Footer is one copyright line | Rich 3-column footer: logo / nav links / contact info + socials |
| No structured data | `LocalBusiness` + `CreativeWork` JSON-LD on every page |

---

## Design Direction

**Aesthetic:** Dark-first industrial luxury — exposed concrete, polished stone, heavy serif headlines, razor-thin geometric accents.

**Palette:**
- Background: `#0A0A0A` (near-black)
- Surface: `#111111`
- Foreground: `#F0EDE6` (warm off-white)
- Accent: `#C9A96E` (bronze/gold)
- Muted: `#A8A29E` (stone gray)
- Borders: `rgba(255,255,255,0.1)`

**Typography:**
- Display / Headlines: `Cormorant Garamond` variable — refined, editorial, aristocratic
- Body: `DM Sans` variable — clean, readable, modern
- Labels / Metadata: `JetBrains Mono` — project stats, badges, technical labels

**Motion Signature:** Section entrances use upward drift + fade (600ms, `[0.22, 1, 0.36, 1]` easing). Hero has `useScroll` parallax. Cards use scale + overlay reveal on hover. Logo marquee uses CSS infinite scroll.

---

## Folder Structure

```
flooring-portfolio/
├── .env.local
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── sanity.config.ts
├── sanity.cli.ts
│
├── public/
│   ├── fonts/
│   │   ├── CormorantGaramond-Variable.woff2
│   │   └── DMSans-Variable.woff2
│   ├── company-profile.pdf
│   └── og-default.jpg
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
│   │   │   ├── Navbar.tsx           # SERVER
│   │   │   ├── NavClient.tsx        # CLIENT
│   │   │   ├── MobileMenu.tsx       # CLIENT
│   │   │   ├── Footer.tsx           # SERVER
│   │   │   └── PageWrapper.tsx      # CLIENT
│   │   ├── home/
│   │   │   ├── HeroSection.tsx      # CLIENT
│   │   │   ├── AboutSection.tsx     # CLIENT
│   │   │   ├── ServicesSection.tsx  # SERVER
│   │   │   ├── FeaturedProjects.tsx # SERVER
│   │   │   ├── StatsBar.tsx         # CLIENT
│   │   │   ├── ClientLogoMarquee.tsx # CLIENT
│   │   │   └── CtaBanner.tsx        # SERVER
│   │   ├── projects/
│   │   │   ├── ProjectCard.tsx      # SERVER
│   │   │   ├── ProjectCardClient.tsx # CLIENT
│   │   │   ├── ProjectGrid.tsx      # SERVER
│   │   │   ├── ProjectFilter.tsx    # CLIENT
│   │   │   ├── ProjectHero.tsx      # CLIENT
│   │   │   ├── ProjectGallery.tsx   # CLIENT
│   │   │   └── ProjectMeta.tsx      # SERVER
│   │   ├── services/
│   │   │   ├── ServiceCard.tsx      # SERVER
│   │   │   └── ServiceDetail.tsx    # SERVER
│   │   ├── contact/
│   │   │   ├── ContactForm.tsx      # CLIENT
│   │   │   └── ContactInfo.tsx      # SERVER
│   │   ├── ui/                      # Shadcn auto-generated
│   │   └── shared/
│   │       ├── AnimatedSection.tsx  # CLIENT
│   │       ├── SanityImage.tsx      # SERVER
│   │       ├── PortableTextRenderer.tsx # CLIENT
│   │       ├── PageHero.tsx         # SERVER
│   │       └── ThemeProvider.tsx    # CLIENT
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
| `app/projects/page.tsx` | **Server** | Parallel fetch for listing |
| `app/projects/[slug]/page.tsx` | **Server** | SSG + `generateMetadata` |
| `app/services/[slug]/page.tsx` | **Server** | SSG |
| `app/admin/[[...tool]]/page.tsx` | **Client** | Sanity Studio requires browser |
| `Navbar.tsx` | **Server** | Static links, logo |
| `NavClient.tsx` | **Client** | Scroll detection, mobile toggle, theme |
| `MobileMenu.tsx` | **Client** | `AnimatePresence` overlay |
| `Footer.tsx` | **Server** | Static links and contact info |
| `PageWrapper.tsx` | **Client** | `AnimatePresence` route transitions |
| `HeroSection.tsx` | **Client** | `useScroll` parallax, entrance animations |
| `AboutSection.tsx` | **Client** | Shadcn `Tabs` (stateful) |
| `ServicesSection.tsx` | **Server** | Receives service data as props |
| `FeaturedProjects.tsx` | **Server** | Passes project array to grid |
| `ProjectCard.tsx` | **Server** | `next/image`, static markup |
| `ProjectCardClient.tsx` | **Client** | `motion.div` hover overlay |
| `ProjectFilter.tsx` | **Client** | `useSearchParams` + `router.push` |
| `ProjectHero.tsx` | **Client** | `useScroll` + `useTransform` parallax |
| `ProjectGallery.tsx` | **Client** | Lightbox state, keyboard, swipe |
| `ProjectMeta.tsx` | **Server** | Status, year, client, area — static HTML |
| `StatsBar.tsx` | **Client** | `useInView` + number tween |
| `ClientLogoMarquee.tsx` | **Client** | CSS infinite scroll animation |
| `ContactForm.tsx` | **Client** | `react-hook-form` + `zod` |
| `AnimatedSection.tsx` | **Client** | `whileInView` scroll-reveal wrapper |
| `SanityImage.tsx` | **Server** | `urlFor()` + `next/image` |
| `PortableTextRenderer.tsx` | **Client** | `@portabletext/react` |
| `ThemeProvider.tsx` | **Client** | `next-themes` |

---

---

# Phase 00 — Bootstrap & Tooling
**Goal:** Scaffold the project, install all dependencies, establish design tokens and folder structure.
**Estimated time:** Day 1

---

### Task Group: Project Init

- [ ] Run `create-next-app` with TypeScript, Tailwind, ESLint, App Router, `src/` dir, `@/*` import alias:
  ```bash
  npx create-next-app@latest flooring-portfolio \
    --typescript --tailwind --eslint --app --src-dir \
    --import-alias "@/*"
  ```
- [ ] Install CMS and content dependencies:
  ```bash
  npm install next-sanity @sanity/image-url @portabletext/react sanity sanity-plugin-media
  ```
- [ ] Install animation and theme dependencies:
  ```bash
  npm install framer-motion next-themes
  ```
- [ ] Install form and validation dependencies:
  ```bash
  npm install react-hook-form @hookform/resolvers zod
  ```
- [ ] Install icon library and email sender:
  ```bash
  npm install lucide-react resend
  ```
- [ ] Initialise Shadcn UI — select **New York** style, **Zinc** base color, CSS variables **on**:
  ```bash
  npx shadcn-ui@latest init
  ```
- [ ] Add required Shadcn components:
  ```bash
  npx shadcn-ui@latest add button badge dialog sheet tabs card
  ```

---

### Task Group: Config Files

- [ ] Create `.env.local` with all required variables:
  ```bash
  # Sanity (public — safe in client bundles)
  NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
  NEXT_PUBLIC_SANITY_DATASET=production

  # Sanity (server only)
  SANITY_API_READ_TOKEN=sk_your_read_token
  SANITY_REVALIDATE_SECRET=a_long_random_string

  # Contact form
  CONTACT_EMAIL=info@your-domain.com
  RESEND_API_KEY=re_your_resend_key
  ```
- [ ] Configure `next.config.ts` — add Sanity CDN to `images.remotePatterns` and security headers:
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
        ],
      }]
    },
  }
  ```
- [ ] Configure `tailwind.config.ts` — brand colors and font families:
  ```typescript
  theme: {
    extend: {
      colors: {
        surface:    '#0A0A0A',
        'surface-subtle': '#111111',
        foreground: '#F0EDE6',
        muted:      '#A8A29E',
        accent:     '#C9A96E',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body:    ['DM Sans', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
    },
  }
  ```
- [ ] Verify `tsconfig.json` path alias `@/*` → `./src/*` is present (auto-set by `create-next-app`)

---

### Task Group: Design Tokens & Scaffold

- [ ] Download `CormorantGaramond-Variable.woff2` and `DMSans-Variable.woff2` → place in `public/fonts/`
- [ ] Add `@font-face` declarations and CSS custom property definitions in `src/app/globals.css`
- [ ] Create the full directory tree: all `/app` routes, all `/components` sub-folders, `/sanity/schemaTypes`, `/sanity/lib`, `/hooks`, `/lib`, `/types`
- [ ] Place `og-default.jpg` in `public/` (1200×630px, brand-colored fallback)
- [ ] Place `company-profile.pdf` in `public/` (or leave as Sanity file asset — see Phase 01)
- [ ] Initial git commit:
  ```bash
  git init && git add . && git commit -m "chore: project bootstrap"
  ```

---

---

# Phase 01 — Sanity CMS Setup
**Goal:** Create all schemas, wire the embedded Studio, and seed realistic content.
**Estimated time:** Day 2

---

### Task Group: Sanity Project

- [ ] Create a new Sanity project at [sanity.io/manage](https://sanity.io/manage) — note the **Project ID** and **Dataset** name
- [ ] Copy Project ID and Dataset into `.env.local`
- [ ] Create `sanity.config.ts` in project root:
  ```typescript
  import { defineConfig } from 'sanity'
  import { structureTool } from 'sanity/structure'
  import { visionTool } from '@sanity/vision'
  import { media } from 'sanity-plugin-media'
  import { schemaTypes } from '@/sanity/schemaTypes'

  export default defineConfig({
    name: 'default',
    title: 'Portfolio Studio',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    plugins: [structureTool(), visionTool(), media()],
    schema: { types: schemaTypes },
  })
  ```
- [ ] Create `sanity.cli.ts` in project root:
  ```typescript
  import { defineCliConfig } from 'sanity/cli'
  export default defineCliConfig({
    api: {
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    }
  })
  ```
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

- [ ] Create `src/sanity/schemaTypes/project.ts` — document with 4 field groups (Content, Details, Media, SEO):

  **Content group fields:** `title` (string, required), `slug` (slug from title), `summary` (text, max 200), `description` (array of blocks), `featured` (boolean, default false)

  **Details group fields:** `serviceCategory` (reference → serviceCategory, required), `contractType` (string, required), `projectStatus` (string radio: Completed / Ongoing / Under Review), `completionYear` (number, required), `clientName` (string), `location` (string), `totalAreaSqm` (number), `projectValue` (number, internal only)

  **Media group fields:** `coverImage` (image with hotspot, required, nested `alt` and `caption` fields), `gallery` (array of images, each with `alt` and `caption`, max 20)

  **SEO group fields:** `seoTitle` (string, max 60), `seoDescription` (text, max 160)

- [ ] Create `src/sanity/schemaTypes/serviceCategory.ts` — fields: `title`, `slug`, `shortDescription` (max 180), `fullDescription` (blocks), `icon` (string — Lucide icon name), `coverImage` (image with hotspot + alt), `capabilities` (array of strings), `order` (number)

- [ ] Create `src/sanity/schemaTypes/partnerLogo.ts` — fields: `name`, `logo` (image + alt, required), `websiteUrl` (url), `order` (number)

- [ ] Create `src/sanity/schemaTypes/jobPosting.ts` — fields: `title`, `department` (select list), `location`, `type` (Full-Time / Part-Time / Contract), `description` (blocks), `isActive` (boolean, default true), `postedDate` (date)

- [ ] Create `src/sanity/schemaTypes/siteSettings.ts` — singleton document with fields: `siteName`, `logo` (image), `companyTagline`, `companyProfilePdf` (file), `sisterCompanyName`, `sisterCompanyUrl`, `address`, `phone`, `mobile`, `email`, `linkedinUrl`, `googleMapsEmbedUrl`, `yearsInOperation`, `projectsCompleted`, `totalAreaDelivered`, `countriesOperated`

- [ ] Wire all schemas in `src/sanity/schemaTypes/index.ts`:
  ```typescript
  import { projectSchema } from './project'
  import { serviceCategorySchema } from './serviceCategory'
  import { partnerLogoSchema } from './partnerLogo'
  import { jobPostingSchema } from './jobPosting'
  import { siteSettingsSchema } from './siteSettings'

  export const schemaTypes = [
    projectSchema, serviceCategorySchema,
    partnerLogoSchema, jobPostingSchema, siteSettingsSchema,
  ]
  ```

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
- [ ] Create `src/sanity/lib/image.ts`:
  ```typescript
  import createImageUrlBuilder from '@sanity/image-url'
  import { client } from './client'
  const builder = createImageUrlBuilder(client)
  export function urlFor(source: Parameters<typeof builder.image>[0]) {
    return builder.image(source)
  }
  ```
- [ ] Create `src/sanity/lib/queries.ts` with a shared `imageFragment` and the following named GROQ queries:
  - `siteSettingsQuery` — all settings fields including PDF asset URL
  - `partnerLogosQuery` — ordered by `order asc`
  - `allServicesQuery` — ordered by `order asc`, card fields only
  - `serviceBySlugQuery` — full detail including `capabilities[]` and `fullDescription`
  - `allServiceSlugsQuery` — for `generateStaticParams`
  - `featuredProjectsQuery` — `featured == true`, newest 6, card fields
  - `allProjectsQuery` — all projects, card fields + `serviceCategory->{ title, slug }`
  - `projectsByServiceQuery` — filtered by `$categorySlug`
  - `projectBySlugQuery` — full detail including `gallery[]` and `description`
  - `allProjectSlugsQuery` — for `generateStaticParams`
  - `activeJobsQuery` — `isActive == true`, ordered by `postedDate desc`
- [ ] Create TypeScript interfaces in `src/types/`: `SanityImage`, `SanityImageAsset`, `MaterialType`, `Project`, `ServiceCategory`, `JobPosting`, `SiteSettings`

---

### Task Group: Seed Data

- [ ] Run `npm run dev` → navigate to `http://localhost:3000/admin` → confirm all 5 schema types load in Studio
- [ ] Create **1x siteSettings** document — fill all fields including stats counters, upload company logo, add PDF
- [ ] Create **3x serviceCategory** documents: General Contracting / Electro-Mechanical / Safety & Security — write short descriptions and capabilities lists
- [ ] Create **10–15x partnerLogo** documents — upload real transparent PNG logos
- [ ] Create **8–12x project** documents — mark 6 as `featured: true`, use all 3 service categories, vary statuses (Completed / Ongoing), add cover images and 4–8 gallery images each
- [ ] Create **2–3x jobPosting** documents with `isActive: true`
- [ ] Open Studio Vision tab — test all GROQ queries and confirm data shape matches TypeScript interfaces

---

---

# Phase 02 — Layout Shell
**Goal:** Build the persistent navigation, footer, page wrapper, and shared utility components.
**Estimated time:** Day 3

---

### Task Group: Root Layout

- [ ] `src/app/layout.tsx` — Server Component: load both fonts via `next/font/local`, set default metadata (`title`, `description`, `openGraph`, `metadataBase`), wrap children in `ThemeProvider` and `PageWrapper`
- [ ] `src/app/globals.css` — define all CSS custom properties (`--font-display`, `--font-body`, `--color-surface`, `--color-accent`, etc.), add `@font-face` rules with `font-display: swap`, set body defaults (`background: #0A0A0A`, `color: #F0EDE6`)
- [ ] `src/components/shared/ThemeProvider.tsx` — `"use client"`, wrap `next-themes` `ThemeProvider` with `attribute="class"` and `defaultTheme="dark"`

---

### Task Group: Navigation

- [ ] `src/components/layout/Navbar.tsx` — Server Component: fetch `siteSettings` for logo URL and PDF URL, pass to `NavClient` as props, render `<header>` wrapper
- [ ] `src/components/layout/NavClient.tsx` — Client Component:
  - Utility top-bar with Sister Company external link and Company Profile PDF download
  - `useEffect` scroll listener — toggle `scrolled` state at 60px to apply `bg-[#0A0A0A]/95 backdrop-blur-md` and bottom border
  - Desktop nav links using `usePathname()` for active highlight
  - Framer Motion entrance: `initial={{ y: -80, opacity: 0 }}` → `animate={{ y: 0, opacity: 1 }}`
  - Hamburger button → calls `setMenuOpen(true)` prop
- [ ] `src/components/layout/MobileMenu.tsx` — Client Component:
  - `AnimatePresence` full-screen overlay (`fixed inset-0 bg-surface z-50`)
  - `motion.div` with `initial={{ x: '100%' }}` → `animate={{ x: 0 }}` slide-in
  - Staggered `motion.li` entrance for each nav link
  - Close on link click via `usePathname()` effect

---

### Task Group: Footer, Wrapper & Shared

- [ ] `src/components/layout/Footer.tsx` — Server Component: 3-column grid — (1) logo + tagline + copyright, (2) nav link columns, (3) address + phone + email + LinkedIn icon. Bronze accent divider line at top.
- [ ] `src/components/layout/PageWrapper.tsx` — Client Component: `AnimatePresence mode="wait"` wrapping `motion.div` with `key={pathname}`, fade + slight Y translate transition
- [ ] `src/components/shared/AnimatedSection.tsx` — Client Component: `motion.div` with `initial={{ opacity: 0, y: 32 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, margin: '-80px' }}`, accepts `delay` prop
- [ ] `src/components/shared/SanityImage.tsx` — Server Component: accepts `image` (SanityImage type), `width`, `height`, `sizes`, `priority`; calls `urlFor().width().height().auto('format').quality(85).url()`; passes `blurDataURL={image.asset.metadata.lqip}` to `next/image`
- [ ] `src/components/shared/PageHero.tsx` — Server Component: reusable inner-page hero banner with title, subtitle, and optional breadcrumb — used on `/projects`, `/services`, `/contact`, `/careers`
- [ ] Verify responsive layout at 375px, 768px, 1280px, and 1440px breakpoints

---

---

# Phase 03 — Homepage
**Goal:** Build all 8 homepage sections on the long-scroll landing page.
**Estimated time:** Days 4–6

---

### Task Group: Data Layer

- [ ] `src/app/page.tsx` — Server Component, `export const revalidate = 60`. Fire all data fetches in parallel with `Promise.all`:
  ```typescript
  const [settings, logos, services, projects] = await Promise.all([
    client.fetch(siteSettingsQuery),
    client.fetch(partnerLogosQuery),
    client.fetch(allServicesQuery),
    client.fetch(featuredProjectsQuery),
  ])
  ```
- [ ] Build stats array from `settings` and pass to `StatsBar`:
  ```typescript
  const stats = [
    { label: 'Years in Operation',  value: settings.yearsInOperation,    suffix: '+' },
    { label: 'Projects Completed',  value: settings.projectsCompleted,   suffix: '+' },
    { label: 'Total m² Delivered',  value: settings.totalAreaDelivered,  suffix: 'k+' },
    { label: 'Countries',           value: settings.countriesOperated },
  ]
  ```

---

### Task Group: Hero Section

- [ ] `src/components/home/HeroSection.tsx` — Client Component:
  - Full-viewport (`min-h-screen`) dark background with a high-res project image
  - `useScroll` + `useTransform` for subtle parallax on background (y: `0px` → `100px`)
  - `Cormorant Garamond` headline — animate each word with staggered `motion.span` (`delay: index * 0.08`)
  - Tagline text from `siteSettings.companyTagline` prop
  - Two CTAs: "View Our Projects" (primary, bronze) → `/projects` and "Download Company Profile" (ghost) → PDF URL
  - Bottom scroll indicator: animated chevron bounce

---

### Task Group: Stats Bar

- [ ] `src/components/home/StatsBar.tsx` — Client Component:
  - 4-column grid with `border-y border-white/10` on `bg-[#111]`
  - `AnimatedNumber` sub-component: `useMotionValue(0)` + `animate(motionValue, value, { duration: 2, ease: 'easeOut' })` triggered by `useInView(ref, { once: true })`
  - Labels in `JetBrains Mono`, 12px, `tracking-[0.2em]`, uppercase, muted color

---

### Task Group: About & Services

- [ ] `src/components/home/AboutSection.tsx` — Client Component:
  - Shadcn `Tabs` with 4 tabs: **Company** / **Vision & Mission** / **Core Values** / **HSE Policy**
  - Content for each tab from `siteSettings` Portable Text fields or static copy
  - `AnimatePresence` on tab panel content for smooth tab transition
  - Left column: company image; right column: tab content
- [ ] `src/components/home/ServicesSection.tsx` — Server Component:
  - Receives `services` array as prop
  - 3-column card grid: each card shows Lucide icon (from `serviceCategory.icon`), title, `shortDescription`, and "Explore" → `/services/[slug]`
  - Bronze horizontal rule below section heading

---

### Task Group: Featured Projects

- [ ] `src/components/home/FeaturedProjects.tsx` — Server Component: receives `projects` array, renders asymmetric grid (large card left + 2 stacked right on desktop)
- [ ] `src/components/projects/ProjectCard.tsx` — Server Component:
  - `next/image` with `priority={index < 3}` for first 3 cards
  - Status badge (color-coded), service category chip, completion year, location label
- [ ] `src/components/projects/ProjectCardClient.tsx` — Client Component:
  - Wraps `ProjectCard` in `motion.div`
  - On hover: `scale(1.02)` + dark overlay slides up from bottom revealing project title in Cormorant Garamond + "View Project →"

---

### Task Group: Partners & CTA

- [ ] `src/components/home/ClientLogoMarquee.tsx` — Client Component:
  - Duplicate the `logos` array: `[...logos, ...logos]`
  - `motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 30, ease: 'linear', repeat: Infinity }}`
  - Each logo: `grayscale opacity-50` → `grayscale-0 opacity-100` on hover, transition 300ms
  - Section label: "Trusted By" in `JetBrains Mono`, uppercase, muted
- [ ] `src/components/home/CtaBanner.tsx` — Server Component: full-width dark band, Cormorant headline "Have a Project in Mind?", sub-copy, bronze "Get in Touch" button → `/contact`
- [ ] Wrap each homepage section in `<AnimatedSection>` and verify all scroll-reveal animations fire correctly
- [ ] Run Lighthouse locally on homepage — target Performance ≥ 90 at this stage before moving on

---

---

# Phase 04 — Projects Listing
**Goal:** Build the `/projects` page with URL-based category filtering, grid layout, and skeleton loader.
**Estimated time:** Day 7

---

### Task Group: Page & Data

- [ ] `src/app/projects/page.tsx` — Server Component, `revalidate = 60`. Read `searchParams.category` from the URL for server-side initial filter. Parallel fetch:
  ```typescript
  const [projects, services] = await Promise.all([
    client.fetch(allProjectsQuery),
    client.fetch(allServicesQuery),
  ])
  ```
- [ ] Pass `projects`, `services`, and the active `category` slug as props to child components

---

### Task Group: Filter

- [ ] `src/components/projects/ProjectFilter.tsx` — Client Component:
  - Tab-style buttons: "All" + one per `serviceCategory`
  - `useSearchParams()` reads `?category=` param; `router.push()` with `{ scroll: false }` writes it
  - Active tab: bronze underline + `text-accent`; inactive: muted text
  - Filtered array = `useMemo(() => category === 'all' ? projects : projects.filter(p => p.serviceCategory.slug.current === category), [projects, category])`
  - Pass filtered array down to `ProjectGrid`

---

### Task Group: Grid & Cards

- [ ] `src/components/projects/ProjectGrid.tsx` — Server Component (or memo'd client): CSS grid `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- [ ] Confirm `ProjectCard` shows: cover image with LQIP blur-up, title, service category badge, status pill, completion year, location
- [ ] `src/app/projects/loading.tsx` — skeleton grid: `animate-pulse` gray rectangles matching the 3-col card layout
- [ ] Use `<PageHero>` at the top of the page with title "Our Projects" and project count as subtitle

---

---

# Phase 05 — Project Detail Page
**Goal:** Build the full project detail experience — parallax hero, rich metadata sidebar, Portable Text, and lightbox gallery.
**Estimated time:** Days 8–9

---

### Task Group: Route & SEO

- [ ] `src/app/projects/[slug]/page.tsx` — Server Component:
  - `export async function generateStaticParams()` — fetch `allProjectSlugsQuery`, return `slugs.map(({ slug }) => ({ slug }))`
  - `export const revalidate = 60`
  - `export async function generateMetadata({ params })` — fetch project by slug, return:
    ```typescript
    {
      title: project.seoTitle ?? project.title,
      description: project.seoDescription ?? project.summary,
      openGraph: {
        title, description,
        images: [{ url: project.coverImage.asset.url }],
      },
    }
    ```
  - JSON-LD structured data injected via `<script type="application/ld+json">`:
    ```json
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "name": "Project Title",
      "description": "Project summary",
      "image": "https://cdn.sanity.io/...",
      "creator": { "@type": "Organization", "name": "Company Name" }
    }
    ```
  - Call `notFound()` if Sanity returns `null`

---

### Task Group: Page Components

- [ ] `src/components/projects/ProjectHero.tsx` — Client Component:
  - Full-bleed `coverImage` using `SanityImage` with `priority={true}`
  - `useScroll` on the section ref + `useTransform(scrollY, [0, 500], [0, 80])` for parallax Y
  - Dark gradient overlay (`from-black/60 to-transparent`) from the bottom
  - Project title in `Cormorant Garamond` + service category badge overlaid on the image
- [ ] `src/components/projects/ProjectMeta.tsx` — Server Component:
  - Sticky sidebar card (`position: sticky; top: 6rem`)
  - Rounded card with `border border-white/10 bg-white/5 backdrop-blur-sm`
  - 7 metadata rows: Contract Type / Service Category / Client / Location / Total Area / Completion Year / Status
  - Status badge colors: Completed = emerald, Ongoing = amber, Under Review = slate
- [ ] `src/components/shared/PortableTextRenderer.tsx` — Client Component:
  - `@portabletext/react` with custom `components` map
  - `h2`: `Cormorant Garamond`, `text-3xl`, `text-foreground`, `mt-8 mb-4`
  - `h3`: `DM Sans`, `text-xl`, `font-medium`, `mt-6 mb-3`
  - `blockquote`: left border `border-l-4 border-accent`, `pl-4`, italic, muted text
  - `normal`: `text-base leading-relaxed text-muted`

---

### Task Group: Gallery Lightbox

- [ ] `src/components/projects/ProjectGallery.tsx` — Client Component:
  - Masonry thumbnail grid below the main article content
  - Each thumbnail: `next/image` with `object-cover`, hover `scale(1.03)` transition
  - On click: open Shadcn `Dialog` (fullscreen, `max-w-none`)
- [ ] Lightbox features:
  - `AnimatePresence` `motion.img` fade transition between images
  - Keyboard navigation: `useEffect` on `window` keydown — `ArrowLeft` / `ArrowRight` cycle images, `Escape` closes dialog
  - Touch/swipe: track `touchstart` → `touchend`; if `deltaX > 50px` advance image, if `deltaX < -50px` go back
  - Image counter label: `"3 / 12"` in `JetBrains Mono`, top-right of lightbox
  - Previous / Next arrow buttons visible on desktop, hidden on mobile

---

---

# Phase 06 — Services, Careers & Contact
**Goal:** Build the remaining `/services`, `/careers`, and `/contact` pages plus the server-side API routes.
**Estimated time:** Day 10

---

### Task Group: Services Pages

- [ ] `src/app/services/page.tsx` — Server Component, `revalidate = 60`: fetch `allServicesQuery`, render `<PageHero>` + 3-column `ServiceCard` grid
- [ ] `src/components/services/ServiceCard.tsx` — Server Component: `coverImage`, Lucide icon, title, `shortDescription`, "Explore →" link → `/services/[slug]`
- [ ] `src/app/services/[slug]/page.tsx` — Server Component:
  - `generateStaticParams()` using `allServiceSlugsQuery`
  - `generateMetadata()` with service title and description
  - `revalidate = 60`
  - Fetch service detail + related projects: `client.fetch(serviceBySlugQuery)` + `client.fetch(projectsByServiceQuery, { categorySlug: slug })`
- [ ] `src/components/services/ServiceDetail.tsx` — Server Component: full-width cover image, `PortableTextRenderer` for `fullDescription`, styled bullet list for `capabilities[]`, "Related Projects" mini-grid using `ProjectCard`

---

### Task Group: Careers Page

- [ ] `src/app/careers/page.tsx` — Server Component, `revalidate = 60`: fetch `activeJobsQuery`
- [ ] Job listing layout: one card per job posting showing title, department badge, location, employment type pill, and posted date
- [ ] "Apply" link on each card: `mailto:${settings.email}?subject=Application: ${job.title}` — opens mail client with pre-filled subject
- [ ] Empty state: friendly message ("We're not actively hiring right now — check back soon") + contact email link if no active jobs

---

### Task Group: Contact Page

- [ ] `src/app/contact/page.tsx` — Server Component: fetch `siteSettings` for address/phone/email/maps URL, render 2-column layout (info left, form right)
- [ ] `src/components/contact/ContactInfo.tsx` — Server Component:
  - Lucide `MapPin` + address (multi-line)
  - Lucide `Phone` + both phone numbers
  - Lucide `Mail` + email (mailto link)
  - Google Maps `<iframe>` from `siteSettings.googleMapsEmbedUrl` — add `loading="lazy"` and `title` for accessibility
- [ ] `src/components/contact/ContactForm.tsx` — Client Component:
  - React Hook Form with Zod schema: `firstName` (min 2), `lastName` (min 2), `email` (email), `subject` (min 5), `message` (min 20)
  - Inline field error messages below each input in `text-red-400 text-xs`
  - `onSubmit`: POST to `/api/contact`, show loading spinner on button during request
  - Success state: replace form with green confirmation message and a "Send another" reset button
  - Error state: red banner above form with the error message
- [ ] `src/app/api/contact/route.ts` — POST handler:
  ```typescript
  export async function POST(req: NextRequest) {
    const body = await req.json()
    const parsed = contactSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    }
    await resend.emails.send({
      from: 'website@your-domain.com',
      to: process.env.CONTACT_EMAIL!,
      subject: `Website enquiry: ${parsed.data.subject}`,
      html: `<p>From: ${parsed.data.firstName} ${parsed.data.lastName} (${parsed.data.email})</p><p>${parsed.data.message}</p>`,
    })
    return NextResponse.json({ success: true })
  }
  ```

---

---

# Phase 07 — SEO & Performance Hardening
**Goal:** Audit and fix every performance and SEO issue before deploying to production.
**Estimated time:** Day 11

---

### Task Group: Technical SEO

- [ ] `src/app/sitemap.ts` — auto-generates `sitemap.xml`. Parallel fetch `allProjectSlugsQuery` + `allServiceSlugsQuery`, then build:
  ```typescript
  export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const base = 'https://your-domain.com'
    const staticRoutes = ['/', '/projects', '/services', '/about', '/careers', '/contact']
    // ... map project and service slugs
  }
  ```
  Assign `priority` values: homepage = 1.0, projects/services = 0.9, detail pages = 0.8, about/contact = 0.7

- [ ] `src/app/robots.ts` — disallow `/admin`, allow all other routes, reference sitemap URL:
  ```typescript
  export default function robots(): MetadataRoute.Robots {
    return {
      rules: { userAgent: '*', allow: '/', disallow: '/admin' },
      sitemap: 'https://your-domain.com/sitemap.xml',
    }
  }
  ```

- [ ] `src/app/not-found.tsx` — custom 404: brand-styled dark page, large "404" in Cormorant Garamond, "Page not found" message, "Back to Home" button, and a mini grid of 3 featured projects

- [ ] Add `LocalBusiness` JSON-LD to `src/app/layout.tsx`:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Company Name",
    "url": "https://your-domain.com",
    "telephone": "+966-13-380-40006",
    "address": { "@type": "PostalAddress", "addressCountry": "SA" }
  }
  ```

- [ ] Audit all `generateMetadata()` implementations — every page must have a **unique** `title` (≤ 60 chars), `description` (≤ 160 chars), and an `openGraph.images` entry. Use a spreadsheet or checklist to verify page by page.

---

### Task Group: Performance

- [ ] `next/image` audit — for every `<Image>` in the project:
  - `sizes` prop matches actual rendered width at each breakpoint
  - `priority={true}` on all above-the-fold images (hero, first 3 project cards)
  - Explicit `width` and `height` on all images to prevent CLS
  - `alt` text present and descriptive on every image
- [ ] Font performance — verify:
  - `font-display: swap` in all `@font-face` declarations
  - Fonts are loaded via `next/font/local` (not CSS `@import` or `<link>`)
  - Add `<link rel="preload">` for the display font in `layout.tsx`
- [ ] Add `<link rel="preconnect" href="https://cdn.sanity.io" />` in `layout.tsx` `<head>`
- [ ] Security headers — confirm all 4 headers are set in `next.config.ts` (see Phase 00)
- [ ] Run Lighthouse locally (`npm run build && npm start`) on:
  - `/` (homepage)
  - `/projects` (listing)
  - `/projects/[any-slug]` (detail page)
  - Fix every flagged issue before proceeding to deployment
- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev/) on the build if a preview URL is available

---

---

# Phase 08 — Vercel Deployment
**Goal:** Deploy to production, configure environment variables, and wire the Sanity ISR webhook.
**Estimated time:** Day 12

---

### Task Group: Deploy

- [ ] Push repository to GitHub — confirm `main` branch is up to date:
  ```bash
  git add . && git commit -m "feat: complete build" && git push origin main
  ```
- [ ] Import project at [vercel.com/new](https://vercel.com/new) — select the GitHub repo — framework is auto-detected as **Next.js**
- [ ] Add all 6 environment variables in **Vercel Dashboard → Settings → Environment Variables** for all environments (Production, Preview, Development):
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`
  - `SANITY_API_READ_TOKEN`
  - `SANITY_REVALIDATE_SECRET`
  - `CONTACT_EMAIL`
  - `RESEND_API_KEY`
- [ ] Click **Deploy** — wait for build to complete. Check Function logs and build output for any TypeScript or ESLint errors.
- [ ] Verify the production URL renders correctly and the Studio at `/admin` is accessible

---

### Task Group: Sanity Integration

- [ ] Add the Vercel production URL to Sanity CORS allowed origins: **Sanity Manage → API → CORS Origins → Add Origin** (`https://your-project.vercel.app` and later your custom domain)

- [ ] Create `src/app/api/revalidate/route.ts` — ISR webhook handler:
  ```typescript
  export async function POST(req: NextRequest) {
    const secret = req.nextUrl.searchParams.get('secret')
    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
    }
    const body = await req.json()
    switch (body._type) {
      case 'project':
        revalidatePath('/projects', 'layout')
        revalidatePath('/projects/[slug]', 'page')
        revalidatePath('/', 'page')
        break
      case 'serviceCategory':
        revalidatePath('/services', 'layout')
        revalidatePath('/services/[slug]', 'page')
        revalidatePath('/', 'page')
        break
      case 'siteSettings':
      case 'partnerLogo':
        revalidatePath('/', 'layout')
        break
    }
    return NextResponse.json({ revalidated: true, type: body._type })
  }
  ```

- [ ] Configure Sanity webhook: **Sanity Dashboard → API → Webhooks → Add Webhook**:
  - URL: `https://your-domain.vercel.app/api/revalidate?secret=YOUR_SECRET`
  - HTTP method: `POST`
  - Trigger on: `create`, `update`, `delete`
  - Filter to document types: `project`, `serviceCategory`, `siteSettings`, `partnerLogo`

- [ ] **Test ISR end-to-end:** publish a new project in Studio → wait up to 60 seconds → verify it appears live on `/projects` without a redeploy

---

---

# Phase 09 — Custom Domain
**Goal:** Point the Hostinger domain to Vercel and provision SSL.
**Estimated time:** 1–2 hours (plus DNS propagation)

---

### Task Group: Vercel Side

- [ ] **Vercel Dashboard → Project → Settings → Domains** → click "Add Domain" → enter apex domain (e.g. `yourdomain.com`) and `www` subdomain
- [ ] Note the DNS records Vercel provides:
  - **A Record:** `@` → `76.76.21.21`
  - **CNAME Record:** `www` → `cname.vercel-dns.com`
- [ ] Set your preferred canonical domain in Vercel (apex or www) — Vercel auto-adds a 301 redirect from the non-preferred variant

---

### Task Group: Hostinger DNS

- [ ] Log in to **Hostinger hPanel → Domains → DNS Zone Editor**
- [ ] Delete any pre-existing default `A` record pointing `@` to Hostinger's IP
- [ ] Add **A Record**: Host = `@`, Points to = `76.76.21.21`, TTL = 3600
- [ ] Add **CNAME Record**: Host = `www`, Points to = `cname.vercel-dns.com`, TTL = 3600
- [ ] Save changes. Propagation is typically 15–60 minutes, up to 48 hours.
- [ ] Verify DNS propagation with:
  ```bash
  dig yourdomain.com A
  dig www.yourdomain.com CNAME
  ```
- [ ] Confirm `https://yourdomain.com` and `https://www.yourdomain.com` both resolve correctly with a valid SSL certificate (auto-provisioned by Vercel via Let's Encrypt, free, auto-renews)
- [ ] Update `metadataBase` in `src/app/layout.tsx` to the production domain:
  ```typescript
  metadataBase: new URL('https://yourdomain.com'),
  ```
- [ ] Update the Sanity CORS origins to include the custom domain
- [ ] Update the Sanity webhook URL to use the custom domain
- [ ] Redeploy on Vercel to apply the `metadataBase` change

---

---

# Phase 10 — Launch & Monitoring
**Goal:** Index the site with Google, enable analytics, complete final QA, and hand off to the client.
**Estimated time:** Launch day

---

### Task Group: Search & Analytics

- [ ] **Google Search Console** — add property for `https://yourdomain.com`, verify domain ownership (via DNS TXT record in Hostinger), submit `sitemap.xml`, request indexing for: `/`, `/projects`, `/services`, and the 6 featured project pages
- [ ] **Vercel Analytics** — add `<Analytics />` from `@vercel/analytics/react` to `src/app/layout.tsx` — zero-config, GDPR-friendly, no cookie banner required
- [ ] **Vercel Speed Insights** — add `<SpeedInsights />` from `@vercel/speed-insights/next` to `src/app/layout.tsx` — collects real-user LCP, CLS, FID data

---

### Task Group: Final QA

- [ ] Run final **Lighthouse** audit on production (`https://yourdomain.com`) — targets:
  - Performance: **≥ 95**
  - Accessibility: **100**
  - Best Practices: **100**
  - SEO: **100**
- [ ] Test all pages on **real iOS Safari** (iPhone) and **Android Chrome**
- [ ] Cross-browser test on desktop: **Chrome, Safari, Firefox, Edge**
- [ ] Test the contact form end-to-end: submit → confirm email is received at `CONTACT_EMAIL`
- [ ] Test the Sanity Studio at `/admin`: log in, publish a new project, confirm ISR delivers it live within 60s
- [ ] Verify all external links open correctly (Sister Company, social profiles)
- [ ] Verify `sitemap.xml` is accessible and valid at `https://yourdomain.com/sitemap.xml`
- [ ] Verify `robots.txt` is accessible at `https://yourdomain.com/robots.txt` and correctly blocks `/admin`

---

### Task Group: Client Hand-off

- [ ] Write `CLIENT_GUIDE.md` — step-by-step instructions for the client:
  - How to log in to Sanity Studio at `/admin`
  - How to add a new project (with screenshot annotations)
  - How to add a partner logo
  - How to update site stats (years, project count, etc.)
  - How to update the company profile PDF
  - How to mark a project as "featured"
  - Who to contact for technical issues
- [ ] Set up a **weekly Vercel Digest** email for performance and usage metrics (Vercel Dashboard → Settings → Notifications)
- [ ] Tag the release:
  ```bash
  git tag v1.0.0 && git push --tags
  ```

---

---

## Appendix A — Environment Variables

```bash
# .env.local — never commit this file to git

# Sanity — public (safe in browser bundles)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production

# Sanity — private (server-side only)
SANITY_API_READ_TOKEN=sk_your_read_token
SANITY_REVALIDATE_SECRET=a_long_random_string_here

# Contact form
CONTACT_EMAIL=info@your-domain.com
RESEND_API_KEY=re_your_resend_key
```

---

## Appendix B — Full Package List

```bash
# Framework (included via create-next-app)
# next, react, react-dom, typescript, tailwindcss, eslint

# CMS & content
npm install next-sanity @sanity/image-url @portabletext/react sanity sanity-plugin-media

# Animation
npm install framer-motion

# Theme toggle
npm install next-themes

# Forms & validation
npm install react-hook-form @hookform/resolvers zod

# Icons
npm install lucide-react

# Email
npm install resend

# Vercel observability (add after Phase 08)
npm install @vercel/analytics @vercel/speed-insights

# Dev tooling
npm install -D @types/node prettier
```

---

## Appendix C — CLC vs Our Build: Feature Comparison

| Feature | CLC (clc-sa.com) | Our Build |
|---|---|---|
| Platform | Wix (no-code) | Next.js 14, fully custom |
| Lighthouse Performance | ~40–55 (Wix avg) | Target ≥ 95 |
| LCP | ~4–6 seconds | Target < 1.2 seconds |
| Hero section | None — blurred background, no CTA | Cinematic full-viewport, animated headline, dual CTAs |
| Mobile nav | Dated Wix widget | Full-screen Framer Motion overlay |
| Project filter | None | Category tabs with URL state |
| Project detail | 1–2 images, basic text | Parallax hero, metadata sidebar, lightbox gallery |
| Scroll animations | None | Staggered reveals, parallax, hover cards |
| Stats / social proof | None | Animated counters (4 metrics) |
| Partner logo strip | Static Wix slider | CSS infinite marquee, grayscale→color hover |
| Per-page SEO | Generic title / description | Dynamic `generateMetadata()` + JSON-LD |
| Sitemap | None | Auto-generated from Sanity |
| Typography | Generic Wix fonts | Cormorant Garamond + DM Sans (self-hosted) |
| Design aesthetic | Dated, low contrast | Dark industrial luxury, bronze accent |
| Contact form | Basic Wix form, no validation | RHF + Zod, server-side validation, toast feedback |
| Careers page | Nav item, no actual page | Full `/careers` with live job listings from CMS |
| Services | One long text page | Individual `/services/[slug]` pages with structured data |
| CMS | Wix backend | Embedded Sanity Studio at `/admin` |
| Deployment | Wix hosting | Vercel + Vercel Analytics + Speed Insights |
