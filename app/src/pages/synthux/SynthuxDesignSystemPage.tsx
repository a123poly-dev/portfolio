import type { ReactNode } from "react";
import {
  CaseFigure,
  CaseSection,
  CaseSectionPair,
  CaseSplit,
  CaseText,
  DecisionBlock,
  DsBento,
  Mark,
  MarkerText,
  SyncLoop,
  TokenPipeline,
  TokenPlayground,
  ContrastChecker,
} from "../../components/case/synthux";
import { SynthuxCasePage } from "./SynthuxCasePage";
import caseStyles from "../../components/case/synthux/Synthux.module.scss";
import componentsImg from "../assets/synthux/case-2/components-overview.webp";
import gapImg from "../assets/synthux/case-2/hifi-gap.webp";
import rulesImg from "../assets/synthux/case-2/rules-with-reasons.webp";

const bodyClass = caseStyles.body;
// Marker inks, the same as Case 1. Marker = highlight, underline = pen.
const PURPLE = "#9453FF";

const PurpleMarker = ({ children }: { children: ReactNode }) => (
  <Mark color={PURPLE} opacity={0.2}>
    {children}
  </Mark>
);
const Underline = ({ children }: { children: ReactNode }) => (
  <Mark type="underline" color={PURPLE} opacity={1}>
    {children}
  </Mark>
);
// A heading or short line whose whole text is marked
const Marked = ({ children }: { children: ReactNode }) => (
  <MarkerText as="span">{children}</MarkerText>
);

const STORYBOOK_URL = "https://synthetic-users-lab-eight.vercel.app/";

