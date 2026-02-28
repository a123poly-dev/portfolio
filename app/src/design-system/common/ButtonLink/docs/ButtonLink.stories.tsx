import type { Meta, StoryObj } from "@storybook/react-vite"
import { ButtonLink } from ".."

const meta: Meta<typeof ButtonLink> = {
  title: "Common/ButtonLink",
  component: ButtonLink,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof ButtonLink>

export const Default: Story = {
  args: {
    href: "#works",
    children: "Works",
  },
}

export const External: Story = {
  args: {
    href: "https://www.linkedin.com/in/apolina/",
    children: "LinkedIn",
    isExternal: true,
  },
}
