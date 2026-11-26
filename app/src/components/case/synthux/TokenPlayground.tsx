import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import cn from "classnames";
import { Reveal } from "./Reveal";
import caseStyles from "./Synthux.module.scss";
import tp from "./TokenPipeline.module.scss";
import styles from "./TokenPlayground.module.scss";

// Figma "2.4 Token playground (variants)" (87:17102): 4 tokens x Light/Dark.
// Pick a token to see which parts of the preview use it; switch the preview theme
// to see its other value. Wide: the 1328 px Figma layout, scaled to fit.
const WIDE_W = 400 + 32 + 896;

type TTokenId = "action" | "error" | "border" | "secondary";
type TTheme = "light" | "dark" | "system";

const TOKENS: {
  id: TTokenId;
  name: string;
  light: string;
  dark: string;
}[] = [
  {
    id: "action",
    name: "action/primary/background",
    light: "#0d0d0c",
    dark: "#e5e6e3",
  },
  {
    id: "error",
    name: "status/error/text",
    light: "#c62437",
    dark: "#ff676a",
  },
  {
    id: "border",
    name: "border/default",
    light: "#e0e2db",
    dark: "#30322f",
  },
  {
    id: "secondary",
    name: "text/secondary",
    light: "#6a6b66",
    dark: "#93948f",
  },
];

const ROWS = [
  {
    segment: "Mobile newcomers",
    people: 5,
    done: 2,
    of: 5,
    sus: 58,
    issue: "Size guide is hard to find",
  },
  {
    segment: "Returning desktop shoppers",
    people: 3,
    done: 3,
    of: 3,
    sus: 80,
    issue: "Promo code field clears the address",
  },
  {
    segment: "Low-vision shoppers",
    people: 2,
    done: 2,
    of: 2,
    sus: 74,
    issue: "“Add to cart” confirmation is easy to miss",
  },
];