// Case 2: the design system. Text trimmed from drafts/case-2-design-system.md to the agreed brief.
// Step 1 of the Case 2 plan: text and static images. The four motion and
// interactive blocks show a still 2x frame until their own step replaces them.
export const SynthuxDesignSystemPage = () => (
  <SynthuxCasePage
    caseKey="designSystem"
    tocTitle="SynthUX design system"
    cover={<DsBento />}
    title={
      <Marked>
        The SynthUX design system –{" "}
        <PurpleMarker>Figma and code as one</PurpleMarker>
      </Marked>
    }
  >
    <CaseSection label="At a glance" title="Overview">
      <CaseSplit
        left={
          <div className={bodyClass}>
            <MarkerText as="p">
              <Underline>
                I built one design system that lives in Figma and in code
              </Underline>
              , and a sync loop that keeps them the same.
            </MarkerText>
          </div>
        }
        right={
          <div className={bodyClass}>
            <ul>
              <li>9 Figma-to-code sync rounds, package at 0.5.0.</li>
              <li>313 contrast checks pass AA in Light and Dark.</li>
              <li>Core components in 3 days: 23 PRs, Days 15 to 17.</li>
            </ul>
          </div>
        }
      />
      <CaseFigure
        src={componentsImg}
        alt="The Components overview page in the Figma DS file: 31 component pages in 6 groups, with live previews of Button, Link, Icons, Badge and Divider"
        width={1840}
        height={1246}
      />
    </CaseSection>

    <CaseSectionPair
      items={[
        {
          title: "Context and constraints",
          tocLabel: "Context and constraints",
          content: (
            <>
              <p>
                I made the system decisions. A frontend developer advised on
                Storybook, Vercel and the story format. AI agents wrote the
                component code under rules I wrote, and I approved each
                component before it was published.
              </p>
              <p>
                No script reads the variables in Figma, so every sync between
                Figma and code had to be designed as a process.
              </p>
            </>
          ),
        },
        {
          title: "Problem: Figma and code drifted apart",
          tocLabel: "Problem",
          content: (
            <>
              <MarkerText as="p">
                The hi-fi screens kept finding gaps in the system. A designer
                could copy a value the code did not have, and{" "}
                <PurpleMarker>nobody noticed until build</PurpleMarker>.
              </MarkerText>
              <p>
                I needed one system where every token and component change can
                be traced from the file to the code.
              </p>
            </>
          ),
        },
      ]}
    />

    <CaseSection label="Problem">
      <CaseFigure
        src={gapImg}
        alt="Hi-fi found what the design system was missing, and the fix went back into the system. 1, hi-fi: Report 4.1 had no loading state (Day 33, gap found). 2, design system: DS Skeleton v0.1 (Day 33, approved). 3, hi-fi again: loading states built from it (Day 33, shipped in DS 0.4.0)"
        width={2880}
        height={1498}
        caption="Day 33: the hi-fi found a missing loading state, and the fix went into the system first."
      />
    </CaseSection>

    <CaseSection
      label="How it works"
      title="How it works"
      tocLabel="How it works"
    >
      <CaseText>
        <ul>
          <li>
            <strong>Tokens.</strong> One W3C DTCG JSON file. Style Dictionary v5
            builds it into CSS for light, dark and reduced motion.
          </li>
          <li>
            <strong>Contrast.</strong> A script in CI checks every colour pair.
          </li>
          <li>
            <strong>Figma.</strong> Components with variants, bound to
            variables.
          </li>
          <li>
            <strong>Storybook.</strong> Every component ships with its stories.
          </li>
          <li>
            <strong>Sync rounds.</strong> Compare Figma with code, fix the spec,
            update the code, verify, save a baseline.
          </li>
        </ul>
      </CaseText>
      <TokenPipeline caption="One token, from JSON to the Button." />
      <SyncLoop caption="One sync round." />
    </CaseSection>

    <CaseSection
      label="Key decisions"
      title="Key decisions with trade-offs"
      tocLabel="Key decisions"
    >
      <DecisionBlock
        title={
          <Marked>
            <Underline>1. Where the truth lives</Underline>
          </Marked>
        }
        options={[
          "Figma variables only",
          "Code only, Figma follows",
          "A tokens file both sides are built from",
        ]}
        choice="The JSON file holds the values. Figma stays the visual truth."
        why="A script can read and build the JSON. No script reads the Figma variables."
        cost="Figma variables are set by hand, so drift is caught in sync rounds. That is why there are nine."
      />
      <TokenPlayground caption="Pick a token or switch the preview theme." />

      <DecisionBlock
        title={
          <Marked>
            <Underline>2. Hovers as translucent washes</Underline>
          </Marked>
        }
        options={[
          "A solid hover colour for each variant",
          "A translucent overlay on any surface",
        ]}
        choice="Row hover 4%, secondary and ghost hover 8%, pressed 12%."
        why="One overlay works on any surface, so the dark theme needs no hover colours of its own."
        cost="The result depends on the surface, so each state is checked in both themes."
      />

      <DecisionBlock
        title={
          <Marked>
            <Underline>3. Keep all table columns</Underline>
          </Marked>
        }
        options={[
          "Hide columns on narrow screens",
          "Scroll sideways",
          "Let text wrap",
        ]}
        choice="Keep every column, let text wrap and rows grow. Sideways scroll is the last resort."
        why="A hidden column is data the user cannot see on that screen."
        cost="Rows get tall at narrow widths, so tables read longer."
      />
    </CaseSection>

    <CaseSection
      label="Rules with reasons"
      title="Rules with reasons, for people and agents"
      tocLabel="Rules with reasons"
    >
      <CaseText>
        <p>
          People and AI agents both read the component docs, so every rule
          carries its reason.
        </p>
      </CaseText>
      <CaseFigure
        src={rulesImg}
        alt="The Severity bar in the Issues to check metric, its rule with the reason from the Storybook docs, and the matching rule for agents"
        width={1841}
        height={512}
        caption="The Severity bar rule"
      />
    </CaseSection>

    <CaseSection
      label="Accessibility"
      title="Accessibility"
      tocLabel="Accessibility"
    >
      <CaseText>
        <p>WCAG 2.2 AA is the target for the product and the system.</p>
        <ul>
          <li>
            <strong>Contrast in CI.</strong> After the round 9 palette,
            all 313 checks pass AA in both themes, plus 39 info-only pairs. It
            closed the 8 AA fails an earlier audit found.
          </li>
          <li>
            <strong>Gaps kept on purpose.</strong>{" "}
            Input focus border 2.28:1 in light (WCAG 1.4.11). Light selected
            state 2.28:1. Severity colours on a card are info only, because a
            text label carries the meaning.
          </li>
          <li>
            Each fix would have changed a colour or layout I had already
            approved. So I don’t claim WCAG 2.2 AA compliance.
          </li>
        </ul>
      </CaseText>
      <ContrastChecker caption="Every text and background pair, with its ratio, in both themes. Pick a pair or switch the theme." />
    </CaseSection>

    <CaseSection
      label="Outcome"
      title="Where the system is today"
      tocLabel="Status"
    >
      <CaseText>
        <ul>
          <li>
            Figma holds 280 variables, 63 component sets and 88 icon sets.
          </li>
          <li>
            All 9 sync rounds ended in merged PRs, and the packages reached
            0.5.0 on Day 41.
          </li>
          <li>
            Not in code yet: Table, overlay sidebar, Grade scale and Project
            card. Dark mode is in progress.
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
      tocLabel="Reflections"
      title={
        <Marked>
          <PurpleMarker>What I’d keep and change</PurpleMarker>
        </Marked>
      }
    >
      <CaseText>
        <p>
          <strong>Foundations first.</strong> Right after the concept I set only
          colours, type and spacing tokens. I designed the UI on them, and built
          the components after. I’d keep that order.
        </p>
        <p>
          <strong>Docs for agents.</strong> The first AI-written docs were weak.
          My agents are the first readers of the coded system, so I wrote the
          docs for them: usage, code and every state. They got much better.
        </p>
      </CaseText>
    </CaseSection>
  </SynthuxCasePage>
);
