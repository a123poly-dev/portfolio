import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import cn from "classnames";
import { Reveal } from "./Reveal";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { IO, OUT, PlayPauseIcon, keyframes } from "./loopMotion";
import type { TStop } from "./loopMotion";
import caseStyles from "./Synthux.module.scss";
import tp from "./TokenPipeline.module.scss";
import styles from "./SyncLoop.module.scss";

// Figma "2.2b Sync loop, grid (motion)" (74:15001). One 7.2 s loop from the frame's
// keyframes: a green dot runs along the arrows, each step lifts with a ring and glow,
// and a done dot pops on each finished step. Six 320 x 160 steps in a 3 x 2 grid,
// scaled to fit; stacked on phones.
const GRID_W = 3 * 320 + 2 * 80;

const STEPS = [
  ["Diff Figma", "Snapshot the DS file and compare it with the last baseline."],
  ["Fix the spec", "Update the Figma spec so it says what the component does."],
  ["Brief", "One brief per change, with acceptance criteria."],
  ["Code", "A worker agent updates the component and its story."],
  ["Verify", "Re-check Figma structure against code, not only props."],
  ["Baseline", "Save the snapshot. The next round starts from it."],
];

// Times from the Figma timeline, as a fraction of the loop
const STEP_START = [0, 0.1667, 0.3333, 0.5, 0.6667, 0.8333];
const DONE_AT = [0.1528, 0.3194, 0.4861, 0.6528, 0.8194, 0.9583];
const ARROW_AT = [0.1111, 0.2778, 0.4444, 0.6111, 0.7778, 0.9444];

const lift = (t: number, i: number): TStop[] => {
  if (i === 0)
    return [
      [0, "translateY(-8px)", IO],
      [0.1458, "translateY(-8px)", OUT],
      [0.1944, "translateY(0)"],
      [1, "translateY(0)"],
    ];
  // The last step is still up when the loop restarts
  if (i === 5)
    return [
      [0, "translateY(0)", IO],
      [t, "translateY(0)", OUT],
      [t + 0.0486, "translateY(-8px)", IO],
      [0.9792, "translateY(-8px)", OUT],
      [1, "translateY(0)"],
    ];
  return [
    [0, "translateY(0)", IO],
    [t, "translateY(0)", OUT],
    [t + 0.0486, "translateY(-8px)", IO],
    [t + 0.1458, "translateY(-8px)", OUT],
    [t + 0.1944, "translateY(0)"],
    [1, "translateY(0)"],
  ];
};

const ring = (t: number, i: number, max: number): TStop[] => {
  if (i === 0)
    return [
      [0, `${max}`, IO],
      [0.1458, `${max}`, IO],
      [0.1875, "0"],
      [1, "0"],
    ];
  if (i === 5)
    return [
      [0, "0", IO],
      [t, "0", IO],
      [t + 0.0278, `${max}`, IO],
      [0.9792, `${max}`, IO],
      [1, "0"],
    ];
  return [
    [0, "0", IO],
    [t, "0", IO],
    [t + 0.0278, `${max}`, IO],
    [t + 0.1458, `${max}`, IO],
    [t + 0.1875, "0"],
    [1, "0"],
  ];
};

const doneFade = (t: number, i: number): TStop[] =>
  i === 5
    ? [
        [0, "0", IO],
        [t, "0", IO],
        [0.9861, "1", IO],
        [1, "1"],
      ]
    : [
        [0, "0", IO],
        [t, "0", IO],
        [t + 0.0278, "1", IO],
        [0.9583, "1", IO],
        [1, "0"],
      ];

const donePop = (t: number, i: number): TStop[] =>
  i === 5
    ? [
        [0, "scale(0.2)", IO],
        [t, "scale(0.2)", OUT],
        [0.9861, "scale(1.3)", IO],
        [1, "scale(1)"],
      ]
    : [
        [0, "scale(0.2)", IO],
        [t, "scale(0.2)", OUT],
        [t + 0.0347, "scale(1.3)", IO],
        [t + 0.0625, "scale(1)"],
        [1, "scale(1)"],
      ];

const arrow = (t: number, i: number): TStop[] =>
  i === 5
    ? [
        [0, "0", IO],
        [t, "0", IO],
        [t + 0.0139, "1", IO],
        [1, "1"],
      ]
    : [
        [0, "0", IO],
        [t, "0", IO],
        [t + 0.0139, "1", IO],
        [t + 0.0694, "1", IO],
        [t + 0.1111, "0"],
        [1, "0"],
      ];

// The dot runs along each arrow, then jumps unseen to the next one
const X: [number, number, string][] = [
  [0, 0, "linear"],
  [0.1111, 0, IO],
  [0.1667, 64, OUT],
  [0.2778, 400, IO],
  [0.3333, 464, OUT],
  [0.4444, 632, IO],
  [0.5, 632, OUT],
  [0.6111, 464, IO],
  [0.6667, 400, OUT],
  [0.7778, 64, IO],
  [0.8333, 0, OUT],
  [0.9444, -168, IO],
  [1, -168, IO],
];
const Y: [number, number, string][] = [
  [0, 0, "linear"],
  [0.3333, 0, OUT],
  [0.4444, 88, IO],
  [0.5, 192, OUT],
  [0.6111, 280, IO],
  [0.8333, 280, OUT],
  [0.9444, 192, IO],
  [1, 88, IO],
];
const DOT_ON = [
  [0.1111, 0.1806],
  [0.2778, 0.3472],
  [0.4444, 0.5139],
  [0.6111, 0.6806],
  [0.7778, 0.8472],
  [0.9444, 1],
];

