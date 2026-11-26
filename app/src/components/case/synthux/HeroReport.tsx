import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { useHeroTimeline } from "./useHeroTimeline";

import {
  Issues,
  KeyNumbers,
  ReportHeader,
  Sidebar,
  Summary,
  TopBar,
} from "./reportParts";

import styles from "./ReportUI.module.scss";

// Report hero: the Figma frame "Hero / Report motion" (21:2317), rebuilt in HTML and CSS so it
// stays sharp at any size. Layout and copy come from the approved Report 4.1 and loading state L3.
// Motion comes from the frame's own keyframes (heroTimeline.ts): an 8 s loop.
// data-m on an element names the Figma layer whose keyframes it plays.
const SCREEN_W = 1440;
const SCREEN_H = 900;
// On narrow screens the hero shows the main area only (x 240 to 1440), so text stays larger
const CROP_X = 240;
const CROP_W = 1200;
const CROP_BELOW = 640;

const Sk = ({
  m,
  w,
  h,
  full,
}: {
  m: string;
  w?: number;
  h: number;
  full?: boolean;
}) => (
  <span
    data-m={m}
    className={styles.sk}
    style={{ width: full ? "100%" : w, height: h }}
  />
);

// A skeleton inside a fixed box, as in the loading state's "Skeleton box" frames
const SkBox = ({
  h,
  w,
  children,
}: {
  h: number;
  w?: number | string;
  children: ReactNode;
}) => (
  <span className={styles.skBox} style={{ height: h, width: w }}>
    {children}
  </span>
);

// Loading state L3

const LoadingHeader = () => (
  <div
    data-m="21:2489"
    className={`${styles.block} ${styles.header}`}
    style={{ top: 96, height: 60 }}
  >
    <div className={styles.titleRow}>
      <div className={styles.titleGroup}>
        <SkBox h={32}>
          <Sk m="21:2493" w={240} h={20} />
        </SkBox>
        <SkBox h={28}>
          <Sk m="21:2495" w={48} h={20} />
        </SkBox>
      </div>
      <SkBox h={20}>
        <Sk m="21:2498" w={48} h={12} />
      </SkBox>
    </div>
    <div className={styles.skLine}>
      <SkBox h={20}>
        <Sk m="21:2502" w={96} h={12} />
      </SkBox>
      <SkBox h={20}>
        <Sk m="21:2504" w={240} h={12} />
      </SkBox>
      <SkBox h={20}>
        <Sk m="21:2506" w={48} h={12} />
      </SkBox>
    </div>
  </div>
);

type TSkMetric = {
  m: string[];
  label: number;
  value: number;
  bar?: number;
  grade?: boolean;
  caption: [number, number];
};

const SK_METRICS: TSkMetric[] = [
  {
    m: ["21:2515", "21:2520", "21:2522", "21:2524"],
    label: 96,
    value: 48,
    bar: 96,
    caption: [54, 48],
  },
  {
    m: ["21:2531", "21:2536", "21:2538", "21:2540"],
    label: 0,
    value: 31,
    grade: true,
    caption: [129, 96],
  },
  {
    m: ["21:2546", "21:2551", "21:2553", "21:2556"],
    label: 113,
    value: 16,
    bar: 96,
    caption: [162, 48],
  },
  {
    m: ["21:2561", "21:2566", "", "21:2568"],
    label: 92,
    value: 48,
    caption: [124, 96],
  },
];

const LoadingKeyNumbers = () => (
  <div
    data-m="21:2511"
    className={`${styles.block} ${styles.card} ${styles.metrics}`}
    style={{ top: 188, height: 146 }}
  >
    {SK_METRICS.map((metric, i) => (
      <div
        key={metric.m[0]}
        className={`${styles.metric} ${i > 0 ? styles.metricDivided : ""}`}
      >
        <SkBox h={16} w={metric.label || undefined}>
          <Sk m={metric.m[0]} w={48} h={12} />
        </SkBox>
        <SkBox h={28}>
          <Sk m={metric.m[1]} w={metric.value} h={20} />
        </SkBox>
        {metric.bar && (
          <SkBox h={6} w={176}>
            <Sk m={metric.m[2]} w={metric.bar} h={12} />
          </SkBox>
        )}
        {metric.grade && (
          <SkBox h={28} w="100%">
            <Sk m={metric.m[2]} w={48} h={20} />
          </SkBox>
        )}
        <SkBox h={18} w={metric.caption[0]}>
          <Sk m={metric.m[3]} w={metric.caption[1]} h={12} />
        </SkBox>
      </div>
    ))}
  </div>
);

