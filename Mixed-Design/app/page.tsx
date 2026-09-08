import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/ui/Reveal";
import FAQ from "@/components/FAQ";
import HeroParallax from "@/components/HeroParallax";
import PageLoader from "@/components/PageLoader";
import SplitText from "@/components/SplitText";
import MagneticButton from "@/components/MagneticButton";
import TiltCard from "@/components/TiltCard";
import AnimatedNumber from "@/components/AnimatedNumber";
import { properties } from "@/data/properties";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "STONE — Luxury Architectural Residences Across Europe",
  description:
    "Discover luxury villas, apartments, and retreats designed to endure. Five architectural residences across Lake Como, Amalfi, Zurich, Mallorca, and Portofino.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "STONE — Luxury Architectural Residences Across Europe",
    description: "Five architectural residences across Europe. Villas, apartments, and retreats designed to endure.",
    url: "/",
  },
};

const faqs = [
  {
    question: "How do I schedule a viewing?",
    answer: "Contact us through our enquiry form or email us directly. We arrange private viewings at a time that suits you, including weekends and evenings by appointment.",
  },
  {
    question: "Are these properties available for investment?",
    answer: "Each property has its own financial profile. Some are primary residences, others are investment opportunities with rental potential. We provide full financial details upon request.",
  },
  {
    question: "What is the typical timeline for purchase?",
    answer: "From initial enquiry to completion, timelines vary by property and jurisdiction. Typically 3–6 months. We guide you through every step, including legal and financial considerations.",
  },
  {
    question: "Do you assist with interior design?",
    answer: "Yes. We connect you with architects and interior designers who specialize in the style and material language of each property. This service is included for all STONE clients.",
  },
  {
    question: "Can I visit before making an enquiry?",
    answer: "Absolutely. Our Explore page provides detailed information, gallery images, floor plans, and location context for each property. When you're ready, we're here to arrange a personal viewing.",
  },
];

const featured = properties[0];
const secondary = properties[1];
const tertiary = properties[2];

