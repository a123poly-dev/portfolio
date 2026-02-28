import type { Meta, StoryObj } from "@storybook/react-vite"
import { Navbar } from ".."

const meta: Meta<typeof Navbar> = {
  title: "Features/Navbar",
  component: Navbar,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Navbar>

export const Default: Story = {}

export const MainPage: Story = {
  args: {
    isMainPage: true,
  },
}
