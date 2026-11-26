import { useState } from "react";
import type { CSSProperties } from "react";
import cn from "classnames";
import { useInView } from "./useInView";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import styles from "./ThreeWays.module.scss";

// Figma "3.3 Three ways of working (motion)" (1440 x 800).
// Layout from the Figma case frame 314:59257: stages stacked, numbers on the left
// and notes on the right inside each stage (one column on a phone).
// The stages build in once, in the Figma order and timing, when the block scrolls
// into view, then stay. A replay button runs it again. With reduced motion
// everything is shown at once.

type TTone = "plain" | "warn" | "good";

type TStage = {
  tone: TTone;
  kicker: string;
  title: string;
  delay: number;
  big?: boolean;
  metrics: { value: string; text: string; delay: number }[];
  notes: { text: string; delay: number }[];
};

// Delays in seconds, from the Figma 9 s timeline
const STAGES: TStage[] = [
  {
    tone: "plain",
    kicker: "DAYS 15 TO 17, NO RULE",
    title: "One model did everything",
    delay: 0.3,
    big: true,
    metrics: [
      {
        value: "23 PRs",
        text: "merged, all for the design system: we were building the core DS components",
        delay: 0.6,
      },
    ],
    notes: [
      {
        text: "It worked, but cost a lot of tokens: each component, its spec and its code at once.",
        delay: 0.75,
      },
      {
        text: "The code docs did not fit their real reader, the AI agent. I rewrote them for it.",
        delay: 0.9,
      },
    ],
  },
  {
    tone: "warn",
    kicker: "DAY 18, RULE v0.1",
    title: "Workers did everything, Figma too",
    delay: 1.9,
    big: true,
    metrics: [
      { value: "0 PRs", text: "merged in the first 3.6 hours", delay: 2.2 },
      { value: "2 of 6", text: "components approved", delay: 2.35 },
    ],
    notes: [
      {
        text: "Steps got jumbled. When I disagreed, the agent kept going as if I had approved.",
        delay: 2.5,
      },
      {
        text: "Smaller models were weak at Figma. In step 4.6 one made my design call.",
        delay: 2.65,
      },
    ],
  },
  {
    tone: "good",
    kicker: "DAY 20, RULE v0.4",
    title: "Work split by kind",
    delay: 3.5,
    metrics: [
      { value: "Figma", text: "and planning: the main model", delay: 3.8 },
      { value: "Code", text: "worker models, under briefs", delay: 3.95 },
      { value: "1 step", text: "then I approve, then the next", delay: 4.1 },
      { value: "10 PRs", text: "merged, Days 20 to 32", delay: 4.25 },
    ],
    notes: [
      {
        text: "Fewer PRs because the work had moved to hi-fi screens. I added only the components those screens needed.",
        delay: 4.4,
      },
      {
        text: "“A reasonably good approach that helps me avoid feeling overloaded.” My reflection, not a measurement.",
        delay: 4.55,
      },
    ],
  },
];

const ARROW_DELAYS = [1.0, 2.6];

const delay = (s: number) => ({ "--tw-delay": `${s}s` }) as CSSProperties;

export const ThreeWays = () => {
  const reduced = usePrefersReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const [run, setRun] = useState(0);

  return (
    <figure className={styles.root} ref={ref}>
      <div className={styles.head}>
        <p className={styles.title}>Three ways of working in 6 days, and why I changed each one</p>
      </div>

      <ol
        key={run}
        className={cn(styles.stages, inView && !reduced && styles.playing, reduced && styles.still)}
      >
        {STAGES.map((stage, i) => (
          <li key={stage.kicker} className={styles.stageItem}>
            {i > 0 && (
              <span
                className={cn(styles.arrow, styles.anim)}
                style={delay(ARROW_DELAYS[i - 1])}
                aria-hidden="true"
              />
            )}
            <div className={cn(styles.stage, styles.anim)} style={delay(stage.delay)} data-tone={stage.tone}>
              <div className={styles.stageHead}>
                <span className={styles.kicker}>{stage.kicker}</span>
                <h3 className={styles.stageTitle}>{stage.title}</h3>
              </div>
              <div className={styles.stageBody} data-tone={stage.tone}>
                <div className={styles.metrics}>
                  {stage.metrics.map((metric) => (
                    <p
                      key={metric.value}
                      className={cn(styles.metric, styles.anim, styles.fade)}
                      style={delay(metric.delay)}
                    >
                      <span className={cn(styles.value, stage.big && styles.valueBig)}>{metric.value}</span>
                      <span className={styles.metricText}>{metric.text}</span>
                    </p>
                  ))}
                </div>
                <div className={styles.notes}>
                  {stage.notes.map((note) => (
                    <p key={note.text} className={cn(styles.note, styles.anim, styles.fade)} style={delay(note.delay)}>
                      {note.text}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>

      {!reduced && (
        <button
          type="button"
          className={styles.control}
          aria-label="Replay animation"
          title="Replay animation"
          onClick={() => setRun((n) => n + 1)}
        >
          <ReplayIcon />
        </button>
      )}
    </figure>
  );
};

const ReplayIcon = () => (
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
);
