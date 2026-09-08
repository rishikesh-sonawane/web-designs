import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/Toast";
import CookieConsent from "@/components/CookieConsent";
import BackToTop from "@/components/BackToTop";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import NoiseOverlay from "@/components/NoiseOverlay";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const siteUrl = "https://web-designs-by-rishi-11y8i6eaz-rishikesh-sonawanes-projects.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "STONE — Architectural Residences",
    template: "%s — STONE",
  },
  description:
    "Luxury architectural residences designed to endure. Explore villas, apartments, and retreats across Lake Como, Amalfi, Zurich, and Mallorca.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "STONE — Architectural Residences",
    description:
      "Luxury architectural residences designed to endure. Explore villas, apartments, and retreats across Europe.",
    type: "website",
    locale: "en_US",
    siteName: "STONE",
  },
  twitter: {
    card: "summary_large_image",
    title: "STONE — Architectural Residences",
    description:
      "Luxury architectural residences designed to endure.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "STONE",
  description: "Luxury architectural residences designed to endure.",
  url: siteUrl,
  logo: `${siteUrl}/favicon.svg`,
  contactPoint: {
    "@type": "ContactPoint",
    email: "rishikeshsonawane1465@gmail.com",
    contactType: "enquiries",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "STONE Architectural Residences",
  description: "Luxury architectural residences across Europe — Lake Como, Amalfi Coast, Zurich, Mallorca, and Portofino.",
  url: siteUrl,
  email: "rishikeshsonawane1465@gmail.com",
  areaServed: [
    { "@type": "Place", name: "Lake Como, Italy" },
    { "@type": "Place", name: "Amalfi Coast, Italy" },
    { "@type": "Place", name: "Zurich, Switzerland" },
    { "@type": "Place", name: "Mallorca, Spain" },
    { "@type": "Place", name: "Portofino, Italy" },
  ],
  priceRange: "€€€€",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <meta name="theme-color" content="#1A1A1A" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body>
        <CustomCursor />
        <ScrollProgress />
        <NoiseOverlay />
        <ToastProvider>
          {children}
          <CookieConsent />
          <BackToTop />
        </ToastProvider>
      </body>
    </html>
  );
}
