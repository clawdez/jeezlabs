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

interface Work {
  t: string;
  k: string;
  y: string;
  s: "live" | "ship" | "draft";
  art: string;
}

const WORKS: Work[] = [
  { t: "Cassette OS",        k: "macOS app",      y: "2025", s: "live",  art: "art-1"  },
  { t: "Nightshade",         k: "web / game",     y: "2025", s: "live",  art: "art-2"  },
  { t: "Little Radar",       k: "ios",            y: "2025", s: "ship",  art: "art-3"  },
  { t: "Petal Protocol",     k: "experiment",     y: "2024", s: "live",  art: "art-4"  },
  { t: "Subway Signs",       k: "generative",     y: "2024", s: "ship",  art: "art-5"  },
  { t: "Heart Rate Opera",   k: "installation",   y: "2024", s: "ship",  art: "art-6"  },
  { t: "Paper Calendar",     k: "print / web",    y: "2024", s: "ship",  art: "art-7"  },
  { t: "Neon Weather",       k: "widget",         y: "2024", s: "draft", art: "art-8"  },
  { t: "Scanlines",          k: "video tool",     y: "2023", s: "ship",  art: "art-9"  },
  { t: "Mossy",              k: "zine",           y: "2023", s: "ship",  art: "art-10" },
  { t: "Half Moon Keyboard", k: "hardware",       y: "2023", s: "draft", art: "art-11" },
  { t: "Spin Cycle",         k: "web toy",        y: "2023", s: "ship",  art: "art-12" },
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

const SPIRAL_POS: Pos[] = WORKS.map((_, i) => {
  const angle = (i / WORKS.length) * Math.PI * 3;
  const r = 50 + i * 22;
  return { x: Math.cos(angle) * r, y: Math.sin(angle) * r, z: (i % 4) * 30 - 60, r: (angle * 180 / Math.PI) % 30 - 15 };
});

const GRID_POS: Pos[] = WORKS.map((_, i) => ({
  x: (i % 4) * 140 - 210,
  y: Math.floor(i / 4) * 200 - 200,
  z: 0,
  r: 0,
}));

const DEFAULTS: TweakState = { theme: "dark", arrangement: "pile", accent: "#d9ff4b", focus: "full" };

const STATUS_LABEL: Record<Work["s"], string> = { live: "live", ship: "shipped", draft: "draft" };

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

  return (
    <>
      {/* chrome */}
      <div className="chrome">
        <div className="left">
          <div className="mark">jeez<em>labs</em></div>
          <div style={{ color: "var(--dim)", alignSelf: "center" }}>
            <span className="dot" />live · idx/001
          </div>
        </div>
        <div className="right">
          <a href="#works">works</a>
          <a href="#about">about</a>
          <a href="#contact">contact</a>
          <span style={{ color: "var(--dim)" }}>{dateStr}</span>
        </div>
      </div>

      {/* hero */}
      <section className="hero">
        <div className="pile">
          <div className="pile-stage">
            {WORKS.map((w, i) => {
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
              3 live · 2 in-studio
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
            <div className="eyebrow">jeezlabs — a two-person studio</div>
            <h1>
              small <em>things</em>,<br />
              made <span className="amp">&amp;</span> shipped<br />
              <em>mostly</em> on weekends.
            </h1>
          </div>

          <div className="bl-a">
            <div className="badge">works idx</div>
            <div style={{ color: "var(--dim)", fontSize: 11, marginTop: 4 }}>↓ scroll · 12 entries</div>
          </div>

          <div className="bl-b">
            <div className="badge">manifest</div>
            <div style={{ color: "var(--dim)", marginTop: 4, fontStyle: "italic", fontFamily: "var(--font-serif), serif", fontSize: 16 }}>
              &ldquo;if it&apos;s dumb and it works, it isn&apos;t dumb&rdquo;
            </div>
          </div>

          <div className="bl-c">
            <div className="badge">tomorrow 15.00 pm</div>
            <div style={{ color: "var(--dim)", fontSize: 11, marginTop: 4 }}>{todayStr}</div>
          </div>
        </div>

        <div className="ticker-side">
          <div className="stream">
            JEEZLABS · INDEX/001 · WE MAKE THINGS · WE SHIP THINGS · WE BREAK THINGS · JEEZLABS · INDEX/001 · WE MAKE THINGS · WE SHIP THINGS · WE BREAK THINGS ·
          </div>
        </div>
      </section>

      {/* works */}
      <section className="slab" id="works">
        <div className="works-header">
          <h2>the <em>works</em>.</h2>
          <div className="count">012 entries · sorted by recency ↓</div>
        </div>
        <div className="works-list">
          {WORKS.map((w, i) => (
            <a key={w.t} className="work-row" href="#">
              <div className="idx">{String(i + 1).padStart(3, "0")}</div>
              <div className="title">{w.t.split(" ")[0]} <em>{w.t.split(" ").slice(1).join(" ")}</em></div>
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
          <h2>two <em>friends.</em><br />one <em>workshop.</em><br />many <em>small</em> things.</h2>
        </div>
        <div className="copy">
          <p>jeezlabs is a <em>two-person</em> studio that makes software, sketches, and occasional physical objects — mostly on weekends, mostly for the fun of it.</p>
          <p>we&apos;re interested in <em>tools that feel like toys</em>, interfaces that behave like instruments, and the kind of small weird things that would never survive a product roadmap.</p>
          <p>we ship when it&apos;s ready. sometimes that&apos;s a tuesday. sometimes it&apos;s <em>never.</em></p>
          <div className="duo">
            <div className="person">
              <div className="avatar" data-init="j" />
              <div className="name">— you</div>
              <div className="role">half of jeezlabs</div>
              <div className="links">
                <a href="#">→ twitter</a>
                <a href="#">→ github</a>
              </div>
            </div>
            <div className="person">
              <div className="avatar" data-init="z" />
              <div className="name">— friend</div>
              <div className="role">other half</div>
              <div className="links">
                <a href="#">→ twitter</a>
                <a href="#">→ github</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* contact */}
      <section className="contact" id="contact">
        <div className="line">got an <em>idea?</em><br />send it over.</div>
        <a href="mailto:hey@jeezlabs.io" className="email">hey@jeezlabs.io</a>
      </section>

      <footer className="foot">
        <div>© jeezlabs 2024— · all wrongs reserved</div>
        <div>built w/ <span style={{ color: "var(--hot)" }}>♥</span> in the dark</div>
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
