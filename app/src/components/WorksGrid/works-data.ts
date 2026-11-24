import {
  SYNTHUX_AI_PROCESS_PATH,
  SYNTHUX_DESIGN_SYSTEM_PATH,
  SYNTHUX_END_TO_END_PATH,
} from "../../constants/routePathConstants"
import { isCaseVisible } from "../../constants/synthuxCases"

// Filter tabs above the grid (Figma 290:54881), in display order
export const WORK_CATEGORIES = [
  "B2B",
  "B2C",
  "AI",
  "Mobile",
  "Design System",
] as const

export type TWorkCategory = (typeof WORK_CATEGORIES)[number]

// Cover heights from Figma 272:67066: tall 534×586, compact 534×277, regular 534×360
export type TCoverSize = "tall" | "compact" | "regular"

export type TProject = {
  id: string
  title: string
  categories: TWorkCategory[]
  // Meta line in the hover panel ("2026 · AI · B2B")
  meta: string[]
  coverClass: string
  cover: TCoverSize
  link: string
  externalLink?: string
  // Hidden on the live site until the case is approved (see synthuxCases.ts)
  hidden?: boolean
}

// Order follows Figma: the tall SynthUX card on the left with the two compact ones
// stacked beside it, then the older cases two per row.
const allProjects: TProject[] = [
  {
    id: "synthux-end-to-end",
    title: "A UX lab with AI participants – SynthUX. End to end",
    categories: ["B2B", "AI"],
    meta: ["2026", "AI", "B2B"],
    coverClass: "synthuxEndToEndCover",
    cover: "tall",
    link: SYNTHUX_END_TO_END_PATH,
    hidden: !isCaseVisible("endToEnd"),
  },
  {
    id: "synthux-design-system",
    title: "SynthUX design system: one source in Figma and in code",
    categories: ["AI", "Design System"],
    meta: ["2026", "AI", "Design System", "Accessibility"],
    coverClass: "synthuxDesignSystemCover",
    cover: "compact",
    link: SYNTHUX_DESIGN_SYSTEM_PATH,
    hidden: !isCaseVisible("designSystem"),
  },
  {
    id: "synthux-ai-process",
    title: "SynthUX: a design process run with AI agents",
    categories: ["AI"],
    meta: ["2026", "AI", "Process"],
    coverClass: "synthuxAiProcessCover",
    cover: "compact",
    link: SYNTHUX_AI_PROCESS_PATH,
    hidden: !isCaseVisible("aiProcess"),
  },
  {
    id: "ai-case",
    title: "AI Stock Analysis Web App",
    categories: ["B2C", "AI"],
    meta: ["2024", "AI", "B2C"],
    coverClass: "aiCover",
    cover: "regular",
    link: "",
    externalLink:
      "https://www.behance.net/gallery/244853723/AI-Stock-Analysis-Web-App-Case-Study",
  },
  {
    id: "pulkovo",
    title: "Airport Resource Management System, Timeliner",
    categories: ["B2B", "Design System"],
    meta: ["2022", "B2B", "Design System"],
    coverClass: "pulkovoCover",
    cover: "regular",
    link: "/pulkovo",
  },
  {
    id: "okey-app",
    title: 'New mobile app for food retailer "O\'key"',
    categories: ["B2C", "Mobile", "Design System"],
    meta: ["2021", "Mobile", "B2C", "Design System"],
    coverClass: "okeyAppCover",
    cover: "regular",
    link: "/okey-app",
  },
  {
    id: "ya-calls",
    title: "Yandex Control system hosted PBX — internal product",
    categories: ["B2B"],
    meta: ["2019", "B2B"],
    coverClass: "pbhCover",
    cover: "regular",
    link: "/ya-calls",
  },
]

export const projects = allProjects.filter((project) => !project.hidden)
