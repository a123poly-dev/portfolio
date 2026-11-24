import type { CSSProperties, ReactNode } from "react";
import cx from "classnames";

import logoMark from "../../../pages/assets/synthux/case-1/report-ui/logo-mark.svg";
import logoName from "../../../pages/assets/synthux/case-1/report-ui/logo-name.svg";
import panelLeftOpen from "../../../pages/assets/synthux/case-1/report-ui/panel-left-open.svg";
import panelLeftClose from "../../../pages/assets/synthux/case-1/report-ui/panel-left-close.svg";
import dashboardIcon from "../../../pages/assets/synthux/case-1/report-ui/dashboard.svg";
import folderIcon from "../../../pages/assets/synthux/case-1/report-ui/folder.svg";
import usersIcon from "../../../pages/assets/synthux/case-1/report-ui/users.svg";
import laboratoryIcon from "../../../pages/assets/synthux/case-1/report-ui/laboratory.svg";
import fileTextIcon from "../../../pages/assets/synthux/case-1/report-ui/file-text.svg";
import starIcon from "../../../pages/assets/synthux/case-1/report-ui/star.svg";
import chevronDownIcon from "../../../pages/assets/synthux/case-1/report-ui/chevron-down.svg";
import chevronRightIcon from "../../../pages/assets/synthux/case-1/report-ui/chevron-right.svg";
import filesIcon from "../../../pages/assets/synthux/case-1/report-ui/files.svg";
import shareIcon from "../../../pages/assets/synthux/case-1/report-ui/share.svg";
import agentIcon from "../../../pages/assets/synthux/case-1/report-ui/agent.svg";
import circleCheckIcon from "../../../pages/assets/synthux/case-1/report-ui/circle-check.svg";
import circleInfoIcon from "../../../pages/assets/synthux/case-1/report-ui/circle-info.svg";
import circleInfoBlueIcon from "../../../pages/assets/synthux/case-1/report-ui/circle-info-blue.svg";
import linkIcon from "../../../pages/assets/synthux/case-1/report-ui/link.svg";
import targetIcon from "../../../pages/assets/synthux/case-1/report-ui/target.svg";
import circleCloseIcon from "../../../pages/assets/synthux/case-1/report-ui/circle-close.svg";
import triangleWarningIcon from "../../../pages/assets/synthux/case-1/report-ui/triangle-warning.svg";
import chevronLargeIcon from "../../../pages/assets/synthux/case-1/report-ui/chevron-large.svg";

import styles from "./ReportUI.module.scss";

// Parts of the SynthUX Report screen (Report 4.1), shared by the hero and the breakpoint scrubber.
// Sections take a className and style so each screen can place them: the hero pins them where the
// motion frame has them, the scrubber lets them flow.

type TPlaced = { className?: string; style?: CSSProperties };

export const Icon = ({
  src,
  size = 16,
  className,
}: {
  src: string;
  size?: number;
  className?: string;
}) => (
  <img
    className={cx(styles.icon, className)}
    src={src}
    alt=""
    width={size}
    height={size}
  />
);

const Dot = ({ caption }: { caption?: boolean }) => (
  <span className={caption ? styles.dotCaption : styles.dot}>·</span>
);

const NavItem = ({
  icon,
  label,
  level = 1,
  active,
}: {
  icon: string;
  label: string;
  level?: 1 | 2;
  active?: boolean;
}) => (
  <div
    className={cx(
      styles.navItem,
      level === 2 && styles.navLevel2,
      active && styles.navActive,
    )}
  >
    <Icon src={icon} />
    <span className={styles.navLabel}>{label}</span>
  </div>
);

// Folds to nothing when closed, so the rows below it slide up instead of jumping
const Fold = ({ open, children }: { open: boolean; children: ReactNode }) => (
  <div className={cx(styles.fold, !open && styles.foldClosed)}>
    <div className={styles.foldInner}>{children}</div>
  </div>
);

// Expanded: 224 px. Collapsed (1024 layout): a 56 px icon rail, as in the Figma "Collapsed=true" sidebar.
export const Sidebar = ({
  collapsed = false,
  active = "reports",
  className,
}: {
  collapsed?: boolean;
  // Current page inside the project
  active?: "studies" | "reports";
  className?: string;
}) => (
  <div
    className={cx(
      styles.sidebar,
      collapsed && styles.sidebarCollapsed,
      className,
    )}
  >
    <div className={styles.sidebarTop}>
      <div className={styles.workspace}>
        <div className={styles.logo}>
          <img src={logoMark} alt="" width={15} height={18} />
          <img
            className={styles.logoName}
            src={logoName}
            alt=""
            width={69}
            height={16}
          />
        </div>
        <span className={styles.panelToggle}>
          <Icon src={panelLeftClose} className={styles.panelClose} />
          <Icon src={panelLeftOpen} className={styles.panelOpen} />
        </span>
      </div>
      <div className={styles.navGroup}>
        <NavItem icon={dashboardIcon} label="Overview" />
        <NavItem icon={folderIcon} label="Projects" />
        <NavItem icon={usersIcon} label="Audiences" />
      </div>
      <div className={styles.project}>
        <Fold open={!collapsed}>
          <span className={styles.sectionLabel}>Project</span>
        </Fold>
        <NavItem icon={folderIcon} label="Online shop redesign" />
        <Fold open={!collapsed}>
          <div className={styles.navGroup}>
            <NavItem
              icon={laboratoryIcon}
              label="Studies"
              level={2}
              active={active === "studies"}
            />
            <NavItem
              icon={fileTextIcon}
              label="Reports"
              level={2}
              active={active === "reports"}
            />
          </div>
        </Fold>
      </div>
    </div>
    <div className={styles.sidebarFooter}>
      <div className={styles.upgrade}>
        <Icon src={starIcon} />
        <span className={styles.upgradeLabel}>Upgrade plan</span>
      </div>
      <div className={styles.account}>
        <span className={cx(styles.avatar, styles.avatarDark)}>A</span>
        <span className={styles.accountName}>Anna Berg</span>
        <Icon src={chevronDownIcon} className={styles.accountChevron} />
      </div>
    </div>
  </div>
);

