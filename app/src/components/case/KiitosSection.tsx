import { Heading } from "@design-system/common/Heading"

import kitosImg from "./assets/sticker.png"

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
            src={kitosImg}
            loading="lazy"
            alt="Sticker"
            className={styles.sticker}
          />
        </div>
      </div>
    </div>
  </section>
)
