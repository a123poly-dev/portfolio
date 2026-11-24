import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import cn from "classnames";
import { Reveal } from "./Reveal";
import caseStyles from "./Synthux.module.scss";
import tp from "./TokenPipeline.module.scss";
import pg from "./TokenPlayground.module.scss";
import styles from "./ContrastChecker.module.scss";

// Figma "2.5 Contrast checker (variants)" (90:16722): 5 pairs x Light/Dark.
// Pick a pair to see its sample and ratio; switch the preview theme to see the
// other theme's values. Wide: the 1328 px Figma layout, scaled to fit.
const WIDE_W = 400 + 32 + 896;

type TTheme = "light" | "dark" | "system";
type TKind = "text" | "button" | "badge" | "field";

type TSide = {
  ratio: string;
  fg: string;
  bg: string;
  color: string;
  fill?: string;
};

const PAIRS: {
  id: string;
  fg: string;
  on: string;
  use: string;
  kind: TKind;
  sample: string;
  ui?: boolean;
  light: TSide;
  dark: TSide;
}[] = [
  {
    id: "secondary",
    fg: "text/secondary",
    on: "surface/default",
    use: "Table headers and captions",
    kind: "text",
    sample: "Task success",
    light: { ratio: "5.37", fg: "#6a6b66", bg: "#ffffff", color: "#6a6b66" },
    dark: { ratio: "5.64", fg: "#93948f", bg: "#1b1b1a", color: "#93948f" },
  },
  {
    id: "action",
    fg: "action/primary/text",
    on: "action/primary/background",
    use: "Primary button",
    kind: "button",
    sample: "Share",
    light: {
      ratio: "19.44",
      fg: "#ffffff",
      bg: "#0d0d0c",
      color: "#ffffff",
      fill: "#0d0d0c",
    },
    dark: {
      ratio: "15.52",
      fg: "#0d0d0c",
      bg: "#e5e6e3",
      color: "#0d0d0c",
      fill: "#e5e6e3",
    },
  },
  {
    id: "error",
    fg: "status/error/text",
    on: "status/error/background over surface/default",
    use: "Critical badge",
    kind: "badge",
    sample: "Critical",
    light: {
      ratio: "7.02",
      fg: "#9e1d2c",
      bg: "error/background",
      color: "#9e1d2c",
      fill: "rgb(207 45 64 / 8%)",
    },
    dark: {
      ratio: "5.58",
      fg: "#ff676a",
      bg: "error/background",
      color: "#ff676a",
      fill: "rgb(207 45 64 / 12%)",
    },
  },
  {
    id: "input",
    fg: "border/input",
    on: "surface/default",
    use: "Input edge, WCAG 1.4.11",
    kind: "field",
    sample: "Field edge: 3:1 minimum for UI parts",
    ui: true,
    light: { ratio: "3.38", fg: "#8b8c88", bg: "#ffffff", color: "#8b8c88" },
    dark: { ratio: "5.09", fg: "#6a6b66", bg: "#1b1b1a", color: "#6a6b66" },
  },
  {
    id: "warning",
    fg: "status/warning/text",
    on: "status/warning/background over surface/default",
    use: "Major badge",
    kind: "badge",
    sample: "Major",
    light: {
      ratio: "5.10",
      fg: "#a64f1d",
      bg: "warning/background",
      color: "#a64f1d",
      fill: "rgb(255 157 0 / 12%)",
    },
    dark: {
      ratio: "5.33",
      fg: "#d08a46",
      bg: "warning/background",
      color: "#d08a46",
      fill: "rgb(255 157 0 / 12%)",
    },
  },
];

