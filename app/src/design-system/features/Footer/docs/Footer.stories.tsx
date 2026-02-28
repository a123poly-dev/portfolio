import type { Meta, StoryObj } from "@storybook/react-vite"
import { Footer } from ".."

const meta: Meta<typeof Footer> = {
  title: "Features/Footer",
  component: Footer,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Footer>

export const Default: Story = {}
