import type { ReactNode } from "react";
import {
  BreakpointScrubber,
  CaseFigure,
  CaseSection,
  CaseSectionPair,
  CaseSplit,
  CaseText,
  CompareSlider,
  DecisionBlock,
  FlowPlayer,
  HeroReport,
  Mark,
  MarkerText,
  ProcessGantt,
} from "../../components/case/synthux";
import { Link } from "react-router-dom";
import { SynthuxCasePage } from "./SynthuxCasePage";
import { isCaseVisible } from "../../constants/synthuxCases";
import { SYNTHUX_DESIGN_SYSTEM_PATH } from "../../constants/routePathConstants";
import caseStyles from "../../components/case/synthux/Synthux.module.scss";
import wireImg from "../assets/synthux/case-1/wire-4-1.webp";
import hifiImg from "../assets/synthux/case-1/hifi-4-1.webp";
import segmentsImg from "../assets/synthux/case-1/audience-segments.webp";
import a11yImg from "../assets/synthux/case-1/a11y-report.webp";
import specImg from "../assets/synthux/case-1/spec-vs-figma.webp";

const bodyClass = caseStyles.body;
// Wireframe vs hi-fi slider under the timeline: hidden for now, set true to show it again
const SHOW_WIREFRAME_COMPARE = false;
// Marker inks. Marker = highlight, underline = pen.
const PURPLE = "#9453FF";

const PurpleMarker = ({ children }: { children: ReactNode }) => (
  <Mark color={PURPLE} opacity={0.2}>
    {children}
  </Mark>
);
const Underline = ({
  color,
  children,
}: {
  color: string;
  children: ReactNode;
}) => (
  <Mark type="underline" color={color} opacity={1}>
    {children}
  </Mark>
);
// A heading or short line whose whole text is marked
const Marked = ({ children }: { children: ReactNode }) => (
  <MarkerText as="span">{children}</MarkerText>
);

const STORYBOOK_URL = "https://synthetic-users-lab-eight.vercel.app/";

