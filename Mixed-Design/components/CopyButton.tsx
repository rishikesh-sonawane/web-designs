"use client";
import { useState } from "react";

export default function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      aria-label={label || `Copy ${text}`}
      style={{
        background: "none", border: "none", cursor: "pointer",
        fontFamily: "var(--font-body)", fontSize: 11,
        letterSpacing: "0.1em", textTransform: "uppercase",
        color: copied ? "var(--color-moss)" : "var(--color-bronze)",
        padding: 0, transition: "color 0.3s ease",
        display: "inline-flex", alignItems: "center", gap: 6,
      }}
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
