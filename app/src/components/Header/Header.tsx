import styles from "./Header.module.scss"

export const Header = () => (
  <section className={styles.header}>
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>Hey,👋 I&apos;m Polina</h1>
          <img
            src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/65cb9b9ec4f1412179327ea4_photo_1.png"
            loading="lazy"
            width={92}
            alt=""
            className={styles.avatar}
          />
        </div>
        <h5 className={styles.subtitle}>
          I&apos;m a Product Designer with ✨6+ years of experience in
          e-commerce, CRM and more🔥
        </h5>
        <div className={styles.location}>📍Helsinki</div>
      </div>
    </div>
  </section>
)
