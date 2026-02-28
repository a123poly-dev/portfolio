import cn from "classnames"
import styles from "./BurgerButton.module.scss"

type TBurgerButtonProps = {
  isOpen: boolean
  onClick: () => void
}

export const BurgerButton = ({ isOpen, onClick }: TBurgerButtonProps) => (
  <button
    className={cn(styles.burger, isOpen && styles.burgerOpen)}
    onClick={onClick}
    aria-label="Menu"
  >
    <span />
    <span />
    <span />
  </button>
)
