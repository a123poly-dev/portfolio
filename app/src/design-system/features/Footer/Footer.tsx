import { Link } from "react-router-dom"
import { openConsentSettings } from "../../../analytics/consent"
import { PRIVACY_PATH } from "../../../constants/routePathConstants"
import styles from "./Footer.module.scss"

export const Footer = () => (
  <footer className={styles.footer} data-place="footer">
    <div className={styles.container}>
      <div className={styles.bottom}>
        <div className={styles.copyright}>&copy; 2026 Polina Abdula</div>
        <div className={styles.links}>
          <Link to={PRIVACY_PATH} className={styles.link}>
            Privacy
          </Link>
          <button
            type="button"
            className={styles.link}
            onClick={openConsentSettings}
          >
            Privacy settings
          </button>
        </div>
      </div>
    </div>
  </footer>
)
