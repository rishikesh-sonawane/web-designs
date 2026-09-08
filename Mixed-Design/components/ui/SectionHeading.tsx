interface SectionHeadingProps {
  number: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ number, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="section__head">
      <div>
        <span className="case-hero__num">{number}</span>
        <h2
          className="kicker"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2rem, 4.6vw, 3.5rem)",
            letterSpacing: "-0.02em",
            textTransform: "none",
            color: "var(--color-luxury-text)",
            marginTop: 12,
            fontWeight: 300,
          }}
        >
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="lede" style={{ maxWidth: 52 * 16 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
