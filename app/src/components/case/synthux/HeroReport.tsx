import { useEffect, useRef, useState } from "react"
import type { CSSProperties, ReactNode } from "react"
import { usePrefersReducedMotion } from "./usePrefersReducedMotion"
import { useHeroTimeline } from "./useHeroTimeline"

import logoMark from "../../../pages/assets/synthux/case-1/report-ui/logo-mark.svg"
import logoName from "../../../pages/assets/synthux/case-1/report-ui/logo-name.svg"
import panelLeftClose from "../../../pages/assets/synthux/case-1/report-ui/panel-left-close.svg"
import dashboardIcon from "../../../pages/assets/synthux/case-1/report-ui/dashboard.svg"
import folderIcon from "../../../pages/assets/synthux/case-1/report-ui/folder.svg"
import usersIcon from "../../../pages/assets/synthux/case-1/report-ui/users.svg"
import laboratoryIcon from "../../../pages/assets/synthux/case-1/report-ui/laboratory.svg"
import fileTextIcon from "../../../pages/assets/synthux/case-1/report-ui/file-text.svg"
import starIcon from "../../../pages/assets/synthux/case-1/report-ui/star.svg"
import chevronDownIcon from "../../../pages/assets/synthux/case-1/report-ui/chevron-down.svg"
import chevronRightIcon from "../../../pages/assets/synthux/case-1/report-ui/chevron-right.svg"
import filesIcon from "../../../pages/assets/synthux/case-1/report-ui/files.svg"
import shareIcon from "../../../pages/assets/synthux/case-1/report-ui/share.svg"
import agentIcon from "../../../pages/assets/synthux/case-1/report-ui/agent.svg"
import circleCheckIcon from "../../../pages/assets/synthux/case-1/report-ui/circle-check.svg"
import circleInfoIcon from "../../../pages/assets/synthux/case-1/report-ui/circle-info.svg"
import circleInfoBlueIcon from "../../../pages/assets/synthux/case-1/report-ui/circle-info-blue.svg"
import linkIcon from "../../../pages/assets/synthux/case-1/report-ui/link.svg"
import targetIcon from "../../../pages/assets/synthux/case-1/report-ui/target.svg"
import circleCloseIcon from "../../../pages/assets/synthux/case-1/report-ui/circle-close.svg"
import triangleWarningIcon from "../../../pages/assets/synthux/case-1/report-ui/triangle-warning.svg"
import chevronLargeIcon from "../../../pages/assets/synthux/case-1/report-ui/chevron-large.svg"

import styles from "./HeroReport.module.scss"

// Report hero: the Figma frame "Hero / Report motion" (21:2317), rebuilt in HTML and CSS so it
// stays sharp at any size. Layout and copy come from the approved Report 4.1 and loading state L3.
// Motion comes from the frame's own keyframes (heroTimeline.ts): an 8 s loop.
// data-m on an element names the Figma layer whose keyframes it plays.
const SCREEN_W = 1440
const SCREEN_H = 900
// On narrow screens the hero shows the main area only (x 240 to 1440), so text stays larger
const CROP_X = 240
const CROP_W = 1200
const CROP_BELOW = 640

const Icon = ({ src, size = 16 }: { src: string; size?: number }) => (
  <img className={styles.icon} src={src} alt="" width={size} height={size} />
)

const Sk = ({ m, w, h, full }: { m: string; w?: number; h: number; full?: boolean }) => (
  <span data-m={m} className={styles.sk} style={{ width: full ? "100%" : w, height: h }} />
)

// A skeleton inside a fixed box, as in the loading state's "Skeleton box" frames
const SkBox = ({ h, w, children }: { h: number; w?: number | string; children: ReactNode }) => (
  <span className={styles.skBox} style={{ height: h, width: w }}>
    {children}
  </span>
)

const Dot = ({ caption }: { caption?: boolean }) => (
  <span className={caption ? styles.dotCaption : styles.dot}>·</span>
)

