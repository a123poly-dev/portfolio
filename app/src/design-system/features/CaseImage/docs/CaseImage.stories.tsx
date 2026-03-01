import type { Meta, StoryObj } from "@storybook/react-vite"
import { CaseImage } from ".."

const meta: Meta<typeof CaseImage> = {
  title: "Features/CaseImage",
  component: CaseImage,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof CaseImage>

export const Default: Story = {
  args: {
    src: "https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/64c2d55dd6d587f67ecf6b08_03.png",
    alt: "Alt text for the image",
    width: 534,
  },
}

export const WithCaption: Story = {
  args: {
    src: "https://cdn.prod.website-files.com/6464c7692ca8b8c075cd4223/65e7894ae29d143b915b3739_02_2.png",
    alt: "Alt text for the image with caption",
    width: 1100,
    caption: "Figure 1 — Example image with caption",
  },
}
