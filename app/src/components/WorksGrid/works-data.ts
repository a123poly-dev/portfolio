import type { TTagColor } from "@design-system/common/Tag"
import {
  SYNTHUX_AI_PROCESS_PATH,
  SYNTHUX_DESIGN_SYSTEM_PATH,
  SYNTHUX_END_TO_END_PATH,
} from "../../constants/routePathConstants"
import { isCaseVisible } from "../../constants/synthuxCases"

export type TTag = {
  label: string
  color: TTagColor
}

export type TProject = {
  id: string
  title: string
  date: string
  tags: TTag[]
  coverClass: string
  link: string
  size: "large" | "medium" | "small"
  externalLink?: string
  // Hidden on the live site until the case is approved (see synthuxCases.ts)
  hidden?: boolean
}

const allProjects: TProject[] = [
  {
    id: "synthux-end-to-end",
    title: "SynthUX: UX tests with AI participants, from research question to dev-ready specs",
    date: "In development",
    tags: [
      { label: "Web", color: "blue" },
      { label: "B2B", color: "orange" },
      { label: "AI", color: "red" },
      { label: "UX", color: "purple" },
      { label: "UI", color: "purple" },
    ],
    coverClass: "synthuxEndToEndCover",
    link: SYNTHUX_END_TO_END_PATH,
    size: "large",
    hidden: !isCaseVisible("endToEnd"),
  },
  {
    id: "synthux-design-system",
    title: "SynthUX design system: one source in Figma and in code",
    date: "In development",
    tags: [
      { label: "Web", color: "blue" },
      { label: "Design System", color: "yellow" },
      { label: "Accessibility", color: "green" },
    ],
    coverClass: "synthuxDesignSystemCover",
    link: SYNTHUX_DESIGN_SYSTEM_PATH,
    size: "medium",
    hidden: !isCaseVisible("designSystem"),
  },
  {
    id: "synthux-ai-process",
    title: "SynthUX: a design process run with AI agents",
    date: "In development",
    tags: [
      { label: "AI", color: "red" },
      { label: "Process", color: "green" },
    ],
    coverClass: "synthuxAiProcessCover",
    link: SYNTHUX_AI_PROCESS_PATH,
    size: "medium",
    hidden: !isCaseVisible("aiProcess"),
  },
  {
    id: "pulkovo",
    title: "Airport Resource Management System, Timeliner",
    date: "01.2021 – 12.2022",
    tags: [
      { label: "Web", color: "blue" },
      { label: "B2B", color: "orange" },
      { label: "Research", color: "green" },
      { label: "Design System", color: "yellow" },
      { label: "UX", color: "purple" },
      { label: "UI", color: "purple" },
    ],
    coverClass: "pulkovoCover",
    link: "/pulkovo",
    size: "large",
  },
  {
    id: "ya-calls",
    title: "Yandex Control system hosted PBX — internal product",
    date: "06.2019 - 09.2019",
    tags: [
      { label: "Web", color: "blue" },
      { label: "B2B", color: "orange" },
      { label: "UX", color: "purple" },
      { label: "UI", color: "purple" },
    ],
    coverClass: "pbhCover",
    link: "/ya-calls",
    size: "medium",
  },

// New one
   {
    id: "ai-case",
    title: "AI Stock Analysis Web App",
    date: "2024",
    tags: [
      { label: "Web", color: "blue" },
      { label: "B2C", color: "orange" },
      { label: "UX", color: "purple" },
      { label: "UI", color: "purple" },
    ],
    coverClass: "aiCover",
    link: "",
    externalLink: "https://www.behance.net/gallery/244853723/AI-Stock-Analysis-Web-App-Case-Study",
    size: "medium",
  },
  {
    id: "okey-app",
    title: 'New mobile app for food retailer "O\'key"',
    date: "09.2019 - 12.2021",
    tags: [
      { label: "Android", color: "blue" },
      { label: "iOS", color: "blue" },
      { label: "B2C", color: "orange" },
      { label: "Research", color: "green" },
      { label: "Design System", color: "yellow" },
      { label: "UX", color: "purple" },
      { label: "UI", color: "purple" },
    ],
    coverClass: "okeyAppCover",
    link: "/okey-app",
    size: "medium",
  },
  {
    id: "taxi",
    title: "Driver taxi app",
    date: "2020",
    tags: [
      { label: "Android", color: "blue" },
      { label: "UX", color: "purple" },
      { label: "UI", color: "purple" },
    ],
    coverClass: "taxiCover",
    link: "/taxi",
    size: "small",
  },
  {
    id: "okey-site",
    title: 'Site for food retailer "O\'key"',
    date: "2020",
    tags: [
      { label: "Web", color: "blue" },
      { label: "UX", color: "purple" },
      { label: "UI", color: "purple" },
    ],
    coverClass: "okeySiteCover",
    link: "/okey-site",
    size: "small",
  },
]

export const projects = allProjects.filter((project) => !project.hidden)
