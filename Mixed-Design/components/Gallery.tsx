"use client";
import { useState } from "react";
import Image from "next/image";
import Lightbox from "./Lightbox";

export default function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <>
      <div className="gallery-grid">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setSelectedIndex(i)}
            aria-label={`View ${alt} — image ${i + 1} of ${images.length}`}
            className={`gallery-item gallery-item--${i}`}
          >
            <Image
              src={src}
              alt={`${alt} — architectural detail image ${i + 1}`}
              fill
              quality={100}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              style={{
                objectFit: "cover",
                transition: "transform 1.2s cubic-bezier(0.16,1,0.3,1)"
              }}
            />
          </button>
        ))}
      </div>
      {selectedIndex !== null && (
        <Lightbox images={images} alt={alt} initialIndex={selectedIndex} onClose={() => setSelectedIndex(null)} />
      )}
    </>
  );
}
