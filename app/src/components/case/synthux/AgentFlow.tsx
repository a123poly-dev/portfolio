import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import cn from "classnames";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { PlayPauseIcon, keyframes } from "./loopMotion";
import type { TStop } from "./loopMotion";
import styles from "./AgentFlow.module.scss";

// Figma "3.1 How the work flows (motion)", cover slot 109:12640 (1312 x 640).
// One 9.5 s loop from the frame's keyframes: a green signal runs from me to the
// planning model and down to a worker, tags show the plan, brief and review, and
// the signal comes back up for my approval and the three gates.
// Wide: the Figma layout, scaled to fit. Narrow (under 640 px): a portrait layout
// with the same timeline.

const LOOP_S = 9.5;
// Paused or reduced motion: rest on the frame where the gates are lit
const REST_AT = 0.86;

const O = "cubic-bezier(0, 0, 0.58, 1)";
const IO = "cubic-bezier(0.5, 0, 0.5, 1)";
const L = "linear";

const track = (times: number[], values: (number | string)[], eases: string[]): TStop[] =>
  times.map((at, i) => [at, String(values[i]), eases[i]]);

// A layer that fades in, holds and fades out once per loop
const pulse = (t: number[], max = 1): TStop[] =>
  track(t, [0, 0, max, max, 0, 0], [L, O, IO, O, L]);

const ME_T = [0, 0.0316, 0.0632, 0.1053, 0.6632, 0.6947, 0.8842, 0.9263, 1];
const ME_E = [O, IO, O, IO, O, IO, O, L];
const PM_T = [0, 0.0842, 0.1158, 0.2105, 0.2526, 0.5474, 0.5789, 0.6, 0.6421, 1];
const PM_E = [L, O, IO, O, IO, O, IO, O, L];
const DS_T = [0, 0.3053, 0.3368, 0.4526, 0.4947, 1];

const GATE_T = [
  [0, 0.7368, 0.7684, 0.8842, 0.9263, 1],
  [0, 0.7632, 0.7947, 0.8842, 0.9263, 1],
  [0, 0.7895, 0.8211, 0.8842, 0.9263, 1],
];

const TAG_T = {
  plan: [0, 0.1158, 0.1474, 0.2526, 0.2842, 1],
  brief: [0, 0.2, 0.2316, 0.3158, 0.3474, 1],
  review: [0, 0.4947, 0.5263, 0.5895, 0.6211, 1],
  approve: [0, 0.6947, 0.7263, 0.8842, 0.9158, 1],
};

const SIG_O_T = [
  0, 0.0211, 0.0316, 0.0947, 0.1053, 0.1789, 0.1895, 0.3158, 0.3263, 0.4526,
  0.4632, 0.5684, 0.5789, 0.5895, 0.6, 0.6737, 0.6842, 1,
];
const SIG_O = [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0];
const SIG_O_E = [L, L, IO, L, IO, L, IO, L, IO, L, IO, L, IO, L, IO, L, L];

const SIG_X_T = [0, 0.2211, 0.2737, 0.4947, 0.5368, 1];
const SIG_X_E = [L, O, IO, O, L];
const SIG_Y_T = [
  0, 0.0316, 0.0947, 0.1895, 0.2211, 0.2737, 0.3105, 0.4632, 0.4947, 0.5368,
  0.5684, 0.6, 0.6737, 1,
];
const SIG_Y_E = [L, O, IO, O, IO, O, IO, O, IO, O, IO, O, L];

// Signal stops: me → planning model top → its bottom → bus → worker top
const sigY = (a: number, b: number, c: number, d: number) => [0, 0, a, b, c, c, d, d, c, c, b, a, 0, 0];
const sigX = (dx: number) => [0, 0, dx, dx, 0, 0];

type TBox = [x: number, y: number, w: number, h: number];

type TLayout = {
  w: number;
  h: number;
  me: TBox;
  pm: TBox;
  workers: TBox[];
  lines: TBox[];
  workersLabel?: [x: number, y: number];
  gatesLabel: [x: number, y: number];
  gates: TBox[];
  tags: Record<keyof typeof TAG_T, [x: number, y: number]>;
  signal: [x: number, y: number];
  sigX: number;
  sigY: [number, number, number, number];
};

