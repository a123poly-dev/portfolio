import type { Meta, StoryObj, Decorator } from "@storybook/react-vite"
import { Navbar } from ".."
import styles from "../Navbar.module.scss"

// The nav is position: fixed. A transform on the frame makes the frame its
// containing block, so the pill sits inside the preview instead of the page top.
// The soft blobs behind it show the glass.
const frame =
  (width: number | string, height: number): Decorator =>
  (Story) => (
    <div
      style={{
        position: "relative",
        transform: "translateZ(0)",
        width,
        maxWidth: "100%",
        height,
        margin: "0 auto",
        overflow: "hidden",
        background:
          "radial-gradient(circle at 20% 30%, #eadcff 0 60px, transparent 61px), radial-gradient(circle at 75% 60%, #81fdb8 0 48px, transparent 49px), var(--page)",
      }}
    >
      <Story />
    </div>
  )

const meta: Meta<typeof Navbar> = {
  title: "Features/Navbar",
  component: Navbar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Fixed glass pill nav, 16 px from the top: logo, Works (main page only), LinkedIn, CV Download with the arrow that turns into a check, and the theme switch. Below 480 px the links move into a burger menu. In these previews the nav is placed inside the frame.",
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Navbar>

export const Default: Story = {
  decorators: [frame("100%", 104)],
}

export const MainPage: Story = {
  args: {
    isMainPage: true,
  },
  decorators: [frame("100%", 104)],
}

// Docs show stories inline, where the 480 px media query can't apply, so the
// mobile rules from Navbar.module.scss are forced on a 375 px frame.
const s = (name: string) => `.navbar-mobile-preview .${styles[name]}`

/** Phone width. Tap the burger to open the menu. */
export const Mobile: Story = {
  args: {
    isMainPage: true,
  },
  decorators: [
    (Story) => (
      <>
        <style>{`
          ${s("menu")} { width: calc(100% - 32px); top: 12px; border-radius: 26px; }
          ${s("container")} { padding: 12px 12px 12px 16px; }
          ${s("navList")} { display: none; }
          ${s("burgerWrap")} { display: block; }
          ${s("mobileMenu")} {
            position: relative;
            z-index: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            max-height: 0;
            overflow: hidden;
            opacity: 0;
            filter: blur(4px);
            padding-bottom: 0;
            transition: max-height 150ms ease-out, opacity 150ms ease-out,
              filter 150ms ease-out, padding-bottom 150ms ease-out;
          }
          ${s("mobileMenuOpen")} {
            max-height: 160px;
            opacity: 1;
            filter: none;
            padding-bottom: 20px;
            transition: max-height 0.3s ease-out, opacity 0.3s ease-out,
              filter 0.3s ease-out, padding-bottom 0.3s ease-out;
          }
        `}</style>
        <div className="navbar-mobile-preview">
          <Story />
        </div>
      </>
    ),
    frame(375, 240),
  ],
}