// current: the last breadcrumb. actions: the Compare and Share buttons of the Report page.
export const TopBar = ({
  current = "Reports",
  actions = true,
}: {
  current?: string;
  actions?: boolean;
}) => (
  <div className={styles.topBar}>
    <div className={styles.breadcrumb}>
      <span className={styles.crumb}>Projects</span>
      <Icon src={chevronRightIcon} />
      <span className={styles.crumb}>Online shop redesign</span>
      <Icon src={chevronRightIcon} />
      <span className={styles.crumbCurrent}>{current}</span>
    </div>
    {actions && (
      <div className={styles.actions}>
        <span className={styles.buttonSecondary}>
          <Icon src={filesIcon} />
          <span className={styles.buttonLabel}>Compare with Run 1</span>
        </span>
        <span className={styles.buttonPrimary}>
          <Icon src={shareIcon} />
          <span className={styles.buttonLabel}>Share</span>
        </span>
      </div>
    )}
  </div>
);

// Loaded Report 4.1, content part. data-m names the Figma layer whose keyframes the hero plays.

export const ReportHeader = ({ className, style }: TPlaced) => (
  <div data-m="21:2324" className={cx(styles.header, className)} style={style}>
    <div className={styles.titleRow}>
      <div className={styles.titleGroup}>
        <span className={styles.h2}>Blue jacket checkout - Run 2</span>
        <span className={cx(styles.badge, styles.badgePositive)}>
          <Icon src={circleCheckIcon} />
          Done
        </span>
      </div>
      <div className={styles.createdBy}>
        <span className={styles.secondary}>Created by</span>
        <span className={styles.avatar}>A</span>
      </div>
    </div>
    <div className={styles.aiLine}>
      <Icon src={agentIcon} />
      <span className={styles.metaLine}>
        <span>Usability task + SUS</span>
        <Dot />
        <span>Online shoppers, 10 participants in 3 segments</span>
        <Dot />
        <span>21 Oct, 10:52</span>
      </span>
    </div>
  </div>
);

// values: the four numbers as text. The hero leaves them out and rolls its own counters on top.
export const KeyNumbers = ({
  className,
  style,
  values,
}: TPlaced & { values?: [string, string, string, string] }) => (
  <div
    data-m="24:3394"
    className={cx(styles.card, styles.metrics, className)}
    style={style}
  >
    <div className={styles.metric}>
      <span className={styles.eyebrow}>Task success</span>
      <span className={styles.valueRow}>{values?.[0]}</span>
      <span className={styles.progress}>
        <span
          data-m="24:3495"
          className={styles.progressFill}
          style={{ width: 120 }}
        />
        <span className={styles.progressTrack} />
      </span>
      <span data-m="24:3486" className={styles.caption}>
        3 gave up
      </span>
    </div>
    <div className={cx(styles.metric, styles.metricDivided)}>
      <span className={styles.eyebrowRow}>
        <span className={styles.eyebrow}>SUS score</span>
        <Icon src={circleInfoIcon} />
      </span>
      <span className={styles.valueRow}>{values?.[1]}</span>
      <span className={styles.grades}>
        {[
          ["24:3570", "F"],
          ["24:3573", "D"],
          ["24:3576", "C"],
          ["24:3579", "B"],
          ["24:3582", "A"],
        ].map(([m, grade]) => (
          <span key={grade} className={styles.grade}>
            <span data-m={m} className={styles.gradeBar} />
            <span
              className={grade === "C" ? styles.captionPrimary : styles.caption}
            >
              {grade}
            </span>
          </span>
        ))}
        <span data-m="25:3188" className={styles.gradeMarker} />
      </span>
      <span data-m="24:3544" className={styles.caption}>
        Grade C - average is 68
      </span>
    </div>
    <div className={cx(styles.metric, styles.metricDivided)}>
      <span className={styles.eyebrow}>Issues to check</span>
      <span className={styles.valueRow}>{values?.[2]}</span>
      <span className={styles.severity}>
        <span
          data-m="24:3650"
          className={styles.sevCritical}
          style={{ width: 34 }}
        />
        <span
          data-m="24:3651"
          className={styles.sevMajor}
          style={{ width: 67 }}
        />
        <span
          data-m="24:3652"
          className={styles.sevMinor}
          style={{ width: 67 }}
        />
      </span>
      <span data-m="24:3653" className={styles.captionLine}>
        <span>1 critical</span>
        <Dot caption />
        <span>2 major</span>
        <Dot caption />
        <span>2 minor</span>
      </span>
    </div>
    <div className={cx(styles.metric, styles.metricDivided)}>
      <span className={styles.eyebrow}>Average time</span>
      <span className={styles.valueRow}>{values?.[3]}</span>
      <span data-m="24:3688" className={styles.caption}>
        for those who finished
      </span>
    </div>
  </div>
);

