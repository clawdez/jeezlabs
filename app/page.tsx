"use client";

import { useState, useEffect, useCallback } from "react";

type Theme = "dark" | "paper";
type Arrangement = "pile" | "spiral" | "grid";
type Focus = "full" | "minimal";

interface TweakState {
  theme: Theme;
  arrangement: Arrangement;
  accent: string;
  focus: Focus;
}

interface Product {
  t: string;
  k: string;
  y: string;
  s: "live" | "building" | "shipped" | "paused";
  art: string;
  desc: string;
  builtBy?: string;
  href?: string;
  repo?: string;
}

const PRODUCTS: Product[] = [
  {
    t: "Dojo",
    k: "skill marketplace",
    y: "2026",
    s: "live",
    art: "art-1",
    desc: "AI skill marketplace with a newspaper-style product surface.",
    href: "https://maiat-dojo.vercel.app",
    repo: "https://github.com/JhiNResH/maiat-dojo",
  },
  {
    t: "Jiagon",
    k: "verified reviews",
    y: "2026",
    s: "live",
    art: "art-2",
    desc: "Receipt-gated review prototype backed by onchain payment proofs.",
    builtBy: "jhinresh",
    href: "https://jiagon.xyz",
    repo: "https://github.com/JhiNResH/jiagon",
  },
  {
    t: "Maiat Protocol",
    k: "agent trust layer",
    y: "2026",
    s: "building",
    art: "art-3",
    desc: "Trust oracle for AI agents, tokens, attestations, and agentic commerce.",
    href: "https://app.maiat.io",
    repo: "https://github.com/JhiNResH/maiat-protocol",
  },
  {
    t: "Wanderly",
    k: "product sketch",
    y: "2026",
    s: "building",
    art: "art-4",
    desc: "A fresh product sketch from the lab, still being shaped in public.",
    builtBy: "jhinresh",
    repo: "https://github.com/JhiNResH/wanderly",
  },
  {
    t: "Cloak",
    k: "virtual try-on",
    y: "2026",
    s: "shipped",
    art: "art-5",
    desc: "Virtual try-on PWA for trying clothes with your own photo.",
    builtBy: "jhinresh",
    repo: "https://github.com/JhiNResH/cloak",
  },
];

type Pos = { x: number; y: number; z: number; r: number };

const PILE_POS: Pos[] = [
  { x: -180, y: -160, z: -200, r: -18 },
  { x:  -40, y: -180, z:  -80, r:  -8 },
  { x:  130, y: -140, z:   40, r:   6 },
  { x: -220, y:  -40, z:  -60, r: -22 },
  { x:  -60, y:  -30, z:  120, r:   2 },
  { x:  160, y:  -20, z:    0, r:  12 },
  { x: -200, y:   90, z:  -40, r:  28 },
  { x:  -30, y:  110, z:   80, r:  -6 },
  { x:  170, y:   90, z: -100, r:  18 },
  { x: -100, y:  200, z:   20, r: -14 },
  { x:   70, y:  210, z:  -60, r:  22 },
  { x:  -10, y:   40, z:  200, r:  -2 },
];

const SPIRAL_POS: Pos[] = PRODUCTS.map((_, i) => {
  const angle = (i / PRODUCTS.length) * Math.PI * 3;
  const r = 50 + i * 22;
  return { x: Math.cos(angle) * r, y: Math.sin(angle) * r, z: (i % 4) * 30 - 60, r: (angle * 180 / Math.PI) % 30 - 15 };
});

const GRID_POS: Pos[] = PRODUCTS.map((_, i) => ({
  x: (i % 4) * 140 - 210,
  y: Math.floor(i / 4) * 200 - 200,
  z: 0,
  r: 0,
}));

const DEFAULTS: TweakState = { theme: "dark", arrangement: "pile", accent: "#d9ff4b", focus: "full" };

const STATUS_LABEL: Record<Product["s"], string> = {
  live: "live",
  building: "building",
  shipped: "shipped",
  paused: "paused",
};

