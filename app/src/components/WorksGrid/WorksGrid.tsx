import { useState } from "react"
import cn from "classnames"
import { WorkCard } from "../WorkCard/WorkCard"
import {
  BlobLayer,
  BlobRoll,
  blobHostClass,
  useBlobHover,
} from "@design-system/common/BlobHover"
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

// Tab with the nav's blob-fill hover; the active (dark) tab has none
function FilterTab({
  filter,
  isActive,
  onSelect,
}: {
  filter: TFilter
  isActive: boolean
  onSelect: () => void
}) {
  const ref = useBlobHover<HTMLButtonElement>(isActive)
  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={isActive}
      className={cn(
        blobHostClass,
        styles.filter,
        isActive && styles.filterActive,
      )}
      onClick={onSelect}
    >
      <BlobLayer />
      <BlobRoll>
        {filter}
        <span className={styles.count}>{countFor(filter)}</span>
      </BlobRoll>
    </button>
  )
}

export function WorksGrid() {
  const [active, setActive] = useState<TFilter>("All")

  const visible =
    active === "All"
      ? projects
      : projects.filter((project) => project.categories.includes(active))

  return (
    <section id="works" className={styles.works}>
      <div className={styles.container}>
        <div className={styles.filters} role="group" aria-label="Filter cases">
          {FILTERS.map((filter) => (
            <FilterTab
              key={filter}
              filter={filter}
              isActive={active === filter}
              onSelect={() => setActive(filter)}
            />
          ))}
        </div>

        {/* Each card reveals itself; revealing the grid too doubled the rise */}
        <div className={styles.grid}>
          {visible.map((project) => (
            <div
              key={project.id}
              className={cn(project.cover === "tall" && styles.tallItem)}
            >
              <WorkCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
