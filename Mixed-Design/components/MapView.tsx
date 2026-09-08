"use client";
import { useEffect, useRef, useState } from "react";

export default function MapView({ lat, lng, name, landmarks }: {
  lat: number; lng: number; name: string; landmarks: { name: string; distance: string }[];
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<unknown>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || !mapRef.current || mapInstance.current) return;
    let cancelled = false;
    const init = async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");
      if (cancelled || !mapRef.current) return;
      const map = L.map(mapRef.current, {
        center: [lat, lng],
        zoom: 13,
        scrollWheelZoom: false,
        attributionControl: false,
      });
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        maxZoom: 19,
      }).addTo(map);
      const icon = L.divIcon({
        className: "",
        html: `<div style="width:10px;height:10px;background:var(--color-charcoal);border:2px solid var(--color-bone);box-shadow:0 1px 4px rgba(0,0,0,0.15)"></div>`,
        iconSize: [10, 10],
        iconAnchor: [5, 5],
      });
      L.marker([lat, lng], { icon }).addTo(map);
      mapInstance.current = map;
    };
    init();
    return () => {
      cancelled = true;
      if (mapInstance.current && typeof mapInstance.current === "object" && "remove" in mapInstance.current) {
        (mapInstance.current as { remove: () => void }).remove();
        mapInstance.current = null;
      }
    };
  }, [mounted, lat, lng]);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "100%",
        minHeight: 400,
        background: "var(--color-limestone)",
      }}
    />
  );
}
