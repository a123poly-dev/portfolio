// Page views, link clicks, demo use, scroll depth and section views, in one place.
// Mounted once inside the router (see App.tsx). Components mark what they are
// with data attributes instead of calling track() themselves:
//   data-track="nav_click" data-track-target="works"   an explicit event + params
//   data-place="nav"                                    where a link sits (nav, hero, footer…)
//   data-demo="flow_player"                             an interactive case demo

import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import { CV_URL } from "../constants/socials"
import { readConsent, onConsentChange } from "./consent"
import { loadTrackers, loadedTrackers } from "./trackers"
import {
  pageSlug,
  resetPageOnce,
  track,
  trackOnce,
  type TEventName,
  type TEventParams,
} from "./track"

const CONTACT_HOSTS: Record<string, string> = {
  "linkedin.com": "linkedin",
  "t.me": "telegram",
  "instagram.com": "instagram",
}
const STORYBOOK_HOSTS = ["synthetic-users-lab-eight.vercel.app"]
const CASE_PATH = /^\/synthux-(?!preview)/
const DEPTHS = [25, 50, 75, 100]
// A section counts as read once it has crossed the middle of the screen for this long
const SECTION_DWELL_MS = 2000

const bareHost = (host: string) => host.replace(/^www\./, "")

// data-track-foo-bar="x" → { foo_bar: "x" }
const trackParams = (el: HTMLElement): TEventParams => {
  const params: TEventParams = {}
  for (const [key, value] of Object.entries(el.dataset)) {
    if (!key.startsWith("track") || key === "track") continue
    const name = key
      .slice(5)
      .replace(/^[A-Z]/, (c) => c.toLowerCase())
      .replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`)
    params[name] = value
  }
  return params
}

const placeOf = (el: Element) =>
  el.closest<HTMLElement>("[data-place]")?.dataset.place

const handleClick = (event: MouseEvent) => {
  const target = event.target as Element | null
  const el = target?.closest<HTMLElement>("a, button")
  if (!el) return
  const slug = pageSlug()

  // 1. Explicit events
  const explicit = el.closest<HTMLElement>("[data-track]")
  if (explicit) {
    track(explicit.dataset.track as TEventName, {
      ...trackParams(explicit),
      place: explicit.dataset.trackPlace ?? placeOf(explicit),
    })
    return
  }

  // 2. Links, by where they go
  if (!(el instanceof HTMLAnchorElement) || !el.href) return
  const url = new URL(el.href, location.href)

  if (el.href === CV_URL || url.href === CV_URL) {
    track("cv_download", { place: placeOf(el) })
    return
  }
  if (url.origin === location.origin) return

  const host = bareHost(url.hostname)
  if (CONTACT_HOSTS[host]) {
    track("contact_click", { network: CONTACT_HOSTS[host], place: placeOf(el) })
  } else if (STORYBOOK_HOSTS.includes(host)) {
    track("storybook_open", { case: slug })
  } else {
    track("external_link_click", { url: url.origin + url.pathname, case: slug })
  }
}

// First touch of each demo on a page; pointerdown also catches drags and sliders
const handleDemo = (event: Event) => {
  const target = event.target as Element | null
  const demo = target?.closest<HTMLElement>("[data-demo]")
  if (!demo) return
  const control = target?.closest<HTMLElement>("button, a, input, [role='slider']")
  const action =
    control?.getAttribute("aria-label") ||
    control?.textContent?.trim().slice(0, 40) ||
    (event.type === "keydown" ? "keyboard" : "drag")
  trackOnce(`demo:${demo.dataset.demo}`, "demo_interaction", {
    case: pageSlug(),
    demo: demo.dataset.demo,
    action,
  })
}

// 25 / 50 / 75 / 100% of the page, each once per case view
const useScrollDepth = (pathname: string, isCase: boolean) => {
  useEffect(() => {
    if (!isCase) return
    const slug = pageSlug(pathname)
    let frame = 0
    const check = () => {
      frame = 0
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      if (scrollable <= 0) return
      const percent = (window.scrollY / scrollable) * 100
      DEPTHS.forEach((depth) => {
        if (percent >= depth - 1) {
          trackOnce(`depth:${depth}`, "case_scroll_depth", { case: slug, depth })
        }
      })
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(frame)
    }
  }, [pathname, isCase])
}

// Each case section with an id, once it has held the middle of the screen for 2 s
const useSectionViews = (pathname: string, isCase: boolean) => {
  useEffect(() => {
    if (!isCase) return
    const slug = pageSlug(pathname)
    const timers = new Map<Element, number>()
    let observer: IntersectionObserver | undefined

    // Sections render after the route change, so wait a frame for them
    const start = window.setTimeout(() => {
      const sections = document.querySelectorAll<HTMLElement>("main section[id]")
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const id = (entry.target as HTMLElement).id
            if (entry.isIntersecting) {
              timers.set(
                entry.target,
                window.setTimeout(() => {
                  trackOnce(`section:${id}`, "case_section_view", {
                    case: slug,
                    section: id,
                  })
                }, SECTION_DWELL_MS),
              )
            } else {
              window.clearTimeout(timers.get(entry.target))
              timers.delete(entry.target)
            }
          })
        },
        { rootMargin: "-50% 0px -50% 0px" },
      )
      sections.forEach((section) => observer!.observe(section))
    }, 300)

    return () => {
      window.clearTimeout(start)
      timers.forEach((timer) => window.clearTimeout(timer))
      observer?.disconnect()
    }
  }, [pathname, isCase])
}

export const useAnalytics = () => {
  const { pathname } = useLocation()
  const previousUrl = useRef(document.referrer)
  const isCase = CASE_PATH.test(pathname)

  // Load what the visitor already allowed, and anything they allow later
  useEffect(() => {
    const consent = readConsent()
    if (consent) loadTrackers(consent)
    return onConsentChange((next) => {
      const hadAnalytics = loadedTrackers().analytics
      loadTrackers(next)
      // The page that is open when consent is first given counts from here
      if (next.analytics && !hadAnalytics) {
        track("page_view", { path: location.pathname })
      }
    })
  }, [])

  // One page view per route
  useEffect(() => {
    resetPageOnce()
    track("page_view", { path: pathname, referrer: previousUrl.current })
    previousUrl.current = location.href
  }, [pathname])

  useEffect(() => {
    document.addEventListener("click", handleClick, true)
    document.addEventListener("pointerdown", handleDemo, true)
    document.addEventListener("keydown", handleDemo, true)
    return () => {
      document.removeEventListener("click", handleClick, true)
      document.removeEventListener("pointerdown", handleDemo, true)
      document.removeEventListener("keydown", handleDemo, true)
    }
  }, [])

  useScrollDepth(pathname, isCase)
  useSectionViews(pathname, isCase)
}
