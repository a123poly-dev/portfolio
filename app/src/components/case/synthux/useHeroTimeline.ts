import { useEffect, useRef } from "react"
import type { RefObject } from "react"
import { HERO_LOOP_MS, HERO_TIMELINE } from "./heroTimeline"
import type { THeroTrack } from "./heroTimeline"

// With reduced motion, the screen starts at this point of the loop: every layer has settled
// and the fade-out (at 92.5%) has not started.
const REST_MS = 5000

const LINEAR_EASING_SUPPORTED =
  typeof CSS !== "undefined" && CSS.supports("animation-timing-function", "linear(0, 1)")

// Browsers without linear() get the closest cubic curve for the Figma spring
const easing = (value: string) =>
  value.startsWith("linear(") && !LINEAR_EASING_SUPPORTED ? "cubic-bezier(0.33, 1, 0.68, 1)" : value

const frame = (track: THeroTrack, value: number): Keyframe => {
  switch (track.prop) {
    case "opacity":
      return { opacity: value }
    case "width":
      return { width: `${value}px` }
    case "x":
      return { transform: `translateX(${value}px)` }
    case "y":
      return { transform: `translateY(${value}px)` }
  }
}

const keyframes = (track: THeroTrack): Keyframe[] =>
  track.values.map((value, i) => ({
    ...frame(track, value),
    offset: track.times[i],
    // WAAPI reads a keyframe's easing as the curve to the next keyframe
    easing: easing(track.ease[i] ?? "linear"),
  }))

// Plays the Figma timeline on every element marked data-m="<Figma node id>" inside the root.
// All layers share one 8 s loop, so they start together and stay in sync.
export const useHeroTimeline = (
  rootRef: RefObject<HTMLElement | null>,
  { playing, startAtRest }: { playing: boolean; startAtRest: boolean },
) => {
  const animations = useRef<Animation[]>([])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const list: Animation[] = []
    root.querySelectorAll<HTMLElement>("[data-m]").forEach((el) => {
      const tracks = HERO_TIMELINE[el.dataset.m ?? ""]
      tracks?.forEach((track) => {
        const animation = el.animate(keyframes(track), {
          duration: HERO_LOOP_MS,
          iterations: Infinity,
          fill: "both",
        })
        animation.pause()
        animation.currentTime = startAtRest ? REST_MS : 0
        list.push(animation)
      })
    })
    animations.current = list

    return () => {
      list.forEach((animation) => animation.cancel())
      animations.current = []
    }
    // Only the first render decides where the loop starts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rootRef])

  useEffect(() => {
    const list = animations.current
    if (playing) {
      // Start every layer from the same moment so the loop stays in sync
      const startTime = document.timeline.currentTime
      list.forEach((animation) => {
        const at = Number(animation.currentTime ?? 0)
        animation.play()
        if (typeof startTime === "number") animation.startTime = startTime - at
      })
    } else {
      list.forEach((animation) => animation.pause())
    }
  }, [playing])
}
