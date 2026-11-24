// Shared pieces for the looping Figma motion figures (token pipeline, sync loop):
// keyframes built from Figma timeline stops, and the pause button icon.

export const OUT = "cubic-bezier(0.215, 0.61, 0.355, 1)";
export const IO = "ease-in-out";

// A stop: time as a fraction of the loop, the value, and the easing to the next stop
export type TStop = [at: number, value: string, ease?: string];

export const keyframes = (name: string, prop: string, stops: TStop[]) =>
  `@keyframes ${name}{${stops
    .map(
      ([at, value, ease]) =>
        `${(at * 100).toFixed(2)}%{${prop}:${value};${ease ? `animation-timing-function:${ease};` : ""}}`,
    )
    .join("")}}`;

export const PlayPauseIcon = ({ paused }: { paused: boolean }) => (
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
