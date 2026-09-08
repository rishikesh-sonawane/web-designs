import Link from "next/link";
import Image from "next/image";
import { Property } from "@/data/properties";

export default function PropertyCard({ property }: { property: Property }) {
  const statusLabel = property.status === "available" ? "Available" : property.status === "coming-soon" ? "Coming Soon" : "Sold";
  return (
    <Link href={`/residences/${property.slug}`} className="property-card">
      <div className="property-card__image">
        <span className="property-card__badge">{statusLabel}</span>
        <Image src={property.images.hero} alt={`${property.name} — ${property.location.city}, ${property.location.country}`}
          fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" style={{ objectFit: "cover" }} />
      </div>
      <div className="property-card__meta">
        <p className="property-card__number">{String(property.number).padStart(2, "0")} /</p>
        <h3 className="property-card__name">{property.name}</h3>
        <p className="property-card__location">{property.location.city}, {property.location.country}</p>
        <div className="property-card__specs">
          <span>{property.area} m²</span>
          <span>{property.bedrooms} beds</span>
          <span>{property.price}</span>
        </div>
      </div>
    </Link>
  );
}
