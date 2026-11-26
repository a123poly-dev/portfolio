// The visitor's choice about optional analytics, kept in localStorage.
// Nothing optional loads until a choice with analytics or recordings is saved.

export type TConsent = {
  analytics: boolean
  recordings: boolean
}

type TStoredConsent = TConsent & { v: number; at: string }

const STORAGE_KEY = "consent"
// Bump when the categories or tools change, so everyone is asked again
const VERSION = 1
// Ask again after a year
const MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000

export const OPEN_SETTINGS_EVENT = "consent:open"
const CHANGE_EVENT = "consent:change"

export const readConsent = (): TConsent | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const stored = JSON.parse(raw) as TStoredConsent
    if (stored.v !== VERSION) return null
    if (Date.now() - new Date(stored.at).getTime() > MAX_AGE_MS) return null
    return { analytics: !!stored.analytics, recordings: !!stored.recordings }
  } catch {
    return null
  }
}

export const saveConsent = (consent: TConsent) => {
  const stored: TStoredConsent = {
    ...consent,
    v: VERSION,
    at: new Date().toISOString(),
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
  } catch {
    /* storage blocked: the choice holds for this visit only */
  }
  window.dispatchEvent(new CustomEvent<TConsent>(CHANGE_EVENT, { detail: consent }))
}

export const onConsentChange = (listener: (consent: TConsent) => void) => {
  const handler = (e: Event) => listener((e as CustomEvent<TConsent>).detail)
  window.addEventListener(CHANGE_EVENT, handler)
  return () => window.removeEventListener(CHANGE_EVENT, handler)
}

// Reopens the notice, for the "Privacy settings" link in the footer
export const openConsentSettings = () => {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))
}
