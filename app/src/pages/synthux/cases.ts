import {
  SYNTHUX_AI_PROCESS_PATH,
  SYNTHUX_DESIGN_SYSTEM_PATH,
  SYNTHUX_END_TO_END_PATH,
} from "../../constants/routePathConstants"
import type { TSynthuxCase } from "../../constants/synthuxCases"

export type TSynthuxCaseInfo = {
  key: TSynthuxCase
  path: string
  eyebrow: string
  title: string
  // The agreed one line from the case brief
  lead: string
  timeline?: string
}

export const SYNTHUX_ROLE = "Lead product designer and design engineer"
export const SYNTHUX_TEAM =
  "With a product developer who builds SynthUX with me, and a frontend developer who consults"
export const SYNTHUX_STATUS =
  "B2B product in development: design and specs are done, the build is in progress"

export const SYNTHUX_CASES: TSynthuxCaseInfo[] = [
  {
    key: "endToEnd",
    path: SYNTHUX_END_TO_END_PATH,
    eyebrow: "SynthUX · Case 1 of 3",
    title: "SynthUX, end to end",
    lead: "I led SynthUX from a research question to dev-ready specs in 34 days, and made the AI's limits part of the product.",
    timeline: "34 days of active work",
  },
  {
    key: "designSystem",
    path: SYNTHUX_DESIGN_SYSTEM_PATH,
    eyebrow: "SynthUX · Case 2 of 3",
    title: "One design system in Figma and in code",
    lead: "I built one design system that lives in Figma and in code, and a sync loop that keeps them the same.",
  },
  {
    key: "aiProcess",
    path: SYNTHUX_AI_PROCESS_PATH,
    eyebrow: "SynthUX · Case 3 of 3",
    title: "A design process run with AI agents",
    lead: "I set up AI agents as my execution team, saw the setup fail on Day 18, and rebuilt it around how much I can review well.",
  },
]