const dotFade: TStop[] = [
  [0, "0", IO],
  ...DOT_ON.flatMap(([on, off]): TStop[] =>
    off === 1
      ? [
          [on - 0.0014, "0", IO],
          [on, "1", IO],
          [1, "1"],
        ]
      : [
          [on - 0.0014, "0", IO],
          [on, "1", IO],
          [off - 0.0139, "1", IO],
          [off, "0", IO],
        ],
  ),
];

const CSS = [
  ...STEP_START.flatMap((t, i) => [
    keyframes(`sl-lift-${i}`, "transform", lift(t, i)),
    keyframes(`sl-glow-${i}`, "opacity", ring(t, i, 0.3)),
    keyframes(`sl-ring-${i}`, "opacity", ring(t, i, 1)),
    keyframes(`sl-done-fade-${i}`, "opacity", doneFade(DONE_AT[i], i)),
    keyframes(`sl-done-pop-${i}`, "transform", donePop(DONE_AT[i], i)),
    keyframes(`sl-arrow-${i}`, "opacity", arrow(ARROW_AT[i], i)),
  ]),
  keyframes(
    "sl-dot-x",
    "transform",
    X.map(([at, x, ease]) => [at, `translateX(${x}px)`, ease]),
  ),
  keyframes(
    "sl-dot-y",
    "transform",
    Y.map(([at, y, ease]) => [at, `translateY(${y}px)`, ease]),
  ),
  keyframes("sl-dot-fade", "opacity", dotFade),
].join("\n");

const run = (...names: string[]): CSSProperties => ({
  animationName: names.join(", "),
});

// An arrow pointing right: 64 px between columns, 104 px between rows.
// CSS turns it for the other directions.
const Arrow = ({ index, grid }: { index: number; grid: boolean }) => {
  const len = grid && (index === 2 || index === 5) ? 104 : 64;
  const head = `M${len - 7} 2.5L${len - 1.5} 8L${len - 7} 13.5`;
  return (
    <span className={cn(styles.arrow, styles[`arrow${index}`])}>
      <svg
        viewBox={`0 0 ${len} 16`}
        width={len}
        height="16"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <g className={tp.arrowBase}>
          <path d={`M1 8H${len - 3}`} strokeDasharray="3 4" />
          <path d={head} />
        </g>
        <g
          className={cn(tp.arrowActive, tp.anim, styles.anim)}
          style={run(`sl-arrow-${index}`)}
        >
          <path d={`M1 8H${len - 2}`} />
          <path d={head} />
        </g>
      </svg>
    </span>
  );
};

export const SyncLoop = ({ caption }: { caption?: ReactNode }) => {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState({ grid: true, scale: 1, height: 0 });
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(reduced);

  useEffect(() => setPaused(reduced), [reduced]);

  // The 3 x 2 grid from 640 px of room, scaled to fit; one column below that
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const measure = () => {
      const pad = parseFloat(getComputedStyle(root).paddingLeft) || 0;
      const room = root.clientWidth - pad * 2;
      const grid = room >= 640;
      const scale = grid ? Math.min(1, room / GRID_W) : 1;
      const height = flowRef.current?.offsetHeight ?? 0;
      setLayout((prev) =>
        prev.grid === grid && prev.scale === scale && prev.height === height
          ? prev
          : { grid, scale, height },
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
      <figure data-demo="sync_loop" className={caseStyles.figure}>
        <style>{CSS}</style>
        <div
          ref={rootRef}
          className={cn(
            tp.root,
            playing && tp.playing,
            reduced && paused && styles.atRest,
          )}
          role="img"
          aria-label="The sync loop in six steps: diff Figma, fix the spec, brief, code, verify, and save a baseline. The next round starts from that baseline. A dot runs from step to step, and each finished step gets a green done mark. It loops every 7 seconds."
        >
          <div className={tp.head} aria-hidden="true">
            <span className={tp.title}>
              The sync loop: one round, every time
            </span>
          </div>

          <div
            className={styles.flowWrap}
            style={
              layout.grid && layout.height
                ? { height: layout.height * layout.scale }
                : undefined
            }
          >
            <div
              ref={flowRef}
              className={cn(styles.flow, layout.grid && styles.grid)}
              style={
                layout.grid
                  ? { transform: `scale(${layout.scale})` }
                  : undefined
              }
              aria-hidden="true"
            >
              {STEPS.map(([title, text], i) => (
                <div
                  key={title}
                  className={cn(styles.cell, styles[`cell${i}`])}
                >
                  {i > 0 && <Arrow index={i - 1} grid={layout.grid} />}
                  {i === 5 && <Arrow index={5} grid={layout.grid} />}
                  <div
                    className={cn(styles.step, tp.anim, styles.anim)}
                    style={run(`sl-lift-${i}`)}
                  >
                    <span
                      className={cn(tp.glow, tp.anim, styles.anim)}
                      style={run(`sl-glow-${i}`)}
                    />
                    <div className={styles.card}>
                      <span className={tp.step}>0{i + 1}</span>
                      <span className={tp.cardTitle}>{title}</span>
                      <span className={styles.text}>{text}</span>
                      <span
                        className={cn(styles.done, tp.anim, styles.anim)}
                        style={run(`sl-done-fade-${i}`, `sl-done-pop-${i}`)}
                      />
                    </div>
                    <span
                      className={cn(tp.ring, tp.anim, styles.anim)}
                      style={run(`sl-ring-${i}`)}
                    />
                  </div>
                </div>
              ))}

              <span
                className={cn(styles.dotY, tp.anim, styles.anim)}
                style={run("sl-dot-y")}
              >
                <span
                  className={cn(styles.dot, tp.anim, styles.anim)}
                  style={run("sl-dot-x", "sl-dot-fade")}
                />
              </span>
            </div>
          </div>

          <button
            type="button"
            className={tp.control}
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
