import { useEffect, useState } from "react"

// True when the site is in its dark theme (<html data-theme="dark">). The theme
// already follows the system until the reader picks one, so this covers both.
// Updates when the reader switches the theme in the nav.
const read = () =>
  typeof document !== "undefined" && document.documentElement.dataset.theme === "dark"

export const useSiteDark = () => {
  const [dark, setDark] = useState(read)

  useEffect(() => {
    const observer = new MutationObserver(() => setDark(read()))
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] })
    return () => observer.disconnect()
  }, [])

  return dark
}
