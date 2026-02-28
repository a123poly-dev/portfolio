import type { Meta, StoryObj } from "@storybook/react-vite"
import { Header } from ".."

const meta: Meta<typeof Header> = {
  title: "Features/Header",
  component: Header,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Header>

export const Default: Story = {}
