import { useEffect, useId, useRef, useState } from "react"
import { Link } from "react-router-dom"
import cn from "classnames"
import {
  OPEN_SETTINGS_EVENT,
  readConsent,
  saveConsent,
  type TConsent,
} from "../../../analytics/consent"
import { clearTrackerCookies, loadedTrackers } from "../../../analytics/trackers"
import { track } from "../../../analytics/track"
import { PRIVACY_PATH } from "../../../constants/routePathConstants"
import styles from "./ConsentNotice.module.scss"

// First visit: wait a moment so the notice does not fight the hero's entrance
const SHOW_DELAY_MS = 1000
// Matches the exit transition in the stylesheet
const EXIT_MS = 240

type TPhase = "hidden" | "shown" | "leaving"

type TConsentNoticeProps = {
  // Storybook: start open, optionally with Settings expanded
  initialOpen?: boolean
  initialSettings?: boolean
}

// Data notice (Figma UI Concept 507:7647, in the portfolio palette): one line of
// copy and Reject all / Settings / Accept all. Settings grows the card in place to
// show the two optional categories. It never blocks the page.
export const ConsentNotice = ({
  initialOpen = false,
  initialSettings = false,
}: TConsentNoticeProps) => {
  const [phase, setPhase] = useState<TPhase>(initialOpen ? "shown" : "hidden")
  const [settingsOpen, setSettingsOpen] = useState(initialSettings)
  const [choice, setChoice] = useState<TConsent>(
    () => readConsent() ?? { analytics: true, recordings: true },
  )
  const leaveTimer = useRef<number>(undefined)
  const panelId = useId()

  useEffect(() => {
    if (initialOpen) return
    const timer = readConsent()
      ? undefined
      : window.setTimeout(() => setPhase("shown"), SHOW_DELAY_MS)

    // Footer "Privacy settings" reopens the notice with the current choice
    const reopen = () => {
      window.clearTimeout(leaveTimer.current)
      setChoice(readConsent() ?? { analytics: true, recordings: true })
      setSettingsOpen(true)
      setPhase("shown")
    }
    window.addEventListener(OPEN_SETTINGS_EVENT, reopen)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener(OPEN_SETTINGS_EVENT, reopen)
    }
  }, [initialOpen])

  useEffect(() => () => window.clearTimeout(leaveTimer.current), [])

  const decide = (next: TConsent) => {
    const previous = readConsent()
    const loaded = loadedTrackers()
    saveConsent(next)
    if (previous && (previous.analytics || previous.recordings)) {
      track("consent_update", { ...next })
    }
    setPhase("leaving")
    leaveTimer.current = window.setTimeout(() => {
      setPhase("hidden")
      setSettingsOpen(false)
      // A script that already runs can't be unloaded: after a withdrawal, clear
      // its cookies and reload so nothing more is sent. (Turning recordings on
      // later starts Hotjar now; Metrica's Webvisor joins from the next visit.)
      const needsReload =
        (loaded.analytics && !next.analytics) ||
        (loaded.recordings && !next.recordings)
      if (needsReload) {
        clearTrackerCookies()
        window.location.reload()
      }
    }, EXIT_MS)
  }

  if (phase === "hidden") return null

  return (
    <section
      className={cn(styles.notice, phase === "leaving" && styles.leaving)}
      aria-label="Privacy choices"
    >
      <p className={styles.text}>
        I count visits and clicks to learn which work people read. With your
        OK, I&apos;d use Yandex Metrica and Hotjar for that, including anonymous
        session recordings.{" "}
        <Link to={PRIVACY_PATH} className={styles.more}>
          Privacy
        </Link>
      </p>

      <div
        id={panelId}
        className={cn(styles.panel, settingsOpen && styles.panelOpen)}
        inert={!settingsOpen}
      >
        <div className={styles.panelInner}>
          <ul className={styles.options}>
            <Option
              title="Essential"
              text="Remembers your theme and this choice. Always on."
              checked
              disabled
            />
            <Option
              title="Analytics"
              text="Yandex Metrica: visits, pages and clicks."
              checked={choice.analytics}
              onChange={(analytics) => setChoice((c) => ({ ...c, analytics }))}
            />
            <Option
              title="Session recordings"
              text="Hotjar and Metrica Webvisor: anonymous replays and heatmaps."
              checked={choice.recordings}
              onChange={(recordings) =>
                setChoice((c) => ({ ...c, recordings }))
              }
            />
          </ul>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={cn(styles.button, styles.ghost, styles.reject)}
          onClick={() => decide({ analytics: false, recordings: false })}
        >
          Reject all
        </button>
        <button
          type="button"
          className={cn(styles.button, styles.outline, styles.settings)}
          aria-expanded={settingsOpen}
          aria-controls={panelId}
          onClick={() =>
            settingsOpen ? decide(choice) : setSettingsOpen(true)
          }
        >
          <span
            className={styles.swap}
            data-shown={!settingsOpen || undefined}
            aria-hidden={settingsOpen}
          >
            Settings
          </span>
          <span
            className={styles.swap}
            data-shown={settingsOpen || undefined}
            aria-hidden={!settingsOpen}
          >
            Save choices
          </span>
        </button>
        <button
          type="button"
          className={cn(styles.button, styles.primary, styles.accept)}
          onClick={() => decide({ analytics: true, recordings: true })}
        >
          Accept all
        </button>
      </div>
    </section>
  )
}

type TOptionProps = {
  title: string
  text: string
  checked: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => void
}

const Option = ({ title, text, checked, disabled, onChange }: TOptionProps) => {
  const id = useId()
  return (
    <li className={styles.option}>
      <label htmlFor={id} className={styles.optionText}>
        <span className={styles.optionTitle}>{title}</span>
        <span className={styles.optionHint}>{text}</span>
      </label>
      <input
        id={id}
        type="checkbox"
        role="switch"
        className={styles.switch}
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
      />
    </li>
  )
}
