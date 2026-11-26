import cn from "classnames"

import styles from "./Navbar.module.scss"
import {
  ROOT_PATH,
  MAIN_PAGE_WORKS,
} from "../../../constants/routePathConstants"

type TMobileMenuProps = {
  isOpen: boolean
  isMainPage: boolean
  cvUrl: string
  handleLinkClick: () => void
}

export const MobileMenu = ({
  isOpen,
  handleLinkClick,
  isMainPage,
  cvUrl,
}: TMobileMenuProps) => (
  <div className={cn(styles.mobileMenu, isOpen && styles.mobileMenuOpen)}>
    {isMainPage ? (
      <a
        href={ROOT_PATH + MAIN_PAGE_WORKS}
        className={styles.mobileLink}
        onClick={handleLinkClick}
      >
        Works
      </a>
    ) : (
      <a
        href={ROOT_PATH}
        className={styles.mobileLink}
        onClick={handleLinkClick}
      >
        Home
      </a>
    )}
    <a
      href="https://www.linkedin.com/in/apolina/"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.mobileLink}
      onClick={handleLinkClick}
    >
      LinkedIn
    </a>
    <a
      href={cvUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.mobileLink}
      onClick={handleLinkClick}
    >
      CV Download
    </a>
  </div>
)
