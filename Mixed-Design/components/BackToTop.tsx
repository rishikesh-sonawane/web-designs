"use client";
import { useState, useEffect } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollUp}
      aria-label="Back to top"
      style={{
        position: "fixed", bottom: 32, right: 32, zIndex: 150,
        width: 44, height: 44,
        background: "rgba(26,26,26,0.8)", backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: "0.5px solid rgba(249,248,246,0.1)",
        color: "var(--color-charcoal)", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none",
        transform: visible ? "none" : "translateY(16px)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M8 12V4M4 7l4-4 4 4" />
      </svg>
    </button>
  );
}