const WIDE: TLayout = {
  w: 1312,
  h: 640,
  me: [486, 50, 340, 92],
  pm: [446, 206, 420, 96],
  workers: [
    [100, 400, 260, 96],
    [384, 400, 260, 96],
    [668, 400, 260, 96],
    [952, 400, 260, 96],
  ],
  lines: [
    [655, 142, 2, 64],
    [655, 302, 2, 52],
    [230, 354, 852, 2],
    [229, 354, 2, 46],
    [513, 354, 2, 46],
    [797, 354, 2, 46],
    [1081, 354, 2, 46],
  ],
  workersLabel: [100, 376],
  gatesLabel: [394, 560],
  gates: [
    [522, 550, 132, 38],
    [666, 550, 162, 38],
    [840, 550, 108, 38],
  ],
  tags: {
    plan: [882, 222],
    brief: [668, 318],
    review: [882, 254],
    approve: [842, 82],
  },
  signal: [650, 136],
  sigX: -142,
  sigY: [64, 160, 212, 258],
};

const NARROW: TLayout = {
  w: 360,
  h: 652,
  me: [16, 24, 328, 80],
  pm: [16, 144, 328, 96],
  workers: [
    [16, 288, 160, 104],
    [184, 288, 160, 104],
    [16, 400, 160, 104],
    [184, 400, 160, 104],
  ],
  lines: [
    [179, 104, 2, 40],
    [179, 240, 2, 24],
    [96, 264, 170, 2],
    [95, 264, 2, 24],
    [263, 264, 2, 24],
  ],
  gatesLabel: [16, 528],
  gates: [
    [16, 552, 132, 38],
    [156, 552, 162, 38],
    [16, 598, 108, 38],
  ],
  tags: {
    plan: [138, 131],
    brief: [16, 251],
    review: [274, 156],
    approve: [267, 34],
  },
  signal: [174, 98],
  sigX: 84,
  sigY: [40, 136, 160, 184],
};

const PEOPLE = {
  me: ["Me, lead designer", "Briefs, design decisions, every approval"],
  pm: [
    "Planning model",
    "Plan file, briefs, review. Builds all Figma and motion (v0.4)",
  ],
  workers: [
    ["researcher", "Sourced facts for one research doc section"],
    ["ds-engineer", "DS component code, one component per review"],
    ["frontend-dev", "One Astro page or section from DS components"],
    ["metrics-engineer", "Tracking module and DuckDB metrics"],
  ],
};

const GATES = ["Push to main", "Publish packages", "Go public"];
const TAGS: Record<keyof typeof TAG_T, string> = {
  plan: "Plan file: DS sync round 7",
  brief: "brief + acceptance criteria",
  review: "review",
  approve: "approve",
};

const CSS = [
  keyframes("af-me-glow", "opacity", track(ME_T, [0, 0.3, 0.3, 0, 0, 0.3, 0.3, 0, 0], ME_E)),
  keyframes("af-me-ring", "opacity", track(ME_T, [0, 1, 1, 0, 0, 1, 1, 0, 0], ME_E)),
  keyframes("af-pm-glow", "opacity", track(PM_T, [0, 0, 0.3, 0.3, 0, 0, 0.3, 0.3, 0, 0], PM_E)),
  keyframes("af-pm-ring", "opacity", track(PM_T, [0, 0, 1, 1, 0, 0, 1, 1, 0, 0], PM_E)),
  keyframes("af-ds-glow", "opacity", pulse(DS_T, 0.3)),
  keyframes("af-ds-ring", "opacity", pulse(DS_T)),
  ...GATE_T.map((t, i) => keyframes(`af-gate-${i}`, "opacity", pulse(t))),
  ...Object.entries(TAG_T).map(([name, t]) => keyframes(`af-tag-${name}`, "opacity", pulse(t))),
  keyframes("af-sig-o", "opacity", track(SIG_O_T, SIG_O, SIG_O_E)),
  ...[
    ["wide", WIDE],
    ["narrow", NARROW],
  ].flatMap(([name, layout]) => {
    const l = layout as TLayout;
    return [
      keyframes(
        `af-sig-x-${name}`,
        "transform",
        track(SIG_X_T, sigX(l.sigX).map((v) => `translateX(${v}px)`), SIG_X_E),
      ),
      keyframes(
        `af-sig-y-${name}`,
        "transform",
        track(SIG_Y_T, sigY(...l.sigY).map((v) => `translateY(${v}px)`), SIG_Y_E),
      ),
    ];
  }),
].join("\n");

