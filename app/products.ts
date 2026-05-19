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
  hackathon?: string; // e.g. "hackathon winner"
  preview: {
    lead: string;
    notes: string[];
  };
}

export const PRODUCTS: Product[] = [
  {
    slug: "gimi",
    t: "Gimi",
    k: "agentic rentals",
    y: "2026",
    s: "shipped",
    art: "art-8",
    desc: "Award-winning AI rental agent for school, community, and hackathon inventory.",
    repo: "https://github.com/clawdez/Gimi",
    hackathon: "hackathon winner",
    previewImage: "/previews/gimi.png",
    preview: {
      lead: "Gimi is an agentic rental marketplace with Solana settlement built in: ask for a nearby item, fund escrow, hold a temporary rental token, return the item, and leave a receipt-backed outcome.",
      notes: [
        "AI-guided inventory search and rental checkout",
        "Solana escrow, metered rent accrual, rental-token state, and receipt events",
        "LI.FI funding quotes, ElevenLabs tools, Privy wallet onboarding, and MCP-style rental tools",
        "Award-winning hackathon build by jeezlabs",
      ],
    },
  },
  {
    slug: "pincher",
    t: "Pincher",
    k: "carpool matcher agent",
    y: "2026",
    s: "live",
    art: "art-2",
    desc: "Telegram-first carpool matcher for crypto conference side events.",
    builtBy: "jhinresh",
    href: "https://pincher.vercel.app",
    repo: "https://github.com/JhiNResH/Pincher",
    previewImage: "/previews/pincher.png",
    preview: {
      lead: "A ride agent for conference side events: create Telegram ride rooms, match riders by destination and time, and coordinate manual splits after one person calls Uber.",
      notes: [
        "Telegram-first ride rooms and group topics",
        "Destination and departure-time matching",
        "Manual USDC, Venmo, Zelle, cash, or local settlement",
        "Built by jhinresh",
      ],
    },
  },
  {
    slug: "pingme",
    t: "pingme",
    k: "ping pong finder",
    y: "2026",
    s: "live",
    art: "art-3",
    desc: "See who's down to play ping pong right now. Signal your status, get pinged when others are ready.",
    builtBy: "ezven",
    repo: "https://github.com/Ferxxo-pa/pingme",
    previewImage: "/previews/pingme.png",
    preview: {
      lead: "A real-time status board for pickup ping pong. Drag the ball to signal you're down, get push-notified when others are ready. Live at Texas Tech.",
      notes: [
        "Real-time presence — see who's down, playing, or away",
        "Push notifications when the app is closed",
        "PWA — installs to home screen on iOS and Android",
        "Built by ezven",
      ],
    },
  },
  {
    slug: "distoken",
    t: "DisToken",
    k: "nft gallery viewer",
    y: "2026",
    s: "shipped",
    art: "art-1",
    desc: "Multi-chain NFT gallery viewer. Paste any wallet, see your entire collection across 8 blockchains instantly.",
    builtBy: "ezven",
    href: "https://distoken.art",
    repo: "https://github.com/Ferxxo-pa/DisToken",
    hackathon: "hackathon winner",
    previewImage: "/previews/distoken.png",
    preview: {
      lead: "The best display for digital art is the screen you already own. Paste a wallet address and see your entire collection across 8 chains — no account needed.",
      notes: [
        "8-chain support: Ethereum, Solana, Base, Polygon, Arbitrum, Optimism, Tezos, Ordinals",
        "Phone remote control via QR code and room code",
        "Kiosk mode for galleries and retail",
        "Embed widget for any website",
        "Built by ezven",
      ],
    },
  },
  {
    slug: "transparent",
    t: "Transparent",
    k: "multiplayer party game",
    y: "2026",
    s: "shipped",
    art: "art-4",
    desc: "Real-money multiplayer party game on Solana. Players buy in with SOL, answer personal questions, and the most transparent player wins the pot.",
    builtBy: "ezven",
    href: "https://transparent-five.vercel.app",
    repo: "https://github.com/Ferxxo-pa/transparent",
    previewImage: "/previews/transparent.png",
    preview: {
      lead: "The party game with real stakes. Buy in with SOL, answer personal questions in the hot seat, and the most transparent player wins the pot.",
      notes: [
        "Real SOL buy-ins and payouts on-chain",
        "Email login with embedded wallets — no seed phrases",
        "Prediction market for side bets",
        "3 game modes: Classic, Hot-Take, Custom",
        "Built by ezven",
      ],
    },
  },
  {
    slug: "redlineai",
    t: "Redline AI",
    k: "law review scanner",
    y: "2026",
    s: "live",
    art: "art-5",
    desc: "Automated law review scanner. Upload a manuscript, get instant style violation flags with exact rule citations.",
    builtBy: "ezven",
    previewImage: "/previews/redlineai.png",
    preview: {
      lead: "Scan your law review paper for style violations instantly. Supports PDF, DOCX, and plain text. 61+ rules with AI-powered context-aware detection.",
      notes: [
        "61+ style violation rules with exact citations",
        "AI mode (Claude) for context-aware detection",
        "PDF, DOCX, and plain text support",
        "Built by ezven",
      ],
    },
  },
  {
    slug: "dojo",
    t: "Dojo",
    k: "skill marketplace",
    y: "2026",
    s: "live",
    art: "art-2",
    desc: "AI skill marketplace with a newspaper-style product surface.",
    hackathon: "hackathon winner",
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
    art: "art-1",
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
    hackathon: "hackathon winner",
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
    previewImage: "/previews/wanderly.png",
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
    previewImage: "/previews/cloak.png",
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
