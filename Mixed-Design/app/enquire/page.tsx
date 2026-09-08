import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import EnquiryForm from "@/components/EnquiryForm";
import Reveal from "@/components/ui/Reveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enquire — Begin Your Residence Search",
  description:
    "Get in touch about our architectural residences. Request details, schedule a private viewing, or speak with an advisor. We reply personally within a day.",
  alternates: { canonical: "/enquire" },
  openGraph: {
    title: "Enquire — STONE",
    description: "Get in touch about our architectural residences.",
    url: "/enquire",
  },
};

export default function EnquirePage() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Header />
      <main id="main" style={{ paddingTop: "var(--nav-h)" }}>
        <section className="section">
          <div className="wrap">
            <Breadcrumbs items={[
              { label: "Home", href: "/" },
              { label: "Enquire" },
            ]} />
            <div className="grid-asymmetric">
              <div style={{ gridColumn: "1 / 6" }}>
                <Reveal>
                  <p className="overline" style={{ marginBottom: 24 }}>Enquire</p>
                  <h1 className="display display--large" style={{ marginBottom: 32 }}>
                    Have a project<br />in mind?
                  </h1>
                  <p className="body-text">
                    Tell me a little about what you&apos;re looking for. I&apos;ll reply
                    personally, usually within a day.
                  </p>
                  <div style={{ marginTop: 48, paddingTop: 24, borderTop: "0.5px solid rgba(249,248,246,0.08)" }}>
                    <p className="overline" style={{ marginBottom: 8 }}>Or email directly</p>
                    <a href="mailto:rishikeshsonawane1465@gmail.com" style={{
                      fontSize: 14, textDecoration: "none", color: "var(--color-charcoal)",
                      borderBottom: "0.5px solid rgba(249,248,246,0.12)", paddingBottom: 2,
                      transition: "border-color 0.3s ease",
                    }}>
                      rishikeshsonawane1465@gmail.com
                    </a>
                  </div>
                </Reveal>
              </div>
              <div style={{ gridColumn: "7 / 13" }}>
                <Reveal>
                  <EnquiryForm />
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
