"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close nav on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Body scroll lock
  useEffect(() => {
    if (open) {
      document.body.classList.add("nav-open");
    } else {
      document.body.classList.remove("nav-open");
    }
    return () => { document.body.classList.remove("nav-open"); };
  }, [open]);

  // Close on Escape
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <header className="site-nav">
      <div className="site-nav__inner">
        <Link href="/" className="brand" aria-label="STONE — Home">STONE</Link>
        <nav aria-label="Primary">
          <ul className="site-nav__links" id="navLinks" data-open={open ? "true" : "false"}>
            <li><Link href="/explore" onClick={() => setOpen(false)}>Residences</Link></li>
            <li><Link href="/about" onClick={() => setOpen(false)}>About</Link></li>
            <li><Link href="/contact" onClick={() => setOpen(false)}>Contact</Link></li>
            <li><Link href="/enquire" onClick={() => setOpen(false)}>Enquire</Link></li>
          </ul>
        </nav>
        <div className="site-nav__cta">
          <button
            className="nav-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="navLinks"
            onClick={() => setOpen(!open)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
