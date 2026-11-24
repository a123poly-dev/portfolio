import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import cx from "classnames";
import { Reveal } from "./Reveal";
import { ReviewScreen, RunningScreen } from "./FlowScreens";
import { ReportMotionLayers } from "./HeroReport";
import { useHeroTimeline } from "./useHeroTimeline";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { FLOW_REPORT_TIMELINE } from "./flowTimeline";

import ui from "./ReportUI.module.scss";
import styles from "./FlowPlayer.module.scss";

// "New study to Report", as the Figma prototype J2 plays it:
// Review and run -> click Run study -> dissolve 0.3 s ease-out -> Running (bar fills, "N of 10 done"
// counts up) -> after 3.1 s dissolve 0.3 s -> Report loads with its keyframes, once, and stays.
const SCREEN_W = 1440;
const SCREEN_H = 1001;
// Phones show the main area only, like the hero
const CROP_X = 240;
const CROP_W = 1200;
const CROP_BELOW = 640;

const RUN_MS = 3100;
// The Running frame's own motion: a 4 s timeline (36:5706)
const RUNNING_MOTION_MS = 4000;
const FILL_FROM_PX = 6;
const FILL_TIMES = [0, 0.025, 0.7];
// "N of 10 done": 0 until 0.0925, then one step every 0.0675 of the timeline; 10 from 0.7
const stepStart = (n: number) => (n === 0 ? 0 : 0.0925 + 0.0675 * (n - 1));
const EPS = 0.0001;

type TPhase = "review" | "running" | "report";
const PHASES: TPhase[] = ["review", "running", "report"];

const LABEL: Record<TPhase, string> = {
  review:
    "New usability study, Review and run step: the study setup and the Run study button.",
  running:
    "Blue jacket checkout, running: the progress bar fills to 10 of 10 done.",
  report:
    "Blue jacket checkout, Run 2 report: the report loads section by section. Task success 7 of 10, SUS 68, 5 issues to check, average time 4m 20s.",
};

// Plays the Running frame's bar and counter. At rest they show the finished state (10 of 10).
const playRunning = (root: HTMLElement) => {
  const timing = { duration: RUNNING_MOTION_MS, fill: "forwards" as const };
  const list: Animation[] = [];
  const fill = root.querySelector<HTMLElement>("[data-run-fill]");
  if (fill) {
    list.push(
      fill.animate(
        [
          { width: `${FILL_FROM_PX}px`, offset: FILL_TIMES[0] },
          { width: `${FILL_FROM_PX}px`, offset: FILL_TIMES[1] },
          { width: "100%", offset: FILL_TIMES[2] },
          { width: "100%", offset: 1 },
        ],
        timing,
      ),
    );
  }
  root.querySelectorAll<HTMLElement>("[data-run-step]").forEach((el) => {
    const n = Number(el.dataset.runStep);
    const start = stepStart(n);
    const end = n === 10 ? 1 : stepStart(n + 1);
    const frames: Keyframe[] =
      n === 0
        ? [
            { opacity: 1, offset: 0 },
            { opacity: 1, offset: end - EPS },
            { opacity: 0, offset: end },
            { opacity: 0, offset: 1 },
          ]
        : [
            { opacity: 0, offset: 0 },
            { opacity: 0, offset: start - EPS },
            { opacity: 1, offset: start },
            ...(n === 10
              ? [{ opacity: 1, offset: 1 }]
              : [
                  { opacity: 1, offset: end - EPS },
                  { opacity: 0, offset: end },
                  { opacity: 0, offset: 1 },
                ]),
          ];
    list.push(el.animate(frames, timing));
  });
  return list;
};

// The Report screen of one run. A new run mounts a new one, so its keyframes start from 0.
const ReportRun = ({
  playing,
  reduced,
}: {
  playing: boolean;
  reduced: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useHeroTimeline(ref, {
    playing: playing && !reduced,
    startAtRest: reduced,
    timeline: FLOW_REPORT_TIMELINE,
    iterations: 1,
  });
  return (
    <div ref={ref} className={cx(ui.screen, styles.reportScreen)}>
      <ReportMotionLayers />
    </div>
  );
};

export const FlowPlayer = ({ caption }: { caption?: ReactNode }) => {
  const reduced = usePrefersReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const runningRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [phase, setPhase] = useState<TPhase>("review");
  const [run, setRun] = useState(0);
  // Going back to Review cuts instead of fading
  const [instant, setInstant] = useState(false);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) =>
      setWidth(entry.contentRect.width),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Running: play the bar and counter, then move on to the Report after 3.1 s
  useEffect(() => {
    if (phase !== "running") return;
    const root = runningRef.current;
    const list = root && !reduced ? playRunning(root) : [];
    const timer = window.setTimeout(() => setPhase("report"), RUN_MS);
    return () => {
      window.clearTimeout(timer);
      list.forEach((animation) => animation.cancel());
    };
  }, [phase, run, reduced]);

  const start = () => {
    setInstant(false);
    setRun((n) => n + 1);
    setPhase("running");
  };

  const reset = () => {
    setInstant(true);
    setPhase("review");
  };

  const cropped = width > 0 && width < CROP_BELOW;
  const viewW = cropped ? CROP_W : SCREEN_W;
  const scale = width > 0 ? width / viewW : 0;
  const screenStyle: CSSProperties = {
    transform: `translateX(${cropped ? -CROP_X * scale : 0}px) scale(${scale})`,
  };
  const at = PHASES.indexOf(phase);
  const layer = (index: number) =>
    cx(styles.layer, index <= at && styles.shown, instant && styles.instant);

  return (
    <Reveal>
      <figure className={styles.figure}>
        <div className={styles.player}>
          <div
            ref={frameRef}
            className={styles.frame}
            style={{
              aspectRatio: `${viewW} / ${SCREEN_H}`,
              visibility: scale ? "visible" : "hidden",
            }}
            role="img"
            aria-label={LABEL[phase]}
          >
            <div className={layer(0)} style={screenStyle} aria-hidden="true">
              <ReviewScreen
                onRun={phase === "review" ? start : undefined}
                highlight={phase === "review"}
              />
            </div>
            <div
              ref={runningRef}
              className={layer(1)}
              style={screenStyle}
              aria-hidden="true"
            >
              <RunningScreen />
            </div>
            <div className={layer(2)} style={screenStyle} aria-hidden="true">
              <ReportRun
                key={run}
                playing={phase === "report"}
                reduced={reduced}
              />
            </div>
          </div>
          <button
            type="button"
            className={styles.control}
            onClick={phase === "review" ? start : reset}
          >
            {phase === "review" ? "Run study" : "Replay"}
          </button>
          <span className={styles.status} aria-live="polite">
            {phase === "review" ? "" : LABEL[phase]}
          </span>
        </div>
        {caption && (
          <figcaption className={styles.caption}>{caption}</figcaption>
        )}
      </figure>
    </Reveal>
  );
};
