"use client";
import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("stone-cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("stone-cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("stone-cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div role="dialog" aria-label="Cookie consent" style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 200,
      background: "#111111", borderTop: "0.5px solid rgba(249,248,246,0.08)",
      padding: "20px var(--gutter)",
    }}>
      <div style={{
        maxWidth: "var(--wrap)", margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 16,
      }}>
        <p style={{
          fontFamily: "var(--font-body)", fontSize: 13,
          color: "var(--color-bronze)", lineHeight: 1.6, flex: "1 1 400px",
        }}>
          We use essential cookies to ensure the site works properly.
          No tracking, no analytics, no third-party scripts.
        </p>
        <div style={{ display: "flex", gap: 16, flexShrink: 0 }}>
          <button onClick={decline} className="editorial-link" style={{ color: "var(--color-bronze)", fontSize: 9 }}>
            Decline
          </button>
          <button onClick={accept} className="editorial-link" style={{ fontSize: 9 }}>
            Accept <span className="arrow" />
          </button>
        </div>
      </div>
    </div>
  );
}
