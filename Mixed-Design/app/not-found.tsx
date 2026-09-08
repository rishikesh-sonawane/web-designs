import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist or has been moved.",
};

export default function NotFound() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Header />
      <main id="main" style={{ paddingTop: "var(--nav-h)" }}>
        <section className="section" style={{ minHeight: "70vh", display: "flex", alignItems: "center" }}>
          <div className="wrap">
            <p className="overline" style={{ marginBottom: 24, color: "var(--color-bronze)" }}>404</p>
            <h1 className="display display--massive" style={{ marginBottom: 32 }}>
              Not found.
            </h1>
            <p className="body-text" style={{ marginBottom: 48 }}>
              The page you are looking for does not exist or has been moved.
              Let us help you find what you need.
            </p>
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
              <Link href="/" className="editorial-link">
                Return home <span className="arrow" />
              </Link>
              <Link href="/explore" className="editorial-link">
                View residences <span className="arrow" />
              </Link>
              <Link href="/enquire" className="editorial-link">
                Enquire <span className="arrow" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
