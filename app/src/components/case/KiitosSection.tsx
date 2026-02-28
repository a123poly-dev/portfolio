import { Heading } from "@design-system/common/Heading"
import styles from "./KiitosSection.module.scss"

export const KiitosSection = () => (
  <section className={styles.section}>
    <div className={styles.container}>
      <div className={styles.kiitos}>
        <div className={styles.textBlock}>
          <Heading type="heading-h1" className={styles.title}>
            Kiitos!*
          </Heading>
          <div className={styles.subtitle}>*Thanks</div>
        </div>
        <div className={styles.imageBlock}>
          <img
            src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/64a9768448fbf45c6d1c7d34_sticker%201.png"
            loading="lazy"
            alt="Sticker"
            className={styles.sticker}
          />
        </div>
      </div>
    </div>
  </section>
)
