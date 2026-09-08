"use client";
import { useEffect, useRef, createElement, ComponentProps } from "react";

interface SplitTextProps {
  children: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "p" | "span";
  style?: React.CSSProperties;
  delay?: number;
}

export default function SplitText({ children, className = "", tag = "h1", style, delay = 0 }: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.querySelectorAll("[data-char]").forEach((char, i) => {
              (char as HTMLElement).style.transitionDelay = `${delay + i * 40}ms`;
              char.classList.add("is-visible");
            });
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  const chars = children.split("");

  return createElement(
    tag,
    { ref, className: `split-text ${className}`, style },
    chars.map((char, i) => (
      <span
        key={i}
        data-char
        style={{
          display: "inline-block",
          opacity: 0,
          transform: "translateY(16px) rotate(4deg)",
          transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ))
  );
}
