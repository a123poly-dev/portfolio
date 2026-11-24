import { useRef } from "react";
import type { ReactNode } from "react";
import {
  CaseIntro,
  CaseNext,
  CaseSection,
  CaseToc,
  SynthuxLayout,
} from "../../components/case/synthux";
import caseStyles from "../../components/case/synthux/Synthux.module.scss";
import { ROOT_PATH } from "../../constants/routePathConstants";
import type { TCaseMeta } from "../../components/case/synthux";
import { isCaseVisible } from "../../constants/synthuxCases";
import type { TSynthuxCase } from "../../constants/synthuxCases";
import {
  SYNTHUX_CASES,
  SYNTHUX_ROLE,
  SYNTHUX_STATUS,
  SYNTHUX_TEAM,
} from "./cases";

type TSynthuxCasePageProps = {
  caseKey: TSynthuxCase;
  cover?: ReactNode;
  // Optional rich versions of the title and timeline, for example with marks
  title?: ReactNode;
  timeline?: ReactNode;
} & { children?: ReactNode };

// Shared frame for the three SynthUX cases: intro, the case body, then links to the other cases.
export const SynthuxCasePage = ({
  caseKey,
  cover,
  title,
  timeline,
  children,
}: TSynthuxCasePageProps) => {
  const info = SYNTHUX_CASES.find((item) => item.key === caseKey)!;
  const contentRef = useRef<HTMLDivElement>(null);

  const meta: TCaseMeta[] = [
    { label: "Role", value: SYNTHUX_ROLE },
    { label: "Team", value: info.team ?? SYNTHUX_TEAM },
    ...(info.timeline
      ? [{ label: "Timeline", value: timeline ?? info.timeline }]
      : []),
    { label: "Status", value: SYNTHUX_STATUS },
  ];

  const others = SYNTHUX_CASES.filter(
    (item) => item.key !== caseKey && isCaseVisible(item.key),
  ).map((item) => ({
    to: item.path,
    eyebrow: item.eyebrow,
    title: item.title,
    lead: item.lead,
  }));

  return (
    <SynthuxLayout className={caseStyles.withToc}>
      <CaseToc contentRef={contentRef} title={info.title} backTo={ROOT_PATH} />
      <div ref={contentRef}>
        <CaseIntro
          eyebrow={info.eyebrow}
          title={title ?? info.pageTitle ?? info.title}
          lead={info.hideLead ? undefined : info.lead}
          meta={meta}
          cover={cover}
        />
        {children}
        {others.length > 0 && (
          <CaseSection title="More from SynthUX">
            <CaseNext items={others} />
          </CaseSection>
        )}
      </div>
    </SynthuxLayout>
  );
};
