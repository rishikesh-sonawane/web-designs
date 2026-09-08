"use client";
import { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";

export default function SkeletonImage({ src, alt, ...props }: ImageProps & { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: "var(--color-limestone)" }}>
      {!loaded && !error && (
        <div className="skeleton-pulse" style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, var(--color-limestone) 25%, rgba(249,248,246,0.04) 50%, var(--color-limestone) 75%)",
          backgroundSize: "200% 100%",
          animation: "skeleton 1.5s ease-in-out infinite",
        }} />
      )}
      {error ? (
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, color: "var(--color-bronze)", letterSpacing: "0.1em", textTransform: "uppercase",
        }}>
          Image unavailable
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          {...props}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          style={{ ...props.style, opacity: loaded ? 1 : 0, transition: "opacity 0.4s ease" }}
        />
      )}
    </div>
  );
}
