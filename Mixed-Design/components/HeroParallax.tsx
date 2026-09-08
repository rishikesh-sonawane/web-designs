"use client";
import { useParallax } from "@/hooks/useParallax";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

export default function HeroParallax() {
  const offset = useParallax(0.4);

  return (
    <section className="hero-section">
      <div
        className="hero-parallax"
        style={{ transform: `translate3d(0, ${-offset}px, 0)` }}
      >
        <Image
          src="/architecture/hero-new.jpg"
          alt="Modern architectural residence with glass and concrete facade — STONE luxury properties"
          fill
          quality={100}
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="hero-gradient" />

      <div className="cinematic-overlay cinematic-overlay--top-left">
        <span style={{ opacity: 0.5 }}>No. 001</span><br />
        <span style={{ opacity: 0.35 }}>45.987° N, 9.257° E</span>
      </div>

      <div className="cinematic-overlay cinematic-overlay--top-right">
        <span style={{ opacity: 0.5 }}>Est. 2024</span><br />
        <span style={{ opacity: 0.35 }}>Lake Como, Italy</span>
      </div>

      <div className="hero-panel">
        <Reveal delay={300}>
          <p className="overline" style={{ marginBottom: 16, color: "rgba(249,248,246,0.5)" }}>
            Architectural Residences
          </p>
        </Reveal>
        <Reveal delay={500}>
          <h1 className="display display--hero" style={{ color: "#F9F8F6", marginBottom: 16 }}>
            STONE
          </h1>
        </Reveal>
        <Reveal delay={700}>
          <p className="hero-subtitle">
            Luxury architectural residences designed to endure.
            Villas, apartments, and retreats across Europe.
          </p>
        </Reveal>
      </div>

      <div className="scroll-indicator">
        <span className="overline" style={{ color: "rgba(249,248,246,0.3)", fontSize: 9, letterSpacing: "0.2em" }}>
          Scroll
        </span>
        <div className="scroll-line">
          <div className="scroll-dot" />
        </div>
      </div>
    </section>
  );
}
