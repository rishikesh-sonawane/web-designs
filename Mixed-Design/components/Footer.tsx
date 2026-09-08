import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="site-footer__inner">
          <div className="site-footer__top">
            <div>
              <p className="brand" style={{ marginBottom: 8 }}>STONE</p>
              <p style={{
                fontFamily: "var(--font-body)", fontSize: 12,
                color: "var(--color-bronze)", letterSpacing: "0.1em",
                lineHeight: 1.6
              }}>
                Luxury architectural residences<br />designed to endure.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <ul className="site-footer__nav">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/explore">Residences</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/enquire">Enquire</Link></li>
                <li><Link href="/waitlist">Waitlist</Link></li>
              </ul>
              <ul className="site-footer__nav">
                <li><a href="https://github.com/rishikesh-sonawane" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a href="https://www.linkedin.com/in/rishikeshsonawane1465/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href="https://www.instagram.com/another.polymath._/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="site-footer__bottom">
            <span>© {new Date().getFullYear()} Rishikesh Sonawane · Concept project</span>
            <span>Designed &amp; built by hand</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
