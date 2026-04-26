import { Project, ServiceCategory } from "@/types"

// ─────────────────────────────────────────────────────────────
// Dummy placeholder data
// ─────────────────────────────────────────────────────────────

export const dummyServiceCategories: ServiceCategory[] = [
  {
    id: "cat-1",
    title: "General Contracting",
    slug: "general-contracting",
    shortDescription: "End-to-end turnkey project delivery from foundation to finishing.",
    icon: "building-2",
  },
  {
    id: "cat-2",
    title: "Electro-Mechanical",
    slug: "electro-mechanical",
    shortDescription: "Complete MEP systems: HVAC, electrical, plumbing, and BMS integration.",
    icon: "zap",
  },
  {
    id: "cat-3",
    title: "Safety & Security",
    slug: "safety-security",
    shortDescription: "Fire suppression, CCTV, access control, and alarm systems.",
    icon: "shield-check",
  },
]

export const dummyProjects: Project[] = [
  {
    id: "proj-1",
    title: "Al-Madinah Commercial Tower",
    slug: "al-madinah-commercial-tower",
    summary:
      "A 32-storey mixed-use commercial tower delivering 48,000 m² of premium office and retail space in central Madinah.",
    featured: true,
    serviceCategory: { title: "General Contracting", slug: "general-contracting" },
    contractType: "Turnkey",
    projectStatus: "Completed",
    completionYear: 2024,
    clientName: "Al-Noor Development Group",
    location: "Madinah, Saudi Arabia",
    totalAreaSqm: 48000,
    coverImage: "/og-default.jpg",
  },
  {
    id: "proj-2",
    title: "Riyadh Industrial MEP Complex",
    slug: "riyadh-industrial-mep-complex",
    summary:
      "Full MEP installation for a 120,000 m² industrial complex including HVAC, high-voltage electrical, and BMS control.",
    featured: true,
    serviceCategory: { title: "Electro-Mechanical", slug: "electro-mechanical" },
    contractType: "MEP Works",
    projectStatus: "Completed",
    completionYear: 2023,
    clientName: "Saudi Industrial Authority",
    location: "Riyadh, Saudi Arabia",
    totalAreaSqm: 120000,
    coverImage: "/og-default.jpg",
  },
  {
    id: "proj-3",
    title: "Jeddah Residential Compound",
    slug: "jeddah-residential-compound",
    summary:
      "Luxury residential compound of 240 villas with complete infrastructure, landscaping, and community facilities.",
    featured: true,
    serviceCategory: { title: "General Contracting", slug: "general-contracting" },
    contractType: "Turnkey",
    projectStatus: "Ongoing",
    completionYear: 2025,
    clientName: "Al-Rashid Real Estate",
    location: "Jeddah, Saudi Arabia",
    totalAreaSqm: 85000,
    coverImage: "/og-default.jpg",
  },
  {
    id: "proj-4",
    title: "Jubail Safety & Security Hub",
    slug: "jubail-safety-security-hub",
    summary:
      "Comprehensive fire-suppression, CCTV, and access control installation across a major petrochemical facility.",
    featured: true,
    serviceCategory: { title: "Safety & Security", slug: "safety-security" },
    contractType: "Safety Systems",
    projectStatus: "Completed",
    completionYear: 2023,
    clientName: "SABIC Affiliates",
    location: "Jubail, Saudi Arabia",
    totalAreaSqm: 62000,
    coverImage: "/og-default.jpg",
  },
  {
    id: "proj-5",
    title: "Dammam Logistics Warehouse",
    slug: "dammam-logistics-warehouse",
    summary:
      "Design-build of a 35,000 m² state-of-the-art logistics warehouse with automated storage and retrieval systems.",
    featured: true,
    serviceCategory: { title: "General Contracting", slug: "general-contracting" },
    contractType: "Design-Build",
    projectStatus: "Completed",
    completionYear: 2022,
    clientName: "Gulf Logistics Co.",
    location: "Dammam, Saudi Arabia",
    totalAreaSqm: 35000,
    coverImage: "/og-default.jpg",
  },
  {
    id: "proj-6",
    title: "Makkah Hotel MEP Works",
    slug: "makkah-hotel-mep-works",
    summary:
      "Full electro-mechanical scope for a 5-star, 680-room hotel adjacent to the Grand Mosque — on schedule for 2026 opening.",
    featured: true,
    serviceCategory: { title: "Electro-Mechanical", slug: "electro-mechanical" },
    contractType: "MEP Works",
    projectStatus: "Under Review",
    completionYear: 2026,
    clientName: "Abraj Hospitality",
    location: "Makkah, Saudi Arabia",
    totalAreaSqm: 72000,
    coverImage: "/og-default.jpg",
  },
]
