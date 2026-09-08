export interface Property {
  slug: string;
  number: number;
  name: string;
  tagline: string;
  location: {
    city: string;
    country: string;
    coordinates: { lat: number; lng: number };
  };
  type: "villa" | "apartment" | "retreat";
  area: number;
  bedrooms: number;
  bathrooms: number;
  price: string;
  status: "available" | "coming-soon" | "sold";
  description: string;
  features: string[];
  materials: { name: string; description: string }[];
  images: { hero: string; gallery: string[]; floorPlan: string };
  landmarks: { name: string; distance: string }[];
  architect: string;
  nextSlug: string;
  prevSlug: string;
}

export const properties: Property[] = [
  {
    slug: "villa-serra",
    number: 1,
    name: "Villa Serra",
    tagline: "A lakeside retreat in glass and stone.",
    location: { city: "Lake Como", country: "Italy", coordinates: { lat: 45.987, lng: 9.257 } },
    type: "villa",
    area: 482,
    bedrooms: 5,
    bathrooms: 4,
    price: "€4.8M",
    status: "available",
    description:
      "Cantilevered over Lake Como, Villa Serra dissolves the boundary between interior and landscape. Floor-to-ceiling glass frames the Alps; board-formed concrete anchors the structure to the hillside.",
    features: [
      "Infinity pool with lake panorama",
      "Wine cellar with climate control",
      "Private dock access",
      "Underfloor heating throughout",
      "Smart home integration",
      "Triple-glazed thermal glass",
      "Rooftop terrace",
      "Guest pavilion",
    ],
    materials: [
      { name: "Board-formed concrete", description: "Exterior walls cast in Douglas fir formwork" },
      { name: "White oak", description: "Interior flooring and cabinetry" },
      { name: "Low-iron glass", description: "Floor-to-ceiling panels, 6m span" },
      { name: "Corten steel", description: "Balustrades and landscape features" },
    ],
    images: {
      hero: "/architecture/villa-serra-hero.jpg",
      gallery: [
        "/architecture/sean-pollock-PhYq704ffdA-unsplash (1).jpg",
        "/architecture/sean-pollock-PhYq704ffdA-unsplash (2).jpg",
        "/architecture/howard-bouchevereau-042Srn0-82o-unsplash.jpg",
        "/architecture/howard-bouchevereau-042Srn0-82o-unsplash (1).jpg",
        "/architecture/joel-filipe-RFDP7_80v5A-unsplash.jpg",
        "/architecture/joel-filipe-RFDP7_80v5A-unsplash (1).jpg",
        "/architecture/tim-stief-dH6IjhWHNQQ-unsplash.jpg",
        "/architecture/tim-stief-dH6IjhWHNQQ-unsplash (1).jpg",
      ],
      floorPlan: "/floor-plans/villa-serra.svg",
    },
    landmarks: [
      { name: "Milan Malpensa Airport", distance: "52 km" },
      { name: "Como town center", distance: "8 km" },
      { name: "Lake Como shoreline", distance: "0.3 km" },
      { name: "Galeria d'Italia", distance: "48 km" },
    ],
    architect: "Studio Terrae",
    nextSlug: "casa-lago",
    prevSlug: "casa-pietra",
  },
  {
    slug: "casa-lago",
    number: 2,
    name: "Casa Lago",
    tagline: "Where the coast meets the cliff.",
    location: { city: "Amalfi Coast", country: "Italy", coordinates: { lat: 40.6333, lng: 14.6027 } },
    type: "villa",
    area: 365,
    bedrooms: 4,
    bathrooms: 3,
    price: "€3.2M",
    status: "available",
    description:
      "Carved into the Amalfi cliffside, Casa Lago channels Mediterranean light through raw concrete shells and hand-laid stone. Every room opens to the Tyrrhenian Sea.",
    features: [
      "Cliff-edge infinity pool",
      "Private lemon grove",
      "Outdoor kitchen with sea view",
      "Natural ventilation system",
      "Reclaimed timber shutters",
      "Rainwater collection",
      "Rooftop solarium",
      "Boathouse access",
    ],
    materials: [
      { name: "Tuff stone", description: "Load-bearing walls from local volcanic quarry" },
      { name: "Pozzuoli cement", description: "Roman-heritage lime plaster finish" },
      { name: "Maritime pine", description: "Decking and shutter systems" },
      { name: "Hand-glazed tile", description: "Kitchen and bathroom surfaces" },
    ],
    images: {
      hero: "/architecture/casa-lago-hero.jpg",
      gallery: [
        "/architecture/howard-bouchevereau-042Srn0-82o-unsplash (1).jpg",
        "/architecture/howard-bouchevereau-042Srn0-82o-unsplash (2).jpg",
        "/architecture/howard-bouchevereau-042Srn0-82o-unsplash (3).jpg",
        "/architecture/joel-filipe-RFDP7_80v5A-unsplash (2).jpg",
        "/architecture/joel-filipe-RFDP7_80v5A-unsplash (3).jpg",
        "/architecture/sean-pollock-PhYq704ffdA-unsplash.jpg",
      ],
      floorPlan: "/floor-plans/casa-lago.svg",
    },
    landmarks: [
      { name: "Naples International Airport", distance: "68 km" },
      { name: "Amalfi town center", distance: "2.1 km" },
      { name: "Mediterranean coastline", distance: "0 km" },
      { name: "Ravello gardens", distance: "6 km" },
    ],
    architect: "Studio Terrae",
    nextSlug: "residenza-bosco",
    prevSlug: "villa-serra",
  },
  {
    slug: "residenza-bosco",
    number: 3,
    name: "Residenza Bosco",
    tagline: "A forest retreat in timber and light.",
    location: { city: "Lake Zurich", country: "Switzerland", coordinates: { lat: 47.3667, lng: 8.55 } },
    type: "retreat",
    area: 290,
    bedrooms: 3,
    bathrooms: 2,
    price: "€2.7M",
    status: "coming-soon",
    description:
      "Nestled in a beech forest above Lake Zurich, Residenza Bosco is a study in timber and silence. CLT construction meets Swiss precision in a home that breathes with the seasons.",
    features: [
      "Forest-facing glass walls",
      "Wood-burning sauna",
      "Geothermal heating",
      "Meditation pavilion",
      "Apple orchard",
      "Cross-laminated timber structure",
      "Green roof system",
      " EV charging",
    ],
    materials: [
      { name: "Cross-laminated timber", description: "Structural walls and floors, locally sourced spruce" },
      { name: "Basalt stone", description: "Foundation and retaining walls" },
      { name: "Copper cladding", description: "Façade panels, naturally patinated" },
      { name: "Triple-pane glass", description: "Thermally broken frames, forest views" },
    ],
    images: {
      hero: "/architecture/residenza-bosco-hero.jpg",
      gallery: [
        "/architecture/joel-filipe-RFDP7_80v5A-unsplash (1).jpg",
        "/architecture/joel-filipe-RFDP7_80v5A-unsplash (2).jpg",
        "/architecture/joel-filipe-RFDP7_80v5A-unsplash (3).jpg",
        "/architecture/tim-stief-dH6IjhWHNQQ-unsplash (2).jpg",
        "/architecture/tim-stief-dH6IjhWHNQQ-unsplash (3).jpg",
        "/architecture/anders-jilden-Sc5RKXLBjGg-unsplash.jpg",
      ],
      floorPlan: "/floor-plans/residenza-bosco.svg",
    },
    landmarks: [
      { name: "Zurich Airport", distance: "38 km" },
      { name: "Zurich city center", distance: "24 km" },
      { name: "Lake Zurich shore", distance: "1.8 km" },
      { name: "Uetliberg summit", distance: "4 km" },
    ],
    architect: "Bosco Studio",
    nextSlug: "villa-tramontana",
    prevSlug: "casa-lago",
  },
  {
    slug: "villa-tramontana",
    number: 4,
    name: "Villa Tramontana",
    tagline: "Wind, stone, and the Mallorcan sun.",
    location: { city: "Mallorca", country: "Spain", coordinates: { lat: 39.6, lng: 2.9833 } },
    type: "villa",
    area: 520,
    bedrooms: 6,
    bathrooms: 5,
    price: "€5.4M",
    status: "available",
    description:
      "Built from the island's own marble and caliza stone, Villa Tramontana is a modern finca oriented to catch the Tramontana wind — cooling interiors without mechanical systems.",
    features: [
      "Tramontana wind channels",
      "Olive grove (200 trees)",
      "Natural swimming pond",
      "Outdoor dining pavilion",
      "Guest casita",
      "Marble-tiled bathrooms",
      "Photovoltaic canopy",
      "Automated irrigation",
    ],
    materials: [
      { name: "Marès stone", description: "Load-bearing walls, local sandstone" },
      { name: "Mallorcan marble", description: "Interior flooring and countertops" },
      { name: "Olive wood beams", description: "Reclaimed structural timber" },
      { name: "Terracotta roof tiles", description: "Handmade from local clay" },
    ],
    images: {
      hero: "/architecture/villa-tramontana-hero.jpg",
      gallery: [
        "/architecture/tim-stief-dH6IjhWHNQQ-unsplash (1).jpg",
        "/architecture/tim-stief-dH6IjhWHNQQ-unsplash (2).jpg",
        "/architecture/tim-stief-dH6IjhWHNQQ-unsplash (3).jpg",
        "/architecture/anders-jilden-Sc5RKXLBjGg-unsplash (1).jpg",
        "/architecture/anders-jilden-Sc5RKXLBjGg-unsplash (2).jpg",
        "/architecture/phil-desforges-ow1mML1sOi0-unsplash.jpg",
      ],
      floorPlan: "/floor-plans/villa-tramontana.svg",
    },
    landmarks: [
      { name: "Palma de Mallorca Airport", distance: "28 km" },
      { name: "Deià village", distance: "6 km" },
      { name: "Mediterranean coastline", distance: "0.5 km" },
      { name: "Serra de Tramuntana", distance: "2 km" },
    ],
    architect: "Atelier Sol",
    nextSlug: "casa-pietra",
    prevSlug: "residenza-bosco",
  },
  {
    slug: "casa-pietra",
    number: 5,
    name: "Casa Pietra",
    tagline: "A stone apartment above the harbor.",
    location: { city: "Portofino", country: "Italy", coordinates: { lat: 44.3033, lng: 9.2097 } },
    type: "apartment",
    area: 180,
    bedrooms: 2,
    bathrooms: 2,
    price: "€1.9M",
    status: "sold",
    description:
      "Perched above Portofino's harbor, Casa Pietra is a two-bedroom apartment carved from a 16th-century stone palazzo. Modern interiors honor the original masonry.",
    features: [
      "Harbor-view terrace",
      "Original stone walls exposed",
      "Underfloor heating",
      "Custom walnut kitchen",
      "Walk-in rain shower",
      "Smart lighting system",
      "Wine storage (50 bottles)",
      "Shared courtyard garden",
    ],
    materials: [
      { name: "Portofino stone", description: "Original 16th-century load-bearing walls" },
      { name: "Walnut", description: "Custom kitchen and built-in furniture" },
      { name: "Carrara marble", description: "Bathroom vanities and shower walls" },
      { name: "Handmade terrazzo", description: "Living area flooring" },
    ],
    images: {
      hero: "/architecture/casa-pietra-hero.jpg",
      gallery: [
        "/architecture/anders-jilden-Sc5RKXLBjGg-unsplash (1).jpg",
        "/architecture/anders-jilden-Sc5RKXLBjGg-unsplash (2).jpg",
        "/architecture/phil-desforges-ow1mML1sOi0-unsplash.jpg",
        "/architecture/phil-desforges-ow1mML1sOi0-unsplash (1).jpg",
        "/architecture/sean-pollock-PhYq704ffdA-unsplash (2).jpg",
        "/architecture/joel-filipe-RFDP7_80v5A-unsplash.jpg",
      ],
      floorPlan: "/floor-plans/casa-pietra.svg",
    },
    landmarks: [
      { name: "Genoa Airport", distance: "32 km" },
      { name: "Portofino harbor", distance: "0.2 km" },
      { name: "Cinque Terre", distance: "45 km" },
      { name: "Santa Margherita Ligure", distance: "4 km" },
    ],
    architect: "Pietra Atelier",
    nextSlug: "villa-serra",
    prevSlug: "villa-tramontana",
  },
];