const NavItem = ({
  icon,
  label,
  level = 1,
  active,
}: {
  icon: string
  label: string
  level?: 1 | 2
  active?: boolean
}) => (
  <div className={`${styles.navItem} ${level === 2 ? styles.navLevel2 : ""} ${active ? styles.navActive : ""}`}>
    <Icon src={icon} />
    <span className={styles.navLabel}>{label}</span>
  </div>
)

const Sidebar = () => (
  <div className={styles.sidebar}>
    <div className={styles.sidebarTop}>
      <div className={styles.workspace}>
        <div className={styles.logo}>
          <img src={logoMark} alt="" width={15} height={18} />
          <img src={logoName} alt="" width={69} height={16} />
        </div>
        <Icon src={panelLeftClose} />
      </div>
      <div className={styles.navGroup}>
        <NavItem icon={dashboardIcon} label="Overview" />
        <NavItem icon={folderIcon} label="Projects" />
        <NavItem icon={usersIcon} label="Audiences" />
      </div>
      <div className={styles.project}>
        <span className={styles.sectionLabel}>Project</span>
        <div className={styles.navGroup}>
          <NavItem icon={folderIcon} label="Online shop redesign" />
          <NavItem icon={laboratoryIcon} label="Studies" level={2} />
          <NavItem icon={fileTextIcon} label="Reports" level={2} active />
        </div>
      </div>
    </div>
    <div className={styles.sidebarFooter}>
      <div className={styles.upgrade}>
        <Icon src={starIcon} />
        <span>Upgrade plan</span>
      </div>
      <div className={styles.account}>
        <span className={`${styles.avatar} ${styles.avatarDark}`}>A</span>
        <span className={styles.accountName}>Anna Berg</span>
        <Icon src={chevronDownIcon} />
      </div>
    </div>
  </div>
)

const TopBar = () => (
  <div className={styles.topBar}>
    <div className={styles.breadcrumb}>
      <span className={styles.crumb}>Projects</span>
      <Icon src={chevronRightIcon} />
      <span className={styles.crumb}>Online shop redesign</span>
      <Icon src={chevronRightIcon} />
      <span className={styles.crumbCurrent}>Reports</span>
    </div>
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
  </div>
)

// Loaded Report 4.1, content part

const ReportHeader = () => (
  <div data-m="21:2324" className={`${styles.block} ${styles.header}`} style={{ top: 96, height: 60 }}>
    <div className={styles.titleRow}>
      <div className={styles.titleGroup}>
        <span className={styles.h2}>Blue jacket checkout - Run 2</span>
        <span className={`${styles.badge} ${styles.badgePositive}`}>
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
)

const KeyNumbers = () => (
  <div data-m="24:3394" className={`${styles.block} ${styles.card} ${styles.metrics}`} style={{ top: 188, height: 146 }}>
    <div className={styles.metric}>
      <span className={styles.eyebrow}>Task success</span>
      <span className={styles.valueRow} />
      <span className={styles.progress}>
        <span data-m="24:3495" className={styles.progressFill} style={{ width: 120 }} />
        <span className={styles.progressTrack} />
      </span>
      <span data-m="24:3486" className={styles.caption}>
        3 gave up
      </span>
    </div>
    <div className={`${styles.metric} ${styles.metricDivided}`}>
      <span className={styles.eyebrowRow}>
        <span className={styles.eyebrow}>SUS score</span>
        <Icon src={circleInfoIcon} />
      </span>
      <span className={styles.valueRow} />
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
            <span className={grade === "C" ? styles.captionPrimary : styles.caption}>{grade}</span>
          </span>
        ))}
        <span data-m="25:3188" className={styles.gradeMarker} />
      </span>
      <span data-m="24:3544" className={styles.caption}>
        Grade C - average is 68
      </span>
    </div>
    <div className={`${styles.metric} ${styles.metricDivided}`}>
      <span className={styles.eyebrow}>Issues to check</span>
      <span className={styles.valueRow} />
      <span className={styles.severity}>
        <span data-m="24:3650" className={styles.sevCritical} style={{ width: 34 }} />
        <span data-m="24:3651" className={styles.sevMajor} style={{ width: 67 }} />
        <span data-m="24:3652" className={styles.sevMinor} style={{ width: 67 }} />
      </span>
      <span data-m="24:3653" className={styles.captionLine}>
        <span>1 critical</span>
        <Dot caption />
        <span>2 major</span>
        <Dot caption />
        <span>2 minor</span>
      </span>
    </div>
    <div className={`${styles.metric} ${styles.metricDivided}`}>
      <span className={styles.eyebrow}>Average time</span>
      <span className={styles.valueRow} />
      <span data-m="24:3688" className={styles.caption}>
        for those who finished
      </span>
    </div>
  </div>
)

