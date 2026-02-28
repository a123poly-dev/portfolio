import type { Meta, StoryObj } from "@storybook/react-vite"
import { Heading } from "../Heading"
import type { THeadingType } from "../Heading"

const meta: Meta<typeof Heading> = {
  title: "Common/Heading",
  component: Heading,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Heading>

const allTypes: THeadingType[] = [
  "heading-h1",
  "heading-h2",
  "heading-h3",
  "heading-h4",
  "heading-h5",
  "heading-h6",
]

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {allTypes.map((type) => (
        <Heading key={type} type={type}>
          {type}
        </Heading>
      ))}
    </div>
  ),
}

export const WithAsOverride: Story = {
  render: () => (
    <Heading type="heading-h1" as="h3">
      Visually heading-h1, rendered as h3
    </Heading>
  ),
}
