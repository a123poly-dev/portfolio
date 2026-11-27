import type { Meta, StoryObj } from "@storybook/react-vite"
import { IconButton } from ".."
import { HERO_SOCIALS } from "../../../features/Header/socialIcons"

const meta: Meta<typeof IconButton> = {
  title: "Common/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Round 40 × 40 social link used in the hero. Hover floods it with the same pastel blob fill as the nav links, and the icon rolls up to a copy of itself. The icon is drawn in the text colour, so it follows the Theme switch in the toolbar. Opens in a new tab; `label` is the accessible name.",
      },
    },
  },
  argTypes: {
    icon: {
      control: "inline-radio",
      options: ["linkedin", "telegram", "instagram", "github"],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 24 }}>
        <Story />
      </div>
    ),
  ],
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

/** The hero row: four links, 8 px apart. Hover each one to see the fill. */
export const HeroSocials: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      {HERO_SOCIALS.map((s) => (
        <IconButton key={s.label} icon={s.icon} href={s.href} label={s.label} />
      ))}
    </div>
  ),
}
