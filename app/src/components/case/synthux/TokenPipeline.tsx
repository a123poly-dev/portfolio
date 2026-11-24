import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import cn from "classnames";
import { Reveal } from "./Reveal";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import caseStyles from "./Synthux.module.scss";
import styles from "./TokenPipeline.module.scss";

// Figma "2.3 Token pipeline (motion)" (79:15001), rebuilt as a fluid layout.
// One 8 s loop from the frame's keyframes: the token chip moves from stage to stage,
// each stage lifts with a green ring and glow, and its code lines light up.
// Four 296 px stages with 48 px gaps, as in the Figma frame
const ROW_W = 4 * 296 + 3 * 48;
const OUT = "cubic-bezier(0.215, 0.61, 0.355, 1)";
const IO = "ease-in-out";

type TStop = [at: number, value: string, ease?: string];

const keyframes = (name: string, prop: string, stops: TStop[]) =>
  `@keyframes ${name}{${stops
    .map(
      ([at, value, ease]) =>
        `${(at * 100).toFixed(2)}%{${prop}:${value};${ease ? `animation-timing-function:${ease};` : ""}}`,
    )
    .join("")}}`;

// Times from the Figma timeline, as a fraction of the loop
const STAGE_START = [0, 0.2, 0.4, 0.6];
const HIGHLIGHTS = [
  [0.0375, 0.0688],
  [0.2375, 0.2688, 0.3],
  [0.4375, 0.4688, 0.5, 0.5313],
  [0.6375],
];

const lift = (t: number): TStop[] =>
  t === 0
    ? [
        [0, "translateY(-8px)", IO],
        [0.1813, "translateY(-8px)", OUT],
        [0.225, "translateY(0)"],
        [1, "translateY(0)"],
      ]
    : [
        [0, "translateY(0)", IO],
        [t, "translateY(0)", OUT],
        [t + 0.0438, "translateY(-8px)", IO],
        [t + 0.1813, "translateY(-8px)", OUT],
        [t + 0.225, "translateY(0)"],
        [1, "translateY(0)"],
      ];

const glow = (t: number, max: number): TStop[] =>
  t === 0
    ? [
        [0, `${max}`, IO],
        [0.1813, `${max}`, IO],
        [0.2188, "0"],
        [1, "0"],
      ]
    : [
        [0, "0", IO],
        [t, "0", IO],
        [t + 0.025, `${max}`, IO],
        [t + 0.1813, `${max}`, IO],
        [t + 0.2188, "0"],
        [1, "0"],
      ];

const highlight = (t: number): TStop[] => [
  [0, "0", IO],
  [t, "0", IO],
  [t + 0.025, "1", IO],
  [0.95, "1", IO],
  [0.9875, "0"],
  [1, "0"],
];

const connector = (t: number): TStop[] => [
  [0, "0", IO],
  [t, "0", IO],
  [t + 0.0125, "1", IO],
  [t + 0.0625, "1", IO],
  [t + 0.1, "0"],
  [1, "0"],
];

const pop = (t: number): TStop[] => [
  [0, "scale(1)", IO],
  [t, "scale(1)", OUT],
  [t + 0.025, "scale(1.05)", IO],
  [t + 0.0625, "scale(1)"],
  [1, "scale(1)"],
];

// The chip travels to each stage; its offsets come from the measured layout
const chipMove: TStop[] = [
  [0, "translate(0,0)", OUT],
  [0.15, "translate(0,0)", OUT],
  [0.2063, "translate(var(--x1),var(--y1))", IO],
  [0.35, "translate(var(--x1),var(--y1))", OUT],
  [0.4063, "translate(var(--x2),var(--y2))", IO],
  [0.55, "translate(var(--x2),var(--y2))", OUT],
  [0.6063, "translate(var(--x3),var(--y3))", IO],
  [0.9512, "translate(var(--x3),var(--y3))", "linear"],
  [0.9513, "translate(0,0)"],
  [1, "translate(0,0)"],
];
const chipFade: TStop[] = [
  [0, "0", IO],
  [0.0188, "1", IO],
  [0.9375, "1", IO],
  [0.95, "0"],
  [1, "0"],
];