export default function Home() {
  const [state, setState] = useState<TweakState>(DEFAULTS);
  const [clock, setClock] = useState("00:00:00");
  const [dateStr, setDateStr] = useState("");
  const [todayStr, setTodayStr] = useState("");
  const [tweaksOpen, setTweaksOpen] = useState(false);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const pad = (n: number) => String(n).padStart(2, "0");
      setClock(`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`);
      setDateStr(`${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`);
      setTodayStr(`${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("paper", state.theme === "paper");
    document.body.classList.toggle("arr-grid", state.arrangement === "grid");
    document.body.classList.toggle("hero-minimal", state.focus === "minimal");
    document.documentElement.style.setProperty("--warn", state.accent);
  }, [state]);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === "__activate_edit_mode") setTweaksOpen(true);
      if (e.data?.type === "__deactivate_edit_mode") setTweaksOpen(false);
    };
    window.addEventListener("message", handler);
    try { window.parent.postMessage({ type: "__edit_mode_available" }, "*"); } catch {}
    return () => window.removeEventListener("message", handler);
  }, []);

  const set = useCallback(<K extends keyof TweakState>(key: K, val: TweakState[K]) => {
    setState(prev => ({ ...prev, [key]: val }));
    try { window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { [key]: val } }, "*"); } catch {}
  }, []);

  const positions = state.arrangement === "spiral" ? SPIRAL_POS : state.arrangement === "grid" ? GRID_POS : PILE_POS;
  const liveCount = PRODUCTS.filter(product => product.s === "live").length;
  const buildingCount = PRODUCTS.filter(product => product.s === "building").length;
  const latestProduct = PRODUCTS[0];

  return (
    <>
      {/* chrome */}
      <div className="chrome">
        <div className="left">
          <div className="mark">jeez<em>labs</em></div>
          <div style={{ color: "var(--dim)", alignSelf: "center" }}>
            <span className="dot" />product lab · idx/001
          </div>
        </div>
        <div className="right">
          <a href="#works">products</a>
          <a href="#about">about</a>
          <a href="#contact">contact</a>
          <span style={{ color: "var(--dim)" }}>{dateStr}</span>
        </div>
      </div>

      {/* hero */}
      <section className="hero">
        <div className="pile">
          <div className="pile-stage">
            {PRODUCTS.map((w, i) => {
              const p = positions[i];
              return (
                <div
                  key={w.t}
                  className="card"
                  style={{
                    "--tx": `${p.x}px`,
                    "--ty": `${p.y}px`,
                    transform: `translate(${p.x}px, ${p.y}px) translateZ(${p.z}px) rotate(${p.r}deg)`,
                    zIndex: 100 + p.z,
                  } as React.CSSProperties}
                >
                  <div className={`inner ${w.art}`}>
                    <div className="tag">{w.k}</div>
                    <div className="meta">
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      <span>{w.t}</span>
                      <span>{w.y}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="hero-overlay">
          <div className="tl-a">
            <div className="badge">currently shipping</div>
            <div style={{ marginTop: 6, fontFamily: "var(--font-serif), serif", fontSize: 20, fontStyle: "italic" }}>
              {liveCount} live · {buildingCount} building
            </div>
          </div>

          <div className="tl-b">
            <div className="badge">session</div>
            <div className="clock" style={{ justifyContent: "center", marginTop: 4 }}>
              <span className="big">{clock}</span>
            </div>
          </div>

          <div className="tl-c">
            <div className="badge">jzl · 02</div>
            <div style={{ marginTop: 6, color: "var(--dim)", fontSize: 11 }}>est. 2024 / tpe · sf</div>
          </div>

          <div className="hero-title">
            <div className="eyebrow">jeezlabs — a two-person product lab</div>
            <h1>
              small <em>products</em>,<br />
              built <span className="amp">&amp;</span> shipped<br />
              one at a time.
            </h1>
          </div>

          <div className="bl-a">
            <div className="badge">products idx</div>
            <div style={{ color: "var(--dim)", fontSize: 11, marginTop: 4 }}>↓ scroll · {PRODUCTS.length} entries</div>
          </div>

          <div className="bl-b">
            <div className="badge">last shipped</div>
            <div style={{ color: "var(--dim)", marginTop: 4, fontStyle: "italic", fontFamily: "var(--font-serif), serif", fontSize: 16 }}>
              {latestProduct.t} / {latestProduct.k}
            </div>
          </div>

          <div className="bl-c">
            <div className="badge">tomorrow 15.00 pm</div>
            <div style={{ color: "var(--dim)", fontSize: 11, marginTop: 4 }}>{todayStr}</div>
          </div>
        </div>

        <div className="ticker-side">
          <div className="stream">
            JEEZLABS · PRODUCT INDEX · BUILD SMALL · SHIP OFTEN · KEEP GOING · JEEZLABS · PRODUCT INDEX · BUILD SMALL · SHIP OFTEN · KEEP GOING ·
          </div>
        </div>
      </section>

      {/* products */}
      <section className="slab" id="works">
        <div className="works-header">
          <h2>the <em>products</em>.</h2>
          <div className="count">{String(PRODUCTS.length).padStart(3, "0")} entries · newest first ↓</div>
        </div>
        <div className="works-list">
          {PRODUCTS.map((w, i) => (
            <a
              key={w.t}
              className="work-row"
              href={w.href ?? w.repo ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="idx">{String(i + 1).padStart(3, "0")}</div>
              <div className="product-main">
                <div className="title">{w.t.split(" ")[0]} <em>{w.t.split(" ").slice(1).join(" ")}</em></div>
                <div className="desc">{w.desc}</div>
                {w.builtBy ? <div className="byline">built by {w.builtBy}</div> : null}
              </div>
              <div className="kind">{w.k}</div>
              <div className="year">{w.y}</div>
              <div className={`status ${w.s}`}><span className="dot-mini" />{STATUS_LABEL[w.s]}</div>
              <div className="arrow">→</div>
              <div className={`work-preview ${w.art}`} />
            </a>
          ))}
        </div>
      </section>

      {/* about */}
      <section className="about" id="about">
        <div>
          <h2>two <em>friends.</em><br />one <em>lab.</em><br />many <em>small</em> products.</h2>
        </div>
        <div className="copy">
          <p>jeezlabs is a <em>two-person</em> product lab for internet software, protocol experiments, and small tools we want to see exist.</p>
          <p>we keep the page as a living index: when a product ships, grows, pauses, or turns into something else, it gets marked here.</p>
          <p>some entries are live. some are still rough. all of them are part of the same habit: <em>build, ship, learn, repeat.</em></p>
          <div className="duo">
            <div className="person">
              <div className="avatar" data-init="j" />
              <div className="name">— j</div>
              <div className="role">builder / product</div>
              <div className="links">
                <a href="https://github.com/JhiNResH" target="_blank" rel="noopener noreferrer">→ github</a>
                <a href="mailto:hey@jeezlabs.io">→ email</a>
              </div>
            </div>
            <div className="person">
              <div className="avatar" data-init="z" />
              <div className="name">— friend</div>
              <div className="role">builder / product</div>
              <div className="links">
                <a href="mailto:hey@jeezlabs.io">→ contact</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* contact */}
      <section className="contact" id="contact">
        <div className="line">built something <em>new?</em><br />index it here.</div>
        <a href="mailto:hey@jeezlabs.io" className="email">hey@jeezlabs.io</a>
      </section>

      <footer className="foot">
        <div>© jeezlabs 2024— · product index</div>
        <div>built by two friends, shipped in public</div>
      </footer>

      {/* tweaks panel */}
      <div className={`tweaks-panel${tweaksOpen ? " open" : ""}`}>
        <h4><span>tweaks</span><span style={{ color: "var(--dim)" }}>jzl/cfg</span></h4>

        <div className="tweak">
          <label>theme</label>
          <div className="row">
            {(["dark", "paper"] as Theme[]).map(v => (
              <button key={v} className={`opt${state.theme === v ? " active" : ""}`} onClick={() => set("theme", v)}>{v}</button>
            ))}
          </div>
        </div>

        <div className="tweak">
          <label>hero arrangement</label>
          <div className="row">
            {(["pile", "spiral", "grid"] as Arrangement[]).map(v => (
              <button key={v} className={`opt${state.arrangement === v ? " active" : ""}`} onClick={() => set("arrangement", v)}>{v}</button>
            ))}
          </div>
        </div>

        <div className="tweak">
          <label>accent</label>
          <div className="row">
            {([["#d9ff4b", "lime"], ["#ff5a3c", "red"], ["#8ab4ff", "blue"], ["#e8e2d3", "bone"]] as [string, string][]).map(([val, label]) => (
              <button key={val} className={`opt${state.accent === val ? " active" : ""}`} onClick={() => set("accent", val)}>{label}</button>
            ))}
          </div>
        </div>

        <div className="tweak">
          <label>hero focus</label>
          <div className="row">
            {(["full", "minimal"] as Focus[]).map(v => (
              <button key={v} className={`opt${state.focus === v ? " active" : ""}`} onClick={() => set("focus", v)}>{v}</button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
