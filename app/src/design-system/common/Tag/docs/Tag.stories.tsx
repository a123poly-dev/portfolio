import type { Meta, StoryObj } from "@storybook/react-vite"
import { Tag } from "../Tag"
import type { TTagColor } from "../Tag"

const meta: Meta<typeof Tag> = {
  title: "Common/Tag",
  component: Tag,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Tag>

const allColors: TTagColor[] = ["blue", "orange", "green", "yellow", "purple", "red"]

export const AllColors: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      {allColors.map((color) => (
        <Tag key={color} label={color} color={color} />
      ))}
    </div>
  ),
}

export const AsLink: Story = {
  render: () => (
    <Tag label="Clickable tag" color="blue" href="https://example.com" />
  ),
}
