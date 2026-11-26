// Crossfade between themes: the View Transitions API snapshots the page,
// the theme flips, and the old snapshot fades into the new one.
// Without the API, or with reduced motion, the theme changes at once.
export function fadeToTheme(apply: () => void) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => unknown
  }
  if (reduce || !doc.startViewTransition) {
    apply()
    return
  }
  document.documentElement.dataset.themeFade = ""
  const t = doc.startViewTransition(apply) as { finished: Promise<void> }
  t.finished.finally(() => {
    delete document.documentElement.dataset.themeFade
  })
}