const LoadingSummary = () => {
  const id = (n: number) => `I21:2571;548:147;21:${n}`;
  return (
    <div
      data-m="21:2571"
      className={`${styles.block} ${styles.card} ${styles.summary}`}
      style={{ top: 366, height: 224 }}
    >
      <span className={styles.h4}>Summary</span>
      <div className={styles.summaryContent}>
        <SkBox h={20} w="100%">
          <Sk m={id(2598)} w={240} h={12} />
        </SkBox>
        <SkBox h={20} w="100%">
          <Sk m={id(2601)} w={240} h={12} />
        </SkBox>
        <span className={styles.skParagraph}>
          <Sk m={id(2603)} h={12} full />
          <Sk m={id(2604)} h={12} full />
          <Sk m={id(2605)} h={12} full />
          <Sk m={id(2606)} w={624} h={12} />
        </span>
      </div>
    </div>
  );
};

// Loading issue rows: tag box width, title skeleton, meta boxes [box width or 0 for hug, skeleton], right box
const SK_ISSUES: {
  n: number[];
  tag: number;
  meta: [number, number][];
  right: [number, number];
}[] = [
  {
    n: [2614, 2617, 2620, 2622, 2630],
    tag: 83,
    meta: [
      [0, 48],
      [0, 96],
    ],
    right: [185, 96],
  },
  { n: [2638, 2641, 2643, 2645], tag: 74, meta: [[200, 96]], right: [183, 96] },
  { n: [2653, 2656, 2658, 2660], tag: 74, meta: [[191, 48]], right: [146, 48] },
  { n: [2668, 2671, 2673, 2675], tag: 74, meta: [[189, 96]], right: [134, 48] },
  { n: [2683, 2686, 2688, 2690], tag: 74, meta: [[149, 48]], right: [131, 48] },
];

const LoadingIssues = () => {
  const id = (n: number) => `I21:2586;457:15801;21:${n}`;
  return (
    <div
      data-m="21:2572"
      className={`${styles.block} ${styles.issues}`}
      style={{ top: 622 }}
    >
      <div className={styles.sectionHeader}>
        <span className={styles.h4}>Issues to check</span>
        {/* Filter tabs are hidden while loading but keep their 32 px height */}
        <span style={{ height: 32 }} />
      </div>
      <div className={styles.accordion} style={{ height: 380 }}>
        {SK_ISSUES.map((row, i) => (
          <div key={row.n[0]} className={styles.accordionItem}>
            <div className={styles.headerRow}>
              <div className={styles.issueHeader}>
                <div className={styles.issueLeft}>
                  <span className={styles.tagSlot}>
                    <SkBox h={28} w={row.tag}>
                      <Sk m={id(row.n[0])} w={48} h={20} />
                    </SkBox>
                  </span>
                  <span className={styles.issueText}>
                    <SkBox h={20} w={537}>
                      <Sk m={id(row.n[1])} w={240} h={12} />
                    </SkBox>
                    <span className={styles.skMeta}>
                      {row.meta.map(([box, sk], k) => (
                        <SkBox key={k} h={18} w={box || undefined}>
                          <Sk m={id(row.n[2 + k])} w={sk} h={12} />
                        </SkBox>
                      ))}
                    </span>
                  </span>
                </div>
                <SkBox h={20} w={row.right[0]}>
                  <Sk m={id(row.n[row.n.length - 1])} w={row.right[1]} h={12} />
                </SkBox>
              </div>
            </div>
            {i < SK_ISSUES.length - 1 && <div className={styles.divider} />}
          </div>
        ))}
      </div>
    </div>
  );
};

// Rolling counters: digit strips that scroll up to the value, as in the Figma counters
const Digit = ({ m, to }: { m: string; to: string }) => (
  <span className={styles.digit}>
    <span data-m={m} className={styles.strip}>
      {to.split("").join("\n")}
    </span>
  </span>
);

