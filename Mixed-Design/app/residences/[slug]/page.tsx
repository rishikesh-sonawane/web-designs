import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import Gallery from "@/components/Gallery";
import FloorPlan from "@/components/FloorPlan";
import MapViewWrapper from "@/components/MapViewWrapper";
import { properties } from "@/data/properties";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = properties.find((p) => p.slug === slug);
  if (!property) return {};
  return {
    title: `${property.name} — ${property.location.city}, ${property.location.country}`,
    description: `${property.tagline} ${property.area} m², ${property.bedrooms} bedrooms, ${property.bathrooms} bathrooms. ${property.price}. Designed by ${property.architect}.`,
    alternates: { canonical: `/residences/${property.slug}` },
    openGraph: {
      title: `${property.name} — STONE`,
      description: property.tagline,
      url: `/residences/${property.slug}`,
      images: [{ url: property.images.hero, width: 1200, height: 800, alt: property.name }],
    },
  };
}

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params;
  const property = properties.find((p) => p.slug === slug);
  if (!property) notFound();

  const propertySchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: property.name,
    description: property.description,
    brand: { "@type": "Organization", name: "STONE" },
    category: property.type,
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "EUR",
      availability: property.status === "available"
        ? "https://schema.org/InStock"
        : property.status === "sold"
        ? "https://schema.org/SoldOut"
        : "https://schema.org/PreOrder",
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Area", value: `${property.area} m²` },
      { "@type": "PropertyValue", name: "Bedrooms", value: property.bedrooms },
      { "@type": "PropertyValue", name: "Bathrooms", value: property.bathrooms },
    ],
  };

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Header />

      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(propertySchema) }}
        />

        {/* HERO */}
        <section className="property-hero">
          <Image
            src={property.images.hero}
            alt={`${property.name} — luxury ${property.type} in ${property.location.city}, ${property.location.country}`}
            fill
            quality={100}
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
          <div className="property-hero__overlay" />

          <div className="cinematic-overlay cinematic-overlay--top-left">
            <span style={{ opacity: 0.5 }}>No. {String(property.number).padStart(3, "0")}</span><br />
            <span style={{ opacity: 0.35 }}>
              {property.location.coordinates.lat}° N, {property.location.coordinates.lng}° E
            </span>
          </div>

          <div className="cinematic-overlay cinematic-overlay--top-right">
            <span style={{ opacity: 0.5 }}>{property.location.country}</span><br />
            <span style={{ opacity: 0.35 }}>{property.architect}</span>
          </div>

          <div className="property-hero__content">
            <Reveal>
              <Breadcrumbs items={[
                { label: "Home", href: "/" },
                { label: "Residences", href: "/explore" },
                { label: property.name },
              ]} />
            </Reveal>
            <Reveal>
              <p className="overline" style={{ marginBottom: 16, color: "rgba(249,248,246,0.5)" }}>
                {property.type === "villa" ? "Villa" : property.type === "apartment" ? "Apartment" : "Retreat"}
              </p>
            </Reveal>
            <Reveal>
              <h1 className="display display--hero" style={{ color: "#F9F8F6" }}>
                {property.name}
              </h1>
            </Reveal>
            <Reveal>
              <p style={{
                fontFamily: "var(--font-body)", fontSize: 15,
                color: "rgba(249,248,246,0.45)", marginTop: 16
              }}>
                {property.tagline}
              </p>
            </Reveal>
          </div>
        </section>

        {/* SPECS BAR */}
        <section className="section--tight">
          <div className="wrap">
            <Reveal>
              <div className="specs-bar">
                {[
                  { label: "Area", value: `${property.area} m²` },
                  { label: "Bedrooms", value: String(property.bedrooms) },
                  { label: "Bathrooms", value: String(property.bathrooms) },
                  { label: "Price", value: property.price },
                  { label: "Status", value: property.status === "available" ? "Available" : property.status === "coming-soon" ? "Coming Soon" : "Sold" },
                ].map((spec) => (
                  <div key={spec.label} className="specs-bar__item">
                    <p className="specs-bar__label">{spec.label}</p>
                    <p className="specs-bar__value">{spec.value}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* DESCRIPTION */}
        <section className="section">
          <div className="wrap">
            <div className="grid-asymmetric">
              <div className="col-span-5">
                <Reveal>
                  <p className="overline" style={{ marginBottom: 24 }}>About the Residence</p>
                  <h2 className="display display--large">
                    {property.name}
                  </h2>
                </Reveal>
              </div>
              <div className="col-span-6 col-start-7">
                <Reveal>
                  <p className="body-text" style={{ marginBottom: 32 }}>
                    {property.description}
                  </p>

                  <p className="overline" style={{ marginBottom: 16, marginTop: 48 }}>Materials</p>
                  <div className="spec-divider">
                    {property.materials.map((mat) => (
                      <div key={mat.name} style={{
                        padding: "16px 0",
                        borderBottom: "0.5px solid rgba(249,248,246,0.08)"
                      }}>
                        <p style={{
                          fontFamily: "var(--font-display)", fontSize: 18,
                          fontWeight: 300, marginBottom: 4
                        }}>
                          {mat.name}
                        </p>
                        <p style={{ fontSize: 13, color: "var(--color-bronze)" }}>
                          {mat.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section className="section section--tight">
          <div className="wrap">
            <Reveal>
              <p className="overline" style={{ marginBottom: 32 }}>Gallery</p>
            </Reveal>
            <Gallery images={property.images.gallery} alt={property.name} />
          </div>
        </section>

        {/* FLOOR PLAN + MAP */}
        <section className="section">
          <div className="wrap">
            <div className="grid-asymmetric">
              <div className="col-span-6">
                <Reveal>
                  <FloorPlan
                    propertyName={property.name}
                    area={property.area}
                    bedrooms={property.bedrooms}
                    bathrooms={property.bathrooms}
                  />
                </Reveal>
              </div>
              <div className="col-span-6 col-start-7">
                <Reveal>
                  <p className="overline" style={{ marginBottom: 16 }}>Location</p>
                  <h3 className="display display--medium" style={{ marginBottom: 24 }}>
                    {property.location.city}
                  </h3>
                  <div style={{ height: 400, border: "0.5px solid rgba(249,248,246,0.08)" }}>
                    <MapViewWrapper
                      center={[property.location.coordinates.lat, property.location.coordinates.lng]}
                      landmarks={property.landmarks}
                    />
                  </div>
                  <div style={{ marginTop: 24 }} className="spec-divider">
                    {property.landmarks.map((lm) => (
                      <div key={lm.name} style={{
                        padding: "12px 0",
                        borderBottom: "0.5px solid rgba(249,248,246,0.08)",
                        display: "flex", justifyContent: "space-between"
                      }}>
                        <span style={{ fontSize: 13 }}>{lm.name}</span>
                        <span className="overline" style={{ fontSize: 9 }}>{lm.distance}</span>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="section section--soft">
          <div className="wrap">
            <Reveal>
              <p className="overline" style={{ marginBottom: 32 }}>Features</p>
            </Reveal>
            <Reveal>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: 0,
              }} className="spec-divider">
                {property.features.map((feature) => (
                  <div key={feature} style={{
                    padding: "18px 0",
                    borderBottom: "0.5px solid rgba(249,248,246,0.08)",
                    fontSize: 14
                  }}>
                    {feature}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* NAVIGATION */}
        <section className="section" style={{ borderTop: "0.5px solid rgba(249,248,246,0.08)" }}>
          <div className="wrap">
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
              <Link href={`/residences/${property.prevSlug}`} className="editorial-link">
                ← {property.prevSlug.replace(/-/g, " ")}
              </Link>
              <Link href={`/residences/${property.nextSlug}`} className="editorial-link">
                {property.nextSlug.replace(/-/g, " ")} →
              </Link>
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
                    Enquire About {property.name}
                  </p>
                  <h2 className="display display--large" style={{ color: "var(--color-charcoal)", marginBottom: 24 }}>
                    Interested in this<br />residence?
                  </h2>
                  <p style={{
                    fontFamily: "var(--font-body)", fontSize: 14,
                    color: "rgba(249,248,246,0.35)", lineHeight: 1.7, maxWidth: 420
                  }}>
                    Tell us about your requirements. We&apos;ll arrange a private viewing
                    and provide detailed specifications.
                  </p>
                </Reveal>
              </div>
              <div className="col-span-4 col-start-9 cta-center">
                <Reveal>
                  <Link href={`/enquire?property=${property.slug}`} className="editorial-link">
                    Start your enquiry <span className="arrow" />
                  </Link>
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
