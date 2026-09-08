interface SpecsBarProps {
  specs: { label: string; value: string }[];
}

export default function SpecsBar({ specs }: SpecsBarProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${specs.length}, 1fr)`,
        gap: 24,
        padding: "24px 0",
        borderTop: "1px solid var(--color-luxury-border)",
        borderBottom: "1px solid var(--color-luxury-border)",
      }}
    >
      {specs.map((spec) => (
        <div key={spec.label}>
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-sans)",
              fontSize: "0.6875rem",
              fontWeight: 500,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--color-luxury-muted)",
              marginBottom: 4,
            }}
          >
            {spec.label}
          </span>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "1rem",
              fontWeight: 500,
              color: "var(--color-luxury-text)",
            }}
          >
            {spec.value}
          </span>
        </div>
      ))}
    </div>
  );
}
