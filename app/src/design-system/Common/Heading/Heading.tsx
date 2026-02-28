import { createElement } from "react"
import type { PropsWithChildren } from "react"
import cn from "classnames"
import styles from "./Heading.module.scss"

export type THeadingType =
  | "heading-h1"
  | "heading-h2"
  | "heading-h3"
  | "heading-h4"
  | "heading-h5"
  | "heading-h6"

type THeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

type THeadingProps = {
  as?: THeadingTag
  type: THeadingType
  className?: string
} & PropsWithChildren

const typeClassMap: Record<THeadingType, string> = {
  "heading-h1": styles.headingH1,
  "heading-h2": styles.headingH2,
  "heading-h3": styles.headingH3,
  "heading-h4": styles.headingH4,
  "heading-h5": styles.headingH5,
  "heading-h6": styles.headingH6,
}

const defaultTagMap: Record<THeadingType, THeadingTag> = {
  "heading-h1": "h1",
  "heading-h2": "h2",
  "heading-h3": "h3",
  "heading-h4": "h4",
  "heading-h5": "h5",
  "heading-h6": "h6",
}

export const Heading = ({ as, type, className, children }: THeadingProps) => {
  const tag = as ?? defaultTagMap[type]

  return createElement(tag, { className: cn(typeClassMap[type], className) }, children)
}