const Summary = () => (
  <div data-m="21:2336" className={`${styles.block} ${styles.card} ${styles.summary}`} style={{ top: 366, height: 224 }}>
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
        <li>All 3 who gave up were Mobile newcomers: they could not find the size guide on the product page.</li>
        <li>The promo code field cleared the address for 2 participants.</li>
        <li>Delivery cost shown only at the last step made 5 of 10 hesitate.</li>
      </ul>
    </div>
  </div>
)

type TIssue = {
  tone: "critical" | "major" | "minor"
  title: string
  where: [string, string]
  who: [string, string]
}

const ISSUES: TIssue[] = [
  { tone: "critical", title: "Size guide is hard to find", where: ["Product page", "link under the size picker"], who: ["3 of 10", "Mobile newcomers"] },
  { tone: "major", title: "Promo code field clears the address", where: ["Checkout step 2", "promo code field"], who: ["2 of 10", "Returning desktop"] },
  { tone: "major", title: "Delivery cost appears only at the last step", where: ["Checkout step 3", "order summary"], who: ["5 of 10", "all segments"] },
  { tone: "minor", title: "\"Add to cart\" confirmation is easy to miss", where: ["Product page", "toast after adding"], who: ["2 of 10", "Low-vision"] },
  { tone: "minor", title: "Size buttons have low contrast", where: ["Product page", "size picker"], who: ["1 of 10", "Low-vision"] },
]

const TONE = {
  critical: { label: "Critical", icon: circleCloseIcon, className: styles.badgeCritical },
  major: { label: "Major", icon: triangleWarningIcon, className: styles.badgeMajor },
  minor: { label: "Minor", icon: circleInfoBlueIcon, className: styles.badgeMinor },
}

const FilterTab = ({ label, count, selected }: { label: string; count: number; selected?: boolean }) => (
  <span className={selected ? styles.filterSelected : styles.filter}>
    <span className={styles.buttonLabelPlain}>{label}</span>
    <span className={styles.count}>{count}</span>
  </span>
)

const Issues = () => (
  <div data-m="21:2337" className={`${styles.block} ${styles.issues}`} style={{ top: 622 }}>
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
                  <span className={`${styles.badge} ${TONE[issue.tone].className}`}>
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
              <span className={`${styles.metaLine} ${styles.secondary}`}>
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
)

// Loading state L3

const LoadingHeader = () => (
  <div data-m="21:2489" className={`${styles.block} ${styles.header}`} style={{ top: 96, height: 60 }}>
    <div className={styles.titleRow}>
      <div className={styles.titleGroup}>
        <SkBox h={32}><Sk m="21:2493" w={240} h={20} /></SkBox>
        <SkBox h={28}><Sk m="21:2495" w={48} h={20} /></SkBox>
      </div>
      <SkBox h={20}><Sk m="21:2498" w={48} h={12} /></SkBox>
    </div>
    <div className={styles.skLine}>
      <SkBox h={20}><Sk m="21:2502" w={96} h={12} /></SkBox>
      <SkBox h={20}><Sk m="21:2504" w={240} h={12} /></SkBox>
      <SkBox h={20}><Sk m="21:2506" w={48} h={12} /></SkBox>
    </div>
  </div>
)

type TSkMetric = { m: string[]; label: number; value: number; bar?: number; grade?: boolean; caption: [number, number] }

