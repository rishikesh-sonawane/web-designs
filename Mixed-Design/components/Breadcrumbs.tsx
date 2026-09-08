import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `https://stone-residences.vercel.app${item.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: 32 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ol style={{
        display: "flex", flexWrap: "wrap", gap: 8, listStyle: "none", margin: 0, padding: 0,
        fontFamily: "var(--font-body)", fontSize: 10,
        letterSpacing: "0.12em", textTransform: "uppercase",
      }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {i > 0 && <span style={{ color: "var(--color-bronze)", opacity: 0.4 }} aria-hidden="true">/</span>}
            {item.href ? (
              <Link href={item.href} style={{ color: "var(--color-bronze)", textDecoration: "none", transition: "color 0.3s ease" }}>
                {item.label}
              </Link>
            ) : (
              <span style={{ color: "var(--color-charcoal)" }}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
