import type { Meta, StoryObj } from "@storybook/react-vite"
import { MemoryRouter } from "react-router-dom"
import { Footer } from ".."

const meta: Meta<typeof Footer> = {
  title: "Features/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Site footer: copyright, a link to the Privacy page and a button that reopens the analytics consent settings. The Privacy link is a router link, so stories run inside a router.",
      },
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof Footer>

export const Default: Story = {}
