import type { Meta, StoryObj } from "@storybook/react-vite"
import type { ReactNode } from "react"
import { caseTypeScale, textStyles } from "../tokens"
import { Muted, Row, Section, mono } from "./ui"

const meta: Meta = {
  title: "Foundations/Typography",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Fonts, font pairs and text styles. Text styles are read from `styles/typography.scss`, so this page changes when the file does. In SCSS use `@use \"styles/typography\" as type;` then `@include type.h2;`.",
      },
    },
  },
}

export default meta

type Story = StoryObj

const SAMPLE = "Holistic product designer who speaks code and data"

const FAMILIES = [
  {
    name: "Inter Tight",
    css: '"Inter Tight", sans-serif',
    token: "var(--font-family)",
    weights: [300, 400, 500, 600, 700],
    use: "The whole portfolio: headings, body, nav, buttons, case text.",
  },
  {
    name: "Geist",
    css: '"Geist", ui-sans-serif, system-ui, sans-serif',
    token: "—",
    weights: [400, 500, 600],
    use: "SynthUX product UI inside the case mockups (report, flows, DS demos).",
  },
  {
    name: "Geist Mono",
    css: '"Geist Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
    token: "—",
    weights: [400],
    use: "Tokens, code and numbers in the case mockups (token playground, plan run, agent flow).",
  },
]

/** The three web fonts the site loads, in every weight it loads. */
export const FontFamilies: Story = {
  render: () => (
    <Section>
      {FAMILIES.map((f, i) => (
        <Row key={f.name} last={i === FAMILIES.length - 1}>
          <div>
            <div style={{ fontFamily: f.css, fontSize: 24, lineHeight: "32px", fontWeight: 600 }}>
              {f.name}
            </div>
            <Muted>{f.token}</Muted>
            <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: "20px", color: "var(--text-secondary)" }}>
              {f.use}
            </p>
          </div>
          <div style={{ display: "grid", gap: 8 }}>
            {f.weights.map((w) => (
              <div key={w} style={{ display: "flex", gap: 16, alignItems: "baseline" }}>
                <span style={{ ...mono, width: 32, color: "var(--text-secondary)" }}>{w}</span>
                <span style={{ fontFamily: f.css, fontWeight: w, fontSize: 20, lineHeight: "28px" }}>
                  {SAMPLE}
                </span>
              </div>
            ))}
          </div>
        </Row>
      ))}
    </Section>
  ),
}

const inter = '"Inter Tight", sans-serif'
const geist = '"Geist", ui-sans-serif, system-ui, sans-serif'
const geistMono = '"Geist Mono", ui-monospace, SFMono-Regular, Menlo, monospace'

const Card = ({ label, children }: { label: string; children: ReactNode }) => (
  <div
    style={{
      flex: "1 1 320px",
      border: "1px solid var(--line)",
      borderRadius: 16,
      padding: 24,
      background: "var(--surface)",
    }}
  >
    <div style={{ ...mono, color: "var(--text-secondary)", marginBottom: 16 }}>{label}</div>
    {children}
  </div>
)

/** Which fonts are used together. */
export const FontPairs: Story = {
  render: () => (
    <Section>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        <Card label="Portfolio · Inter Tight + Inter Tight">
          <div style={{ fontFamily: inter, fontSize: 32, lineHeight: "40px", fontWeight: 600 }}>
            Selected work
          </div>
          <p style={{ fontFamily: inter, fontSize: 16, lineHeight: "24px", margin: "8px 0 0", color: "var(--text-secondary)" }}>
            One family for headings and body. Hierarchy comes from size and weight
            (600 for headings, 400 for text, 300 for the hero lead).
          </p>
        </Card>
        <Card label="SynthUX case · Inter Tight + Geist + Geist Mono">
          <div style={{ fontFamily: inter, fontSize: 28, lineHeight: "36px", fontWeight: 600 }}>
            Designing the report
          </div>
          <p style={{ fontFamily: inter, fontSize: 16, lineHeight: "24px", margin: "8px 0 16px", color: "var(--text-secondary)" }}>
            Case text stays in Inter Tight; the product it shows speaks Geist.
          </p>
          <div
            style={{
              fontFamily: geist,
              fontSize: 14,
              lineHeight: "20px",
              border: "1px solid var(--line)",
              borderRadius: 12,
              padding: 16,
              background: "var(--surface-2)",
            }}
          >
            <div style={{ fontWeight: 600 }}>Usability report</div>
            <div style={{ color: "var(--text-secondary)" }}>12 participants · 3 segments</div>
            <code style={{ fontFamily: geistMono, fontSize: 12, display: "block", marginTop: 8 }}>
              --color-text-primary: #161718
            </code>
          </div>
        </Card>
      </div>
    </Section>
  ),
}

/** Every text style in typography.scss, with its mixin. */
export const TextStyles: Story = {
  render: () => (
    <Section>
      {textStyles.map((s, i) => (
        <Row key={s.mixin} last={i === textStyles.length - 1}>
          <div>
            <code style={{ ...mono, fontWeight: 600 }}>type.{s.mixin}</code>
            <div>
              <Muted>
                {s.size}/{s.lineHeight} · {s.weight}
                {s.letterSpacing ? ` · ls ${s.letterSpacing}px` : ""}
                {s.uppercase ? " · upper" : ""}
              </Muted>
            </div>
            {s.note && (
              <div style={{ fontSize: 12, lineHeight: "16px", color: "var(--text-secondary)", marginTop: 4 }}>
                {s.note}
              </div>
            )}
          </div>
          <div
            style={{
              fontFamily: "var(--font-family)",
              fontSize: s.size,
              lineHeight: `${s.lineHeight}px`,
              fontWeight: s.weight,
              letterSpacing: s.letterSpacing,
              textTransform: s.uppercase ? "uppercase" : undefined,
              overflowWrap: "anywhere",
            }}
          >
            {s.size >= 28 ? "Hey, I'm Polina" : SAMPLE}
          </div>
        </Row>
      ))}
    </Section>
  ),
}

/** Size and line-height pairs of the SynthUX case pages (Synthux.module.scss). */
export const CaseTypeScale: Story = {
  render: () => (
    <Section>
      {caseTypeScale.map((s, i) => (
        <Row key={s.step} last={i === caseTypeScale.length - 1}>
          <div>
            <code style={{ ...mono, fontWeight: 600 }}>--sx-fs-{s.step}</code>
            <div>
              <Muted>
                {s.size} / {s.lineHeight}
              </Muted>
            </div>
          </div>
          <div style={{ fontSize: s.size, lineHeight: s.lineHeight }}>{SAMPLE}</div>
        </Row>
      ))}
    </Section>
  ),
}