const Counters = () => (
  <>
    <span data-m="21:4212" className={styles.counter} style={{ left: 312 }}>
      <Digit m="21:4214" to="01234567" />
      <span className={styles.counterText}> of 10</span>
    </span>
    <span data-m="21:4225" className={styles.counter} style={{ left: 584 }}>
      <Digit m="21:4227" to="0123456" />
      <Digit m="21:4232" to="012345678" />
    </span>
    <span data-m="21:4242" className={styles.counter} style={{ left: 857 }}>
      <Digit m="21:4244" to="012345" />
    </span>
    <span data-m="21:4254" className={styles.counter} style={{ left: 1129 }}>
      <Digit m="21:4256" to="01234" />
      <span className={styles.counterText} style={{ width: 22 }}>
        m
      </span>
      <span style={{ width: 6 }} />
      <Digit m="21:4262" to="012" />
      <Digit m="21:4267" to="01234567890" />
      <span className={styles.counterText}>s</span>
    </span>
  </>
);

// Every layer of the motion frame: the loaded report, the loading state on top of it and the
// rolling counters. The hero loops them; the flow section plays them once.
export const ReportMotionLayers = () => (
  <>
    <Sidebar className={styles.heroSidebar} />
    <div className={styles.main}>
      <TopBar />
    </div>

    <ReportHeader className={styles.block} style={{ top: 96, height: 60 }} />
    <KeyNumbers className={styles.block} style={{ top: 188, height: 146 }} />
    <Summary className={styles.block} style={{ top: 366, height: 224 }} />
    <Issues className={styles.block} style={{ top: 622 }} />

    <LoadingHeader />
    <LoadingKeyNumbers />
    <LoadingSummary />
    <LoadingIssues />

    <Counters />
  </>
);

// Lucide icons at 16 px with a 1.5 px stroke (the DS size), as named in the Figma controls
const LucideIcon = ({ children }: { children: ReactNode }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const PauseIcon = () => (
  <LucideIcon>
    <rect x="14" y="4" width="4" height="16" rx="1" />
    <rect x="6" y="4" width="4" height="16" rx="1" />
  </LucideIcon>
);

const PlayIcon = () => (
  <LucideIcon>
    <polygon points="6 3 20 12 6 21 6 3" />
  </LucideIcon>
);

const MoonIcon = () => (
  <LucideIcon>
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </LucideIcon>
);

const SunIcon = () => (
  <LucideIcon>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </LucideIcon>
);

export const HeroReport = () => {
  const reduced = usePrefersReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);

  // Fit the 1440 x 900 screen to the page width; crop to the report column on narrow screens
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) =>
      setWidth(entry.contentRect.width),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Play only while the hero is on screen
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      {
        threshold: 0.2,
      },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // A loop longer than 5 s needs a pause control (WCAG 2.2.2). With reduced motion it starts paused
  // on the finished report, and Play starts it.
  const [paused, setPaused] = useState(reduced);
  // The product's Dark mode, from the DS "SynthUX - Semantic colors" collection
  const [dark, setDark] = useState(false);
  useHeroTimeline(screenRef, {
    playing: visible && !paused,
    startAtRest: reduced,
  });

  const cropped = width > 0 && width < CROP_BELOW;
  const viewW = cropped ? CROP_W : SCREEN_W;
  const scale = width > 0 ? width / viewW : 0;

  return (
    <div data-demo="hero_report" className={`${styles.hero} ${dark ? styles.dark : ""}`}>
      <div
        ref={frameRef}
        className={styles.frame}
        style={{ aspectRatio: `${viewW} / ${SCREEN_H}` }}
        role="img"
        aria-label="SynthUX Report screen. The loading skeleton pulses, then the report fades in section by section: the header, the key numbers rolling up to 7 of 10, SUS 68, 5 issues and 4m 20s, the summary and the issues to check. It loops every 8 seconds."
      >
        <div
          ref={screenRef}
          className={styles.screen}
          style={
            {
              transform: `translateX(${cropped ? -CROP_X * scale : 0}px) scale(${scale})`,
              visibility: scale ? "visible" : "hidden",
            } as CSSProperties
          }
          aria-hidden="true"
        >
          <ReportMotionLayers />
        </div>
      </div>
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.control}
          aria-label={paused ? "Play animation" : "Pause animation"}
          title={paused ? "Play animation" : "Pause animation"}
          onClick={() => setPaused((p) => !p)}
        >
          {paused ? <PlayIcon /> : <PauseIcon />}
        </button>
        <button
          type="button"
          className={styles.control}
          aria-label="Dark theme"
          aria-pressed={dark}
          title={dark ? "Light theme" : "Dark theme"}
          onClick={() => setDark((d) => !d)}
        >
          {dark ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </div>
  );
};
