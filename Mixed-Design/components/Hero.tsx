import Link from "next/link";
import Image from "next/image";

interface HeroProps {
  image: string;
  overline?: string;
  title: string;
  description?: string;
  cta?: { label: string; href: string };
  height?: string;
}

export default function Hero({
  image,
  overline,
  title,
  description,
  cta,
  height = "100vh",
}: HeroProps) {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height,
        minHeight: 500,
        overflow: "hidden",
      }}
    >
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center" }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(26,26,26,0.45) 0%, rgba(26,26,26,0.05) 50%, transparent 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "clamp(32px, 6vw, 80px) clamp(20px, 4vw, 48px)",
          maxWidth: "var(--wrap)",
          margin: "0 auto",
        }}
      >
        {overline && (
          <span
            className="kicker"
            style={{ color: "rgba(249,248,246,0.7)", marginBottom: 16, display: "block" }}
          >
            {overline}
          </span>
        )}
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.5rem, 7vw, 6rem)",
            fontWeight: 300,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            color: "#F9F8F6",
            maxWidth: "14ch",
            marginBottom: description ? 20 : 0,
          }}
        >
          {title}
        </h1>
        {description && (
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1rem, 1.6vw, 1.125rem)",
              color: "rgba(249,248,246,0.75)",
              maxWidth: "50ch",
              lineHeight: 1.6,
              marginBottom: 32,
            }}
          >
            {description}
          </p>
        )}
        {cta && (
          <Link
            href={cta.href}
            className="text-link"
            style={{ color: "#F9F8F6", borderColor: "rgba(249,248,246,0.3)" }}
          >
            {cta.label} <span className="arr" aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </section>
  );
}
