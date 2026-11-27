import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  caseColorTokens,
  darkValue,
  glassTokens,
  paletteTokens,
  resolveColor,
  roleTokens,
} from "../tokens"
import type { TToken } from "../tokens"
import { Muted, Section, mono } from "./ui"

const meta: Meta = {
  title: "Foundations/Colors",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Every colour on the site. Tokens are read from `styles/colors.scss` (light on `:root`, dark on `:root[data-theme=\"dark\"]`), so this page changes when the file does. Use tokens as `var(--name)`; the theme switch swaps them.",
      },
    },
  },
}

export default meta

type Story = StoryObj

const Chip = ({ color, label }: { color: string; label: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
    <span
      style={{
        flex: "none",
        width: 40,
        height: 40,
        borderRadius: 10,
        background: color,
        boxShadow: "inset 0 0 0 1px rgb(127 127 127 / 25%)",
      }}
    />
    <Muted>{label}</Muted>
  </div>
)

const cellStyle = { padding: "12px 0", borderBottom: "1px solid var(--line)" }

// Light and dark swatches side by side. Each half sits on its own page colour.
const ThemeTable = ({ tokens }: { tokens: TToken[] }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "minmax(140px, 1.2fr) 1fr 1fr",
      columnGap: 16,
      alignItems: "center",
    }}
  >
    <Muted>Token</Muted>
    <Muted>Light</Muted>
    <Muted>Dark</Muted>
    {tokens.map((t) => {
      const light = resolveColor(t.value, "light")
      const dark = resolveColor(darkValue(t.name) ?? t.value, "dark")
      return (
        <div key={t.name} style={{ display: "contents" }}>
          <div style={cellStyle}>
            <code style={{ ...mono, fontWeight: 600 }}>{t.name}</code>
            {t.value.startsWith("var(") && <div><Muted>= {t.value}</Muted></div>}
            {t.note && (
              <div style={{ fontSize: 12, lineHeight: "16px", color: "var(--text-secondary)" }}>
                {t.note}
              </div>
            )}
          </div>
          <div style={cellStyle}>
            <Chip color={light} label={light} />
          </div>
          <div style={cellStyle}>
            <Chip color={dark} label={dark === light ? `${dark} (same)` : dark} />
          </div>
        </div>
      )
    })}
  </div>
)

/** Base palette: the literal colours, light and dark. */
export const Palette: Story = {
  render: () => (
    <Section>
      <ThemeTable tokens={paletteTokens} />
    </Section>
  ),
}

/** Role tokens point at a palette colour. */
export const Roles: Story = {
  render: () => (
    <Section>
      <ThemeTable tokens={roleTokens} />
    </Section>
  ),
}

/** Glass tints, used by styles/glass.scss. Shown over a pattern so the transparency reads. */
export const Glass: Story = {
  render: () => (
    <Section>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        {glassTokens.flatMap((t) =>
          (["light", "dark"] as const).map((theme) => {
            const value = resolveColor(
              theme === "dark" ? (darkValue(t.name) ?? t.value) : t.value,
              theme
            )
            return (
              <div key={t.name + theme} style={{ width: 220 }}>
                <div
                  style={{
                    height: 96,
                    borderRadius: 16,
                    background:
                      "radial-gradient(circle at 30% 40%, #eadcff 0 36px, transparent 37px), radial-gradient(circle at 72% 64%, #81fdb8 0 28px, transparent 29px), repeating-linear-gradient(45deg, #ccc 0 8px, #eee 8px 16px)",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 16,
                      borderRadius: 9999,
                      background: value,
                      backdropFilter: "blur(12px)",
                    }}
                  />
                </div>
                <div style={{ marginTop: 8 }}>
                  <code style={{ ...mono, fontWeight: 600 }}>{t.name}</code>
                  <div><Muted>{theme}: {value}</Muted></div>
                  {t.note && <div><Muted>{t.note}</Muted></div>}
                </div>
              </div>
            )
          })
        )}
      </div>
    </Section>
  ),
}

const PASTELS = [
  { name: "--c1 lavender", value: "#eadcff", use: "Blob hover fill (BlobHover)" },
  { name: "--c2 mint", value: "#81fdb8", use: "Blob hover fill, mobile menu hover" },
]

const COVERS = [
  { name: "Pulkovo", value: "linear-gradient(#4fd5ff, #58afff)" },
  { name: "Okey app", value: "linear-gradient(135deg, #a1ffa5, #b3ff68)" },
  { name: "PBX", value: "linear-gradient(127deg, #fff170, #ffce4f)" },
  { name: "AI", value: "linear-gradient(127deg, #c1f05a, #95c73c)" },
]

/** Colours outside colors.scss: blob hover pastels and the older work card covers. Same in both themes. */
export const PastelsAndCovers: Story = {
  render: () => (
    <Section>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 24, marginBottom: 24 }}>
        {PASTELS.map((p) => (
          <div key={p.name}>
            <Chip color={p.value} label={`${p.name} ${p.value}`} />
            <div style={{ fontSize: 12, lineHeight: "16px", color: "var(--text-secondary)", marginTop: 4 }}>
              {p.use}. Text on it uses --on-pastel.
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        {COVERS.map((c) => (
          <div key={c.name} style={{ width: 200 }}>
            <div style={{ height: 96, borderRadius: 16, background: c.value }} />
            <div style={{ marginTop: 8, fontSize: 14, lineHeight: "20px" }}>{c.name} cover</div>
            <Muted>{c.value}</Muted>
          </div>
        ))}
      </div>
    </Section>
  ),
}

/** SynthUX case pages alias the site tokens (Synthux.module.scss), so cases follow the theme. */
export const CaseAliases: Story = {
  render: () => (
    <Section>
      <ThemeTable tokens={caseColorTokens} />
    </Section>
  ),
}
