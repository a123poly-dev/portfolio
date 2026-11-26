// One call for every event in the tracking plan.
// Sends to Metrica (goal with params) and Hotjar (event name, for filtering
// recordings) when the visitor allowed them. Off the live domain (see env.ts),
// events are printed to the console instead.

import { readConsent } from "./consent"
import { METRICA_ID, loadedTrackers } from "./trackers"
import { isLiveSite } from "./env"

export type TEventName =
  | "page_view"
  | "cv_download"
  | "contact_click"
  | "nav_click"
  | "mobile_menu_open"
  | "theme_toggle"
  | "works_filter"
  | "case_card_click"
  | "case_scroll_depth"
  | "case_section_view"
  | "toc_click"
  | "demo_interaction"
  | "storybook_open"
  | "next_case_click"
  | "external_link_click"
  | "consent_update"

export type TEventParams = Record<string, string | number | boolean | undefined>


// The page slug, used as `case` on case pages ("home" on the home page)
export const pageSlug = (pathname = location.pathname) =>
  pathname.replace(/^\/+|\/+$/g, "") || "home"

const clean = (params: TEventParams) =>
  Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== ""),
  )

export const track = (name: TEventName, params: TEventParams = {}) => {
  const data = clean(params)

  if (!isLiveSite()) {
    console.info("[analytics]", name, data)
    return
  }

  const consent = readConsent()
  if (!consent) return
  const loaded = loadedTrackers()

  if (consent.analytics && loaded.analytics && window.ym) {
    if (name === "page_view") {
      window.ym(METRICA_ID, "hit", location.href, {
        title: document.title,
        referer: typeof data.referrer === "string" ? data.referrer : undefined,
      })
    } else {
      window.ym(METRICA_ID, "reachGoal", name, data)
    }
  }

  if (consent.recordings && loaded.recordings && window.hj && name !== "page_view") {
    window.hj("event", name)
  }
}

// Events that should count once per page view, such as the first use of a demo
const sent = new Set<string>()

export const trackOnce = (key: string, name: TEventName, params: TEventParams = {}) => {
  const id = `${location.pathname}|${key}`
  if (sent.has(id)) return
  sent.add(id)
  track(name, params)
}

// Clears the once-per-page memory when the route changes
export const resetPageOnce = () => sent.clear()
