import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import cn from "classnames";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import styles from "./DsBento.module.scss";

// Case 2 cover: the two-column DS panel from the portfolio Figma (285:21848),
// rebuilt with the DS tokens. Every part works as in the Figma prototype.
// The intro (counters and bars) comes from the Bento v3 keyframes and plays once.
const PANEL_W = 875;
const PANEL_H = 427;
// On narrow screens show the first column only, so text stays larger
const CROP_W = 488;
const CROP_BELOW = 640;

// The Figma spring, sampled into a CSS linear() easing
const spring = (p: number) => {
  const t = p * 1.8;
  return (
    1 -
    Math.exp(-t * 7.6657) *
      (Math.cos(t * 6.7605) + 1.1339 * Math.sin(t * 6.7605))
  );
};
const SPRING = `linear(${Array.from({ length: 41 }, (_, i) =>
  spring(i / 40).toFixed(4),
).join(", ")})`;

// DS icons: 16 px with a 1.5 px stroke
const PATHS = {
  chevronRight: "M6.66667 10.6667L9.33333 8L6.66667 5.33333",
  chevronDown: "M4 6L8 10L12 6",
  circleInfo:
    "M8 5.33333H8.00667M8 7.33333V10.6667M2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8Z",
  circleClose:
    "M6 6L10 10M10 6L6 10M2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8Z",
  circleCheck:
    "M5.33333 8L7.33333 10L10.6667 6M2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8Z",
  triangleWarning:
    "M8 6V8.66667M8 10.6667H8.00667M9.15171 3.32817L13.8184 11.3282C14.3369 12.217 13.6957 13.3333 12.6667 13.3333H3.33333C2.30428 13.3333 1.66312 12.217 2.18163 11.3282L6.84829 3.32817C7.3628 2.44617 8.6372 2.44617 9.15171 3.32817Z",
  file: "M12.6667 6L8.66667 2H4.66667C3.93029 2 3.33333 2.59695 3.33333 3.33333V12.6667C3.33333 13.403 3.93029 14 4.66667 14H11.3333C12.0697 14 12.6667 13.403 12.6667 12.6667V6ZM8.66667 2V4.66667C8.66667 5.40305 9.26362 6 10 6H12.6667",
  close: "M4 4L12 12M12 4L4 12",
  check: "M4.75 8.25L7 10.5L11.25 5.5",
  trash:
    "M4 4V12.6667C4 13.403 4.59695 14 5.33333 14H10.6667C11.403 14 12 13.403 12 12.6667V4M2.66667 4H13.3333M5.33333 4V3.33333C5.33333 2.59695 5.93029 2 6.66667 2H9.33333C10.0697 2 10.6667 2.59695 10.6667 3.33333V4",
  sun: "M12.6667 8H14M11.3 11.3L12.24 12.24M8 12.6667V14M4.7 11.3L3.76 12.24M3.33333 8H2M4.7 4.7L3.76 3.76M8 3.33333V2M11.3 4.7L12.24 3.76M6 8C6 9.10667 6.89333 10 8 10C9.10667 10 10 9.10667 10 8C10 6.89333 9.10667 6 8 6C6.89333 6 6 6.89333 6 8Z",
  moon: "M14 8C14 11.3133 11.3133 14 8 14C4.68667 14 2 11.3133 2 8C2 4.68667 4.68667 2 8 2C6.75333 3.56 6.75333 5.77333 8 7.33333C8.2 7.58 8.42 7.8 8.66667 8C10.2267 9.24667 12.44 9.24667 14 8Z",
  monitor:
    "M6 13.3333H10M2.66667 4C2.66667 3.26667 3.26667 2.66667 4 2.66667H12C12.7333 2.66667 13.3333 3.26667 13.3333 4V10C13.3333 10.7333 12.7333 11.3333 12 11.3333H4C3.26667 11.3333 2.66667 10.7333 2.66667 10V4Z",
};
const Icon = ({
  name,
  className,
}: {
  name: keyof typeof PATHS;
  className?: string;
}) => (
  <svg
    className={cn(styles.icon, className)}
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d={PATHS[name]}
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Intro timing, in seconds from the start of the Figma timeline
const anim = (
  name: string,
  delay: number,
  duration: number,
  ease = SPRING,
): CSSProperties => ({
  animationName: name,
  animationDelay: `${delay}s`,
  animationDuration: `${duration}s`,
  animationTimingFunction: ease,
});

// A rolling counter digit: the strip scrolls up to its value
const Digit = ({ to, delay }: { to: number; delay: number }) => (
  <span className={styles.digit}>
    <span
      className={cn(styles.strip, styles.anim)}
      style={
        {
          "--to": to,
          ...anim("dsb-roll", delay, 1.8),
        } as CSSProperties
      }
    >
      {Array.from({ length: to + 1 }, (_, i) => (
        <span key={i}>{i}</span>
      ))}
    </span>
  </span>
);

const Value = ({ children }: { children: ReactNode }) => (
  <span
    className={cn(styles.value, styles.anim)}
    style={anim("dsb-fade-up", 0.15, 0.6)}
  >
    {children}
  </span>
);

// Column 1

const COUNTRIES = [
  "Austria",
  "France",
  "Germany",
  "Switzerland",
  "United Kingdom",
];

const Select = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Germany");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);

  return (
    <div ref={ref} className={styles.selectWrap}>
      <button
        type="button"
        className={cn(styles.select, open && styles.selectOpen)}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {value}
        <Icon name="chevronDown" />
      </button>
      <ul
        className={cn(styles.menu, open && styles.menuOpen)}
        role="listbox"
        aria-label="Country"
      >
        {COUNTRIES.map((c) => {
          const disabled = c === "United Kingdom";
          return (
            <li key={c} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={c === value}
                disabled={disabled}
                tabIndex={open ? 0 : -1}
                className={styles.option}
                onClick={() => {
                  setValue(c);
                  setOpen(false);
                }}
              >
                {c}
                {c === value && <Icon name="check" />}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const GRADES = ["F", "D", "C", "B", "A"];
const GRADE_DELAYS: [number, number][] = [
  [0.4, 0.4],
  [0.468, 0.402],
  [0.54, 0.402],
  [0.612, 0.396],
  [0.678, 0.402],
];
// Click cycles the marker F, C, A, as the Figma variants do
const GRADE_STEPS = [2, 4, 0];

const GradeScale = () => {
  const [step, setStep] = useState(0);
  const index = GRADE_STEPS[step];
  return (
    <button
      type="button"
      className={styles.grades}
      aria-label={`Grade ${GRADES[index]}. Click to change`}
      onClick={() => setStep((s) => (s + 1) % GRADE_STEPS.length)}
    >
      {GRADES.map((g, i) => (
        <span
          key={g}
          className={cn(styles.grade, i === index && styles.gradeOn)}
        >
          <span
            className={cn(styles.gradeBar, styles.anim)}
            style={anim("dsb-grow", ...GRADE_DELAYS[i])}
          />
          {g}
        </span>
      ))}
      <span
        className={styles.gradeMarker}
        style={{ "--i": index } as CSSProperties}
      >
        <span
          className={cn(styles.gradeMarkerIn, styles.anim)}
          style={{
            animationName: "dsb-fade-in, dsb-slide-in",
            animationDelay: "0.798s, 0.852s",
            animationDuration: "0.054s, 1.35s",
            animationTimingFunction: `linear, cubic-bezier(0.215, 0.61, 0.355, 1)`,
          }}
        />
      </span>
    </button>
  );
};

const Stats = () => (
  <div className={styles.stats}>
    <div className={styles.metric}>
      <span className={styles.eyebrow}>Issues to check</span>
      <Value>
        <Digit to={5} delay={0.3} />
      </Value>
      <span className={styles.severity}>
        <span
          className={cn(styles.sevCritical, styles.anim)}
          style={anim("dsb-grow", 0.3, 0.132, "linear")}
        />
        <span
          className={cn(styles.sevMajor, styles.anim)}
          style={anim("dsb-grow", 0.432, 0.342, "linear")}
        />
        <span
          className={cn(styles.sevMinor, styles.anim)}
          style={anim("dsb-grow", 0.774, 1.326)}
        />
      </span>
      <span className={styles.caption}>1 critical, 2 major, 2 minor</span>
    </div>
    <div className={styles.metric}>
      <span className={styles.eyebrow}>
        SUS score
        <Icon name="circleInfo" className={styles.secondary} />
      </span>
      <Value>
        <Digit to={6} delay={0.4} />
        <Digit to={8} delay={0.4} />
      </Value>
      <GradeScale />
      <span className={styles.caption}>Grade C - average is 68</span>
    </div>
  </div>
);

// Column 2

const TABS = ["All", "Critical", "Major", "Minor"];

const FilterTabs = () => {
  const [tab, setTab] = useState("All");
  return (
    <div className={styles.tabs} role="tablist" aria-label="Filter issues">
      {TABS.map((t) => (
        <button
          key={t}
          type="button"
          role="tab"
          aria-selected={t === tab}
          className={cn(styles.tab, t === tab && styles.tabOn)}
          onClick={() => setTab(t)}
        >
          {t}
          <span className={styles.count}>1</span>
        </button>
      ))}
    </div>
  );
};

const InfoBanner = () => {
  const [hidden, setHidden] = useState(false);
  // The banner hides, then comes back after 1.2 s so it can be tried again
  useEffect(() => {
    if (!hidden) return;
    const id = window.setTimeout(() => setHidden(false), 1200);
    return () => window.clearTimeout(id);
  }, [hidden]);

  return (
    <div
      className={cn(
        styles.banner,
        styles.bannerInfo,
        hidden && styles.bannerHidden,
      )}
    >
      <Icon name="circleInfo" className={styles.infoText} />
      <span className={styles.grow1}>Free trial: 1 study left.</span>
      <button
        type="button"
        className={styles.bannerClose}
        aria-label="Close banner"
        onClick={() => setHidden(true)}
      >
        <Icon name="close" />
      </button>
    </div>
  );
};

const ErrorBanner = () => (
  <div className={cn(styles.banner, styles.bannerError)}>
    <Icon name="circleClose" className={styles.errorText} />
    Email or password is wrong.
  </div>
);

const SelectableCard = () => {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      role="radio"
      aria-checked={on}
      className={cn(styles.card, on && styles.cardOn)}
      onClick={() => setOn((o) => !o)}
    >
      <span className={styles.cardText}>
        <span className={styles.h5}>Usability task</span>
        <span className={cn(styles.secondary, styles.truncate)}>
          Can people complete a task, and how easy does it feel?
        </span>
      </span>
      <span className={styles.radio} />
    </button>
  );
};

type TBadge = {
  label: string;
  tone: "positive" | "info" | "warning" | "error" | "neutral";
  icon?: keyof typeof PATHS;
};

const Badge = ({ label, tone, icon }: TBadge) => (
  <span className={cn(styles.badge, styles[tone])}>
    {icon && <Icon name={icon} />}
    {label}
  </span>
);

const ColumnOne = () => (
  <div className={cn(styles.col, styles.col1)}>
    <InfoBanner />
    <Stats />
    <FilterTabs />
    <SelectableCard />
  </div>
);

// Column 2

const Switch = () => {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      className={cn(styles.control, on && styles.on)}
      onClick={() => setOn((o) => !o)}
    >
      <span className={styles.switch}>
        <span className={styles.knob} />
      </span>
      Share link
    </button>
  );
};

const Checkbox = () => {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={on}
      className={cn(styles.control, on && styles.on)}
      onClick={() => setOn((o) => !o)}
    >
      <span className={styles.checkbox}>
        <Icon name="check" />
      </span>
      Add SUS questionnaire
    </button>
  );
};

type TTheme = "light" | "dark" | "system";
const THEMES: { id: TTheme; icon: keyof typeof PATHS; label: string }[] = [
  { id: "light", icon: "sun", label: "Light" },
  { id: "dark", icon: "moon", label: "Dark" },
  { id: "system", icon: "monitor", label: "System" },
];

const ThemeSwitch = ({
  theme,
  onChange,
}: {
  theme: TTheme;
  onChange: (t: TTheme) => void;
}) => {
  const index = THEMES.findIndex((t) => t.id === theme);
  return (
    <div className={styles.themeSwitch} role="radiogroup" aria-label="Theme">
      <span
        className={styles.themeIndicator}
        style={{ transform: `translateX(${index * 28}px)` }}
      />
      {THEMES.map((t) => (
        <button
          key={t.id}
          type="button"
          role="radio"
          aria-checked={t.id === theme}
          aria-label={t.label}
          title={t.label}
          className={cn(styles.themeOption, t.id === theme && styles.themeOn)}
          onClick={() => onChange(t.id)}
        >
          <Icon name={t.icon} />
        </button>
      ))}
    </div>
  );
};

const ColumnTwo = ({
  theme,
  onTheme,
}: {
  theme: TTheme;
  onTheme: (t: TTheme) => void;
}) => (
  <div className={cn(styles.col, styles.col2)}>
    <ErrorBanner />
    <Select />
    <div className={styles.row8}>
      <Badge label="Done" tone="positive" icon="circleCheck" />
      <Badge label="Running" tone="info" icon="circleInfo" />
      <Badge label="Major" tone="warning" icon="triangleWarning" />
      <Badge label="Critical" tone="error" icon="circleClose" />
    </div>
    <Switch />
    <Checkbox />
    <ThemeSwitch theme={theme} onChange={onTheme} />
  </div>
);

const useSystemDark = () => {
  const [dark, setDark] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches,
  );
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setDark(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);
  return dark;
};

export const DsBento = () => {
  const reduced = usePrefersReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [play, setPlay] = useState(false);
  const [theme, setTheme] = useState<TTheme>("light");
  const systemDark = useSystemDark();
  const dark = theme === "dark" || (theme === "system" && systemDark);

  // Fit the panel to the page width
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) =>
      setWidth(entry.contentRect.width),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // The intro plays once, when the cover comes into view
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    let timer = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Wait for the cover's fade-in, so the counters start rolling in view
          timer = window.setTimeout(() => setPlay(true), 500);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  const cropped = width > 0 && width < CROP_BELOW;
  const viewW = cropped ? CROP_W : PANEL_W;
  const scale = width > 0 ? width / viewW : 0;

  return (
    <div data-demo="ds_bento"
      ref={frameRef}
      className={cn(styles.frame, dark && styles.frameDark)}
      style={{ aspectRatio: `${viewW} / ${PANEL_H}` }}
    >
      <div
        className={cn(
          styles.panel,
          dark && styles.dark,
          (play || reduced) && styles.play,
          reduced && styles.reduced,
        )}
        style={{
          width: viewW,
          transform: `scale(${scale})`,
          visibility: scale ? "visible" : "hidden",
        }}
        role="group"
        aria-label="SynthUX design system components, live. Try them: the select, tabs, banner, card, switch, checkbox, grade scale and theme switch all work."
      >
        <ColumnOne />
        {!cropped && <ColumnTwo theme={theme} onTheme={setTheme} />}
      </div>
    </div>
  );
};
