import type { Meta, StoryObj } from "@storybook/react-vite"
import type { ReactNode } from "react"
import { ArrowUpRightIcon, Icon, SOCIAL_ICONS } from ".."
import type { TIconName, TSocialIconName } from ".."
import { CvMorphIcon } from "../../../features/Navbar/CvMorphIcon"
import { LogoMark } from "../../../features/Navbar/LogoMark"
import { MoonIcon, SunIcon } from "../../../features/ThemeToggle"

const meta: Meta<typeof Icon> = {
  title: "Common/Icon",
  component: Icon,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Every icon on the site. Most are inline SVGs in `currentColor`, so they follow the text colour and the Theme switch in the toolbar. `<Icon>` itself renders the older image icons (fixed colour) by name and size.",
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Icon>

const Tile = ({
  name,
  note,
  children,
}: {
  name: string
  note: string
  children: ReactNode
}) => (
  <figure
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8,
      width: 120,
      margin: 0,
      padding: "20px 8px 12px",
      border: "1px solid var(--line)",
      borderRadius: 12,
      color: "var(--ink)",
    }}
  >
    <div style={{ height: 32, display: "grid", placeItems: "center" }}>
      {children}
    </div>
    <figcaption style={{ textAlign: "center", font: "12px/16px Inter, sans-serif" }}>
      <code>{name}</code>
      <div style={{ color: "var(--text-secondary)" }}>{note}</div>
    </figcaption>
  </figure>
)

const Group = ({ title, children }: { title: string; children: ReactNode }) => (
  <section style={{ marginBottom: 24 }}>
    <h3
      style={{
        margin: "0 0 12px",
        font: "600 14px/20px Inter, sans-serif",
        color: "var(--ink)",
      }}
    >
      {title}
    </h3>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>{children}</div>
  </section>
)

const socials = Object.keys(SOCIAL_ICONS) as TSocialIconName[]
const imageIcons: TIconName[] = ["linkedin", "telegram", "instagram", "drive"]

/** All icons, grouped by where they are used. */
export const AllIcons: Story = {
  render: () => (
    <div style={{ padding: 8 }}>
      <Group title="Socials (SOCIAL_ICONS, hero and IconButton)">
        {socials.map((name) => {
          const SocialIcon = SOCIAL_ICONS[name]
          return (
            <Tile key={name} name={name} note="24 px, currentColor">
              <SocialIcon />
            </Tile>
          )
        })}
      </Group>
      <Group title="Navigation">
        <Tile name="LogoMark" note="24 px, nav logo">
          <LogoMark />
        </Tile>
        <Tile name="CvMorphIcon" note="16 px, CV link">
          <CvMorphIcon checked={false} />
        </Tile>
        <Tile name="CvMorphIcon checked" note="after a click">
          <CvMorphIcon checked />
        </Tile>
        <Tile name="ArrowUpRightIcon" note="24 px, work card">
          <ArrowUpRightIcon />
        </Tile>
      </Group>
      <Group title="Theme switch">
        <Tile name="MoonIcon" note="16 px, to dark">
          <MoonIcon />
        </Tile>
        <Tile name="SunIcon" note="16 px, to light">
          <SunIcon />
        </Tile>
      </Group>
      <Group title="Image icons (<Icon name>)">
        {imageIcons.map((name) => (
          <Tile key={name} name={name} note="img, fixed colour">
            <Icon name={name} />
          </Tile>
        ))}
      </Group>
    </div>
  ),
}

export const Default: Story = {
  args: {
    name: "linkedin",
    size: "md",
  },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 24, alignItems: "center", color: "var(--ink)" }}>
      <span><Icon name="drive" size="sm" /> sm, 18 px</span>
      <span><Icon name="telegram" size="md" /> md, 24 px</span>
      <span><Icon name="instagram" size="lg" /> lg, 40 px</span>
    </div>
  ),
}