const SK_METRICS: TSkMetric[] = [
  { m: ["21:2515", "21:2520", "21:2522", "21:2524"], label: 96, value: 48, bar: 96, caption: [54, 48] },
  { m: ["21:2531", "21:2536", "21:2538", "21:2540"], label: 0, value: 31, grade: true, caption: [129, 96] },
  { m: ["21:2546", "21:2551", "21:2553", "21:2556"], label: 113, value: 16, bar: 96, caption: [162, 48] },
  { m: ["21:2561", "21:2566", "", "21:2568"], label: 92, value: 48, caption: [124, 96] },
]

const LoadingKeyNumbers = () => (
  <div data-m="21:2511" className={`${styles.block} ${styles.card} ${styles.metrics}`} style={{ top: 188, height: 146 }}>
    {SK_METRICS.map((metric, i) => (
      <div key={metric.m[0]} className={`${styles.metric} ${i > 0 ? styles.metricDivided : ""}`}>
        <SkBox h={16} w={metric.label || undefined}><Sk m={metric.m[0]} w={48} h={12} /></SkBox>
        <SkBox h={28}><Sk m={metric.m[1]} w={metric.value} h={20} /></SkBox>
        {metric.bar && <SkBox h={6} w={176}><Sk m={metric.m[2]} w={metric.bar} h={12} /></SkBox>}
        {metric.grade && <SkBox h={28} w="100%"><Sk m={metric.m[2]} w={48} h={20} /></SkBox>}
        <SkBox h={18} w={metric.caption[0]}><Sk m={metric.m[3]} w={metric.caption[1]} h={12} /></SkBox>
      </div>
    ))}
  </div>
)

const LoadingSummary = () => {
  const id = (n: number) => `I21:2571;548:147;21:${n}`
  return (
    <div data-m="21:2571" className={`${styles.block} ${styles.card} ${styles.summary}`} style={{ top: 366, height: 224 }}>
      <span className={styles.h4}>Summary</span>
      <div className={styles.summaryContent}>
        <SkBox h={20} w="100%"><Sk m={id(2598)} w={240} h={12} /></SkBox>
        <SkBox h={20} w="100%"><Sk m={id(2601)} w={240} h={12} /></SkBox>
        <span className={styles.skParagraph}>
          <Sk m={id(2603)} h={12} full />
          <Sk m={id(2604)} h={12} full />
          <Sk m={id(2605)} h={12} full />
          <Sk m={id(2606)} w={624} h={12} />
        </span>
      </div>
    </div>
  )
}

// Loading issue rows: tag box width, title skeleton, meta boxes [box width or 0 for hug, skeleton], right box
const SK_ISSUES: { n: number[]; tag: number; meta: [number, number][]; right: [number, number] }[] = [
  { n: [2614, 2617, 2620, 2622, 2630], tag: 83, meta: [[0, 48], [0, 96]], right: [185, 96] },
  { n: [2638, 2641, 2643, 2645], tag: 74, meta: [[200, 96]], right: [183, 96] },
  { n: [2653, 2656, 2658, 2660], tag: 74, meta: [[191, 48]], right: [146, 48] },
  { n: [2668, 2671, 2673, 2675], tag: 74, meta: [[189, 96]], right: [134, 48] },
  { n: [2683, 2686, 2688, 2690], tag: 74, meta: [[149, 48]], right: [131, 48] },
]

