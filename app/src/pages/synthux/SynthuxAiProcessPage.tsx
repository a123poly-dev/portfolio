import type { ReactNode } from "react";
import {
  CaseFigure,
  CaseSection,
  CaseSectionPair,
  CaseSplit,
  CaseText,
  DecisionBlock,
  JudgementCompare,
  Mark,
  MarkerText,
} from "../../components/case/synthux";
import { SynthuxCasePage } from "./SynthuxCasePage";
import caseStyles from "../../components/case/synthux/Synthux.module.scss";
import flowImg from "../assets/synthux/case-3/flow.webp";
import planImg from "../assets/synthux/case-3/plan-round-7.webp";
import threeWaysImg from "../assets/synthux/case-3/three-ways.webp";
import reportAiImg from "../assets/synthux/case-3/report-ai.webp";
import reportMineImg from "../assets/synthux/case-3/report-mine.webp";
import audienceAiImg from "../assets/synthux/case-3/audience-ai.webp";
import audienceMineImg from "../assets/synthux/case-3/audience-mine.webp";

const bodyClass = caseStyles.body;
// Marker inks, the same as Cases 1 and 2. Marker = highlight, underline = pen.
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

// Case 3: the AI process. Text trimmed from drafts/case-3-ai-process.md to the agreed brief.
// Step 1 of the Case 3 plan: text and static 2x images. The three motion blocks
// (cover flow, three ways of working, plan run) and the judgement slider show a
// still frame until their own step replaces them.
export const SynthuxAiProcessPage = () => (
  <SynthuxCasePage
    caseKey="aiProcess"
    tocTitle="SynthUX AI process"
    cover={
      <CaseFigure
        src={flowImg}
        alt="How the work flows: me at the top, a planning model below, four worker agents under it (researcher, ds-engineer, frontend-dev, metrics-engineer), and my three approval gates: push to main, publish packages, go public"
        width={2624}
        height={1280}
        priority
      />
    }
    title={
      <Marked>
        Design work run with AI agents –{" "}
        <PurpleMarker>the judgement stays mine</PurpleMarker>
      </Marked>
    }
  >
    <CaseSection label="At a glance" title="Overview">
      <CaseSplit
        left={
          <div className={bodyClass}>
            <MarkerText as="p">
              <Underline>
                I set up AI agents as my execution team, saw the setup fail on
                Day 18
              </Underline>
              , and rebuilt it around how much I can review well.
            </MarkerText>
          </div>
        }
        right={
          <div className={bodyClass}>
            <ul>
              <li>Measured my own AI process and changed it within 2 days.</li>
              <li>9 hi-fi steps done in 15 days, Days 18 to 32.</li>
              <li>3 skills saved, so the next session reuses the process.</li>
            </ul>
          </div>
        }
      />
    </CaseSection>

    <CaseSectionPair
      items={[
        {
          title: "Context and constraints",
          tocLabel: "Context and constraints",
          content: (
            <>
              <MarkerText as="p">
                <Underline>
                  The work covered research, copy, a design system, hi-fi
                  screens, dev specs and an analytics plan.
                </Underline>{" "}
                So AI agents became my team for planning, research, copy and
                code.
              </MarkerText>
              <p>
                A frontend developer consulted on the process and pushed me to
                state and test my hypotheses. A product developer builds
                SynthUX with me.
              </p>
            </>
          ),
        },
        {
          title: "Problem: speed without losing control",
          tocLabel: "Problem",
          content: (
            <>
              <p>I can’t review every output by hand.</p>
              <MarkerText as="p">
                And an agent that moves fast can also{" "}
                <PurpleMarker>make design calls that are mine</PurpleMarker>.
              </MarkerText>
            </>
          ),
        },
      ]}
    />

    <CaseSection label="My role" title="Who does what" tocLabel="My role">
      <CaseText>
        <table className={caseStyles.roleTable}>
          <thead>
            <tr>
              <th scope="col">What I did</th>
              <th scope="col">What the agents did</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Wrote the rules and every brief</td>
              <td>Turned each request into a plan and carried it out</td>
            </tr>
            <tr>
              <td>Decided every open design question</td>
              <td>Research, copy and design-system code, each under a brief</td>
            </tr>
            <tr>
              <td>Approved every frame and every component</td>
              <td>Reviewed worker output before it reached me</td>
            </tr>
          </tbody>
        </table>
      </CaseText>
    </CaseSection>

    <CaseSection
      label="How the work flows"
      title="How the work flows"
      tocLabel="How the work flows"
    >
      <CaseText>
        <ul>
          <li>
            A planning model turns each request into a plan file. I see the
            plan before any worker starts.
          </li>
          <li>
            Each worker gets a brief with acceptance criteria. A failed step is
            retried once, then re-scoped. No step is skipped.
          </li>
          <li>
            Pushing to main, publishing and going public wait for my approval.
          </li>
        </ul>
      </CaseText>
      <CaseFigure
        src={planImg}
        alt="Design-system sync round 7 on Day 32: twelve steps from 17:52 to 19:09, eight code steps and four calls by me, ending with PR #110 merged and packages at 0.3.0"
        width={2880}
        height={1600}
        caption="Day 32: one plan, run step by step. Four of the steps were my calls."
      />
    </CaseSection>

    <CaseSection
      label="Turning point"
      title="Day 18: the setup failed"
      tocLabel="Turning point"
    >
      <CaseText>
        <p>
          On Days 15 to 17 one model did everything. It worked, but it used
          many tokens. On Day 18 I tried a first rule: a planning model splits
          the work, and smaller workers do all of it, Figma too.
        </p>
        <p>
          I compared the work before and after. This is a summary, not a
          controlled test.
        </p>
        <ul>
          <li>In 3.6 hours: 0 PRs merged and 2 of 6 components approved.</li>
          <li>
            Steps got jumbled. When I disagreed, the work kept going as if I
            had approved.
          </li>
          <li>
            In Report step 4.6 an agent decided for me. It dropped wireframe
            copy and detached a Modal.
          </li>
        </ul>
        <p>
          I wrote three hypotheses: context lost in briefs, process overhead,
          and smaller models being weak at open design work.
        </p>
      </CaseText>
      <CaseFigure
        src={threeWaysImg}
        alt="Three ways of working in 6 days: Days 15 to 17, one model did everything, 23 PRs; Day 18, rule v0.1, workers did everything, 0 PRs and 2 of 6 components approved; Day 20, rule v0.4, work split by kind, one step then I approve, 10 PRs merged Days 20 to 32"
        width={2880}
        height={1600}
        caption="Three ways of working, Days 15 to 20."
      />
    </CaseSection>

    <CaseSection
      label="What changed"
      title="Day 20: one step, then I approve"
      tocLabel="What changed"
    >
      <CaseText>
        <MarkerText as="p">
          With rule v0.4, the planning model builds all Figma and motion.
          Workers write the design-system code under briefs. One step, then I
          approve, then the next.{" "}
          <PurpleMarker>
            The limit wasn’t AI speed. It was how much I can review well.
          </PurpleMarker>
        </MarkerText>
        <p>
          In my own words, it “helps me avoid feeling overloaded”. That is a
          reflection, not a measurement.
        </p>
      </CaseText>
    </CaseSection>

    <CaseSection
      label="Judgement"
      title="Where my judgement changed the output"
      tocLabel="Judgement"
    >
      <CaseText>
        <p>
          AI drafted the first versions of the concept, and I changed them. AI
          weighs every rule the same and can’t see which one to bend. That call
          is mine.
        </p>
        <p>Select a number to see what I changed.</p>
      </CaseText>
      <JudgementCompare
        label="Report"
        ai={{
          src: reportAiImg,
          alt: "The AI direction for the Report: a dark summary block, a bright lime Share button and the AI disclosure as a full sentence under the title",
          width: 1600,
          height: 2211,
          pins: [
            { n: 1, x: 15.5, y: 7.2 },
            { n: 2, x: 90.5, y: 4 },
            { n: 3, x: 2, y: 18.4 },
          ],
        }}
        mine={{
          src: reportMineImg,
          alt: "My direction for the Report: light metric cards, a black Share button, an agent icon next to the run details, and a gradient on the selected navigation item",
          width: 1600,
          height: 3304,
          pins: [
            { n: 1, x: 21.25, y: 5.2 },
            { n: 2, x: 90.25, y: 1.2 },
            { n: 3, x: 2, y: 11.9 },
          ],
        }}
        notes={[
          {
            n: 1,
            title: "The AI label became an icon",
            text: "The AI kept a full sentence under the title. I moved it into an agent icon with a focusable tooltip.",
          },
          {
            n: 2,
            title: "A calmer primary button",
            text: "The bright lime button competed with the data.",
          },
          {
            n: 3,
            title: "Clearer navigation",
            text: "A gradient now marks the selected item.",
          },
        ]}
      />
      <JudgementCompare
        label="New audience, segments step"
        ai={{
          src: audienceAiImg,
          alt: "The AI version of the segments step: a left-aligned stepper, plain segment cards and a Remove link on every trait row",
          width: 1600,
          height: 1592,
          pins: [
            { n: 1, x: 38.75, y: 16.6 },
            { n: 2, x: 24.25, y: 27.6 },
            { n: 3, x: 83, y: 69.1 },
            { n: 4, x: 25.5, y: 86.4 },
          ],
        }}
        mine={{
          src: audienceMineImg,
          alt: "My version of the segments step: a centred stepper, segment cards with a highlighted name, numbered trait rows with delete icons, and a disabled Add trait button at 8 of 8",
          width: 1600,
          height: 1808,
          pins: [
            { n: 1, x: 54.75, y: 13.9 },
            { n: 2, x: 24, y: 24.6 },
            { n: 3, x: 84.5, y: 57.5 },
            { n: 4, x: 25.5, y: 88.5 },
          ],
        }}
        notes={[
          {
            n: 1,
            title: "A centred stepper",
            text: "I redesigned the stepper and moved it to the centre.",
          },
          {
            n: 2,
            title: "Clearer segment cards",
            text: "The selected segment name got a highlight colour and more contrast.",
          },
          {
            n: 3,
            title: "More room for traits",
            text: "Numbered rows with more space, and a delete icon instead of a “Remove” link.",
          },
          {
            n: 4,
            title: "The limit looks like a limit",
            text: "At 8 of 8 traits, “Add trait” looks disabled, because it no longer works.",
          },
        ]}
        caption="Concept stage. My versions are not the final hi-fi either: the screens kept changing after this."
      />
    </CaseSection>

    <CaseSection
      label="Key decisions"
      title="Key decisions with trade-offs"
      tocLabel="Key decisions"
    >
      <DecisionBlock
        title={
          <Marked>
            <Underline>1. Who builds Figma and motion</Underline>
          </Marked>
        }
        options={[
          "Keep workers on Figma",
          "Workers with stricter briefs",
          "The planning model builds all Figma and motion",
        ]}
        choice="The planning model builds all Figma and motion. Workers keep the design-system code."
        why="The failures came in open design work. I changed the owner instead of trying to prove why."
        cost="The planning model is the queue for every frame. My review time and its build time set the pace."
      />
      <DecisionBlock
        title={
          <Marked>
            <Underline>2. One component per review</Underline>
          </Marked>
        }
        options={[
          "Approve in parallel batches",
          "Approve when a whole step is done",
          "Approve one component at a time",
        ]}
        choice="One component at a time, with no parallel batches."
        why="In step 4.6 an agent made a design call that was mine. One review per component keeps each call in front of me."
        cost="My review time limits throughput, and there are more review turns."
      />
    </CaseSection>

    <CaseSection label="Outcome" title="What the process left" tocLabel="Outcome">
      <CaseText>
        <p>
          SynthUX is in development: design and specs are done, and the build
          is in progress. For the process, the outcome is a workflow I can run
          again.
        </p>
        <ul>
          <li>
            <strong>ds-figma-sync</strong> finds what changed in the
            design-system Figma file, fixes the specs and updates the code.
          </li>
          <li>
            <strong>product-spec-for-development</strong> writes a dev spec for
            one product area from its approved hi-fi.
          </li>
          <li>
            <strong>tracking-plan</strong> holds the rules for any change to
            events and the events schema.
          </li>
        </ul>
        <p>
          All 9 sync rounds ended in merged PRs, and the packages reached 0.5.0
          on Day 41. The design system is live in{" "}
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
          <PurpleMarker>What I’d take to the next project</PurpleMarker>
        </Marked>
      }
    >
      <CaseText>
        <p>
          <strong>Decide the scope, then split it small.</strong> AI does well
          on one clear step and badly on a broad one.
        </p>
        <p>
          <strong>Write decisions down as rules.</strong> A rejection said once
          doesn’t hold. The memory and rules I built brought the output closer
          to what I wanted.
        </p>
        <p>
          <strong>Keep judgement with people.</strong> AI drafts fast.
          Choosing, bending a rule and approving stay with me, at a pace I can
          review well.
        </p>
      </CaseText>
    </CaseSection>
  </SynthuxCasePage>
);
