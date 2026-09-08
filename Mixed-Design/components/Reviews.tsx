import Reveal from "@/components/ui/Reveal";

const reviews = [
  {
    quote: "STONE found us a home we didn't know existed. The attention to architectural detail was unlike anything we'd experienced.",
    author: "Marcus & Elena",
    location: "Villa Serra, Lake Como",
    year: "2024",
  },
  {
    quote: "From the first conversation to the final walkthrough, every moment felt considered. This is how property should be bought.",
    author: "James Whitfield",
    location: "Casa Lago, Amalfi Coast",
    year: "2024",
  },
  {
    quote: "We weren't looking for a house. We were looking for a statement. STONE understood the difference.",
    author: "Sofia & Andreas Keller",
    location: "Residenza Bosco, Zurich",
    year: "2023",
  },
];

export default function Reviews() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
      {reviews.map((review, i) => (
        <Reveal key={i}>
          <div style={{ borderTop: "0.5px solid rgba(249,248,246,0.08)", paddingTop: 24 }}>
            <blockquote style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
              fontWeight: 300, lineHeight: 1.4, color: "var(--color-charcoal)",
              marginBottom: 20, fontStyle: "normal",
            }}>
              &ldquo;{review.quote}&rdquo;
            </blockquote>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
              <span style={{
                fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500,
                color: "var(--color-charcoal)",
              }}>
                {review.author}
              </span>
              <span className="overline" style={{ fontSize: 9 }}>
                {review.location} — {review.year}
              </span>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
