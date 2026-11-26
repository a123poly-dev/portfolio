import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import cn from "classnames";
import { useInView } from "./useInView";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { keyframes } from "./loopMotion";
import type { TStop } from "./loopMotion";
import styles from "./PlanRun.module.scss";

// Figma "3.2 One plan, run step by step (motion)" (1440 x 800), DS sync round 7.
// Layout from the Figma case frame 314:59257: the PR panel on top, steps below.
// Plays once in view on the Figma timeline (steps light up every 0.5 s, the rail
// fills, the PR panel counts the code steps and ends merged), then stays on the
// final frame. A replay button runs it again. Reduced motion shows the final frame.

type TStep = { time: string; text: string; me?: boolean };

const STEPS: TStep[] = [
  { time: "17:52", text: "Detect changes, update Figma specs" },
  { time: "17:58", text: "I kept the light Switch track as a known gap", me: true },
  { time: "18:00", text: "R7-1 Sun and Moon icons, Avatar" },
  { time: "18:15", text: "R7-2 Table: text wraps, fluid columns" },
  { time: "18:15", text: "R7-3 Grade scale, Empty state, card grid" },
  { time: "18:24", text: "R7-4 Side menu" },
  { time: "18:44", text: "R7-5 User menu, Theme switch, Sidebar" },
  { time: "18:52", text: "I flagged the sidebar overlay, step added", me: true },
  { time: "18:55", text: "R7-5b Sidebar overlay below 1280" },
  { time: "18:59", text: "R7-6 Switch off track" },
  { time: "19:03", text: "R7-7 Layout and responsive docs" },
  { time: "19:07", text: "I chose version 0.3.0", me: true },
  { time: "19:09", text: "PR #110 merged, baseline saved", me: true },
];

// Seconds, from the Figma 10 s timeline
const stepAt = (i: number) => 0.5 + 0.5 * i;
const RAIL = { start: 0.5, end: 6.5 };
// A code step is done when its step lights up (R7-1 to R7-7, with R7-5b)
const CODE_DONE = [1.5, 2, 2.5, 3, 3.5, 4.5, 5, 5.5];
const DRAFT_AT = 1.4;
const READY_AT = 6;
const MERGED_AT = 6.5;
const VERSION_AT = 6;
const END = 6.8;

const BAR_S = 6;
const IO = "cubic-bezier(0.5, 0, 0.5, 1)";
const BAR_STOPS: TStop[] = [
  [0, "scaleX(0)", "linear"],
  ...CODE_DONE.flatMap((at, i): TStop[] => [
    [(at - 0.3) / BAR_S, `scaleX(${i / 8})`, IO],
    [at / BAR_S, `scaleX(${(i + 1) / 8})`, "linear"],
  ]),
  [1, "scaleX(1)"],
];
const CSS = keyframes("pr-bar", "transform", BAR_STOPS);

type TStatus = "none" | "draft" | "ready" | "merged";

const STATUS_LABEL: Record<Exclude<TStatus, "none">, string> = {
  draft: "Draft",
  ready: "Ready for review",
  merged: "Merged",
};

const delay = (s: number) => ({ "--pr-delay": `${s}s` }) as CSSProperties;

export const PlanRun = () => {
  const reduced = usePrefersReducedMotion();
  const { ref, inView } = useInView<HTMLElement>(0.25);
  const [run, setRun] = useState(0);
  // Time in seconds of the discrete changes (counter, status, version)
  const [t, setT] = useState(0);
  const playing = inView && !reduced;
  const now = reduced ? END : t;

  useEffect(() => {
    if (!playing) return;
    setT(0);
    const marks = [...CODE_DONE, DRAFT_AT, READY_AT, MERGED_AT, VERSION_AT, END];
    const timers = marks.map((at) => window.setTimeout(() => setT((prev) => Math.max(prev, at)), at * 1000));
    return () => timers.forEach(window.clearTimeout);
  }, [playing, run]);

  // The rail ends at the last node, whatever the step heights are after wrapping
  const stepsRef = useRef<HTMLOListElement>(null);
  const [railEnd, setRailEnd] = useState(21);
  useLayoutEffect(() => {
    const list = stepsRef.current;
    if (!list) return;
    const measure = () => {
      const last = list.lastElementChild as HTMLElement | null;
      if (last) setRailEnd(list.clientHeight - last.offsetTop - 21);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    measure();
    return () => observer.disconnect();
  }, [run]);

  const done = CODE_DONE.filter((at) => at <= now).length;
  const status: TStatus =
    now >= MERGED_AT ? "merged" : now >= READY_AT ? "ready" : now >= DRAFT_AT ? "draft" : "none";
  const version = now >= VERSION_AT ? "0.3.0" : "0.2.0";

  return (
    <figure className={styles.root} ref={ref}>
      <style>{CSS}</style>
      <div className={styles.head}>
        <p className={styles.title}>One plan, run step by step: DS sync round 7, Day 32</p>
        <div className={styles.chips}>
          <span className={cn(styles.chip, styles.mono)}>Plan file: DS sync round 7</span>
        </div>
      </div>

      <div
        key={run}
        className={cn(styles.body, playing && styles.playing, reduced && styles.still)}
      >
        <div className={styles.panel}>
          <div className={styles.prLine}>
            <span className={styles.prNumber}>PR #110</span>
            {status !== "none" && (
              <span key={status} className={styles.status} data-status={status}>
                {STATUS_LABEL[status]}
              </span>
            )}
          </div>
          <div className={styles.countLine}>
            <span className={styles.panelLabel}>Code steps on the branch</span>
            <span className={styles.count}>{done} of 8 done</span>
          </div>
          <span className={styles.bar} aria-hidden="true">
            <span
              className={cn(styles.barFill, styles.anim)}
              style={{ "--pr-dur": `${BAR_S}s`, animationName: "pr-bar" } as CSSProperties}
            />
          </span>
          <span key={version} className={styles.version} data-new={version === "0.3.0" || undefined}>
            Packages {version}
          </span>
        </div>

        <ol className={styles.steps} ref={stepsRef}>
          <span className={styles.rail} style={{ bottom: railEnd }} aria-hidden="true">
            <span
              className={cn(styles.railFill, styles.anim)}
              style={{ ...delay(RAIL.start), "--pr-dur": `${RAIL.end - RAIL.start}s` } as CSSProperties}
            />
          </span>
          {STEPS.map((step, i) => (
            <li
              key={step.text}
              className={cn(styles.step, styles.anim)}
              style={delay(stepAt(i) - 0.05)}
              data-me={step.me || undefined}
            >
              <span className={styles.time}>{step.time}</span>
              <span className={styles.node} aria-hidden="true">
                <span className={cn(styles.nodeFill, styles.anim)} style={delay(stepAt(i))} />
              </span>
              <span className={styles.text}>
                {step.text}
                {step.me && <span className={styles.me}>Me</span>}
              </span>
            </li>
          ))}
        </ol>

      </div>

      {!reduced && (
        <button
          type="button"
          className={styles.control}
          aria-label="Replay animation"
          title="Replay animation"
          onClick={() => setRun((n) => n + 1)}
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 12a9 9 0 1 0 3-6.7" />
            <polyline points="3 3 3 9 9 9" />
          </svg>
        </button>
      )}
    </figure>
  );
};
