import type { Meta, StoryObj } from "@storybook/react-vite"
import { MemoryRouter } from "react-router-dom"
import { ConsentNotice } from ".."

const meta: Meta<typeof ConsentNotice> = {
  title: "Features/ConsentNotice",
  component: ConsentNotice,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ minHeight: 320 }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof ConsentNotice>

export const Default: Story = {
  args: { initialOpen: true },
}

export const SettingsOpen: Story = {
  args: { initialOpen: true, initialSettings: true },
}
