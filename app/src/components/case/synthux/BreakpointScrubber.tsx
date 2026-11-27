import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { Reveal } from "./Reveal";
import { ReportScreen } from "./ReportScreen";
import { useSiteDark } from "./useSiteDark";

import ui from "./ReportUI.module.scss";

import styles from "./BreakpointScrubber.module.scss";

export type TBreakpoint = {
  // Screen width in px
  width: number;
  label: string;
};

type TBreakpointScrubberProps = {
  items: TBreakpoint[];
  // Width selected at first
  initial?: number;
  // Text for screen readers: what changes between the widths
  description: string;
  caption?: ReactNode;
};

// Figma "Breakpoint scrubber" (41:7676), 1312 x 760: the widest screen (1920) fills 1264 px,
// every width uses that same zoom, and the window shows the top 1040 px of the page.
const STAGE_W = 1312;
const WIDEST = 1920;
const WIDEST_ON_STAGE = 1264;
const VIEW_H = 680;
const SCREEN_H = 1040;

// The Report at several widths. Picking a tab resizes the window over 0.5 s (the Figma Smart
// Animate), and the page inside reflows live because it is real layout, not a picture.
export const BreakpointScrubber = ({
  items,
  initial,
  description,
  caption,
}: TBreakpointScrubberProps) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const [stageW, setStageW] = useState(0);
  const [width, setWidth] = useState(initial ?? items[0].width);
  // Follows the site theme: in Dark the product shows its DS Dark mode
  const dark = useSiteDark();

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) =>
      setStageW(entry.contentRect.width),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scale = (stageW * WIDEST_ON_STAGE) / STAGE_W / WIDEST;
  const current = items.find((item) => item.width === width);

  return (
    <Reveal>
      <figure
        data-demo="breakpoints"
        className={`${styles.figure} ${dark ? ui.dark : ""}`}
      >
        <div ref={stageRef} className={styles.stage}>
          <div className={styles.tabs} role="group" aria-label="Screen width">
            {items.map((item) => (
              <button
                key={item.width}
                type="button"
                className={styles.tab}
                aria-pressed={item.width === width}
                onClick={() => setWidth(item.width)}
              >
                <span className={styles.tabName}>{item.label} </span>
                {item.width}
              </button>
            ))}
          </div>
          <div
            className={styles.view}
            style={{ height: (stageW * VIEW_H) / STAGE_W }}
            role="img"
            aria-label={`SynthUX Report at ${current?.label ?? ""} ${width} px. ${description}`}
          >
            <div
              className={styles.window}
              style={
                {
                  "--scale": scale,
                  width: width * scale,
                  height: SCREEN_H * scale,
                  visibility: scale ? "visible" : "hidden",
                } as CSSProperties
              }
              aria-hidden="true"
            >
              <div
                className={styles.screen}
                style={{ transform: `scale(${scale})` }}
              >
                <ReportScreen width={width} />
              </div>
            </div>
          </div>
        </div>
        {caption && (
          <figcaption className={styles.caption}>{caption}</figcaption>
        )}
      </figure>
    </Reveal>
  );
};
