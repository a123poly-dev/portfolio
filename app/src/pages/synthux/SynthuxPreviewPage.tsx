import {
  CaseFigure,
  CaseIntro,
  CaseSection,
  CaseSplit,
  CaseText,
  CompareSlider,
  DecisionBlock,
  StatGrid,
  SynthuxLayout,
} from "../../components/case/synthux"
import wireImg from "../assets/synthux/case-1/wire-4-1.webp"
import hifiImg from "../assets/synthux/case-1/hifi-4-1.webp"
import trustImg from "../assets/synthux/case-1/trust.webp"

// Local-only page that shows every part of the case layout, for review.
// Text here is placeholder wording, not case copy.
export const SynthuxPreviewPage = () => (
  <SynthuxLayout>
    <CaseIntro
      eyebrow="Layout preview · local only"
      title="Case layout parts"
      lead="Every part a SynthUX case can use. Resize the window: layout and spacing scale, type stays at 12, 14, 16, 18, 24 and 28 px."
      meta={[
        { label: "Role", value: "Meta item" },
        { label: "Team", value: "Meta item" },
        { label: "Timeline", value: "Meta item" },
        { label: "Status", value: "Meta item" },
      ]}
    />

    <CaseSection label="Section label" title="Section heading, 24 px">
      <CaseText>
        <p>
          Body text, 16 px, kept to a readable line length. Placeholder wording
          to show how a paragraph sits under a section heading.
        </p>
        <p>A second paragraph, to show the space between paragraphs.</p>
      </CaseText>
    </CaseSection>

    <CaseSection label="Compare slider" title="Wireframe next to hi-fi">
      <CompareSlider
        before={{ src: wireImg, alt: "Report wireframe", label: "Wireframe" }}
        after={{ src: hifiImg, alt: "Report hi-fi", label: "Hi-fi" }}
        width={1440}
        height={1100}
        caption="Caption, 14 px. Drag, tap or use the arrow keys."
      />
    </CaseSection>

    <CaseSection label="Split" title="Image next to text">
      <CaseSplit
        left={
          <CaseFigure
            src={trustImg}
            alt="Trust frame"
            width={1440}
            height={756}
            caption="Two columns when there is room, one when there is not."
          />
        }
        right={
          <CaseText>
            <p>Text column. No breakpoints: the grid decides by available width.</p>
          </CaseText>
        }
      />
    </CaseSection>

    <CaseSection label="Decision" title="Options, choice, why, cost">
      <DecisionBlock
        title="Decision title, 18 px"
        options={["Option A", "Option B", "Option C"]}
        choice="Option B"
        why="Why this option, in one or two short sentences."
        cost="What it costs, in one or two short sentences."
      />
    </CaseSection>

    <CaseSection label="Counters" title="Numbers count up over 1.8 s">
      <StatGrid
        items={[
          { value: 313, label: "Sample counter A" },
          { value: 280, label: "Sample counter B" },
          { value: 63, label: "Sample counter C" },
          { value: 9, label: "Sample counter D" },
        ]}
      />
    </CaseSection>
  </SynthuxLayout>
)
