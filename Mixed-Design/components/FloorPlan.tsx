"use client";
import { useState } from "react";

export default function FloorPlan({ propertyName, area, bedrooms, bathrooms }: {
  propertyName: string; area: number; bedrooms: number; bathrooms: number;
}) {
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const rooms = [
    { id: "living", name: "Living", x: 10, y: 10, w: 40, h: 30, area: 65 },
    { id: "kitchen", name: "Kitchen", x: 50, y: 10, w: 25, h: 20, area: 28 },
    { id: "dining", name: "Dining", x: 50, y: 30, w: 25, h: 15, area: 22 },
    { id: "master", name: "Master Suite", x: 10, y: 40, w: 30, h: 25, area: 48 },
    { id: "bed2", name: "Bedroom 2", x: 40, y: 45, w: 20, h: 18, area: 24 },
    { id: "bed3", name: "Bedroom 3", x: 60, y: 45, w: 20, h: 18, area: 24 },
    { id: "bath1", name: "Bath 1", x: 10, y: 65, w: 12, h: 12, area: 10 },
    { id: "bath2", name: "Bath 2", x: 22, y: 65, w: 12, h: 12, area: 10 },
    { id: "terrace", name: "Terrace", x: 34, y: 63, w: 46, h: 16, area: 42 },
  ];

  return (
    <div>
      <p className="overline" style={{ marginBottom: 16 }}>Floor Plan</p>
      <h3 className="display display--medium" style={{ marginBottom: 8 }}>
        {propertyName}
      </h3>
      {hoveredRoom && (
        <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--color-bronze)", marginBottom: 24 }}>
          {hoveredRoom}
        </p>
      )}
      <div style={{
        border: "0.5px solid rgba(249,248,246,0.08)",
        padding: 32,
        background: "var(--color-limestone)"
      }}>
        <svg viewBox="0 0 100 85" style={{ width: "100%", height: "auto" }} aria-label={`Floor plan for ${propertyName}`}>
          {rooms.map((room) => (
            <g
              key={room.id}
              onMouseEnter={() => setHoveredRoom(room.name)}
              onMouseLeave={() => setHoveredRoom(null)}
              style={{ cursor: "pointer" }}
            >
              <rect
                x={room.x} y={room.y} width={room.w} height={room.h}
                fill={hoveredRoom === room.name ? "rgba(168,181,164,0.06)" : "transparent"}
                stroke="rgba(249,248,246,0.15)"
                strokeWidth="0.2"
                style={{ transition: "fill 0.3s ease" }}
              />
              <text
                x={room.x + room.w / 2} y={room.y + room.h / 2 - 1}
                textAnchor="middle" dominantBaseline="middle"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "2.5px",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fill: "var(--color-bronze)"
                }}
              >
                {room.name}
              </text>
              <text
                x={room.x + room.w / 2} y={room.y + room.h / 2 + 3}
                textAnchor="middle" dominantBaseline="middle"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "2px",
                  fill: "var(--color-bronze)",
                  opacity: 0.6
                }}
              >
                {room.area} m²
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
