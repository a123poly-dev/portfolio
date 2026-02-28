import { useScrollReveal } from '../../hooks/useScrollReveal'
import { WorkCard } from '../WorkCard/WorkCard'
import styles from './WorksGrid.module.scss'
import { projects } from './works-data'

const sizeClassMap: Record<string, string> = {
  large: styles.fullWidth,
  medium: styles.halfWidth,
  small: styles.quarterWidth,
}

export function WorksGrid() {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <section id="works" className={styles.works}>
      <div className={styles.container}>
        <div ref={ref} className={`${styles.grid} scroll-reveal`}>
          {projects.map((project) => (
            <div key={project.id} className={sizeClassMap[project.size]}>
              <WorkCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
