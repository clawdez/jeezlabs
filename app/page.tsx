import Link from "next/link";
import HoverSound from "./HoverSound";
import { PRODUCTS, STATUS_LABEL } from "./products";

function builderLabel(builtBy?: string) {
  if (builtBy === "jhinresh") return "built by jhinresh";
  if (builtBy === "ezven") return "built by ezven";
  return "built by jhinresh + ezven";
}

function builderClass(builtBy?: string) {
  if (builtBy === "jhinresh") return "je-active";
  if (builtBy === "ezven") return "ez-active";
  return "jeez-active";
}

export default function Home() {
  const liveCount = PRODUCTS.filter((product) => product.s === "live").length;
  const shippedCount = PRODUCTS.filter((product) => product.s === "shipped").length;
  const buildingCount = PRODUCTS.filter((product) => product.s === "building").length;
  const iOSCount = PRODUCTS.filter((product) => product.k.startsWith("ios ")).length;
  const protocolCount = PRODUCTS.filter((product) => product.k.includes("agent") || product.k.includes("trust")).length;
  const winnerCount = PRODUCTS.filter((product) => product.hackathon).length;

  return (
    <main className="archive-page">
      <HoverSound />
      <header className="chrome archive-chrome">
        <Link className="mark" href="/" aria-label="JeezLabs home">
          jeezlabs
        </Link>
        <nav className="nav" aria-label="Primary navigation">
          <Link href="/about">
            about
          </Link>
          <a href="https://github.com/JhiNResH/jeezlabs" target="_blank" rel="noopener noreferrer">
            gh↗
          </a>
          <a href="https://x.com/0xmaiat" target="_blank" rel="noopener noreferrer">
            x↗
          </a>
        </nav>
      </header>

      <section className="archive-shell" aria-labelledby="hero-title">
        <h1 className="sr-only" id="hero-title">JeezLabs product drop index</h1>

        <ol className="ms-drop-list" aria-label="JeezLabs product drops">
          {PRODUCTS.map((product, index) => {
            const primaryHref = product.href ?? product.repo;

            return (
              <li className="ms-drop-row" data-hover-sound key={product.slug}>
                <span className="ms-hash">#</span>
                <span className="ms-number">{String(index + 1)}</span>
                <span className="ms-name-cell">
                  {primaryHref ? (
                    <a
                      className="ms-title"
                      href={primaryHref}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {product.t}
                    </a>
                  ) : (
                    <span className="ms-title">{product.t}</span>
                  )}
                  {product.hackathon ? (
                    <span className="ms-award">{product.hackathon}</span>
                  ) : null}
                </span>
                <span className="ms-meta">
                  <span className="ms-kind">{product.k}</span>
                  <span className={`status ${product.s}`}>{STATUS_LABEL[product.s]}</span>
                  <span
                    className={`jeez-mark ${builderClass(product.builtBy)}`}
                    aria-label={builderLabel(product.builtBy)}
                  >
                    <span>JE</span>
                    <span>EZ</span>
                  </span>
                  <span className="ms-links">
                    {product.href ? (
                      <a href={product.href} target="_blank" rel="noopener noreferrer">
                        web↗
                      </a>
                    ) : null}
                    {product.repo ? (
                      <a href={product.repo} target="_blank" rel="noopener noreferrer">
                        gh↗
                      </a>
                    ) : null}
                  </span>
                </span>
              </li>
            );
          })}
        </ol>

        <footer className="archive-footer">
          <div>
            <span>LIVE {String(liveCount).padStart(2, "0")}</span>
            <span>SHIPPED {String(shippedCount).padStart(2, "0")}</span>
            <span>BUILDING {String(buildingCount).padStart(2, "0")}</span>
            <span>IOS {String(iOSCount).padStart(2, "0")}</span>
            <span>AGENT/PROTOCOL {String(protocolCount).padStart(2, "0")}</span>
            <span>WINNERS {String(winnerCount).padStart(2, "0")}</span>
          </div>
          <div className="archive-makers">
            <span>
              JHINRESH{" "}
              <span
                className={`jeez-mark ${builderClass("jhinresh")}`}
                aria-label={builderLabel("jhinresh")}
              >
                <span>JE</span>
                <span>EZ</span>
              </span>
            </span>
            <span>
              EZVEN{" "}
              <span
                className={`jeez-mark ${builderClass("ezven")}`}
                aria-label={builderLabel("ezven")}
              >
                <span>JE</span>
                <span>EZ</span>
              </span>
            </span>
            <span>
              SHARED{" "}
                <span
                  className={`jeez-mark ${builderClass()}`}
                  aria-label={builderLabel()}
                >
                  <span>JE</span>
                  <span>EZ</span>
                </span>
            </span>
          </div>
        </footer>
      </section>
    </main>
  );
}
