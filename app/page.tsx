"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { PRODUCTS, STATUS_LABEL } from "./products";

type Theme = "dark" | "paper";
type Focus = "full" | "minimal";

interface TweakState {
  theme: Theme;
  accent: string;
  focus: Focus;
}

const DEFAULTS: TweakState = { theme: "dark", accent: "#d9ff4b", focus: "full" };

export default function Home() {
  const [state, setState] = useState<TweakState>(DEFAULTS);
  const [tweaksOpen, setTweaksOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("paper", state.theme === "paper");
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
            <span className="dot" />product lab
          </div>
        </div>
        <div className="right">
          <a href="#works">products</a>
          <a href="#about">about</a>
          <a href="https://x.com/0xmaiat" target="_blank" rel="noopener noreferrer">x</a>
          <span style={{ color: "var(--dim)" }}>living archive</span>
        </div>
      </div>

      {/* hero */}
      <section className="hero">
        <div className="hero-qr">
          <div className="hero-qr-card">
            <Image
              src="/hero/poap-qr.jpg"
              alt="POAP QR code"
              width={1080}
              height={1080}
              priority
            />
          </div>
          <div className="hero-qr-meta">
            <span>scan</span>
            <strong>poap</strong>
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
            <div className="badge">builders</div>
            <div className="lab-stat" style={{ justifyContent: "center", marginTop: 4 }}>
              <span className="big">02</span>
              <span className="lbl">jhinresh · ezven</span>
            </div>
          </div>

          <div className="tl-c">
            <div className="badge">jzl · 02</div>
            <div style={{ marginTop: 6, color: "var(--dim)", fontSize: 11 }}>est. 2024 / tpe · sf · tx</div>
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
            <div className="badge">rhythm</div>
            <div style={{ color: "var(--dim)", fontSize: 11, marginTop: 4 }}>always in progress</div>
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
            <Link
              key={w.t}
              className="work-row"
              href={`/products/${w.slug}`}
            >
              <div className="idx">{String(i + 1).padStart(3, "0")}</div>
              <div className="product-main">
                <div className="title-row">
                  <div className="title">{w.t.split(" ")[0]} <em>{w.t.split(" ").slice(1).join(" ")}</em></div>
                  {w.hackathon ? <div className="hackathon-badge">🏆 {w.hackathon}</div> : null}
                </div>
                <div className="desc">{w.desc}</div>
                <div className="builder-line">
                  <span
                    className={`jeez-mark${w.builtBy === "jhinresh" ? " je-active" : ""}${w.builtBy === "ezven" ? " ez-active" : ""}${!w.builtBy ? " jeez-active" : ""}`}
                    aria-label={w.builtBy ? `built by ${w.builtBy}` : "built by jhinresh and ezven"}
                  >
                    <span>JE</span>
                    <span>EZ</span>
                  </span>
                  <span className="byline">{w.builtBy ? `built by ${w.builtBy}` : "built by jhinresh · ezven"}</span>
                </div>
              </div>
              <div className="kind">{w.k}</div>
              <div className="year">{w.y}</div>
              <div className={`status ${w.s}`}><span className="dot-mini" />{STATUS_LABEL[w.s]}</div>
              <div className="arrow">→</div>
              <div
                className={`work-preview ${w.k.startsWith("ios ") ? "app-work-preview" : ""} ${w.art}`}
                style={w.previewImage ? { backgroundImage: `url(${w.previewImage})` } : undefined}
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </section>

      {/* about */}
      <section className="about" id="about">
        <div>
          <h2>two <em>friends.</em><br />one <em>lab.</em><br />many <em>small</em> products.</h2>
          <a
            className="social-embed"
            href="https://x.com/virtuals_io/status/2032005346185920557?s=20"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Virtuals post about JeezLabs on X"
          >
            <span className="social-embed-kicker">x / virtuals_io</span>
            <span className="social-embed-title">JeezLabs on Virtuals</span>
            <span className="social-embed-url">x.com/virtuals_io/status/2032005346185920557</span>
          </a>
        </div>
        <div className="copy">
          <p>jeezlabs is a <em>two-person</em> product lab for internet software, protocol experiments, and small tools we want to see exist.</p>
          <p>we keep the page as a living index: when a product ships, grows, pauses, or turns into something else, it gets marked here.</p>
          <p>some entries are live. some are still rough. all of them are part of the same habit: <em>build, ship, learn, repeat.</em></p>
          <div className="duo">
            <div className="person">
              <div
                className="avatar avatar-photo"
                style={{ backgroundImage: "url('/avatars/jhinresh.jpg')" }}
                aria-label="jhinresh profile picture"
              />
              <div className="name">— jhinresh</div>
              <div className="role">builder / product</div>
              <div className="links">
                <a href="https://github.com/JhiNResH" target="_blank" rel="noopener noreferrer">→ github</a>
                <a href="https://x.com/JhiNResH" target="_blank" rel="noopener noreferrer">→ x / twitter</a>
              </div>
            </div>
            <div className="person">
              <div
                className="avatar avatar-photo"
                style={{ backgroundImage: "url('/avatars/ezven.jpg')" }}
                aria-label="ezven profile picture"
              />
              <div className="name">— ezven</div>
              <div className="role">builder / product</div>
              <div className="links">
                <a href="https://x.com/ezveng" target="_blank" rel="noopener noreferrer">→ x / twitter</a>
                <a href="https://github.com/Ferxxo-pa" target="_blank" rel="noopener noreferrer">→ github</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="foot">
        <div>© jeezlabs 2024— · product index</div>
        <div className="foot-links">
          <span>built by two friends, shipped in public</span>
          <a href="https://x.com/0xmaiat" target="_blank" rel="noopener noreferrer">→ @0xmaiat</a>
        </div>
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
