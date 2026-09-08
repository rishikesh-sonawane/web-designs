import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import EnquiryForm from "@/components/EnquiryForm";
import CopyButton from "@/components/CopyButton";
import Reveal from "@/components/ui/Reveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Speak With an Architectural Advisor",
  description:
    "Get in touch with STONE. Schedule a private viewing, request property details, or speak with an advisor about architectural residences.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Header />

      <main id="main" style={{ paddingTop: "var(--nav-h)" }}>
        <section className="section">
          <div className="wrap">
            <Breadcrumbs items={[
              { label: "Home", href: "/" },
              { label: "Contact" },
            ]} />

            <div className="grid-asymmetric">
              <div className="col-span-6">
                <Reveal>
                  <p className="overline" style={{ marginBottom: 24 }}>Contact</p>
                  <h1 className="display display--massive" style={{ marginBottom: 32 }}>
                    Begin a<br />conversation.
                  </h1>
                  <p className="body-text" style={{ marginBottom: 40 }}>
                    Whether you&apos;re seeking a specific property or exploring the possibilities,
                    we welcome your enquiry. Every conversation starts with understanding —
                    your vision, your timeline, your architecture.
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: 32, marginBottom: 48 }}>
                    <div>
                      <p className="overline" style={{ marginBottom: 6 }}>Email</p>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <a href="mailto:rishikeshsonawane1465@gmail.com"
                          className="editorial-link" style={{ fontSize: 14 }}>
                          rishikeshsonawane1465@gmail.com <span className="arrow" />
                        </a>
                        <CopyButton text="rishikeshsonawane1465@gmail.com" />
                      </div>
                    </div>

                    <div>
                      <p className="overline" style={{ marginBottom: 6 }}>Phone</p>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <a href="tel:+918767353143" className="editorial-link" style={{ fontSize: 14 }}>
                          +91 87673 53143 <span className="arrow" />
                        </a>
                        <CopyButton text="+918767353143" />
                      </div>
                    </div>

                    <div>
                      <p className="overline" style={{ marginBottom: 6 }}>Location</p>
                      <p style={{ fontFamily: "var(--font-display)", fontSize: 14, color: "var(--color-charcoal)" }}>
                        Mumbai, India
                      </p>
                    </div>

                    <div>
                      <p className="overline" style={{ marginBottom: 6 }}>Hours</p>
                      <p style={{ fontFamily: "var(--font-display)", fontSize: 14, color: "var(--color-charcoal)" }}>
                        By appointment only
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>

              <div className="col-span-5 col-start-8">
                <Reveal>
                  <div style={{
                    padding: "48px",
                    border: "0.5px solid rgba(249,248,246,0.08)",
                  }}>
                    <p className="overline" style={{ marginBottom: 28 }}>Send an Enquiry</p>
                    <EnquiryForm />
                  </div>
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