const Svg = ({ children }: { children: ReactNode }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
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

const THEMES: { id: TTheme; label: string; icon: ReactNode }[] = [
  {
    id: "light",
    label: "Light",
    icon: (
      <Svg>
        <path d="M12.6667 8H14M11.3 11.3L12.24 12.24M8 12.6667V14M4.7 11.3L3.76 12.24M3.33333 8H2M4.7 4.7L3.76 3.76M8 3.33333V2M11.3 4.7L12.24 3.76M6 8C6 9.10667 6.89333 10 8 10C9.10667 10 10 9.10667 10 8C10 6.89333 9.10667 6 8 6C6.89333 6 6 6.89333 6 8Z" />
      </Svg>
    ),
  },
  {
    id: "dark",
    label: "Dark",
    icon: (
      <Svg>
        <path d="M14 8C14 11.3133 11.3133 14 8 14C4.68667 14 2 11.3133 2 8C2 4.68667 4.68667 2 8 2C6.75333 3.56 6.75333 5.77333 8 7.33333C8.2 7.58 8.42 7.8 8.66667 8C10.2267 9.24667 12.44 9.24667 14 8Z" />
      </Svg>
    ),
  },
  {
    id: "system",
    label: "System",
    icon: (
      <Svg>
        <path d="M6 13.3333H10M2.66667 4C2.66667 3.26667 3.26667 2.66667 4 2.66667H12C12.7333 2.66667 13.3333 3.26667 13.3333 4V10C13.3333 10.7333 12.7333 11.3333 12 11.3333H4C3.26667 11.3333 2.66667 10.7333 2.66667 10V4Z" />
      </Svg>
    ),
  },
];

const CheckIcon = () => (
  <Svg>
    <path d="M3.33 8.67L6 11.33L12.67 4.67" />
  </Svg>
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

export const ContrastChecker = ({ caption }: { caption?: ReactNode }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [pairId, setPairId] = useState(PAIRS[0].id);
  const [theme, setTheme] = useState<TTheme>("light");
  const systemDark = useSystemDark();
  const dark = theme === "dark" || (theme === "system" && systemDark);
  const [layout, setLayout] = useState({ wide: true, scale: 1, height: 0 });

  // Wide layout from 760 px of room, scaled to fit; stacked below that
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const measure = () => {
      const pad = parseFloat(getComputedStyle(root).paddingLeft) || 0;
      const room = root.clientWidth - pad * 2;
      const wide = room >= 760;
      const scale = wide ? Math.min(1, room / WIDE_W) : 1;
      const height = bodyRef.current?.offsetHeight ?? 0;
      setLayout((prev) =>
        prev.wide === wide && prev.scale === scale && prev.height === height
          ? prev
          : { wide, scale, height },
      );
    };
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    if (bodyRef.current) observer.observe(bodyRef.current);
    measure();
    return () => observer.disconnect();
  }, []);

  const pair = PAIRS.find((p) => p.id === pairId) ?? PAIRS[0];
  const side = dark ? pair.dark : pair.light;
  const surface = dark ? "#1b1b1a" : "#ffffff";
  const themeIndex = THEMES.findIndex((t) => t.id === theme);

  const sampleStyle = {
    "--c-color": side.color,
    "--c-fill": side.fill ?? "transparent",
  } as CSSProperties;

  return (
    <Reveal>
      <figure className={caseStyles.figure}>
        <div ref={rootRef} className={tp.root}>
          <div className={pg.head}>
            <span className={tp.title}>
              Contrast check in CI: every text and background pair, both themes
            </span>
            <span className={pg.themeRow}>
              <span
                className={pg.themeSwitch}
                role="radiogroup"
                aria-label="Preview theme"
              >
                <span
                  className={pg.themeIndicator}
                  style={{ transform: `translateX(${themeIndex * 28}px)` }}
                />
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    role="radio"
                    aria-checked={t.id === theme}
                    aria-label={t.label}
                    title={t.label}
                    className={cn(
                      pg.themeOption,
                      t.id === theme && pg.themeOn,
                    )}
                    onClick={() => setTheme(t.id)}
                  >
                    {t.icon}
                  </button>
                ))}
              </span>
            </span>
          </div>

          <div
            className={pg.bodyWrap}
            style={
              layout.wide && layout.height
                ? { height: layout.height * layout.scale }
                : undefined
            }
          >
            <div
              ref={bodyRef}
              className={cn(styles.body, layout.wide && styles.wide)}
              style={
                layout.wide
                  ? ({ transform: `scale(${layout.scale})` } as CSSProperties)
                  : undefined
              }
            >
              <div
                className={styles.list}
                role="radiogroup"
                aria-label="Color pair"
              >
                {PAIRS.map((p) => {
                  const on = p.id === pairId;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      className={cn(pg.token, on && pg.tokenOn)}
                      onClick={() => setPairId(p.id)}
                    >
                      <span className={cn(tp.glow, pg.glow)} />
                      <span className={styles.card}>
                        <span className={styles.cardText}>
                          <span className={styles.fg}>{p.fg}</span>
                          <span className={styles.use}>{p.use}</span>
                        </span>
                        <span className={styles.cardRatio}>
                          {(dark ? p.dark : p.light).ratio}:1
                        </span>
                      </span>
                      <span className={cn(tp.ring, pg.ring)} />
                    </button>
                  );
                })}
              </div>

              <div className={styles.preview}>
                <div
                  className={cn(styles.specimen, dark && styles.specimenDark)}
                  role="img"
                  aria-label={`${pair.fg} on ${pair.on}, ${dark ? "Dark" : "Light"} theme, ${side.ratio} to 1`}
                >
                  <span className={styles.specimenLabel}>
                    {dark ? "Dark" : "Light"} theme, surface/default {surface}
                  </span>
                  <span
                    className={cn(
                      styles.sample,
                      pair.kind === "field" && styles.sampleField,
                    )}
                    style={sampleStyle}
                    key={`${pair.id}-${dark}`}
                  >
                    {pair.kind === "field" ? (
                      <>
                        <span className={styles.field} />
                        <span className={styles.fieldCaption}>
                          {pair.sample}
                        </span>
                      </>
                    ) : (
                      <>
                        <span
                          className={cn(
                            styles.aa,
                            pair.kind !== "text" && styles.aaFilled,
                          )}
                        >
                          Aa
                        </span>
                        <span
                          className={cn(
                            pair.kind === "text" && styles.sampleCaps,
                            pair.kind === "button" && styles.sampleButton,
                            pair.kind === "badge" && styles.sampleBadge,
                          )}
                        >
                          {pair.sample}
                        </span>
                      </>
                    )}
                  </span>
                </div>

                <div className={styles.result} aria-live="polite">
                  <span className={styles.resultTop}>
                    <span className={styles.ratio}>{side.ratio}:1</span>
                    <span className={styles.verdict}>
                      <CheckIcon />
                      Pass, AA needs {pair.ui ? "3:1" : "4.5:1"}
                    </span>
                  </span>
                  <span className={styles.pairLine}>
                    {side.fg}&nbsp;&nbsp;on&nbsp;&nbsp;{side.bg}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {caption && (
          <figcaption className={caseStyles.caption}>{caption}</figcaption>
        )}
      </figure>
    </Reveal>
  );
};
