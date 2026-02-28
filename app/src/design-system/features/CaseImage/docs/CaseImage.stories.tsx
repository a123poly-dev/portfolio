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
    src: "https://cdn.prod.website-files.com/671d6564c823e48560f52c25/6720992e28224c77fd4e9a8b_cover-pulkovo.webp",
    alt: "Pulkovo airport project cover",
    width: 1100,
  },
}

export const WithCaption: Story = {
  args: {
    src: "https://cdn.prod.website-files.com/671d6564c823e48560f52c25/6720992e28224c77fd4e9a8b_cover-pulkovo.webp",
    alt: "Pulkovo airport project cover",
    width: 1100,
    caption: "Figure 1 — Example image with caption",
  },
}
