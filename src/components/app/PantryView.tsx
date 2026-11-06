"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, MenuItem } from "@/components/ds";
import { RULES_BY_ID } from "@/data/eu-rules";
import { VERDICT_WORDS } from "@/lib/analyze";
import { usePantry } from "@/lib/pantry";

export function PantryView() {
  const router = useRouter();
  const { pantry, removeProduct, toggleWatch } = usePantry();
  const watchedRules = pantry.watched.map((id) => RULES_BY_ID[id]).filter(Boolean);

  return (
    <div className="stack">
      <h1 className="app-title">My Pantry</h1>

      <section className="stack" aria-labelledby="pantry-products">
        <h2 id="pantry-products">Products</h2>
        {pantry.products.length === 0 ? (
          <div className="app-empty">
            <p>Nothing kept yet. Search a product, then choose &ldquo;Keep in my pantry&rdquo;.</p>
            <Button href="/app">Ask Gus</Button>
          </div>
        ) : (
          <ul className="pantry-list">
            {pantry.products.map((p) => (
              <li key={p.code} className="pantry-row">
                <MenuItem
                  kind="product"
                  color={p.color}
                  title={[p.brand, p.name].filter(Boolean).join(" ")}
                  subtitle={VERDICT_WORDS[p.verdict]}
                  onClick={() => router.push(`/app?code=${p.code}`)}
                />
                <Button variant="secondary" onClick={() => removeProduct(p.code)}>
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="stack" aria-labelledby="pantry-ingredients">
        <h2 id="pantry-ingredients">Ingredients I&rsquo;m watching</h2>
        {watchedRules.length === 0 ? (
          <div className="app-empty">
            <p>No ingredients watched yet. Pick one from the list of top warnings, or tap a jar in Ask Gus.</p>
            <Link className="pg-btn pg-btn--secondary pg-press" href="/top-warnings">
              See Top Warnings
            </Link>
          </div>
        ) : (
          <ul className="pantry-list">
            {watchedRules.map((r) => (
              <li key={r.id} className="pantry-row">
                <MenuItem kind="ingredient" fill={r.fill} title={r.name} subtitle={r.statusText} />
                <Button variant="secondary" onClick={() => toggleWatch(r.id)}>
                  Stop watching
                </Button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
