import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { BurgerButton } from ".."

const meta: Meta<typeof BurgerButton> = {
  title: "Features/BurgerButton",
  component: BurgerButton,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ padding: 20 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof BurgerButton>

export const Default: Story = {
  args: {
    isOpen: false,
    onClick: () => {},
  },
}

export const Opened: Story = {
  args: {
    isOpen: true,
    onClick: () => {},
  },
}

const InteractiveBurger = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <BurgerButton isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)} />
  )
}

export const Interactive: Story = {
  render: () => <InteractiveBurger />,
}
