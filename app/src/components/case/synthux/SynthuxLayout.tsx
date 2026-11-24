import type { PropsWithChildren } from "react"
import { CaseLayout } from "../CaseLayout"

import styles from "./Synthux.module.scss"

// Light, fluid page shell for the SynthUX cases. Reuses the site navbar, Kiitos and footer.
export const SynthuxLayout = ({ children }: PropsWithChildren) => (
  <CaseLayout>
    <div className={styles.page}>{children}</div>
  </CaseLayout>
)

// The same tokens without the site chrome, for Storybook.
export const SynthuxTokens = ({ children }: PropsWithChildren) => (
  <div className={styles.page}>{children}</div>
)