const LoadingIssues = () => {
  const id = (n: number) => `I21:2586;457:15801;21:${n}`
  return (
    <div data-m="21:2572" className={`${styles.block} ${styles.issues}`} style={{ top: 622 }}>
      <div className={styles.sectionHeader}>
        <span className={styles.h4}>Issues to check</span>
        {/* Filter tabs are hidden while loading but keep their 32 px height */}
        <span style={{ height: 32 }} />
      </div>
      <div className={styles.accordion} style={{ height: 380 }}>
        {SK_ISSUES.map((row, i) => (
          <div key={row.n[0]} className={styles.accordionItem}>
            <div className={styles.headerRow}>
              <div className={styles.issueHeader}>
                <div className={styles.issueLeft}>
                  <span className={styles.tagSlot}>
                    <SkBox h={28} w={row.tag}><Sk m={id(row.n[0])} w={48} h={20} /></SkBox>
                  </span>
                  <span className={styles.issueText}>
                    <SkBox h={20} w={537}><Sk m={id(row.n[1])} w={240} h={12} /></SkBox>
                    <span className={styles.skMeta}>
                      {row.meta.map(([box, sk], k) => (
                        <SkBox key={k} h={18} w={box || undefined}>
                          <Sk m={id(row.n[2 + k])} w={sk} h={12} />
                        </SkBox>
                      ))}
                    </span>
                  </span>
                </div>
                <SkBox h={20} w={row.right[0]}>
                  <Sk m={id(row.n[row.n.length - 1])} w={row.right[1]} h={12} />
                </SkBox>
              </div>
            </div>
            {i < SK_ISSUES.length - 1 && <div className={styles.divider} />}
          </div>
        ))}
      </div>
    </div>
  )
}

// Rolling counters: digit strips that scroll up to the value, as in the Figma counters
const Digit = ({ m, to }: { m: string; to: string }) => (
  <span className={styles.digit}>
    <span data-m={m} className={styles.strip}>
      {to.split("").join("\n")}
    </span>
  </span>
)

const Counters = () => (
  <>
    <span data-m="21:4212" className={styles.counter} style={{ left: 312 }}>
      <Digit m="21:4214" to="01234567" />
      <span className={styles.counterText}> of 10</span>
    </span>
    <span data-m="21:4225" className={styles.counter} style={{ left: 584 }}>
      <Digit m="21:4227" to="0123456" />
      <Digit m="21:4232" to="012345678" />
    </span>
    <span data-m="21:4242" className={styles.counter} style={{ left: 857 }}>
      <Digit m="21:4244" to="012345" />
    </span>
    <span data-m="21:4254" className={styles.counter} style={{ left: 1129 }}>
      <Digit m="21:4256" to="01234" />
      <span className={styles.counterText} style={{ width: 22 }}>m</span>
      <span style={{ width: 6 }} />
      <Digit m="21:4262" to="012" />
      <Digit m="21:4267" to="01234567890" />
      <span className={styles.counterText}>s</span>
    </span>
  </>
)

export const HeroReport = () => {
  const reduced = usePrefersReducedMotion()
  const frameRef = useRef<HTMLDivElement>(null)
  const screenRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const [visible, setVisible] = useState(false)

  // Fit the 1440 x 900 screen to the page width; crop to the report column on narrow screens
  useEffect(() => {
    const el = frameRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Play only while the hero is on screen
  useEffect(() => {
    const el = frameRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.2,
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useHeroTimeline(screenRef, { playing: visible, reduced })

  const cropped = width > 0 && width < CROP_BELOW
  const viewW = cropped ? CROP_W : SCREEN_W
  const scale = width > 0 ? width / viewW : 0

  return (
    <div
      ref={frameRef}
      className={styles.frame}
      style={{ aspectRatio: `${viewW} / ${SCREEN_H}` }}
      role="img"
      aria-label="SynthUX Report screen. The loading skeleton pulses, then the report fades in section by section: the header, the key numbers rolling up to 7 of 10, SUS 68, 5 issues and 4m 20s, the summary and the issues to check. It loops every 8 seconds."
    >
      <div
        ref={screenRef}
        className={styles.screen}
        style={
          {
            transform: `translateX(${cropped ? -CROP_X * scale : 0}px) scale(${scale})`,
            visibility: scale ? "visible" : "hidden",
          } as CSSProperties
        }
        aria-hidden="true"
      >
        <Sidebar />
        <div className={styles.main}>
          <TopBar />
        </div>

        <ReportHeader />
        <KeyNumbers />
        <Summary />
        <Issues />

        <LoadingHeader />
        <LoadingKeyNumbers />
        <LoadingSummary />
        <LoadingIssues />

        <Counters />
      </div>
    </div>
  )
}
