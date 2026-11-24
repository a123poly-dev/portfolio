import {
  BreakpointScrubber,
  CaseFigure,
  CaseSection,
  CaseText,
  CompareSlider,
  DecisionBlock,
  FlowPlayer,
  HeroReport,
} from "../../components/case/synthux"
import { SynthuxCasePage } from "./SynthuxCasePage"
import wireImg from "../assets/synthux/case-1/wire-4-1.webp"
import hifiImg from "../assets/synthux/case-1/hifi-4-1.webp"
import segmentsImg from "../assets/synthux/case-1/audience-segments.webp"
import a11yImg from "../assets/synthux/case-1/a11y-report.webp"
import trustImg from "../assets/synthux/case-1/trust.webp"
import specImg from "../assets/synthux/case-1/spec-vs-figma.webp"
import flowReview from "../assets/synthux/case-1/j2-review.webp"
import flowRunning from "../assets/synthux/case-1/j2-running.webp"
import flowReport from "../assets/synthux/case-1/j2-report.webp"

const STORYBOOK_URL = "https://synthetic-users-lab-eight.vercel.app/"

// Case 1: the overview. Text trimmed from drafts/case-1-overview.md to the agreed brief.
export const SynthuxEndToEndPage = () => (
  <SynthuxCasePage caseKey="endToEnd" cover={<HeroReport />}>
    <CaseSection label="At a glance" title="A UX lab with AI participants">
      <CaseText>
        <p>
          SynthUX is a B2B SaaS where design teams run UX tests with AI
          (synthetic) participants: a usability task with SUS, and an
          accessibility check.
        </p>
        <ul>
          <li>Concept brief on Day 1, dev-ready specs on Day 33.</li>
          <li>0 unstyled text and 0 raw colours on product hi-fi pages.</li>
          <li>No questions from the developer about flows or states.</li>
        </ul>
      </CaseText>
      <FlowPlayer
        width={1440}
        height={1001}
        steps={[
          { label: "Review and run", src: flowReview, alt: "New usability study, Review and run step: the study setup and the Run study button", ms: 2600 },
          { label: "Running", src: flowRunning, alt: "Blue jacket checkout, running: 2 of 10 done, about 4 minutes left", ms: 3000 },
          { label: "Report", src: flowReport, alt: "Blue jacket checkout, Run 2 report: task success 7 of 10, SUS 68, 5 issues to check, average time 4m 20s", ms: 3400 },
        ]}
        caption="A new study, from review to report. Pick a step to stop."
      />
    </CaseSection>

    <CaseSection label="Problem" title="A fast answer is easy to over-trust">
      <CaseText>
        <p>
          Design teams want a fast read on usability before they pay for real
          research. AI participants are fast. But an AI finding is a
          hypothesis, not proof.
        </p>
        <p>
          The product has two users. Designers run the tests. Managers read the
          reports and buy. SynthUX had to earn trust from both, without
          overselling what synthetic results can show.
        </p>
      </CaseText>
    </CaseSection>

    <CaseSection label="My role" title="Product calls, UX and UI, specs">
      <CaseText>
        <p>
          I owned the product scope, the UX and UI, the design system direction
          and the dev specs, and I approved every frame. A frontend developer
          consulted, and a product developer builds SynthUX with me. AI agents
          did research, copy and code under my review; Case 3 shows how.
        </p>
      </CaseText>
    </CaseSection>

    <CaseSection label="Process" title="One step, one Figma page, one review">
      <CaseText>
        <ol>
          <li><strong>Day 1:</strong> concept brief and benchmark.</li>
          <li><strong>Day 4:</strong> design tokens in Figma and the design system repo.</li>
          <li><strong>Days 9 to 10:</strong> 10 wireframe steps.</li>
          <li><strong>Days 15 to 17:</strong> core design system components.</li>
          <li><strong>Days 18 to 32:</strong> hi-fi in 9 steps.</li>
          <li><strong>Days 32 to 34:</strong> responsive layouts and the skeleton loading state.</li>
          <li><strong>Day 33:</strong> the 9 dev specs in the repo.</li>
        </ol>
      </CaseText>
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
    </CaseSection>

    <CaseSection label="Key decisions" title="Four bets, and what they cost">
      <DecisionBlock
        title="1. Findings are hypotheses, not proof"
        options={[
          "AI results as findings a team can act on",
          "AI results as hypotheses to check with real research",
        ]}
        choice="Hypotheses: a fast check before real research."
        why="An AI participant is not a real user. The product should name that risk."
        cost="A less exciting sales pitch, and copy that states the limit every time."
      />

      <DecisionBlock
        title="2. No personas"
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
        title="3. No single accessibility score"
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
        caption="The report leads with the controls people could not use."
      />

      <DecisionBlock
        title="4. Desktop only"
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

    <CaseSection label="Designing for AI" title="Results change on every run">
      <CaseText>
        <p>
          Participants are generated again for each run, so two runs never
          match. The compare view says so: “A change of 1 participant or a few
          SUS points can be noise. Look at fixed and new issues first.”
        </p>
        <p>
          Trust is a design decision. An agent icon marks AI-made content, with
          details in a keyboard-friendly tooltip. “How this run was made” lists
          the model, settings and audience.
        </p>
      </CaseText>
      <CaseFigure
        src={trustImg}
        alt="Three approved screens: the agent icon tooltip, the compare banner about noise between runs, and the How this run was made section"
        width={1440}
        height={756}
        caption="Agent icon tooltip, compare banner, “How this run was made”."
      />
    </CaseSection>

    <CaseSection label="Handoff" title="Specs a developer and their agents can build from">
      <CaseText>
        <p>
          I wrote 9 dev specs, one per product area, for a developer who builds
          with AI. What made them complete:
        </p>
        <ul>
          <li>A states table for every component on every screen.</li>
          <li>Corner cases in the area they belong to, each with an id.</li>
          <li>Messages and failure states as their own sections, with the exact copy.</li>
          <li>Every open question decided before handoff.</li>
          <li>The same section order in all 9 specs.</li>
        </ul>
        <p>
          The result: the product developer asked no follow-up questions about
          flows or states.
        </p>
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
          <li>
            I don’t claim WCAG 2.2 AA compliance. The known gaps are listed in
            Case 2.
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

    <CaseSection label="Reflections" title="What I’d keep and change">
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
)
