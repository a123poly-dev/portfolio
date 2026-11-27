import { SOCIAL_URLS } from "../../../constants/socials"
import type { TSocialIconName } from "@design-system/common/Icons"

// Hero links: the shared social links plus GitHub (hero only)
export const HERO_SOCIALS: {
  icon: TSocialIconName
  href: string
  label: string
}[] = [
  ...SOCIAL_URLS.map((s) => ({ ...s, icon: s.icon as TSocialIconName })),
  { icon: "github", href: "https://github.com/a123poly-dev/", label: "GitHub" },
]
