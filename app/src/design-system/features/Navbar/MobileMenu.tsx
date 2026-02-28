import cn from "classnames"

import styles from "./Navbar.module.scss"
import {
  ROOT_PATH,
  MAIN_PAGE_ABOUT,
  MAIN_PAGE_WORKS,
} from "../../../constants/routePathConstants"

type TMobileMenuProps = {
  isOpen: boolean
  handleLinkClick: () => void
}

export const MobileMenu = ({ isOpen, handleLinkClick }: TMobileMenuProps) => (
  <div className={cn(styles.mobileMenu, isOpen && styles.mobileMenuOpen)}>
    <a
      href={ROOT_PATH + MAIN_PAGE_WORKS}
      className={styles.mobileLink}
      onClick={handleLinkClick}
    >
      Works
    </a>
    <a
      href={ROOT_PATH + MAIN_PAGE_ABOUT}
      className={styles.mobileLink}
      onClick={handleLinkClick}
    >
      About &amp;CV
    </a>
    <a
      href="https://www.linkedin.com/in/apolina/"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.mobileLink}
      onClick={handleLinkClick}
    >
      LinkedIn
    </a>
  </div>
)
