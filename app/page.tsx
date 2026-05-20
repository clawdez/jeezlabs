import Image from "next/image";
import Link from "next/link";
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
    <main>
      <header className="chrome">
        <Link className="mark" href="/" aria-label="JeezLabs home">
          jeez<em>labs</em>
        </Link>
        <nav className="nav" aria-label="Primary navigation">
          <a href="#works">products</a>
          <a href="#about">about</a>
          <a href="https://x.com/0xmaiat" target="_blank" rel="noopener noreferrer">
            @0xmaiat
          </a>
        </nav>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="kicker">two builders / public product index / 2026</p>
          <h1 id="hero-title">
            small products,
            <br />
            kept <em>in public.</em>
          </h1>
          <p className="hero-lede">
            JeezLabs is where Jhinresh and Ezven keep the things we actually
            ship: agent marketplaces, iOS apps, rental tools, verified reviews,
            protocol layers, and small internet software.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#works">
              view products
            </a>
            <a
              className="button secondary"
              href="https://x.com/virtuals_io/status/2032005346185920557?s=20"
              target="_blank"
              rel="noopener noreferrer"
            >
              virtuals post
            </a>
          </div>
        </div>

        <aside className="hero-panel lab-panel" aria-label="Current JeezLabs snapshot">
          <div className="panel-top">
            <span>lab board</span>
            <span>jzl / 02</span>
          </div>

          <div className="lab-board">
            <div className="lab-board-mark" aria-label="JEEZ">
              <span>JE</span>
              <span>EZ</span>
            </div>
            <p>
              two friends building small internet products, protocol
              experiments, and useful apps in public.
            </p>
          </div>

          <dl className="stats-grid">
            <div>
              <dt>live</dt>
              <dd>{String(liveCount).padStart(2, "0")}</dd>
            </div>
            <div>
              <dt>shipped</dt>
              <dd>{String(shippedCount).padStart(2, "0")}</dd>
            </div>
            <div>
              <dt>building</dt>
              <dd>{String(buildingCount).padStart(2, "0")}</dd>
            </div>
          </dl>

          <div className="lab-mix" aria-label="JeezLabs product mix">
            <div>
              <span>ios apps</span>
              <strong>{String(iOSCount).padStart(2, "0")}</strong>
            </div>
            <div>
              <span>agent / protocol</span>
              <strong>{String(protocolCount).padStart(2, "0")}</strong>
            </div>
            <div>
              <span>winners</span>
              <strong>{String(winnerCount).padStart(2, "0")}</strong>
            </div>
          </div>

          <div className="lab-builders" aria-label="JeezLabs builders">
            <div>
              <Image
                src="/avatars/jhinresh.jpg"
                alt="Jhinresh profile picture"
                width={48}
                height={48}
                priority
              />
              <span>jhinresh</span>
            </div>
            <div>
              <Image
                src="/avatars/ezven.jpg"
                alt="Ezven profile picture"
                width={48}
                height={48}
                priority
              />
              <span>ezven</span>
            </div>
          </div>
        </aside>
      </section>

      <section className="section index-note" aria-label="How the index works">
        <div>
          <p className="kicker">how to read it</p>
          <h2>Not a landing page. A living index.</h2>
        </div>
        <div className="note-copy">
          <p>
            New products go at the top. Rough products stay visible. If a
            product grows, pauses, wins, or turns into something else, it gets
            marked here instead of hidden.
          </p>
          <p>
            The JEEZ mark shows ownership: JE lights up for Jhinresh, EZ lights
            up for Ezven, and all four letters light up when it is shared.
          </p>
        </div>
      </section>

      <section className="section products-section" id="works">
        <div className="section-head">
          <div>
            <p className="kicker">products</p>
            <h2>the current stack.</h2>
          </div>
          <p>{String(PRODUCTS.length).padStart(2, "0")} entries, newest first.</p>
        </div>

        <div className="product-grid">
          {PRODUCTS.map((product, index) => (
            <article className="product-card" key={product.slug}>
              <Link className="product-preview" href={`/products/${product.slug}`}>
                {product.previewImage ? (
                  <Image
                    src={product.previewImage}
                    alt={`${product.t} product preview`}
                    fill
                    loading="eager"
                    sizes="(max-width: 760px) 92vw, (max-width: 1180px) 44vw, 360px"
                  />
                ) : (
                  <div className={`preview-fallback ${product.art}`} />
                )}
              </Link>

              <div className="product-content">
                <div className="product-meta">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span className={`status ${product.s}`}>{STATUS_LABEL[product.s]}</span>
                </div>
                <div className="product-title-row">
                  <h3>{product.t}</h3>
                  {product.hackathon ? <span className="award small">{product.hackathon}</span> : null}
                </div>
                <p className="product-kind">{product.k}</p>
                <p className="product-desc">{product.desc}</p>

                <div className="product-foot">
                  <span
                    className={`jeez-mark ${builderClass(product.builtBy)}`}
                    aria-label={builderLabel(product.builtBy)}
                  >
                    <span>JE</span>
                    <span>EZ</span>
                  </span>
                  <div className="product-links">
                    <Link href={`/products/${product.slug}`}>preview</Link>
                    {product.href ? (
                      <a href={product.href} target="_blank" rel="noopener noreferrer">
                        live
                      </a>
                    ) : null}
                    {product.repo ? (
                      <a href={product.repo} target="_blank" rel="noopener noreferrer">
                        gh
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section about" id="about">
        <div>
          <p className="kicker">builders</p>
          <h2>
            two <em>friends.</em>
            <br />
            one <em>lab.</em>
          </h2>
          <a
            className="social-embed"
            href="https://x.com/virtuals_io/status/2032005346185920557?s=20"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>x / virtuals_io</span>
            <strong>JeezLabs on Virtuals</strong>
            <small>x.com/virtuals_io/status/2032005346185920557</small>
          </a>
        </div>

        <div className="about-copy">
          <p>
            jeezlabs is a <em>two-person</em> product lab for internet
            software, protocol experiments, and small tools we want to see
            exist.
          </p>
          <p>
            some entries are live. some are still rough. all of them are part
            of the same habit: <em>build, ship, learn, repeat.</em>
          </p>

          <div className="duo">
            <article className="person">
              <Image
                src="/avatars/jhinresh.jpg"
                alt="Jhinresh profile picture"
                width={104}
                height={104}
                loading="eager"
              />
              <div>
                <h3>jhinresh</h3>
                <p>builder / product</p>
                <div className="person-links">
                  <a href="https://github.com/JhiNResH" target="_blank" rel="noopener noreferrer">
                    github
                  </a>
                  <a href="https://x.com/JhiNResH" target="_blank" rel="noopener noreferrer">
                    x
                  </a>
                </div>
              </div>
            </article>

            <article className="person">
              <Image
                src="/avatars/ezven.jpg"
                alt="Ezven profile picture"
                width={104}
                height={104}
                loading="eager"
              />
              <div>
                <h3>ezven</h3>
                <p>builder / product</p>
                <div className="person-links">
                  <a href="https://github.com/Ferxxo-pa" target="_blank" rel="noopener noreferrer">
                    github
                  </a>
                  <a href="https://x.com/ezveng" target="_blank" rel="noopener noreferrer">
                    x
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <footer className="foot">
        <span>jeezlabs / product index</span>
        <div className="foot-links">
          <span>built in public</span>
          <a href="https://x.com/0xmaiat" target="_blank" rel="noopener noreferrer">
            @0xmaiat
          </a>
        </div>
      </footer>
    </main>
  );
}
