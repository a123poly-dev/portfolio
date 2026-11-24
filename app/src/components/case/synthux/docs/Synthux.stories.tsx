import type { Meta, StoryObj } from "@storybook/react-vite"
import { MemoryRouter } from "react-router-dom"
import {
  CaseFigure,
  CaseIntro,
  CaseNext,
  CompareSlider,
  DecisionBlock,
  StatGrid,
  SynthuxTokens,
} from ".."
import wireImg from "../../../../pages/assets/synthux/case-1/wire-4-1.webp"
import hifiImg from "../../../../pages/assets/synthux/case-1/hifi-4-1.webp"

const meta: Meta = {
  title: "Case/SynthUX",
  decorators: [
    (Story) => (
      <MemoryRouter>
        <SynthuxTokens>
          <div style={{ padding: "32px clamp(16px, 5vw, 80px)" }}>
            <Story />
          </div>
        </SynthuxTokens>
      </MemoryRouter>
    ),
  ],
}

export default meta

type Story = StoryObj

export const Intro: Story = {
  render: () => (
    <CaseIntro
      eyebrow="SynthUX · Case 1 of 3"
      title="Case title, 28 px"
      lead="The one line from the brief, 18 px."
      meta={[
        { label: "Role", value: "Meta item" },
        { label: "Team", value: "Meta item" },
      ]}
    />
  ),
}

export const Figure: Story = {
  render: () => (
    <CaseFigure src={hifiImg} alt="Report hi-fi" width={1440} height={1100} caption="Caption, 14 px" />
  ),
}

export const Compare: Story = {
  render: () => (
    <CompareSlider
      before={{ src: wireImg, alt: "Report wireframe", label: "Wireframe" }}
      after={{ src: hifiImg, alt: "Report hi-fi", label: "Hi-fi" }}
      width={1440}
      height={1100}
      caption="Drag, tap or use the arrow keys."
    />
  ),
}

export const Decision: Story = {
  render: () => (
    <DecisionBlock
      title="Decision title"
      options={["Option A", "Option B"]}
      choice="Option B"
      why="Why, in one or two sentences."
      cost="Cost, in one or two sentences."
    />
  ),
}

export const Counters: Story = {
  render: () => (
    <StatGrid
      items={[
        { value: 313, label: "Sample counter A" },
        { value: 9, label: "Sample counter D" },
      ]}
    />
  ),
}

export const NextCases: Story = {
  render: () => (
    <CaseNext
      items={[
        { to: "/a", eyebrow: "Case 2 of 3", title: "Next case title", lead: "Its one line." },
        { to: "/b", eyebrow: "Case 3 of 3", title: "Next case title", lead: "Its one line." },
      ]}
    />
  ),
}
