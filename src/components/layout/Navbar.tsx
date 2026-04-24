import { client } from "@/sanity/lib/client"
import { siteSettingsQuery } from "@/sanity/lib/queries"
import { SiteSettings } from "@/types/sanity"
import NavClient from "./NavClient"

export default async function Navbar() {
  const settings = await client.fetch<SiteSettings>(siteSettingsQuery)

  return <NavClient settings={settings} />
}