const CSS = [
  ...STAGE_START.flatMap((t, i) => [
    keyframes(`tp-lift-${i}`, "transform", lift(t)),
    keyframes(`tp-glow-${i}`, "opacity", glow(t, 0.3)),
    keyframes(`tp-ring-${i}`, "opacity", glow(t, 1)),
  ]),
  ...HIGHLIGHTS.flat().map((t) =>
    keyframes(`tp-hl-${Math.round(t * 10000)}`, "opacity", highlight(t)),
  ),
  ...[0.15, 0.35, 0.55].map((t, i) =>
    keyframes(`tp-conn-${i}`, "opacity", connector(t)),
  ),
  keyframes("tp-pop-light", "transform", pop(0.675)),
  keyframes("tp-pop-dark", "transform", pop(0.7125)),
  keyframes("tp-chip-move", "transform", chipMove),
  keyframes("tp-chip-fade", "opacity", chipFade),
].join("\n");

const run = (...names: string[]): CSSProperties => ({
  animationName: names.join(", "),
});

type TLine = { text: string; muted?: boolean; hl?: number; tall?: boolean };

const STAGES: {
  title: string;
  file: string;
  lines: TLine[];
  themes?: boolean;
}[] = [
  {
    title: "Tokens",
    file: "tokens/semantic.*.tokens.json",
    lines: [
      { text: "// light", muted: true },
      { text: '"background": {' },
      { text: '  "$value": "{color.neutral.950}"', hl: 0.0375 },
      { text: "}" },
      { text: "// dark", muted: true },
      { text: '  "$value": "{color.neutral.50}"', hl: 0.0688 },
    ],
  },
  {
    title: "Style Dictionary v5",
    file: "scripts/build-tokens.mjs",
    lines: [
      { text: 'format: "css/variables"' },
      { text: "outputReferences: true", hl: 0.2375 },
      { text: 'selector: ":root"', hl: 0.2688 },
      { text: "// dark theme:", muted: true },
      { text: '[data-theme="dark"]', hl: 0.3 },
      { text: "prefers-color-scheme: dark" },
    ],
  },
  {
    title: "CSS variables",
    file: "dist/css/tokens.css",
    lines: [
      { text: ":root {" },
      { text: "  --action-primary-background:", hl: 0.4375 },
      { text: "    var(--color-neutral-950);", hl: 0.4688 },
      { text: "}" },
      { text: '[data-theme="dark"] {' },
      { text: "  --action-primary-background:", hl: 0.5 },
      { text: "    var(--color-neutral-50);", hl: 0.5313 },
      { text: "}" },
    ],
  },
  {
    title: "Component",
    file: "Button.css",
    lines: [
      {
        text: "--_bg:\n  var(--action-primary-background);",
        hl: 0.6375,
        tall: true,
      },
    ],
    themes: true,
  },
];

const Line = ({ text, muted, hl, tall }: TLine) => (
  <span className={cn(styles.line, tall && styles.lineTall)}>
    {hl !== undefined && (
      <span
        className={cn(styles.highlight, styles.anim)}
        style={run(`tp-hl-${Math.round(hl * 10000)}`)}
      />
    )}
    <span className={cn(styles.lineText, muted && styles.muted)}>{text}</span>
  </span>
);

