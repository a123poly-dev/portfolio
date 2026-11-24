import type { ReactNode, Ref } from "react";
import cx from "classnames";
import { Icon, Sidebar, TopBar } from "./reportParts";

import checkIcon from "../../../pages/assets/synthux/case-1/report-ui/check.svg";
import chevronRightIcon from "../../../pages/assets/synthux/case-1/report-ui/chevron-right.svg";
import infoIcon from "../../../pages/assets/synthux/case-1/report-ui/circle-info-blue.svg";
import noteEditIcon from "../../../pages/assets/synthux/case-1/report-ui/note-edit.svg";
import loaderIcon from "../../../pages/assets/synthux/case-1/report-ui/loader.svg";

import ui from "./ReportUI.module.scss";
import styles from "./FlowScreens.module.scss";

// The two screens before the Report in the "New study to Report" flow, from the Figma frames
// 3.9 Review and run (19:24140) and 3.9c Running (36:5706), 1440 x 1001.

const Shell = ({
  current,
  children,
}: {
  current: string;
  children: ReactNode;
}) => (
  <div className={cx(ui.product, styles.shell)}>
    <Sidebar active="studies" />
    <div className={styles.main}>
      <TopBar current={current} actions={false} />
      <div className={styles.content}>{children}</div>
    </div>
  </div>
);

const SETUP: { label: string; title: string; description?: string }[] = [
  { label: "Method", title: "Usability task + SUS questionnaire" },
  { label: "Link", title: "https://shop.example.com" },
  {
    label: "Task",
    title: "Find a blue jacket in size M and add it to the cart",
  },
  { label: "Done when", title: "The cart shows a blue jacket, size M" },
  {
    label: "Audience",
    title: "Online shoppers",
    description: "10 participants in 3 segments",
  },
];

const SetupList = ({ edit }: { edit: boolean }) => (
  <div className={styles.list}>
    {SETUP.map((row) => (
      <div key={row.label} className={styles.row}>
        <span className={cx(styles.rowLabel, ui.secondary)}>{row.label}</span>
        <span className={styles.rowText}>
          <span className={ui.uiLabel}>{row.title}</span>
          {row.description && (
            <span className={ui.secondary}>{row.description}</span>
          )}
        </span>
        {edit && (
          <span className={styles.iconButton}>
            <Icon src={noteEditIcon} />
          </span>
        )}
      </div>
    ))}
  </div>
);

const Banner = ({ children }: { children: ReactNode }) => (
  <div className={styles.banner}>
    <span className={styles.bannerIcon}>
      <Icon src={infoIcon} />
    </span>
    <span className={styles.bannerText}>{children}</span>
  </div>
);

const STEPS = ["Method", "Target", "Audience"];

const Stepper = () => (
  <div className={styles.steps}>
    <div className={styles.stepper}>
      {STEPS.map((step) => (
        <span key={step} className={styles.stepGroup}>
          <span className={styles.step}>
            <span className={styles.markerDone}>
              <Icon src={checkIcon} />
            </span>
            {step}
          </span>
          <Icon src={chevronRightIcon} />
        </span>
      ))}
      <span className={styles.step}>
        <span className={styles.markerCurrent}>4</span>
        <span className={ui.uiLabel}>Review and run</span>
      </span>
    </div>
    <div className={styles.divider} />
  </div>
);

// runRef: the Run study button, so the flow can start from it
// highlight: a purple pulsing ring on Run study, the cue to start the flow
export const ReviewScreen = ({
  runRef,
  onRun,
  highlight = false,
}: {
  runRef?: Ref<HTMLSpanElement>;
  onRun?: () => void;
  highlight?: boolean;
}) => (
  <Shell current="New usability study">
    <div className={styles.header}>
      <div className={styles.titleRow}>
        <span className={ui.h2}>New usability study</span>
        <span className={cx(ui.badge, styles.badgeNeutral)}>Draft</span>
      </div>
      <span>
        Saved automatically at 10:42. Leave any time: you’ll find it in Studies.
      </span>
    </div>
    <div className={cx(ui.card, styles.card)}>
      <Stepper />
      <div className={styles.section}>
        <div className={styles.heading}>
          <span className={ui.h4}>Check and run</span>
          <span>Edit any step before you run. Each run gives one report.</span>
        </div>
        <Banner>
          Takes about 10 minutes. You can leave this page. We’ll tell you when
          the report is ready.
        </Banner>
        <SetupList edit />
        <div className={styles.field}>
          <div className={styles.fieldLabel}>
            <span className={styles.label}>Study name</span>
            <span className={styles.counter}>20 / 56</span>
          </div>
          <div className={styles.input}>Blue jacket checkout</div>
        </div>
      </div>
      <div className={styles.footer}>
        <span className={ui.buttonSecondary}>
          <span className={ui.buttonLabel}>Close</span>
        </span>
        <div className={styles.footerActions}>
          <span className={ui.buttonSecondary}>
            <span className={ui.buttonLabel}>Back</span>
          </span>
          {/* Clickable with a mouse; the accessible control sits outside the screen */}
          <span
            ref={runRef}
            className={cx(
              ui.buttonPrimary,
              styles.run,
              highlight && styles.cue,
            )}
            onClick={onRun}
          >
            <span className={ui.buttonLabel}>Run study</span>
          </span>
        </div>
      </div>
    </div>
  </Shell>
);

// The run's progress layers carry data-run so the flow can animate them
export const RunningScreen = () => (
  <Shell current="Blue jacket checkout">
    <div className={styles.header}>
      <div className={styles.titleRow}>
        <span className={ui.h2}>Blue jacket checkout</span>
        <span className={cx(ui.badge, ui.badgeMinor)}>
          <Icon src={loaderIcon} />
          Running
        </span>
      </div>
    </div>
    <div className={cx(ui.card, styles.card)}>
      <div className={styles.section}>
        <span className={ui.h4}>Study setup</span>
        <div className={styles.progressGroup}>
          <div className={styles.progressRow}>
            <div className={styles.progressLeft}>
              <span className={styles.doneSlot}>
                {Array.from({ length: 11 }, (_, n) => (
                  <span key={n} data-run-step={n} className={styles.done}>
                    {n} of 10 done
                  </span>
                ))}
              </span>
              <span className={styles.track}>
                <span data-run-fill className={styles.fill} />
              </span>
            </div>
            <span className={ui.secondary}>About 4 minutes left</span>
          </div>
          <Banner>
            This study is running. You can change the setup when the run ends.
          </Banner>
        </div>
        <SetupList edit={false} />
      </div>
      <div className={styles.footer}>
        <span className={ui.buttonSecondary}>
          <span className={ui.buttonLabel}>Close</span>
        </span>
        <span className={ui.buttonSecondary}>
          <span className={ui.buttonLabel}>Stop run</span>
        </span>
      </div>
    </div>
  </Shell>
);