// Case 1: the overview. Text trimmed from drafts/case-1-overview.md to the agreed brief.
export const SynthuxEndToEndPage = () => (
  <SynthuxCasePage
    caseKey="endToEnd"
    cover={<HeroReport />}
    title={
      <Marked>
        A UX lab with AI participants “SynthUX”.{" "}
        <PurpleMarker>End to end</PurpleMarker>
      </Marked>
    }
    timeline={
      <Marked>
        <PurpleMarker>34 days</PurpleMarker> of active work
      </Marked>
    }
  >
    <CaseSection label="At a glance" title="Overview">
      <CaseSplit
        left={
          <div className={bodyClass}>
            <MarkerText as="p">
              SynthUX is a B2B SaaS where{" "}
              <Underline color={PURPLE}>
                design teams run UX tests with AI
              </Underline>{" "}
              (synthetic) participants: a usability task with SUS, and an
              accessibility check.
            </MarkerText>
          </div>
        }
        right={
          <div className={bodyClass}>
            <ul>
              <li>Concept brief on Day 1, dev-ready specs on Day 33.</li>
              <li>0 unstyled text and 0 raw colours on product hi-fi pages.</li>
              <li>No questions from the developer about flows or states.</li>
            </ul>
          </div>
        }
      />
      <FlowPlayer caption="A new study, from review to report. Click Run study to play it." />
    </CaseSection>

    <CaseSectionPair
      items={[
        {
          title: "Context and constraints",
          content: (
            <>
              <p>
                I led design and the{" "}
                {isCaseVisible("designSystem") ? (
                  <Link to={SYNTHUX_DESIGN_SYSTEM_PATH}>design system</Link>
                ) : (
                  "design system"
                )}
                . A frontend developer advised as a consultant, and a product
                developer is building SynthUX with me. AI agents did much of the
                execution.
              </p>
              <MarkerText as="p">
                <Underline color={PURPLE}>
                  SynthUX is a B2B subscription with per-seat pricing:
                </Underline>{" "}
                a self-serve plan for small teams, a sales-led plan for larger
                teams, and a free trial (one free study) before upgrading. The
                first release covers a usability task with the System Usability
                Scale (SUS) and an accessibility check. Tree tests and A/B tests
                come later.
              </MarkerText>
            </>
          ),
        },
        {
          title: "Problem: A fast answer is easy to over-trust",
          content: (
            <>
              <MarkerText as="p">
                Design teams want{" "}
                <PurpleMarker>
                  a fast read on usability before they pay for real research
                </PurpleMarker>
                . AI participants are fast. But an AI finding is a hypothesis,
                not proof.
              </MarkerText>
              <p>
                The business problem sits on two users. Designers run the tests.
                Managers read the reports and buy. The product had to earn trust
                from both, without overselling what the synthetic results can
                show.
              </p>
            </>
          ),
        },
      ]}
    />

    <CaseSection label="Process" title="Timeline">
      <ProcessGantt />
      {SHOW_WIREFRAME_COMPARE && (
        <CompareSlider
          before={{
            src: wireImg,
            alt: "Report wireframe 4.1, version 0.5",
            label: "Wireframe",
          }}
          after={{
            src: hifiImg,
            alt: "Report 4.1, approved hi-fi",
            label: "Hi-fi",
          }}
          width={1440}
          height={1100}
          caption="Report 4.1, from wireframe to approved hi-fi. Drag, tap or use the arrow keys."
        />
      )}
    </CaseSection>

    <CaseSection label="Key decisions" title="Key decisions with trade-offs">
      <DecisionBlock
        title={
          <Marked>
            <Underline color={PURPLE}>
              1. Findings are hypotheses, not proof
            </Underline>
          </Marked>
        }
        options={[
          "AI results as findings a team can act on",
          "AI results as hypotheses to check with real research",
        ]}
        choice="Hypotheses: a fast check before real research."
        why="An AI participant is not a real user. The product should name that risk."
        cost="A less exciting sales pitch, and copy that states the limit every time."
      />

      <DecisionBlock
        title={
          <Marked>
            <Underline color={PURPLE}>2. No personas</Underline>
          </Marked>
        }
        options={[
          "Persona cards for each study",
          "Segments with 8 fixed traits",
        ]}
        choice="Segments, each with the same 8 traits."
        why="Personas look real but are invented. Fixed traits define every audience the same way."
        cost="No vivid persona to show a buyer."
      />
      <CaseFigure
        src={segmentsImg}
        alt="New audience, Segments step: three suggested segments, each with up to 8 traits, and the editor for one segment"
        width={1440}
        height={1100}
        caption="Segments with fixed traits, not invented people."
      />

      <DecisionBlock
        title={
          <Marked>
            <Underline color={PURPLE}>
              3. No single accessibility score
            </Underline>
          </Marked>
        }
        options={[
          "One score from 0 to 100",
          "WCAG 2.2 AA failures, led by “Controls blocked”",
        ]}
        choice="The failures list."
        why="A score hides which control blocks a person, and can read as a compliance claim."
        cost="No single number for a dashboard."
      />
      <CaseFigure
        src={a11yImg}
        alt="Accessibility check report: 7 WCAG issues, 4 criteria failed, 6 pages checked, 5 of 48 controls blocked, and the issues grouped by WCAG success criterion"
        width={1440}
        height={1100}
        caption="The report shows which controls people could not use, not one score."
      />

      <DecisionBlock
        title={
          <Marked>
            <Underline color={PURPLE}>4. Desktop only</Underline>
          </Marked>
        }
        options={[
          "A responsive app for phones and tablets",
          "A desktop app that shows “Use desktop” below 1024 px",
        ]}
        choice="Desktop only, from 1024 px up."
        why="I kept the first release to one layout I could review properly."
        cost="People on a phone or tablet are blocked."
      />
      <BreakpointScrubber
        items={[
          { width: 1024, label: "Compact" },
          { width: 1440, label: "Standard" },
          { width: 1920, label: "Wide" },
        ]}
        initial={1440}
        description="At 1024 the sidebar folds into an icon rail. At 1920 the content stops at 1200 px and sits centred."
        caption="One desktop layout at three widths."
      />
    </CaseSection>

    <CaseSection
      label="Handoff"
      title="Specs a developer and their agents can build from"
    >
      <CaseText>
        <MarkerText as="p">
          I wrote <PurpleMarker>9 dev specs, one per product area</PurpleMarker>
          , for a developer who builds with AI. What made them complete:
        </MarkerText>
        <ul>
          <li>A states table for every component on every screen.</li>
          <li>Corner cases in the area they belong to, each with an id.</li>
          <li>
            Messages and failure states as their own sections, with the exact
            copy.
          </li>
          <li>Every open question decided before handoff.</li>
          <li>The same section order in all 9 specs.</li>
        </ul>
        <MarkerText as="p">
          <Underline color={PURPLE}>The result:</Underline> the product
          developer asked no follow-up questions about flows or states.
        </MarkerText>
      </CaseText>
      <CaseFigure
        src={specImg}
        alt="The Report spec next to its approved Figma screen, with each part of the screen mapped to the spec"
        width={1440}
        height={1132}
        caption="The Report spec next to its approved screen."
      />
    </CaseSection>

    <CaseSection label="Outcome" title="In development, honestly">
      <CaseText>
        <ul>
          <li>
            Design, specs and the design system code are done, and the build is
            in progress. There are no users or measured results yet.
          </li>
          <li>
            All 9 hi-fi steps are done, with responsive layouts and the skeleton
            loading state. Dark mode is in progress.
          </li>
        </ul>
        <p>
          The design system is live in{" "}
          <a href={STORYBOOK_URL} target="_blank" rel="noreferrer">
            Storybook
          </a>
          .
        </p>
      </CaseText>
    </CaseSection>

    <CaseSection
      label="Reflections"
      title={
        <Marked>
          <PurpleMarker>What I’d keep and change</PurpleMarker>
        </Marked>
      }
    >
      <CaseText>
        <p>
          <strong>Check the research.</strong> AI built the benchmark fast, and
          my own competitor analysis matched it. I’d keep that check.
        </p>
        <p>
          <strong>Cut styles without meaning.</strong> AI adds borders, text
          styles and weights without a reason. I now remove them.
        </p>
        <p>
          <strong>Write rejections down.</strong> A “Delete draft” button I
          rejected came back in the UI, and a person in a recorded interview
          asked why it was there. A rejection has to be a written rule.
        </p>
      </CaseText>
    </CaseSection>
  </SynthuxCasePage>
);
