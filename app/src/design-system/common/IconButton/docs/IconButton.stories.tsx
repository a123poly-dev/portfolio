import type { Meta, StoryObj } from "@storybook/react-vite"
import { IconButton } from ".."

const meta: Meta<typeof IconButton> = {
  title: "Common/IconButton",
  component: IconButton,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof IconButton>

export const Default: Story = {
  args: {
    icon: "linkedin",
    href: "https://www.linkedin.com/in/apolina/",
    label: "LinkedIn",
  },
}

export const AllSocials: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16 }}>
      <IconButton
        icon="linkedin"
        href="https://www.linkedin.com/in/apolina/"
        label="LinkedIn"
      />
      <IconButton
        icon="telegram"
        href="https://t.me/aapoly"
        label="Telegram"
      />
      <IconButton
        icon="instagram"
        href="https://www.instagram.com/polinakzz/"
        label="Instagram"
      />
    </div>
  ),
}
