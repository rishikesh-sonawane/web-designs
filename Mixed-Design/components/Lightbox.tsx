"use client";
import { useEffect, useCallback, useState } from "react";
import Image from "next/image";

export default function Lightbox({ images, alt, initialIndex, onClose }: {
  images: string[]; alt: string; initialIndex: number; onClose: () => void;
}) {
  const [current, setCurrent] = useState(initialIndex);
  const goNext = useCallback(() => setCurrent((p) => (p + 1) % images.length), [images.length]);
  const goPrev = useCallback(() => setCurrent((p) => (p - 1 + images.length) % images.length), [images.length]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [onClose, goNext, goPrev]);

  return (
    <div role="dialog" aria-label="Image lightbox" onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0, 0, 0, 0.96)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
    }}>
      <button onClick={onClose} aria-label="Close" style={{
        position: "absolute", top: 32, right: 32, background: "none", border: "none",
        color: "rgba(249,248,246,0.5)", fontSize: 11, cursor: "pointer", padding: 8,
        fontFamily: "var(--font-body)", letterSpacing: "0.15em", textTransform: "uppercase",
      }}>Close ✕</button>

      <button onClick={(e) => { e.stopPropagation(); goPrev(); }} aria-label="Previous" style={{
        position: "absolute", left: 24, background: "none", border: "none",
        color: "rgba(249,248,246,0.4)", fontSize: 24, cursor: "pointer", padding: 24,
      }}>←</button>

      <div style={{ position: "relative", width: "80vw", height: "80vh", maxWidth: 1200 }} onClick={(e) => e.stopPropagation()}>
        <Image src={images[current]} alt={`${alt} — ${current + 1}`} fill sizes="80vw" style={{ objectFit: "contain" }} />
      </div>

      <button onClick={(e) => { e.stopPropagation(); goNext(); }} aria-label="Next" style={{
        position: "absolute", right: 24, background: "none", border: "none",
        color: "rgba(249,248,246,0.4)", fontSize: 24, cursor: "pointer", padding: 24,
      }}>→</button>

      <div style={{
        position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
        fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: "0.15em",
        textTransform: "uppercase", color: "rgba(249,248,246,0.35)",
      }}>
        {String(current + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
      </div>
    </div>
  );
}
