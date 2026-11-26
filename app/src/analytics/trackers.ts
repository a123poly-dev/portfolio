// Third-party trackers, added to the page only after consent.
// These used to be inline in index.html and loaded for everyone.

import type { TConsent } from "./consent"
import { isLiveSite } from "./env"

export const METRICA_ID = 97019836
const HOTJAR_ID = 5063200

type TQueued = ((...args: unknown[]) => void) & { a?: unknown[]; q?: unknown[]; l?: number }

declare global {
  interface Window {
    ym?: TQueued
    hj?: TQueued
    ymab?: TQueued
    _hjSettings?: { hjid: number; hjsv: number }
  }
}

const addScript = (src: string) => {
  if (document.querySelector(`script[src="${src}"]`)) return
  const script = document.createElement("script")
  script.async = true
  script.src = src
  document.head.appendChild(script)
}

// Yandex Metrica. `defer` stops the automatic first hit: the router sends every
// page view itself (see useAnalytics), so the single-page app is counted right.
const loadMetrica = (withWebvisor: boolean) => {
  if (window.ym) return
  const ym: TQueued = (...args: unknown[]) => {
    ;(ym.a = ym.a || []).push(args)
  }
  ym.l = Date.now()
  window.ym = ym
  addScript("https://mc.yandex.ru/metrika/tag.js")
  window.ym(METRICA_ID, "init", {
    defer: true,
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: withWebvisor,
  })
}

// Varioqub experiments, which run on top of Metrica
const loadVarioqub = () => {
  if (window.ymab) return
  const ymab: TQueued = (...args: unknown[]) => {
    ;(ymab.a = ymab.a || []).push(args)
  }
  window.ymab = ymab
  addScript("https://abt.s3.yandex.net/expjs/latest/exp.js")
  window.ymab(`metrika.${METRICA_ID}`, "init")
}

// Hotjar: session recordings and heatmaps
const loadHotjar = () => {
  if (window.hj) return
  const hj: TQueued = (...args: unknown[]) => {
    ;(hj.q = hj.q || []).push(args)
  }
  window.hj = hj
  window._hjSettings = { hjid: HOTJAR_ID, hjsv: 6 }
  addScript(`https://static.hotjar.com/c/hotjar-${HOTJAR_ID}.js?sv=6`)
}

let loaded: TConsent = { analytics: false, recordings: false }

// Adds whatever the visitor allowed and is not on the page yet.
// Metrica's Webvisor is part of its init, so turning recordings on later
// adds it from the next visit (Hotjar starts at once).
export const loadTrackers = (consent: TConsent) => {
  if (!isLiveSite()) {
    console.info("[analytics] would load trackers for", consent)
    return
  }
  if (consent.analytics && !loaded.analytics) {
    loadMetrica(consent.recordings)
    loadVarioqub()
  }
  if (consent.recordings && !loaded.recordings) {
    loadHotjar()
  }
  loaded = {
    analytics: loaded.analytics || consent.analytics,
    recordings: loaded.recordings || consent.recordings,
  }
}

export const loadedTrackers = () => loaded

// Removes the trackers' cookies after a visitor withdraws consent
export const clearTrackerCookies = () => {
  const host = location.hostname
  const domains = ["", host, `.${host}`, `.${host.replace(/^www\./, "")}`]
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0].trim()
    if (!/^(_ym|_hj|yandexuid|yabs|ymex|i$)/.test(name)) return
    domains.forEach((domain) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${
        domain ? `; domain=${domain}` : ""
      }`
    })
  })
}