const Svg = ({
  children,
  size = 16,
}: {
  children: ReactNode;
  size?: number;
}) => (
  <svg
    width={size}
    height={size}
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

const ShareIcon = () => (
  <Svg>
    <path d="M8 2V10M5.33 4.67L8 2L10.67 4.67M2.67 8.67V12C2.67 12.74 3.26 13.33 4 13.33H12C12.74 13.33 13.33 12.74 13.33 12V8.67" />
  </Svg>
);

const CircleClose = () => (
  <Svg>
    <path d="M6 6L10 10M10 6L6 10M2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8Z" />
  </Svg>
);

const UsersIcon = () => (
  <Svg>
    <path d="M10.67 14V12.67C10.67 11.19 9.47 10 8 10H4C2.53 10 1.33 11.19 1.33 12.67V14M6 7.33C7.47 7.33 8.67 6.14 8.67 4.67C8.67 3.19 7.47 2 6 2C4.53 2 3.33 3.19 3.33 4.67C3.33 6.14 4.53 7.33 6 7.33ZM14.67 14V12.67C14.67 11.45 13.84 10.39 12.67 10.09M10.67 2.09C11.84 2.39 12.67 3.45 12.67 4.67C12.67 5.88 11.84 6.94 10.67 7.25" />
  </Svg>
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

// A green tag naming the token, next to the part that uses it
const Tag = ({ on, children }: { on: boolean; children: ReactNode }) => (
  <span className={cn(styles.tag, on && styles.tagOn)}>{children}</span>
);

export const TokenPlayground = ({ caption }: { caption?: ReactNode }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [token, setToken] = useState<TTokenId>("action");
  const [theme, setTheme] = useState<TTheme>("light");
  const systemDark = useSystemDark();
  const dark = theme === "dark" || (theme === "system" && systemDark);
  const [layout, setLayout] = useState({ wide: true, scale: 1, height: 0 });
  const previewRef = useRef<HTMLDivElement>(null);
  // Phones: a fade on the right edge while more of the table is off screen
  const [moreRight, setMoreRight] = useState(false);
  const checkMoreRight = () => {
    const el = previewRef.current;
    setMoreRight(!!el && el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };
  useEffect(checkMoreRight, [layout.wide, layout.height]);

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

  const themeIndex = THEMES.findIndex((t) => t.id === theme);

  return (
    <Reveal>
      <figure className={caseStyles.figure}>
        <div ref={rootRef} className={tp.root}>
          <div className={styles.head}>
            <span className={tp.title}>
              Semantic tokens: change one value, every component follows
            </span>
            <span className={styles.themeRow}>
              <span
                className={styles.themeSwitch}
                role="radiogroup"
                aria-label="Preview theme"
              >
                <span
                  className={styles.themeIndicator}
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
                      styles.themeOption,
                      t.id === theme && styles.themeOn,
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
            className={styles.bodyWrap}
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
              <div className={styles.tokens}>
                <div
                  className={styles.tokenList}
                  role="radiogroup"
                  aria-label="Semantic token"
                >
                  {TOKENS.map((t) => {
                    const on = t.id === token;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        role="radio"
                        aria-checked={on}
                        className={cn(styles.token, on && styles.tokenOn)}
                        onClick={() => setToken(t.id)}
                      >
                        <span className={cn(tp.glow, styles.glow)} />
                        <span className={styles.tokenCard}>
                          <span className={styles.tokenName}>{t.name}</span>
                          <span className={styles.values}>
                            {(["light", "dark"] as const).map((mode) => (
                              <span
                                key={mode}
                                className={cn(
                                  styles.value,
                                  (mode === "dark") === dark && styles.valueOn,
                                )}
                              >
                                <span
                                  className={styles.swatch}
                                  style={{ background: t[mode] }}
                                />
                                <span className={styles.valueLabel}>
                                  {mode === "light" ? "Light" : "Dark"}
                                </span>
                                <span className={styles.hex}>{t[mode]}</span>
                              </span>
                            ))}
                          </span>
                        </span>
                        <span className={cn(tp.ring, styles.ring)} />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div
                className={cn(
                  styles.previewFrame,
                  dark && styles.previewFrameDark,
                  !layout.wide && moreRight && styles.moreRight,
                )}
              >
                <div
                  ref={previewRef}
                  onScroll={checkMoreRight}
                  className={cn(styles.preview, dark && styles.previewDark)}
                  aria-label={`Preview in ${dark ? "Dark" : "Light"}, with the parts that use ${TOKENS.find((t) => t.id === token)?.name} outlined`}
                  role="img"
                >
                  <div className={styles.actions}>
                    <span
                      className={cn(
                        styles.button,
                        styles.mark,
                        token === "action" && styles.marked,
                      )}
                    >
                      <ShareIcon />
                      Share
                    </span>
                    <span
                      className={cn(
                        styles.badge,
                        styles.mark,
                        token === "error" && styles.marked,
                      )}
                    >
                      <CircleClose />
                      Critical
                    </span>
                    <Tag on={token === "action"}>action/primary/background</Tag>
                    <Tag on={token === "error"}>status/error/text</Tag>
                  </div>

                  <div className={styles.tableTags}>
                    <Tag on={token === "border"}>border/default</Tag>
                    <Tag on={token === "secondary"}>text/secondary</Tag>
                  </div>
                  <div
                    className={cn(
                      styles.table,
                      styles.mark,
                      token === "border" && styles.marked,
                    )}
                  >
                    <div
                      className={cn(
                        styles.tableHead,
                        styles.mark,
                        token === "secondary" && styles.marked,
                      )}
                    >
                      <span>Segment</span>
                      <span />
                      <span>Task success</span>
                      <span>SUS average</span>
                      <span>Top issue</span>
                    </div>
                    {ROWS.map((row) => (
                      <div key={row.segment} className={styles.tableRow}>
                        <span className={styles.segment}>{row.segment}</span>
                        <span className={styles.people}>
                          <UsersIcon />
                          {row.people}
                        </span>
                        <span className={styles.success}>
                          {row.done} of {row.of}
                          <span className={styles.bar}>
                            <span
                              className={styles.barFill}
                              style={{ width: `${(row.done / row.of) * 100}%` }}
                            />
                          </span>
                        </span>
                        <span className={styles.sus}>{row.sus}</span>
                        <span>{row.issue}</span>
                      </div>
                    ))}
                  </div>
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
