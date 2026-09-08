"use client";
import { useState, FormEvent } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [fieldError, setFieldError] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) {
      setFieldError("Please enter your email");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFieldError("Please enter a valid email");
      return;
    }
    setFieldError("");
    setStatus("sending");

    // Simulate submission
    setTimeout(() => {
      setStatus("success");
    }, 800);
  };

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Header />

      <main id="main" style={{ paddingTop: "var(--nav-h)" }}>
        <section className="section section--deep">
          <div className="wrap" style={{ maxWidth: 640, textAlign: "center" }}>
            <Breadcrumbs items={[
              { label: "Home", href: "/" },
              { label: "Waitlist" },
            ]} />

            {status === "success" ? (
              <Reveal>
                <p className="overline" style={{ marginBottom: 24 }}>You&apos;re on the list</p>
                <h1 className="display display--massive" style={{ marginBottom: 24 }}>
                  Welcome aboard.
                </h1>
                <p className="body-text" style={{ maxWidth: 480, margin: "0 auto" }}>
                  We&apos;ll notify you the moment new residences are added to our collection.
                  Expect architecture worth waiting for.
                </p>
                <div style={{ marginTop: 48 }}>
                  <a href="/" className="editorial-link">
                    Return home <span className="arrow" />
                  </a>
                </div>
              </Reveal>
            ) : (
              <Reveal>
                <p className="overline" style={{ marginBottom: 24 }}>Waitlist</p>
                <h1 className="display display--massive" style={{ marginBottom: 24 }}>
                  Be first.
                </h1>
                <p className="body-text" style={{ maxWidth: 480, margin: "0 auto", marginBottom: 48 }}>
                  Our collection grows slowly and deliberately. Join the waitlist
                  to receive early access when new architectural residences are added.
                </p>

                <form onSubmit={handleSubmit} noValidate style={{ maxWidth: 400, margin: "0 auto" }}>
                  <label className="overline" htmlFor="waitlist-email" style={{ display: "block", textAlign: "left", marginBottom: 8 }}>
                    Email Address {fieldError && <span style={{ color: "#c44" }}>*</span>}
                  </label>
                  <input
                    type="email"
                    id="waitlist-email"
                    name="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={!!fieldError}
                    aria-describedby={fieldError ? "waitlist-error" : undefined}
                    style={{ marginBottom: fieldError ? 4 : 20 }}
                  />
                  {fieldError && (
                    <p id="waitlist-error" role="alert" style={{ fontSize: 11, color: "#c44", marginBottom: 16 }}>
                      {fieldError}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="editorial-link"
                    style={{
                      opacity: status === "sending" ? 0.5 : 1,
                      cursor: status === "sending" ? "not-allowed" : "pointer",
                    }}
                  >
                    {status === "sending" ? "Joining…" : "Join waitlist"} <span className="arrow" />
                  </button>
                </form>
              </Reveal>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
