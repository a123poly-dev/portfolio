import cx from "classnames";
import {
  Issues,
  KeyNumbers,
  ReportHeader,
  Sidebar,
  Summary,
  TopBar,
} from "./reportParts";

import ui from "./ReportUI.module.scss";
import styles from "./ReportScreen.module.scss";

// Width below which the product uses its compact layout (Figma "Breakpoint window" Width=1024)
export const COMPACT_MAX = 1279;

// The finished Report as a real fluid layout, at any width from 1024 up. The content column
// fills the main area and stops at 1200 px, centred. Compact layout: the sidebar folds to an
// icon rail and the page padding tightens.
export const ReportScreen = ({ width }: { width: number }) => {
  const compact = width <= COMPACT_MAX;
  return (
    <div
      className={cx(ui.product, styles.shell, compact && styles.compact)}
      style={{ width }}
    >
      <Sidebar collapsed={compact} />
      <div className={styles.main}>
        <TopBar />
        <div className={styles.content}>
          <ReportHeader className={styles.section} />
          <KeyNumbers
            className={styles.section}
            values={["7 of 10", "68", "5", "4m 20s"]}
          />
          <Summary className={styles.section} />
          <Issues className={styles.section} />
        </div>
      </div>
    </div>
  );
};
