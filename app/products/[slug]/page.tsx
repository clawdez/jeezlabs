import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, PRODUCTS, STATUS_LABEL } from "../../products";

type ProductPreviewProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPreviewProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product not found — jeezlabs",
    };
  }

  return {
    title: `${product.t} — jeezlabs preview`,
    description: product.desc,
  };
}

export default async function ProductPreview({ params }: ProductPreviewProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  return (
    <main className="preview-page">
      <header className="preview-chrome">
        <Link href="/#works" className="preview-back">
          ← product index
        </Link>
        <div className="mark">
          jeez<em>labs</em>
        </div>
      </header>

      <section className="preview-hero">
        <div className="preview-copy">
          <div className="badge">preview / {product.k}</div>
          <h1>
            {product.t.split(" ")[0]}{" "}
            <em>{product.t.split(" ").slice(1).join(" ")}</em>
          </h1>
          <p>{product.preview.lead}</p>

          <div className="preview-actions">
            {product.href ? (
              <a href={product.href} target="_blank" rel="noopener noreferrer">
                open product →
              </a>
            ) : null}
            {product.repo ? (
              <a href={product.repo} target="_blank" rel="noopener noreferrer">
                github repo →
              </a>
            ) : null}
          </div>
        </div>

        <div className="preview-art-wrap">
          <div className={`preview-art ${product.art}`}>
            <div className="tag">{product.k}</div>
            <div className="meta">
              <span>{product.y}</span>
              <span>{STATUS_LABEL[product.s]}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="preview-details">
        <div className="preview-facts">
          <div>
            <span>status</span>
            <strong>{STATUS_LABEL[product.s]}</strong>
          </div>
          <div>
            <span>year</span>
            <strong>{product.y}</strong>
          </div>
          <div>
            <span>category</span>
            <strong>{product.k}</strong>
          </div>
          <div>
            <span>builder</span>
            <strong>{product.builtBy ?? "jeezlabs"}</strong>
          </div>
        </div>

        <div className="preview-notes">
          <div className="badge">notes</div>
          <ul>
            {product.preview.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
