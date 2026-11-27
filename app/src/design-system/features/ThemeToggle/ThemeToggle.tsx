import { useEffect, useState } from "react"
import { track } from "../../../analytics/track"
import styles from "./ThemeToggle.module.scss"
import { fadeToTheme } from "./themeFade"

type TTheme = "light" | "dark"

const STORAGE_KEY = "theme"

const readTheme = (): TTheme =>
  document.documentElement.dataset.theme === "dark" ? "dark" : "light"

const applyTheme = (theme: TTheme) => {
  document.documentElement.dataset.theme = theme
}

// Moon from Figma (290:54981)
export const MoonIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M8 2C7.20435 2.79565 6.75736 3.87478 6.75736 5C6.75736 6.12522 7.20435 7.20435 8 8C8.79565 8.79565 9.87478 9.24264 11 9.24264C12.1252 9.24264 13.2044 8.79565 14 8C14 9.18669 13.6481 10.3467 12.9888 11.3334C12.3295 12.3201 11.3925 13.0892 10.2961 13.5433C9.19975 13.9974 7.99335 14.1162 6.82946 13.8847C5.66558 13.6532 4.59648 13.0818 3.75736 12.2426C2.91825 11.4035 2.3468 10.3344 2.11529 9.17054C1.88378 8.00666 2.0026 6.80026 2.45673 5.7039C2.91085 4.60754 3.67989 3.67047 4.66658 3.01118C5.65328 2.35189 6.81331 2 8 2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// Sun drawn to match the moon: same 1.5 px round stroke on a 16 px grid
export const SunIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
  >
    <circle cx="8" cy="8" r="2.75" />
    <path d="M8 1.5v1.25M8 13.25v1.25M1.5 8h1.25M13.25 8h1.25M3.4 3.4l.9.9M11.7 11.7l.9.9M3.4 12.6l.9-.9M11.7 4.3l.9-.9" />
  </svg>
)

// Light/dark switch for the nav (Figma "Button - Dark theme", 290:54980).
// The first visit follows the system setting (index.html sets it before paint);
// a click is remembered in localStorage.
export const ThemeToggle = ({ className }: { className?: string }) => {
  const [theme, setTheme] = useState<TTheme>("light")

  useEffect(() => {
    setTheme(readTheme())

    // Follow the system setting until the visitor picks a theme
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = (e: MediaQueryListEvent) => {
      let stored: string | null = null
      try {
        stored = localStorage.getItem(STORAGE_KEY)
      } catch {
        /* storage blocked */
      }
      if (stored) return
      const next: TTheme = e.matches ? "dark" : "light"
      applyTheme(next)
      setTheme(next)
    }
    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [])

  const toggle = () => {
    const next: TTheme = theme === "dark" ? "light" : "dark"
    fadeToTheme(() => applyTheme(next))
    setTheme(next)
    track("theme_toggle", { to: next })
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* storage blocked: the theme still changes for this visit */
    }
  }

  const isDark = theme === "dark"

  return (
    <button
      type="button"
      className={`${styles.toggle} ${className ?? ""}`}
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
    >
      <span className={styles.icon} data-shown={!isDark || undefined}>
        <MoonIcon />
      </span>
      <span className={styles.icon} data-shown={isDark || undefined}>
        <SunIcon />
      </span>
    </button>
  )
}
