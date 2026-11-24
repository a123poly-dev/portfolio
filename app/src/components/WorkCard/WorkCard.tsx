import cn from "classnames"
import { Link } from "react-router-dom"
import { useScrollReveal } from "../../hooks/useScrollReveal"
import type { TProject } from "../WorksGrid/works-data"

import styles from "./WorkCard.module.scss"

const coverClassMap: Record<string, string> = {
  pulkovoCover: styles.pulkovoCover,
  okeyAppCover: styles.okeyAppCover,
  pbhCover: styles.pbhCover,
  aiCover: styles.aiCover,
  synthuxEndToEndCover: styles.synthuxEndToEndCover,
  synthuxDesignSystemCover: styles.synthuxDesignSystemCover,
  synthuxAiProcessCover: styles.synthuxAiProcessCover,
}

const coverSizeClassMap: Record<TProject["cover"], string> = {
  tall: styles.coverTall,
  compact: styles.coverCompact,
  regular: styles.coverRegular,
}

type TWorkCardProps = {
  project: TProject
  // Use the regular cover height whatever the project's own size (filtered grid)
  uniform?: boolean
}

// Image-only card. The meta line, title and arrow sit in a dark panel that
// slides up on hover (Figma 290:54602); on touch screens it is always shown.
export const WorkCard = ({ project, uniform = false }: TWorkCardProps) => {
  const ref = useScrollReveal<HTMLDivElement>()

  const content = (
    // The reveal wrapper keeps a fixed className: useScrollReveal adds
    // "is-visible" by hand, and a re-render with a new className (e.g. after a
    // filter change) would wipe it and hide the card.
    <div ref={ref} className="scroll-reveal">
      <div
        className={cn(
          styles.cover,
          coverSizeClassMap[uniform ? "regular" : project.cover],
        )}
      >
        <div
          className={cn(styles.coverImage, coverClassMap[project.coverClass])}
        />
        <div className={styles.panel}>
          <div className={styles.meta}>
            {project.meta.map((item, i) => (
              <span key={item} className={styles.metaItem}>
                {i > 0 && (
                  <span className={styles.metaDot} aria-hidden="true">
                    ·
                  </span>
                )}
                {item}
              </span>
            ))}
          </div>
          <h3 className={styles.title}>{project.title}</h3>
          <span className={styles.arrow} aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M7 17L17 7M17 15V7H9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  )

  if (project.externalLink) {
    return (
      <a
        href={project.externalLink}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.card}
      >
        {content}
      </a>
    )
  }

  return (
    <Link to={project.link} className={styles.card}>
      {content}
    </Link>
  )
}
