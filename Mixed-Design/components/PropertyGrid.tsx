"use client";

import { useState } from "react";
import PropertyCard from "./PropertyCard";
import { Property } from "@/data/properties";

interface PropertyGridProps {
  properties: Property[];
}

const filters = ["All", "Villas", "Apartments", "Retreats"] as const;
type FilterType = (typeof filters)[number];

const filterMap: Record<FilterType, string | null> = {
  All: null,
  Villas: "villa",
  Apartments: "apartment",
  Retreats: "retreat",
};

export default function PropertyGrid({ properties }: PropertyGridProps) {
  const [active, setActive] = useState<FilterType>("All");

  const filtered =
    filterMap[active] === null
      ? properties
      : properties.filter((p) => p.type === filterMap[active]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: 48,
        }}
      >
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className="chip"
            style={{
              cursor: "pointer",
              background: active === f ? "var(--color-luxury-text)" : "transparent",
              color: active === f ? "var(--color-luxury-bg)" : "var(--color-luxury-muted)",
              borderColor: active === f ? "var(--color-luxury-text)" : "var(--color-luxury-border)",
              transition: "all 0.2s ease",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="muted" style={{ padding: "48px 0", textAlign: "center" }}>
          No residences match this filter.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: 24,
          }}
        >
          {filtered.map((property) => (
            <PropertyCard key={property.slug} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}
