"use client";
import { useState, useEffect } from "react";

export default function PageLoader() {
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 1400);
    const t2 = setTimeout(() => setGone(true), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      id="page-loader"
      className={fading ? "fade-out" : ""}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "var(--color-bone)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}
    >
      <style>{`
        #page-loader.fade-out { opacity: 0; pointer-events: none; transition: opacity 0.6s ease-out; }
        #page-loader .loader-line {
          width: 0; height: 0.5px; background: var(--color-charcoal);
          animation: loaderLine 0.8s ease-out 0.1s forwards;
        }
        #page-loader .loader-letter {
          display: inline-block; opacity: 0; transform: translateY(20px);
          animation: loaderLetter 0.5s ease-out forwards;
        }
        #page-loader .loader-letter:nth-child(1) { animation-delay: 0.2s; }
        #page-loader .loader-letter:nth-child(2) { animation-delay: 0.3s; }
        #page-loader .loader-letter:nth-child(3) { animation-delay: 0.4s; }
        #page-loader .loader-letter:nth-child(4) { animation-delay: 0.5s; }
        #page-loader .loader-letter:nth-child(5) { animation-delay: 0.6s; }
        #page-loader .loader-sub {
          opacity: 0; transform: translateY(8px);
          animation: loaderLetter 0.5s ease-out 0.8s forwards;
        }
        @keyframes loaderLine {
          to { width: 48px; }
        }
        @keyframes loaderLetter {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="loader-line" />

      <div style={{ display: "flex", marginTop: 20, overflow: "hidden" }}>
        {"STONE".split("").map((char, i) => (
          <span
            key={i}
            className="loader-letter"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 300,
              letterSpacing: "0.2em",
              color: "var(--color-charcoal)",
            }}
          >
            {char}
          </span>
        ))}
      </div>

      <p
        className="loader-sub"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 9,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--color-bronze)",
          marginTop: 16,
        }}
      >
        Architectural Residences
      </p>
    </div>
  );
}
