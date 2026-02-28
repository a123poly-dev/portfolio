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
    size: "md",
  },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <Icon name="drive" size="sm" /> -- 18px
      <Icon name="telegram" size="md" /> -- 24px
      <Icon name="instagram" size="lg" /> -- 40px
    </div>
  ),
}

const allIcons: TIconName[] = ["linkedin", "telegram", "instagram", "drive"]

export const AllIcons: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      {allIcons.map((name) => (
        <Icon key={name} name={name} size="md" />
      ))}
    </div>
  ),
}
