export type ProductStatus = "live" | "building" | "shipped" | "paused";

export interface Product {
  slug: string;
  t: string;
  k: string;
  y: string;
  s: ProductStatus;
  art: string;
  desc: string;
  builtBy?: string;
  href?: string;
  repo?: string;
  previewImage?: string;
  preview: {
    lead: string;
    notes: string[];
  };
}

export const PRODUCTS: Product[] = [
  {
    slug: "dojo",
    t: "Dojo",
    k: "skill marketplace",
    y: "2026",
    s: "live",
    art: "art-1",
    desc: "AI skill marketplace with a newspaper-style product surface.",
    href: "https://maiat-dojo.vercel.app",
    repo: "https://github.com/JhiNResH/maiat-dojo",
    previewImage: "/previews/dojo.png",
    preview: {
      lead: "A market surface for discovering, packaging, and shipping agent skills with an editorial feel.",
      notes: ["Newspaper-style interface", "Skill discovery and browsing", "Built for fast iteration"],
    },
  },
  {
    slug: "jiagon",
    t: "Jiagon",
    k: "verified reviews",
    y: "2026",
    s: "live",
    art: "art-2",
    desc: "Receipt-gated review prototype backed by onchain payment proofs.",
    builtBy: "jhinresh",
    href: "https://jiagon.vercel.app",
    repo: "https://github.com/JhiNResH/jiagon",
    previewImage: "/previews/jiagon.png",
    preview: {
      lead: "A verified-review experiment where payment proof and product feedback sit in the same flow.",
      notes: ["Receipt-gated review model", "Onchain payment proof", "Built by jhinresh"],
    },
  },
  {
    slug: "maiat-protocol",
    t: "Maiat Protocol",
    k: "agent trust layer",
    y: "2026",
    s: "building",
    art: "art-3",
    desc: "Trust oracle for AI agents, tokens, attestations, and agentic commerce.",
    href: "https://app.maiat.io",
    repo: "https://github.com/JhiNResH/maiat-protocol",
    previewImage: "/previews/maiat-protocol.png",
    preview: {
      lead: "A protocol layer for trust signals, attestations, and reputation across agentic commerce.",
      notes: ["Agent trust scoring", "Attestation-aware reputation", "Protocol-first direction"],
    },
  },
  {
    slug: "wanderly",
    t: "Wanderly",
    k: "ios travel app",
    y: "2026",
    s: "building",
    art: "art-4",
    desc: "AI-powered place discovery and trip planning app for iOS.",
    builtBy: "jhinresh",
    repo: "https://github.com/JhiNResH/wanderly",
    preview: {
      lead: "Save places from Instagram, Threads, Xiaohongshu, or any app; Wanderly extracts place details, pins them to a personal map, and helps plan trips.",
      notes: [
        "AI place extraction from shared links and images",
        "MapKit place map, place lists, and trip planning",
        "Share Extension and App Clip support",
        "Built by jhinresh",
      ],
    },
  },
  {
    slug: "cloak",
    t: "Cloak",
    k: "ios virtual try-on",
    y: "2026",
    s: "shipped",
    art: "art-5",
    desc: "Virtual try-on iOS app for trying clothes with your own photo.",
    builtBy: "jhinresh",
    repo: "https://github.com/JhiNResH/cloak",
    preview: {
      lead: "Cloak is an iOS virtual try-on app for testing clothing looks with your own photo.",
      notes: ["Use a personal photo", "Preview clothing looks on iOS", "Built by jhinresh"],
    },
  },
];

export const STATUS_LABEL: Record<ProductStatus, string> = {
  live: "live",
  building: "building",
  shipped: "shipped",
  paused: "paused",
};

export function getProductBySlug(slug: string) {
  return PRODUCTS.find((product) => product.slug === slug);
}
