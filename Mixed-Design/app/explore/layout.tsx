import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Residences — Villas, Apartments & Retreats",
  description:
    "Browse five luxury architectural residences across Lake Como, Amalfi Coast, Zurich, Mallorca, and Portofino. Filter by villa, apartment, or retreat.",
  alternates: { canonical: "/explore" },
  openGraph: {
    title: "All Residences — STONE",
    description: "Browse five luxury architectural residences across Europe.",
    url: "/explore",
  },
};

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return children;
}
