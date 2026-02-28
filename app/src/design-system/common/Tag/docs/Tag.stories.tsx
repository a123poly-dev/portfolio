import type { Meta, StoryObj } from "@storybook/react-vite"
import { Tag } from ".."
import type { TTagColor } from ".."

const meta: Meta<typeof Tag> = {
  title: "Common/Tag",
  component: Tag,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Tag>

export const Default: Story = {
  args: {
    label: "UX",
    color: "purple",
  },
}

export const AsLink: Story = {
  args: {
    label: "Clickable tag",
    color: "blue",
    href: "https://example.com",
  },
}

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
