"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import { properties } from "@/data/properties";

type Filter = "all" | "villa" | "apartment" | "retreat";

export default function ExplorePage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = filter === "all"
    ? properties
    : properties.filter((p) => p.type === filter);

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Header />

      <main id="main" style={{ paddingTop: "var(--nav-h)" }}>
        <section className="section" style={{ paddingBottom: 0 }}>
          <div className="wrap">
            <Breadcrumbs items={[
              { label: "Home", href: "/" },
              { label: "Residences" },
            ]} />
            <Reveal>
              <p className="overline" style={{ marginBottom: 24 }}>All Residences</p>
            </Reveal>
            <Reveal>
              <h1 className="display display--massive" style={{ marginBottom: 48 }}>
                Five residences.<br />Four locations.
              </h1>
            </Reveal>

            <Reveal>
              <div className="filter-tabs">
                {(["all", "villa", "apartment", "retreat"] as Filter[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`filter-tab ${filter === f ? "filter-tab--active" : ""}`}
                    aria-pressed={filter === f}
                  >
                    {f === "all" ? "All" : f === "villa" ? "Villas" : f === "apartment" ? "Apartments" : "Retreats"}
                  </button>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            {filtered.length > 0 && (
              <>
                <Reveal key={filtered[0].slug}>
                  <Link href={`/residences/${filtered[0].slug}`} className="property-card">
                    <div className="grid-asymmetric">
                      <div className="col-span-8">
                        <div style={{ position: "relative", aspectRatio: "16 / 10", overflow: "hidden" }}>
                          <Image
                            src={filtered[0].images.gallery[0]}
                            alt={`${filtered[0].name} — ${filtered[0].location.city}, ${filtered[0].location.country} — ${filtered[0].area} m² architectural residence`}
                            fill
                            quality={100}
                            sizes="(max-width: 860px) 100vw, 66vw"
                            style={{ objectFit: "cover" }}
                          />
                          <div className="cinematic-overlay cinematic-overlay--bottom-left">
                            <span style={{ opacity: 0.7 }}>{filtered[0].area} m²</span><br />
                            <span style={{ opacity: 0.4 }}>{filtered[0].architect}</span>
                          </div>
                          <div className="cinematic-overlay cinematic-overlay--top-right">
                            <span style={{ opacity: 0.4 }}>{filtered[0].status === "available" ? "Available" : filtered[0].status === "coming-soon" ? "Coming Soon" : "Sold"}</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-4 col-start-9">
                        <div style={{ paddingTop: 8 }}>
                          <p className="overline" style={{ marginBottom: 16, opacity: 0.5 }}>
                            No. {String(filtered[0].number).padStart(3, "0")}
                          </p>
                          <h2 className="display display--large" style={{ marginBottom: 12 }}>
                            {filtered[0].name}
                          </h2>
                          <p style={{ fontSize: 14, color: "var(--color-bronze)", marginBottom: 32, lineHeight: 1.6 }}>
                            {filtered[0].location.city}, {filtered[0].location.country}
                          </p>
                          <div className="spec-divider">
                            {[
                              { label: "Area", value: `${filtered[0].area} m²` },
                              { label: "Bedrooms", value: String(filtered[0].bedrooms) },
                              { label: "Price", value: filtered[0].price },
                            ].map((spec) => (
                              <div key={spec.label} className="spec-row">
                                <span className="overline" style={{ fontSize: 9 }}>{spec.label}</span>
                                <span className="spec-value">{spec.value}</span>
                              </div>
                            ))}
                          </div>
                          <div style={{ marginTop: 28 }}>
                            <span className="editorial-link">
                              View Residence <span className="arrow" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Reveal>

                <hr className="hairline" style={{ margin: "48px 0" }} />

                <div className="grid-asymmetric">
                  {filtered.slice(1).map((property, i) => {
                    const isWide = i % 2 === 0;
                    return (
                      <Reveal
                        key={property.slug}
                        className={isWide ? "col-span-7" : "col-span-5 col-start-8"}
                      >
                        <Link href={`/residences/${property.slug}`} className="property-card">
                          <div className="property-card__image" style={{ aspectRatio: isWide ? "16 / 10" : "4 / 5" }}>
                            <Image
                              src={property.images.gallery[0]}
                              alt={`${property.name} — ${property.location.city} — ${property.bedrooms} bedroom ${property.type}`}
                              fill
                              quality={100}
                              sizes="(max-width: 860px) 100vw, 42vw"
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                          <div className="property-card__meta">
                            <p className="property-card__number">No. {String(property.number).padStart(3, "0")}</p>
                            <h3 className="property-card__name">{property.name}</h3>
                            <p className="property-card__location">
                              {property.location.city}, {property.location.country}
                            </p>
                            <div className="property-card__specs">
                              <span>{property.area} m²</span>
                              <span>{property.bedrooms} Bedrooms</span>
                              <span>{property.price}</span>
                            </div>
                          </div>
                        </Link>
                      </Reveal>
                    );
                  })}
                </div>
              </>
            )}

            {filtered.length === 0 && (
              <Reveal>
                <div style={{ padding: "80px 0", textAlign: "center" }}>
                  <p className="display display--medium" style={{ marginBottom: 16 }}>
                    No residences found
                  </p>
                  <p className="body-text" style={{ margin: "0 auto 32px" }}>
                    There are no residences matching this filter. Try browsing all properties.
                  </p>
                  <button onClick={() => setFilter("all")} className="editorial-link">
                    View all residences <span className="arrow" />
                  </button>
                </div>
              </Reveal>
            )}
          </div>
        </section>

        <section className="section section--deep">
          <div className="wrap">
            <Reveal>
              <p className="overline" style={{ marginBottom: 24, color: "rgba(249,248,246,0.4)" }}>
                Begin a Conversation
              </p>
            </Reveal>
            <Reveal>
              <h2 className="display display--large" style={{ color: "var(--color-charcoal)", marginBottom: 32 }}>
                Can&apos;t find what you&apos;re looking for?
              </h2>
            </Reveal>
            <Reveal>
              <Link href="/enquire" className="editorial-link">
                Start your enquiry <span className="arrow" />
              </Link>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
