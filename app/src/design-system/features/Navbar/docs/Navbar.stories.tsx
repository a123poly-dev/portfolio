import type { Meta, StoryObj } from "@storybook/react-vite"
import { Navbar } from ".."
import styles from "../Navbar.module.scss"

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

export const Mobile: Story = {
  args: {
    isMainPage: true,
  },
  decorators: [
    (Story) => (
      <>
        <style>{`
          .navbar-mobile-preview .${styles.menu} { position: relative !important; }
          .navbar-mobile-preview .${styles.burgerWrap} { display: block !important; }
          .navbar-mobile-preview .${styles.navList} { display: none !important; }
          .navbar-mobile-preview .${styles.mobileMenu} {
            display: flex !important;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            max-height: 0;
            overflow: hidden;
            opacity: 0;
            padding-bottom: 0;
            transition: max-height 0.3s ease, opacity 0.3s ease, padding-bottom 0.3s ease;
          }
          .navbar-mobile-preview .${styles.mobileMenuOpen} {
            max-height: 120px;
            opacity: 1;
            padding-bottom: 30px;
          }
          .navbar-mobile-preview .${styles.container} { padding: 16px 24px !important; }
        `}</style>
        <div className="navbar-mobile-preview" style={{ maxWidth: 375, height: 200 }}>
          <Story />
        </div>
      </>
    ),
  ],
}