const run = (...names: string[]): CSSProperties => ({ animationName: names.join(", ") });

const at = ([x, y, w, h]: TBox): CSSProperties => ({ left: x, top: y, width: w, height: h });
const pos = ([x, y]: [number, number]): CSSProperties => ({ left: x, top: y });

const Card = ({
  box,
  title,
  text,
  anim,
}: {
  box: TBox;
  title: string;
  text: string;
  anim?: string;
}) => (
  <div className={styles.cardWrap} style={at(box)}>
    {anim && <span className={cn(styles.glow, styles.anim)} style={run(`af-${anim}-glow`)} />}
    <div className={styles.card}>
      <span className={styles.cardTitle}>{title}</span>
      <span className={styles.cardText}>{text}</span>
    </div>
    {anim && <span className={cn(styles.ring, styles.anim)} style={run(`af-${anim}-ring`)} />}
  </div>
);

export const AgentFlow = () => {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(reduced);

  useEffect(() => setPaused(reduced), [reduced]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const measure = () => setWidth(el.clientWidth);
    const resize = new ResizeObserver(measure);
    resize.observe(el);
    measure();
    const view = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.2,
    });
    view.observe(el);
    return () => {
      resize.disconnect();
      view.disconnect();
    };
  }, []);

  const narrow = width > 0 && width < 640;
  const layout = narrow ? NARROW : WIDE;
  const scale = width ? width / layout.w : 1;
  const playing = visible && !paused;
  const name = narrow ? "narrow" : "wide";

  return (
    <div
      ref={rootRef}
      className={cn(styles.root, playing && styles.playing, paused && styles.atRest)}
      style={
        {
          height: width ? layout.h * scale : undefined,
          aspectRatio: width ? undefined : `${WIDE.w} / ${WIDE.h}`,
          "--af-loop": `${LOOP_S}s`,
          "--af-rest": `${-REST_AT * LOOP_S}s`,
        } as CSSProperties
      }
      role="img"
      aria-label="How the work flows. I brief and approve. A planning model writes the plan file, briefs a worker agent and reviews its work. Four worker agents: researcher, ds-engineer, frontend-dev and metrics-engineer. Pushing to main, publishing packages and going public each wait for my approval."
    >
      <style>{CSS}</style>
      {/* Remount on pause/play so the rest frame and the loop start cleanly */}
      <div
        key={paused ? "rest" : "run"}
        className={styles.stage}
        style={{ width: layout.w, height: layout.h, transform: `scale(${scale})` }}
        aria-hidden="true"
      >
        {layout.lines.map((box, i) => (
          <span key={i} className={styles.line} style={at(box)} />
        ))}

        <Card box={layout.me} title={PEOPLE.me[0]} text={PEOPLE.me[1]} anim="me" />
        <Card box={layout.pm} title={PEOPLE.pm[0]} text={PEOPLE.pm[1]} anim="pm" />

        {layout.workersLabel && (
          <span className={styles.label} style={pos(layout.workersLabel)}>
            WORKER SUBAGENTS
          </span>
        )}
        {PEOPLE.workers.map(([title, text], i) => (
          <Card
            key={title}
            box={layout.workers[i]}
            title={title}
            text={text}
            anim={i === 1 ? "ds" : undefined}
          />
        ))}

        <span className={styles.gatesLabel} style={pos(layout.gatesLabel)}>
          My approval gates
        </span>
        {GATES.map((gate, i) => (
          <span key={gate} className={styles.gate} style={at(layout.gates[i])}>
            <span className={cn(styles.gateLit, styles.anim)} style={run(`af-gate-${i}`)} />
            <span className={styles.gateDot} />
            {gate}
          </span>
        ))}

        {(Object.keys(TAGS) as (keyof typeof TAG_T)[]).map((tag) => (
          <span
            key={tag}
            className={cn(styles.tag, styles.anim)}
            style={{ ...pos(layout.tags[tag]), ...run(`af-tag-${tag}`) }}
          >
            {TAGS[tag]}
          </span>
        ))}

        <span
          className={cn(styles.sigX, styles.anim)}
          style={{ ...pos(layout.signal), ...run(`af-sig-x-${name}`) }}
        >
          <span className={cn(styles.sigY, styles.anim)} style={run(`af-sig-y-${name}`)}>
            <span className={cn(styles.signal, styles.anim)} style={run("af-sig-o")} />
          </span>
        </span>
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
  );
};
