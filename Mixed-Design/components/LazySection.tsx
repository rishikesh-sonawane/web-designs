"use client";
import { useRef, useEffect, ReactNode, useState } from "react";

export default function LazySection({ children, className = "", style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setLoaded(true);
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={style}>
      {loaded ? children : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="skeleton-bar" style={{ width: "30%", height: 10 }} />
          <div className="skeleton-bar" style={{ width: "80%", height: 24 }} />
          <div className="skeleton-bar" style={{ width: "60%", height: 10 }} />
        </div>
      )}
    </div>
  );
}
