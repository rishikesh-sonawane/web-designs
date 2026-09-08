import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You — Enquiry Received",
  description: "Thank you for your enquiry. A STONE advisor will be in touch shortly.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Header />

      <main id="main" style={{ paddingTop: "var(--nav-h)" }}>
        <section className="section section--deep">
          <div className="wrap" style={{ maxWidth: 640, textAlign: "center" }}>
            <Breadcrumbs items={[
              { label: "Home", href: "/" },
              { label: "Thank You" },
            ]} />

            <Reveal>
              <p className="overline" style={{ marginBottom: 24 }}>Enquiry Received</p>
              <h1 className="display display--massive" style={{ marginBottom: 24 }}>
                Thank you.
              </h1>
              <p className="body-text" style={{ maxWidth: 480, margin: "0 auto", marginBottom: 16 }}>
                Your enquiry has been received. A STONE advisor will review your
                message and respond within one business day.
              </p>
              <p className="body-text" style={{ maxWidth: 480, margin: "0 auto", marginBottom: 48 }}>
                For urgent matters, reach us directly at{" "}
                <a href="mailto:rishikeshsonawane1465@gmail.com" className="editorial-link">
                  rishikeshsonawane1465@gmail.com
                </a>
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
                <Link href="/explore" className="editorial-link">
                  View residences <span className="arrow" />
                </Link>
                <Link href="/" className="editorial-link" style={{ color: "var(--color-bronze)" }}>
                  Return home <span className="arrow" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
