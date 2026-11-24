import { useState } from "react"
import cn from "classnames"
import { useScrollReveal } from "../../hooks/useScrollReveal"
import { WorkCard } from "../WorkCard/WorkCard"
import styles from "./WorksGrid.module.scss"
import { projects, WORK_CATEGORIES, type TWorkCategory } from "./works-data"

type TFilter = "All" | TWorkCategory

const countFor = (filter: TFilter) =>
  filter === "All"
    ? projects.length
    : projects.filter((project) => project.categories.includes(filter)).length

// Tabs with no visible case (e.g. while SynthUX cases are unpublished) are hidden
const FILTERS: TFilter[] = (["All", ...WORK_CATEGORIES] as TFilter[]).filter(
  (filter) => countFor(filter) > 0,
)

export function WorksGrid() {
  const ref = useScrollReveal<HTMLDivElement>()
  const [active, setActive] = useState<TFilter>("All")

  // The Figma mosaic (tall card + two compact ones) only fits the full list.
  // A filtered list mixes sizes unevenly, so every card gets the regular 360 px cover.
  const isFiltered = active !== "All"

  const visible =
    active === "All"
      ? projects
      : projects.filter((project) => project.categories.includes(active))

  return (
    <section id="works" className={styles.works}>
      <div className={styles.container}>
        <div className={styles.filters} role="group" aria-label="Filter cases">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              aria-pressed={active === filter}
              className={cn(styles.filter, active === filter && styles.filterActive)}
              onClick={() => setActive(filter)}
            >
              {filter}
              <span className={styles.count}>{countFor(filter)}</span>
            </button>
          ))}
        </div>

        <div ref={ref} className={`${styles.grid} scroll-reveal`}>
          {visible.map((project) => (
            <div
              key={project.id}
              className={cn(
                !isFiltered && project.cover === "tall" && styles.tallItem,
              )}
            >
              <WorkCard project={project} uniform={isFiltered} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
