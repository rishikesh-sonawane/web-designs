"use client";
import { useState, useRef, useEffect } from "react";

export interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [contentHeights, setContentHeights] = useState<number[]>([]);

  useEffect(() => {
    const heights = contentRefs.current.map((el) => el?.scrollHeight ?? 0);
    setContentHeights(heights);
  }, [items]);

  return (
    <div role="list" style={{ borderTop: "0.5px solid rgba(249,248,246,0.08)" }}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const height = contentHeights[i] || 0;
        return (
          <div key={i} role="listitem" style={{ borderBottom: "0.5px solid rgba(249,248,246,0.08)" }}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              style={{
                width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "24px 0", background: "none", border: "none", cursor: "pointer",
                textAlign: "left", gap: 16,
              }}
            >
              <span style={{
                fontFamily: "var(--font-display)", fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                fontWeight: 300, color: "var(--color-charcoal)", lineHeight: 1.3,
              }}>
                {item.question}
              </span>
              <span style={{
                fontSize: 18, color: "var(--color-bronze)", flexShrink: 0,
                transform: isOpen ? "rotate(45deg)" : "none",
                transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
              }}>
                +
              </span>
            </button>
            <div
              role="region"
              aria-hidden={!isOpen}
              ref={(el) => { contentRefs.current[i] = el; }}
              style={{
                height: isOpen ? height : 0,
                overflow: "hidden",
                transition: "height 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <p style={{
                fontFamily: "var(--font-body)", fontSize: 14,
                color: "var(--color-bronze)", lineHeight: 1.7,
                paddingBottom: 24,
                maxWidth: "60ch",
              }}>
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
