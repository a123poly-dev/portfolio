import cn from "classnames";
import type { PropsWithChildren } from "react";
import { CaseLayout } from "../CaseLayout";

import styles from "./Synthux.module.scss";

// Light, fluid page shell for the SynthUX cases. Reuses the site navbar and footer.
export const SynthuxLayout = ({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) => (
  <CaseLayout>
    <div className={cn(styles.page, className)}>{children}</div>
  </CaseLayout>
);

// The same tokens without the site chrome, for Storybook.
export const SynthuxTokens = ({ children }: PropsWithChildren) => (
  <div className={styles.page}>{children}</div>
);
