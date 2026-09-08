import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import Reviews from "@/components/Reviews";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Our Philosophy on Architecture & Design",
  description:
    "Learn about STONE — our approach to luxury architectural residences, our philosophy on material and landscape, and the team behind the vision.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Header />

      <main id="main" style={{ paddingTop: "var(--nav-h)" }}>
        {/* HERO */}
        <section className="section" style={{ paddingBottom: 0 }}>
          <div className="wrap">
            <Breadcrumbs items={[
              { label: "Home", href: "/" },
              { label: "About" },
            ]} />
            <div className="grid-asymmetric">
              <div className="col-span-6">
                <Reveal>
                  <p className="overline" style={{ marginBottom: 24 }}>About STONE</p>
                  <h1 className="display display--massive" style={{ marginBottom: 32 }}>
                    Built to<br />endure.
                  </h1>
                  <p className="body-text">
                    We are a curated collection of luxury architectural residences across Europe.
                    Each property is selected for its relationship to landscape, light, and the
                    architecture it inspires.
                  </p>
                </Reveal>
              </div>
              <div className="col-span-5 col-start-8">
                <Reveal>
                  <div style={{ position: "relative", aspectRatio: "4 / 5", overflow: "hidden" }}>
                    <Image
                      src="/architecture/howard-bouchevereau-042Srn0-82o-unsplash.jpg"
                      alt="STONE team — architectural design studio"
                      fill
                      quality={100}
                      sizes="(max-width: 860px) 100vw, 42vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* PHILOSOPHY */}
        <section className="section section--soft">
          <div className="wrap">
            <div className="grid-asymmetric">
              <div className="col-span-5">
                <Reveal>
                  <p className="overline" style={{ marginBottom: 24 }}>Our Philosophy</p>
                  <h2 className="display display--large" style={{ marginBottom: 32 }}>
                    Material over decoration.
                  </h2>
                </Reveal>
              </div>
              <div className="col-span-6 col-start-7">
                <Reveal>
                  <p className="body-text" style={{ marginBottom: 24 }}>
                    We believe architecture should speak for itself. Every residence we represent
                    is chosen because it demonstrates a deep understanding of material, proportion,
                    and place.
                  </p>
                  <p className="body-text" style={{ marginBottom: 24 }}>
                    Stone ages with grace. Glass frames the world without distorting it.
                    Concrete anchors a structure to its site in a way that no facade can replicate.
                  </p>
                  <p className="body-text">
                    We don&apos;t decorate. We reveal. Every surface carries intention.
                    Every proportion serves a purpose. This is architecture that endures.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* NUMBERS */}
        <section className="section">
          <div className="wrap">
            <Reveal>
              <p className="overline" style={{ marginBottom: 48 }}>By the Numbers</p>
            </Reveal>
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 0,
              borderTop: "0.5px solid rgba(249,248,246,0.08)",
            }}>
              {[
                { value: "5", label: "Residences" },
                { value: "4", label: "Countries" },
                { value: "20+", label: "Architects" },
                { value: "€18M+", label: "Portfolio Value" },
              ].map((stat) => (
                <div key={stat.label} style={{
                  padding: "32px 0", borderBottom: "0.5px solid rgba(249,248,246,0.08)",
                }}>
                  <p className="display display--large" style={{ marginBottom: 8 }}>{stat.value}</p>
                  <p className="overline">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className="section section--soft">
          <div className="wrap">
            <Reveal>
              <p className="overline" style={{ marginBottom: 24 }}>The Team</p>
            </Reveal>
            <Reveal>
              <h2 className="display display--large" style={{ marginBottom: 48 }}>
                Small team. Big vision.
              </h2>
            </Reveal>
            <div className="grid-asymmetric">
              <div className="col-span-5">
                <Reveal>
                  <div style={{ position: "relative", aspectRatio: "1", overflow: "hidden" }}>
                    <Image
                      src="/architecture/sean-pollock-PhYq704ffdA-unsplash.jpg"
                      alt="Rishikesh Sonawane — Founder of STONE"
                      fill
                      quality={100}
                      sizes="(max-width: 860px) 100vw, 42vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 300 }}>
                      Rishikesh Sonawane
                    </p>
                    <p className="overline" style={{ marginTop: 4 }}>Founder</p>
                  </div>
                </Reveal>
              </div>
              <div className="col-span-6 col-start-7">
                <Reveal>
                  <p className="body-text" style={{ marginBottom: 24 }}>
                    Founded by Rishikesh Sonawane, STONE was born from a simple observation:
                    the most remarkable homes are never the loudest. They are the ones that
                    feel inevitable — as though the landscape demanded their existence.
                  </p>
                  <p className="body-text">
                    With a background in architecture and a passion for material honesty,
                    Rishikesh curates each residence to ensure it meets the highest standards
                    of design, craftsmanship, and environmental sensitivity.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="section">
          <div className="wrap">
            <Reveal>
              <p className="overline" style={{ marginBottom: 48 }}>What Our Clients Say</p>
            </Reveal>
            <Reviews />
          </div>
        </section>

        {/* CTA */}
        <section className="section section--deep">
          <div className="wrap">
            <Reveal>
              <h2 className="display display--large" style={{ color: "var(--color-charcoal)", marginBottom: 32 }}>
                Ready to find your residence?
              </h2>
            </Reveal>
            <Reveal>
              <Link href="/explore" className="editorial-link">
                View all residences <span className="arrow" />
              </Link>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
