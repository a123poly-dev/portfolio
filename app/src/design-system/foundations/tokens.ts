// Reads the design tokens straight from the SCSS sources, so the Foundations
// docs in Storybook always match what the site uses.
import colorsScss from "../../styles/colors.scss?raw"
import typographyScss from "../../styles/typography.scss?raw"
import synthuxScss from "../../components/case/synthux/Synthux.module.scss?raw"

export type TToken = { name: string; value: string; note?: string }

// `--name: value; // note` lines inside one selector block
const readBlock = (scss: string, selector: string): TToken[] => {
  const start = scss.indexOf(`${selector} {`)
  if (start < 0) return []
  const end = scss.indexOf("\n}", start)
  const body = scss.slice(start + selector.length + 2, end)
  const tokens: TToken[] = []
  const lines = body.split("\n").map((l) => l.trim())
  lines.forEach((line, i) => {
    const decl = line.match(/^(--[\w-]+):\s*([^;]+);\s*(?:\/\/\s*(.+))?$/)
    if (!decl) return
    // A comment line above counts as this token's note only when the token
    // stands alone (blank line after it); otherwise it is a group heading.
    const above = lines[i - 1]?.match(/^\/\/\s*(.+)$/)?.[1]
    const alone = !lines[i + 1]
    tokens.push({
      name: decl[1],
      value: decl[2].trim(),
      note: decl[3] ?? (alone ? above : undefined),
    })
  })
  return tokens
}

export const lightColors = readBlock(colorsScss, ":root")
export const darkColors = readBlock(colorsScss, ':root[data-theme="dark"]')

const isLiteral = (v: string) => /^(#|rgb|hsl)/.test(v)

// Follows var(--x) through the light block, then the dark overrides
export const resolveColor = (value: string, theme: "light" | "dark"): string => {
  const ref = value.match(/^var\((--[\w-]+)\)$/)
  if (!ref) return value
  const pick = (list: TToken[]) => list.find((t) => t.name === ref[1])?.value
  const next = (theme === "dark" && pick(darkColors)) || pick(lightColors)
  return next ? resolveColor(next, theme) : value
}

// Palette = literal colours; roles = tokens that point at another token
export const paletteTokens = lightColors.filter(
  (t) => isLiteral(t.value) && !t.name.startsWith("--glass")
)
export const glassTokens = lightColors.filter((t) => t.name.startsWith("--glass"))
export const roleTokens = lightColors.filter((t) => !isLiteral(t.value))

export const darkValue = (name: string): string | undefined =>
  darkColors.find((t) => t.name === name)?.value

// Case aliases: the colour lines of .page in Synthux.module.scss
export const caseColorTokens = readBlock(synthuxScss, ".page").filter((t) =>
  t.value.startsWith("var(--")
)

export type TTextStyle = {
  mixin: string
  size: number
  lineHeight: number
  weight: number
  letterSpacing: number
  uppercase: boolean
  note?: string
}

// @mixin name { @include -base(size, line, weight); ... } from typography.scss
export const textStyles: TTextStyle[] = (() => {
  const out: TTextStyle[] = []
  const re = /(?:\/\/\s*([^\n]+)\n)?@mixin ([a-z][\w-]*)(\(([^)]*)\))?\s*\{([\s\S]*?)\}\n/g
  let m: RegExpExecArray | null
  while ((m = re.exec(typographyScss))) {
    const [, note, mixin, , params = "", body] = m
    const base = body.match(/-base\(\s*(\d+)px,\s*(\d+)px(?:,\s*([^)]+))?\)/)
    if (!base) continue
    let weight = base[3]?.trim() ?? "400"
    // A weight parameter such as ($weight: 400) uses its default here
    if (weight.startsWith("$")) {
      weight = params.match(/:\s*(\d+)/)?.[1] ?? "400"
    }
    const ls = body.match(/letter-spacing:\s*([\d.]+)px/)
    out.push({
      mixin,
      size: Number(base[1]),
      lineHeight: Number(base[2]),
      weight: Number(weight),
      letterSpacing: ls ? Number(ls[1]) : 0,
      uppercase: /text-transform:\s*uppercase/.test(body),
      note,
    })
  }
  return out
})()

// --sx-fs-N / --sx-lh-N pairs from the case page
export const caseTypeScale = (() => {
  const tokens = readBlock(synthuxScss, ".page")
  return tokens
    .filter((t) => t.name.startsWith("--sx-fs-"))
    .map((t) => {
      const step = t.name.replace("--sx-fs-", "")
      const lh = tokens.find((x) => x.name === `--sx-lh-${step}`)
      return { step, size: t.value, lineHeight: lh?.value ?? "" }
    })
})()
