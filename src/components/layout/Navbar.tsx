import { SiteSettings } from "@/types"
import NavClient from "./NavClient"

export default async function Navbar() {
  const settings: SiteSettings | null = null

  return <NavClient settings={settings} />
}
