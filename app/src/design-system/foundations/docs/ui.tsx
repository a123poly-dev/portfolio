import type { CSSProperties, ReactNode } from "react"

// Small layout helpers for the Foundations pages (docs only)
export const mono: CSSProperties = {
  fontFamily: '"Geist Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
  fontSize: 12,
  lineHeight: "16px",
}

export const Muted = ({ children }: { children: ReactNode }) => (
  <span style={{ ...mono, color: "var(--text-secondary)" }}>{children}</span>
)

export const Section = ({
  title,
  children,
}: {
  title?: string
  children: ReactNode
}) => (
  <div style={{ padding: 24, color: "var(--ink)", fontFamily: "var(--font-family)" }}>
    {title && (
      <h3 style={{ margin: "0 0 16px", fontSize: 14, lineHeight: "20px", fontWeight: 600 }}>
        {title}
      </h3>
    )}
    {children}
  </div>
)

export const Row = ({ children, last }: { children: ReactNode; last?: boolean }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "minmax(140px, 200px) 1fr",
      gap: 24,
      alignItems: "baseline",
      padding: "16px 0",
      borderBottom: last ? undefined : "1px solid var(--line)",
    }}
  >
    {children}
  </div>
)