export default function Home() {
  return (
    <>
      <PageLoader />
      <a href="#main" className="skip-link">Skip to content</a>
      <Header />

      <main id="main">
        {/* HERO WITH PARALLAX */}
        <HeroParallax />

        {/* FEATURED RESIDENCE */}
        <section className="section">
          <div className="wrap">
            <Reveal>
              <p className="overline" style={{ marginBottom: 40 }}>Featured Residence</p>
            </Reveal>

            <div className="grid-asymmetric">
              <div className="col-span-8">
                <Reveal delay={100}>
                  <TiltCard>
                    <Link href={`/residences/${featured.slug}`} className="hover-lift">
                      <div className="hover-image">
                        <Image
                          src={featured.images.hero}
                          alt={`${featured.name} — exterior view of luxury villa in ${featured.location.city}`}
                          fill
                          quality={100}
                          sizes="(max-width: 860px) 100vw, 66vw"
                          style={{ objectFit: "cover" }}
                        />
                        <div className="cinematic-overlay cinematic-overlay--bottom-left">
                          <span style={{ opacity: 0.7 }}>{featured.area} m²</span><br />
                          <span style={{ opacity: 0.4 }}>{featured.architect}</span>
                        </div>
                      </div>
                    </Link>
                  </TiltCard>
                </Reveal>
              </div>

              <div className="col-span-4">
                <Reveal delay={200}>
                  <div style={{ paddingTop: 8 }}>
                    <p className="overline" style={{ marginBottom: 16, opacity: 0.5 }}>
                      No. {String(featured.number).padStart(3, "0")}
                    </p>
                    <Link href={`/residences/${featured.slug}`} style={{ textDecoration: "none" }}>
                      <SplitText tag="h2" className="display display--large" style={{ marginBottom: 16 }}>
                        {featured.name}
                      </SplitText>
                    </Link>
                    <p style={{ fontSize: 14, color: "var(--color-bronze)", marginBottom: 32, lineHeight: 1.6 }}>
                      {featured.location.city}, {featured.location.country}
                    </p>

                    <div className="spec-divider">
                      {[
                        { label: "Area", value: `${featured.area} m²` },
                        { label: "Bedrooms", value: String(featured.bedrooms) },
                        { label: "Bathrooms", value: String(featured.bathrooms) },
                        { label: "Price", value: featured.price },
                      ].map((spec) => (
                        <div key={spec.label} className="spec-row hover-spec">
                          <span className="overline" style={{ fontSize: 9 }}>{spec.label}</span>
                          <span className="spec-value">{spec.value}</span>
                        </div>
                      ))}
                    </div>

                    <div style={{ marginTop: 32 }}>
                      <MagneticButton>
                        <Link href={`/residences/${featured.slug}`} className="editorial-link">
                          View Residence <span className="arrow" />
                        </Link>
                      </MagneticButton>
                    </div>
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
                <Reveal direction="left">
                  <p className="overline" style={{ marginBottom: 32 }}>Our Philosophy</p>
                  <h2 className="display display--massive" style={{ marginBottom: 40 }}>
                    Built to<br />endure.
                  </h2>
                </Reveal>
              </div>
              <div className="col-span-6 col-start-7">
                <Reveal delay={150} direction="right">
                  <div style={{ paddingTop: 12 }}>
                    <p className="body-text" style={{ marginBottom: 28 }}>
                      Each residence is a dialogue between material and landscape. We don&apos;t decorate — we reveal.
                      Every surface carries intention. Every proportion serves a purpose.
                    </p>
                    <p className="body-text">
                      Stone ages with grace. Glass frames the world without distorting it.
                      Concrete anchors a structure to its place in a way that no facade can replicate.
                    </p>
                    <div style={{ marginTop: 48 }}>
                      <MagneticButton>
                        <Link href="/explore" className="editorial-link">
                          View all residences <span className="arrow" />
                        </Link>
                      </MagneticButton>
                    </div>
                  </div>
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
                { target: 5, label: "Residences", prefix: "", suffix: "" },
                { target: 4, label: "Countries", prefix: "", suffix: "" },
                { target: 20, label: "Architects", prefix: "", suffix: "+" },
                { target: 18, label: "Portfolio Value", prefix: "€", suffix: "M+" },
              ].map((stat, i) => (
                <div key={stat.label} style={{
                  padding: "32px 0", borderBottom: "0.5px solid rgba(249,248,246,0.08)",
                }}>
                  <p className="display display--large" style={{ marginBottom: 8 }}>
                    <AnimatedNumber target={stat.target} prefix={stat.prefix} suffix={stat.suffix} duration={1500 + i * 200} />
                  </p>
                  <p className="overline">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECONDARY RESIDENCES */}
        <section className="section">
          <div className="wrap">
            <Reveal>
              <p className="overline" style={{ marginBottom: 40 }}>More Residences</p>
            </Reveal>

            <div className="grid-asymmetric">
              <div className="col-span-7">
                <Reveal delay={100}>
                  <TiltCard>
                    <Link href={`/residences/${secondary.slug}`} className="property-card hover-lift">
                      <div className="property-card__image hover-image">
                        <Image
                          src={secondary.images.gallery[0]}
                          alt={`${secondary.name} — ${secondary.location.city}, ${secondary.location.country}`}
                          fill
                          quality={100}
                          sizes="(max-width: 860px) 100vw, 58vw"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div className="property-card__meta">
                        <p className="property-card__number">No. {String(secondary.number).padStart(3, "0")}</p>
                        <h3 className="property-card__name hover-text">{secondary.name}</h3>
                        <p className="property-card__location">
                          {secondary.location.city}, {secondary.location.country}
                        </p>
                        <div className="property-card__specs">
                          <span>{secondary.area} m²</span>
                          <span>{secondary.bedrooms} Bedrooms</span>
                          <span>{secondary.price}</span>
                        </div>
                      </div>
                    </Link>
                  </TiltCard>
                </Reveal>
              </div>

              <div className="col-span-5 col-start-8">
                <Reveal delay={200}>
                  <TiltCard>
                    <Link href={`/residences/${tertiary.slug}`} className="property-card hover-lift">
                      <div className="property-card__image hover-image">
                        <Image
                          src={tertiary.images.gallery[0]}
                          alt={`${tertiary.name} — ${tertiary.location.city}, ${tertiary.location.country}`}
                          fill
                          quality={100}
                          sizes="(max-width: 860px) 100vw, 42vw"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div className="property-card__meta">
                        <p className="property-card__number">No. {String(tertiary.number).padStart(3, "0")}</p>
                        <h3 className="property-card__name hover-text">{tertiary.name}</h3>
                        <p className="property-card__location">
                          {tertiary.location.city}, {tertiary.location.country}
                        </p>
                        <div className="property-card__specs">
                          <span>{tertiary.area} m²</span>
                          <span>{tertiary.bedrooms} Bedrooms</span>
                          <span>{tertiary.price}</span>
                        </div>
                      </div>
                    </Link>
                  </TiltCard>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* LOCATIONS */}
        <section className="section section--soft">
          <div className="wrap">
            <Reveal>
              <p className="overline" style={{ marginBottom: 40 }}>Locations</p>
            </Reveal>
            <Reveal delay={100}>
              <SplitText tag="h2" className="display display--massive" style={{ marginBottom: 48 }}>
                Lake Como. Amalfi. Zurich. Mallorca.
              </SplitText>
            </Reveal>
            <Reveal delay={200}>
              <p className="body-text" style={{ marginBottom: 40 }}>
                Five properties across four European locations. Each chosen for its relationship
                to landscape, light, and the architecture it inspires.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <MagneticButton>
                <Link href="/explore" className="editorial-link">
                  Explore all locations <span className="arrow" />
                </Link>
              </MagneticButton>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section className="section">
          <div className="wrap">
            <div className="grid-asymmetric">
              <div className="col-span-4">
                <Reveal>
                  <p className="overline" style={{ marginBottom: 24 }}>Questions</p>
                  <h2 className="display display--large" style={{ marginBottom: 32 }}>
                    Frequently<br />asked.
                  </h2>
                  <p className="body-text">
                    Everything you need to know about viewing, purchasing, and settling into your new residence.
                  </p>
                </Reveal>
              </div>
              <div className="col-span-7 col-start-6">
                <Reveal delay={150}>
                  <FAQ items={faqs} />
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ENQUIRY CTA */}
        <section className="section section--deep">
          <div className="wrap">
            <div className="grid-asymmetric">
              <div className="col-span-6">
                <Reveal>
                  <p className="overline" style={{ marginBottom: 24, color: "rgba(249,248,246,0.4)" }}>
                    Begin a Conversation
                  </p>
                  <h2 className="display display--large" style={{ color: "var(--color-charcoal)", marginBottom: 24 }}>
                    Find the residence<br />that speaks to you.
                  </h2>
                  <p style={{
                    fontFamily: "var(--font-body)", fontSize: 14,
                    color: "rgba(249,248,246,0.35)", lineHeight: 1.7, maxWidth: 420
                  }}>
                    Each property has its own character. Tell us what matters to you —
                    we&apos;ll help you find the one that fits.
                  </p>
                </Reveal>
              </div>
              <div className="col-span-4 col-start-9 cta-center">
                <Reveal delay={150}>
                  <MagneticButton>
                    <Link href="/enquire" className="editorial-link hover-arrow">
                      Start your enquiry <span className="arrow" />
                    </Link>
                  </MagneticButton>
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
