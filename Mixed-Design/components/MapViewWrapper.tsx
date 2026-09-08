"use client";

import dynamic from "next/dynamic";

const MapView = dynamic(() => import("./MapView"), { ssr: false });

export default function MapViewWrapper({ center, landmarks }: {
  center: [number, number];
  landmarks: { name: string; distance: string }[];
}) {
  return <MapView lat={center[0]} lng={center[1]} name="" landmarks={landmarks} />;
}
