"use client";
import { useState, useRef, useCallback } from "react";

export default function ImageCompare({ beforeSrc, afterSrc, beforeAlt, afterAlt }: {
  beforeSrc: string; afterSrc: string; beforeAlt: string; afterAlt: string;
}) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const onDown = (e: React.MouseEvent | React.TouchEvent) => {
    dragging.current = true;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    updatePosition(clientX);
  };

  const onMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging.current) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    updatePosition(clientX);
  };

  const onUp = () => { dragging.current = false; };

  return (
    <div
      ref={containerRef}
      onMouseDown={onDown}
      onMouseMove={onMove}
      onMouseUp={onUp}
      onMouseLeave={onUp}
      onTouchStart={onDown}
      onTouchMove={onMove}
      onTouchEnd={onUp}
      style={{
        position: "relative", width: "100%", aspectRatio: "16 / 10",
        overflow: "hidden", cursor: "ew-resize", userSelect: "none",
      }}
    >
      {/* After (full) */}
      <img src={afterSrc} alt={afterAlt} draggable={false}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
      {/* Before (clipped) */}
      <div style={{
        position: "absolute", inset: 0,
        width: `${position}%`, overflow: "hidden",
      }}>
        <img src={beforeSrc} alt={beforeAlt} draggable={false}
          style={{ position: "absolute", inset: 0, width: `${100 / (position / 100)}%`, maxWidth: "none", height: "100%", objectFit: "cover" }}
        />
      </div>
      {/* Divider line */}
      <div style={{
        position: "absolute", top: 0, bottom: 0,
        left: `${position}%`, width: 1,
        background: "var(--color-charcoal)",
        transform: "translateX(-50%)",
        zIndex: 2,
      }}>
        {/* Handle */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 40, height: 40, borderRadius: "50%",
          background: "rgba(26,26,26,0.8)",
          border: "0.5px solid rgba(249,248,246,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center",
          backdropFilter: "blur(8px)",
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--color-charcoal)" strokeWidth="1">
            <path d="M5 3L2 8L5 13M11 3L14 8L11 13" />
          </svg>
        </div>
      </div>
      {/* Labels */}
      <span style={{
        position: "absolute", bottom: 12, left: 12, zIndex: 2,
        fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase",
        color: "var(--color-charcoal)", background: "rgba(26,26,26,0.6)",
        padding: "4px 8px", backdropFilter: "blur(4px)",
      }}>Before</span>
      <span style={{
        position: "absolute", bottom: 12, right: 12, zIndex: 2,
        fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase",
        color: "var(--color-charcoal)", background: "rgba(26,26,26,0.6)",
        padding: "4px 8px", backdropFilter: "blur(4px)",
      }}>After</span>
    </div>
  );
}
