// Publish switch for the SynthUX cases.
// A case shows on the live site only when it is set to true here.
// When running locally (npm run dev) every case shows, so it can be reviewed.
export const SYNTHUX_PUBLISHED = {
  endToEnd: false,
  designSystem: false,
  aiProcess: false,
} as const

export type TSynthuxCase = keyof typeof SYNTHUX_PUBLISHED

export const isCaseVisible = (key: TSynthuxCase) =>
  import.meta.env.DEV || SYNTHUX_PUBLISHED[key]

// The layout preview page is for local review only.
export const isPreviewVisible = () => import.meta.env.DEV