export const Summary = ({ className, style }: TPlaced) => (
  <div
    data-m="21:2336"
    className={cx(styles.card, styles.summary, className)}
    style={style}
  >
    <span className={styles.h4}>Summary</span>
    <div className={styles.summaryContent}>
      <span className={styles.iconRow}>
        <Icon src={linkIcon} />
        shop.example.com
      </span>
      <span className={styles.iconRow}>
        <Icon src={targetIcon} />
        Find a blue jacket in size M and add it to the cart
      </span>
      <ul className={styles.bullets}>
        <li>7 of 10 participants added the jacket to the cart.</li>
        <li>
          All 3 who gave up were Mobile newcomers: they could not find the size
          guide on the product page.
        </li>
        <li>The promo code field cleared the address for 2 participants.</li>
        <li>
          Delivery cost shown only at the last step made 5 of 10 hesitate.
        </li>
      </ul>
    </div>
  </div>
);

type TIssue = {
  tone: "critical" | "major" | "minor";
  title: string;
  where: [string, string];
  who: [string, string];
};

const ISSUES: TIssue[] = [
  {
    tone: "critical",
    title: "Size guide is hard to find",
    where: ["Product page", "link under the size picker"],
    who: ["3 of 10", "Mobile newcomers"],
  },
  {
    tone: "major",
    title: "Promo code field clears the address",
    where: ["Checkout step 2", "promo code field"],
    who: ["2 of 10", "Returning desktop"],
  },
  {
    tone: "major",
    title: "Delivery cost appears only at the last step",
    where: ["Checkout step 3", "order summary"],
    who: ["5 of 10", "all segments"],
  },
  {
    tone: "minor",
    title: '"Add to cart" confirmation is easy to miss',
    where: ["Product page", "toast after adding"],
    who: ["2 of 10", "Low-vision"],
  },
  {
    tone: "minor",
    title: "Size buttons have low contrast",
    where: ["Product page", "size picker"],
    who: ["1 of 10", "Low-vision"],
  },
];

const TONE = {
  critical: {
    label: "Critical",
    icon: circleCloseIcon,
    className: styles.badgeCritical,
  },
  major: {
    label: "Major",
    icon: triangleWarningIcon,
    className: styles.badgeMajor,
  },
  minor: {
    label: "Minor",
    icon: circleInfoBlueIcon,
    className: styles.badgeMinor,
  },
};

const FilterTab = ({
  label,
  count,
  selected,
}: {
  label: string;
  count: number;
  selected?: boolean;
}) => (
  <span className={selected ? styles.filterSelected : styles.filter}>
    <span className={styles.buttonLabelPlain}>{label}</span>
    <span className={styles.count}>{count}</span>
  </span>
);

export const Issues = ({ className, style }: TPlaced) => (
  <div data-m="21:2337" className={cx(styles.issues, className)} style={style}>
    <div className={styles.sectionHeader}>
      <span className={styles.h4}>Issues to check</span>
      <span className={styles.filters}>
        <FilterTab label="All" count={5} selected />
        <FilterTab label="Critical" count={1} />
        <FilterTab label="Major" count={2} />
        <FilterTab label="Minor" count={2} />
      </span>
    </div>
    <div className={styles.accordion}>
      {ISSUES.map((issue, i) => (
        <div key={issue.title} className={styles.accordionItem}>
          <div className={styles.headerRow}>
            <div className={styles.issueHeader}>
              <div className={styles.issueLeft}>
                <span className={styles.tagSlot}>
                  <span
                    className={cx(styles.badge, TONE[issue.tone].className)}
                  >
                    <Icon src={TONE[issue.tone].icon} />
                    {TONE[issue.tone].label}
                  </span>
                </span>
                <span className={styles.issueText}>
                  <span className={styles.uiLabel}>{issue.title}</span>
                  <span className={styles.captionLine}>
                    <span>{issue.where[0]}</span>
                    <Dot caption />
                    <span>{issue.where[1]}</span>
                  </span>
                </span>
              </div>
              <span className={cx(styles.metaLine, styles.secondary)}>
                <span>{issue.who[0]}</span>
                <Dot />
                <span>{issue.who[1]}</span>
              </span>
            </div>
            <Icon src={chevronLargeIcon} />
          </div>
          {i < ISSUES.length - 1 && <div className={styles.divider} />}
        </div>
      ))}
    </div>
  </div>
);
