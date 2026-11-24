import { Reveal } from "./Reveal"

import styles from "./ProcessGantt.module.scss"

type TGanttRow = {
  days: string
  text: string
  // First and last day of the task, 1 to TOTAL_DAYS
  start: number
  end: number
}

const TOTAL_DAYS = 35
const TICKS = [1, 5, 10, 15, 20, 25, 30, 35]

// Copy and days from Figma "Design timeline · Gantt chart" (249:63483)
const ROWS: TGanttRow[] = [
  { days: "Day 1:", text: "Concept brief and benchmark.", start: 1, end: 1 },
  { days: "Day 4:", text: "Design tokens in Figma and the design system repo.", start: 4, end: 4 },
  { days: "Days 9–10:", text: "10 wireframe steps.", start: 9, end: 10 },
  { days: "Days 15–17:", text: "Core design system components.", start: 15, end: 17 },
  { days: "Days 18–32:", text: "Hi-fi in 9 steps.", start: 18, end: 32 },
  { days: "Days 32–34:", text: "Responsive layouts and the skeleton loading state.", start: 32, end: 34 },
  { days: "Day 33:", text: "The 9 dev specs in the repo.", start: 33, end: 33 },
]

const pct = (days: number) => `${(days / TOTAL_DAYS) * 100}%`

// The process as a Gantt timeline: tasks on the left, days 1 to 35 on the right.
// Fluid: the day track stretches with the card; on phones each label sits above its bar.
export const ProcessGantt = () => (
  <Reveal>
    <figure className={styles.card}>
      <div className={styles.head} aria-hidden="true">
        <span className={styles.headLabel}>Task / Days</span>
        <span className={styles.axis}>
          {TICKS.map((day) => (
            <span key={day} className={styles.tick} style={{ left: pct(day - 0.5) }}>
              {day}
            </span>
          ))}
        </span>
      </div>
      <ol className={styles.rows}>
        {ROWS.map((row) => (
          <li key={row.days} className={styles.row}>
            <span className={styles.label}>
              <strong>{row.days}</strong> {row.text}
            </span>
            <span className={styles.track} aria-hidden="true">
              <span
                className={styles.bar}
                style={{ left: pct(row.start - 1), width: pct(row.end - row.start + 1) }}
              />
            </span>
          </li>
        ))}
      </ol>
    </figure>
  </Reveal>
)
