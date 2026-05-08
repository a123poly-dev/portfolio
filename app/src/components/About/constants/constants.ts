import { TIconName } from "@design-system/common/Icons"
import type { TTagProps } from "@design-system/common/Tag"

export const SKILLS: TTagProps[] = [
  { label: "Product design", color: "green" },
  { label: "Research", color: "green" },
  { label: "UX", color: "green" },
  { label: "UI", color: "red" },
  { label: "HIG", color: "blue" },
  { label: "Material design", color: "blue" },
  { label: "Graphic Design", color: "red" },
  { label: "Prototyping", color: "purple" },
  { label: "Animation", color: "purple" },
  { label: "B2B", color: "orange" },
  { label: "B2C", color: "orange" },
]

export const TOOLS: TTagProps[] = [
  { label: "Figma", color: "purple" },
  { label: "Adobe Cloud", color: "purple" },
  { label: "Miro", color: "green" },
  { label: "Git", color: "blue" },
  { label: "HTML", color: "blue" },
  { label: "CSS", color: "blue" },
]

export const SOCIAL_URLS: { icon: TIconName; href: string; label: string }[] = [
  {
    icon: "linkedin",
    href: "https://www.linkedin.com/in/apolina/",
    label: "LinkedIn",
  },
  {
    icon: "telegram",
    href: "https://t.me/aapoly",
    label: "Telegram",
  },
  {
    icon: "instagram",
    href: "https://www.instagram.com/polinakzz/",
    label: "Instagram",
  },
]

export const CV_DOWNLOAD_URL =
  "https://drive.google.com/file/d/1ZaqmSMeXuD9PbIjfN5TxWLkOe4pCB2kP/view?usp=sharing"
