import {
  ROOT_PATH,
  MAIN_PAGE_WORKS,
  MAIN_PAGE_ABOUT,
} from "../../constants/routePathConstants"

import styles from "./Navbar.module.scss"

type TNavbarProps = {
  isMainPage?: boolean
}

export const Navbar = ({ isMainPage = false }: TNavbarProps) => (
  <nav className={styles.menu}>
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <a href={ROOT_PATH} className={styles.logo}>
          <img
            src="https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/65ca4aabc8b3698a1fb75d27_logo.svg"
            width={138}
            alt="Polina's Portfolio"
            className={styles.logo}
          />
        </a>
        <ul className={styles.navList}>
          {isMainPage && (
            <>
              <li>
                <a href={MAIN_PAGE_WORKS} className={styles.navLink}>
                  Works
                </a>
              </li>

              <li>
                <a href={MAIN_PAGE_ABOUT} className={styles.navLink}>
                  About &amp;CV
                </a>
              </li>
            </>
          )}
          <li>
            <a
              href="https://www.linkedin.com/in/apolina/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.navLink}
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
)
