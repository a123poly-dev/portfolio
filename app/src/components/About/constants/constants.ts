import { TIconName } from "@design-system/common/Icons"
import type { TTagProps } from "@design-system/common/Tag"

export const SKILLS: TTagProps[] = [
  { label: "Product Design", color: "green" },
  { label: "UX", color: "green" },
  { label: "UI", color: "green" },
  { label: "Design System", color: "green" },
  { label: "Accessibility (WCAG 2.1)", color: "green" },
  { label: "Prototyping", color: "green" },
  { label: "Information Architecture", color: "green" },
  { label: "Responsive Design", color: "green" },
  { label: "Data Visualization", color: "green" },
  { label: "Design Specifications", color: "green" },
]

export const TOOLS: TTagProps[] = [
  { label: "Figma", color: "blue" },
  { label: "Claude Code", color: "blue" },
  { label: "Cursor", color: "blue" },
  { label: "Claude", color: "blue" },
  { label: "ChatGPT", color: "blue" },
  { label: "Miro", color: "blue" },
  { label: "GitHub", color: "blue" },
  { label: "HTML", color: "blue" },
  { label: "CSS", color: "blue" },
]

export const METHODS: TTagProps[] = [
  { label: "User Interviews", color: "orange" },
  { label: "Usability Testing", color: "orange" },
  { label: "JTBD", color: "orange" },
  { label: "CJM", color: "orange" },
  { label: "A/B Testing", color: "orange" },
  { label: "Card Sorting", color: "orange" },
  { label: "Workshop Facilitation", color: "orange" },
  { label: "Agile/Scrum", color: "orange" },
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
