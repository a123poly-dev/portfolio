import styles from "./Footer.module.scss"

export const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.container}>
      <div className={styles.bottom}>
        <div className={styles.copyright}>&copy; 2026 Polina Abdula</div>
        <div className={styles.links}>
          <a
            href="https://www.linkedin.com/in/apolina/"
            className={styles.contactLink}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  </footer>
)
