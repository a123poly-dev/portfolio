// Publish switch for the SynthUX cases.
// A case shows on the live site only when it is set to true here.
// Locally (npm run dev) and on Vercel preview links every case shows, so it can be reviewed.
export const SYNTHUX_PUBLISHED = {
  endToEnd: true,
  designSystem: true,
  aiProcess: false,
} as const

export type TSynthuxCase = keyof typeof SYNTHUX_PUBLISHED

const showDrafts = import.meta.env.DEV || import.meta.env.VITE_SHOW_DRAFTS === true

export const isCaseVisible = (key: TSynthuxCase) =>
  showDrafts || SYNTHUX_PUBLISHED[key]

// The layout preview page is for local review only.
export const isPreviewVisible = () => showDrafts
