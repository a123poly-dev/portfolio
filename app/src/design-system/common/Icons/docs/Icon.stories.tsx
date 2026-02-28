import type { Meta, StoryObj } from "@storybook/react-vite"
import { Icon } from ".."
import type { TIconName } from ".."

const meta: Meta<typeof Icon> = {
  title: "Common/Icon",
  component: Icon,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Icon>

export const Default: Story = {
  args: {
    name: "linkedin",
    size: 24,
  },
}

const allIcons: TIconName[] = ["linkedin", "telegram", "instagram"]

export const AllIcons: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      {allIcons.map((name) => (
        <Icon key={name} name={name} size={24} />
      ))}
    </div>
  ),
}
