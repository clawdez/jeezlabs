import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "about - jeezlabs",
  description: "About the JeezLabs two-person product lab.",
};

export default function AboutPage() {
  return (
    <main className="archive-page">
      <header className="chrome archive-chrome">
        <Link className="mark" href="/" aria-label="JeezLabs home">
          jeezlabs
        </Link>
        <nav className="nav" aria-label="Primary navigation">
          <Link href="/">home</Link>
          <a href="https://github.com/JhiNResH/jeezlabs" target="_blank" rel="noopener noreferrer">
            gh↗
          </a>
          <a href="https://x.com/0xmaiat" target="_blank" rel="noopener noreferrer">
            x↗
          </a>
        </nav>
      </header>

      <section className="archive-shell about-shell" aria-labelledby="about-title">
        <section className="archive-about standalone-about">
          <div className="archive-about-label">about</div>
          <div className="archive-about-copy">
            <h1 id="about-title">
              TWO FRIENDS.
              <br />
              ONE LAB.
              <br />
              MANY SMALL PRODUCTS.
            </h1>
            <p>
              JEEZLABS IS A TWO-PERSON PRODUCT LAB FOR INTERNET SOFTWARE,
              PROTOCOL EXPERIMENTS, IOS APPS, AGENT MARKETPLACES, RENTAL
              TOOLS, VERIFIED REVIEWS, AND SMALL USEFUL THINGS WE WANT TO SEE
              EXIST.
            </p>
            <p>
              THIS PAGE IS THE LIVING INDEX. NEW PRODUCTS GO AT THE TOP. ROUGH
              PRODUCTS STAY VISIBLE. IF A PROJECT WINS, PAUSES, SHIPS, OR
              TURNS INTO SOMETHING ELSE, IT GETS MARKED HERE.
            </p>
            <p>
              THE JEEZ MARK SHOWS OWNERSHIP: JE LIGHTS UP FOR JHINRESH, EZ
              LIGHTS UP FOR EZVEN, AND ALL FOUR LETTERS LIGHT UP WHEN IT IS
              SHARED.
            </p>
            <div className="archive-pfps" aria-label="JeezLabs builders">
              <div>
                <Image
                  src="/avatars/jhinresh.jpg"
                  alt="Jhinresh profile picture"
                  width={112}
                  height={112}
                  priority
                />
                <span>JHINRESH</span>
                <small>BUILDER / PRODUCT</small>
              </div>
              <div>
                <Image
                  src="/avatars/ezven.jpg"
                  alt="Ezven profile picture"
                  width={112}
                  height={112}
                  priority
                />
                <span>EZVEN</span>
                <small>BUILDER / PRODUCT</small>
              </div>
            </div>
            <div className="archive-about-links">
              <a href="https://github.com/JhiNResH" target="_blank" rel="noopener noreferrer">
                JHINRESH GH↗
              </a>
              <a href="https://x.com/JhiNResH" target="_blank" rel="noopener noreferrer">
                JHINRESH X↗
              </a>
              <a href="https://github.com/Ferxxo-pa" target="_blank" rel="noopener noreferrer">
                EZVEN GH↗
              </a>
              <a href="https://x.com/ezveng" target="_blank" rel="noopener noreferrer">
                EZVEN X↗
              </a>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
