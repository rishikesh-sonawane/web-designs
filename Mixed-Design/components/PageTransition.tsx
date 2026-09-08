"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (children !== displayChildren) {
      setTransitioning(true);
      const t = setTimeout(() => {
        setDisplayChildren(children);
        setTransitioning(false);
        window.scrollTo(0, 0);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [children, displayChildren, pathname]);

  return (
    <>
      <style>{`
        .page-transition-enter { opacity: 0; transform: translateY(8px); }
        .page-transition-active { opacity: 1; transform: none; transition: opacity 0.4s ease, transform 0.4s ease; }
      `}</style>
      <div className={transitioning ? "page-transition-enter" : "page-transition-active"}>
        {displayChildren}
      </div>
    </>
  );
}