const Arrow = ({ index }: { index: number }) => (
  <span className={cn(styles.connector, styles[`connector${index}`])}>
    <svg viewBox="0 0 36 16" width="36" height="16" aria-hidden="true">
      <path
        className={styles.arrowBase}
        d="M1 8H33M28 3L33 8L28 13"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="4 4"
      />
      <path
        className={cn(styles.arrowActive, styles.anim)}
        style={run(`tp-conn-${index}`)}
        d="M1 8H33M28 3L33 8L28 13"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

const PlayPauseIcon = ({ paused }: { paused: boolean }) => (
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
    {paused ? (
      <polygon points="6 3 20 12 6 21 6 3" />
    ) : (
      <>
        <rect x="14" y="4" width="4" height="16" rx="1" />
        <rect x="6" y="4" width="4" height="16" rx="1" />
      </>
    )}
  </svg>
);

export const TokenPipeline = ({ caption }: { caption?: ReactNode }) => {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const flowRef = useRef<HTMLDivElement>(null);
  const [offsets, setOffsets] = useState<CSSProperties>({});
  // One row, scaled to fit, from 640 px of room; stacked below that
  const [layout, setLayout] = useState({ row: true, scale: 1, height: 0 });
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(reduced);

  useEffect(() => setPaused(reduced), [reduced]);

  // The chip's stops: each stage cell's top-left, relative to the first one
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const measure = () => {
      const [first, ...rest] = stageRefs.current;
      if (!first) return;
      const vars: Record<string, string> = {
        "--x0": `${first.offsetLeft}px`,
        "--y0": `${first.offsetTop}px`,
        "--w": `${first.offsetWidth}px`,
      };
      rest.forEach((el, i) => {
        if (!el) return;
        vars[`--x${i + 1}`] = `${el.offsetLeft - first.offsetLeft}px`;
        vars[`--y${i + 1}`] = `${el.offsetTop - first.offsetTop}px`;
      });
      setOffsets(vars as CSSProperties);

      const pad = parseFloat(getComputedStyle(root).paddingLeft) || 0;
      const room = root.clientWidth - pad * 2;
      const row = room >= 640;
      const flowH = flowRef.current?.offsetHeight ?? 0;
      const scale = row ? Math.min(1, room / ROW_W) : 1;
      setLayout((prev) =>
        prev.row === row && prev.scale === scale && prev.height === flowH
          ? prev
          : { row, scale, height: flowH },
      );
    };
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    if (flowRef.current) observer.observe(flowRef.current);
    measure();
    return () => observer.disconnect();
  }, []);

  // Play only while on screen
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const playing = visible && !paused;

  return (
    <Reveal>
      <figure className={caseStyles.figure}>
        <style>{CSS}</style>
        <div
          ref={rootRef}
          className={cn(
            styles.root,
            playing && styles.playing,
            reduced && paused && styles.atRest,
          )}
          style={offsets}
          role="img"
          aria-label="Token pipeline in four stages. The token action/primary/background moves from the tokens JSON file, through the Style Dictionary v5 build and the CSS variables, to the Button, which shows it in Light and Dark. It loops every 8 seconds."
        >
          <div className={styles.head} aria-hidden="true">
            <span className={styles.title}>
              Tokens as code: one value, from JSON to the component
            </span>
            <span className={styles.chips}>
              <span className={styles.chip}>W3C DTCG JSON</span>
              <span className={styles.chip}>Style Dictionary v5</span>
              <span className={styles.chip}>Contrast check in CI</span>
            </span>
          </div>

          <div
            className={styles.flowWrap}
            style={
              layout.row && layout.height
                ? { height: layout.height * layout.scale }
                : undefined
            }
          >
            <div
              ref={flowRef}
              className={cn(styles.flow, layout.row && styles.row)}
              style={
                layout.row ? { transform: `scale(${layout.scale})` } : undefined
              }
              aria-hidden="true"
            >
              <span
                className={cn(styles.tokenTrack, styles.anim)}
                style={run("tp-chip-move", "tp-chip-fade")}
              >
                <span className={styles.token}>action/primary/background</span>
              </span>
              {STAGES.map((stage, i) => (
                <div
                  key={stage.title}
                  ref={(el) => {
                    stageRefs.current[i] = el;
                  }}
                  className={styles.cell}
                >
                  {i > 0 && <Arrow index={i - 1} />}
                  <div
                    className={cn(styles.stage, styles.anim)}
                    style={run(`tp-lift-${i}`)}
                  >
                    <span
                      className={cn(styles.glow, styles.anim)}
                      style={run(`tp-glow-${i}`)}
                    />
                    <div className={styles.card}>
                      <span className={styles.step}>0{i + 1}</span>
                      <span className={styles.cardTitle}>{stage.title}</span>
                      <span className={styles.file}>{stage.file}</span>
                      <span className={styles.code}>
                        {stage.lines.map((line, k) => (
                          <Line key={k} {...line} />
                        ))}
                      </span>
                      {stage.themes && (
                        <span className={styles.themes}>
                          <span
                            className={cn(
                              styles.theme,
                              styles.light,
                              styles.anim,
                            )}
                            style={run("tp-pop-light")}
                          >
                            Light
                            <span className={styles.button}>Run study</span>
                          </span>
                          <span
                            className={cn(
                              styles.theme,
                              styles.dark,
                              styles.anim,
                            )}
                            style={run("tp-pop-dark")}
                          >
                            Dark
                            <span className={styles.button}>Run study</span>
                          </span>
                        </span>
                      )}
                    </div>
                    <span
                      className={cn(styles.ring, styles.anim)}
                      style={run(`tp-ring-${i}`)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            className={styles.control}
            aria-label={paused ? "Play animation" : "Pause animation"}
            title={paused ? "Play animation" : "Pause animation"}
            onClick={() => setPaused((p) => !p)}
          >
            <PlayPauseIcon paused={paused} />
          </button>
        </div>
        {caption && (
          <figcaption className={caseStyles.caption}>{caption}</figcaption>
        )}
      </figure>
    </Reveal>
  );
};
