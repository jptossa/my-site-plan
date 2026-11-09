"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Button,
  Cupboard,
  Gus,
  PantryStack,
  StatusIcon,
  StatusLabel,
  type CupboardIngredient,
  type CupboardProduct,
} from "@/components/ds";
import { Collapsible } from "@/components/Collapsible";
import { ProductSkeleton, ResultsSkeleton } from "@/components/Skeleton";
import { RULES_BY_ID } from "@/data/eu-rules";
import { DISCLAIMER } from "@/data/site";
import { explain, VERDICT_WORDS } from "@/lib/analyze";
import type { ProductDetail, ProductSummary } from "@/lib/off";
import { colorForIndex, usePantry } from "@/lib/pantry";
import { useFetchJson } from "@/lib/useFetchJson";
import { usePantryLayout } from "@/lib/useLayout";
import { EmptyIntro } from "./EmptyIntro";

const READING = "Reading the label… one sec, this spoon is busy.";
/** A product name short enough for a box label: two words at most. */
function shortLabel(name: string): string {
  const words = name.split(/\s+/).filter(Boolean);
  return words.slice(-2).join(" ");
}

function productTitle(p: { brand: string; name: string }) {
  return [p.brand, p.name].filter(Boolean).join(" ");
}

function GusSays({ mood, children, onRetry, heading }: { mood: "tasting" | "hmm" | "idle"; children: string; onRetry?: () => void; heading?: boolean }) {
  return (
    <div className="stack">
      {heading ? <h1 className="app-title">Ask Gus</h1> : null}
      <div className="app-empty" role="status">
        <Gus size={76} mood={mood} />
        <p style={{ fontFamily: "var(--font-voice)", fontSize: 21, lineHeight: 1.36 }}>{children}</p>
        {onRetry ? (
          <Button variant="secondary" onClick={onRetry}>
            Try again
          </Button>
        ) : null}
      </div>
    </div>
  );
}

function EmptyState() {
  const { pantry } = usePantry();
  return (
    <div className="stack">
      <EmptyIntro />
      {pantry.products.length > 0 ? (
        <p>
          You&rsquo;re keeping {pantry.products.length} {pantry.products.length === 1 ? "product" : "products"}. <Link href="/app/pantry">Open My Pantry</Link>.
        </p>
      ) : null}
    </div>
  );
}

function Results({ q }: { q: string }) {
  const router = useRouter();
  const { data, error, loading, reload } = useFetchJson<{ results: ProductSummary[] }>(`/api/search?q=${encodeURIComponent(q)}`);
  if (loading) {
    return (
      <div className="stack">
        <p className="app-note" aria-hidden="true">
          {READING}
        </p>
        <ResultsSkeleton />
      </div>
    );
  }
  if (error) return <GusSays mood="hmm" onRetry={reload}>I couldn&rsquo;t reach the label library just now. Give it another try in a moment.</GusSays>;
  const results = data?.results ?? [];
  if (results.length === 0) {
    return <GusSays mood="hmm">{`I couldn't find "${q}" with a readable ingredient list. Try fewer words, or the brand name.`}</GusSays>;
  }
  return (
    <section aria-labelledby="results-title" className="stack">
      <h2 id="results-title">Results for &ldquo;{q}&rdquo;</h2>
      <ul className="result-list">
        {results.map((p) => (
          <li key={p.code}>
            <button type="button" className="result-card pg-press" onClick={() => router.push(`/app?q=${encodeURIComponent(q)}&code=${p.code}`)}>
              <span className={`pg-status pg-status--${p.verdict}`} aria-hidden="true">
                <StatusIcon kind={p.verdict} size={24} />
              </span>
              <span className="result-card__text">
                <span className="result-card__name">{productTitle(p)}</span>
                <span className="result-card__brand">{VERDICT_WORDS[p.verdict]}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ProductView({ code, q }: { code: string; q: string }) {
  const router = useRouter();
  const layout = usePantryLayout();
  const size = layout === "desktop" ? "desktop" : "phone";
  const { pantry, saveProduct, removeProduct, toggleWatch } = usePantry();
  const { data, error, loading, reload } = useFetchJson<{ product: ProductDetail; alternatives: ProductSummary[] }>(`/api/product/${code}`);
  const [pick, setPick] = useState<{ code: string; id: string } | null>(null);

  if (loading) {
    return (
      <div className="stack">
        <h1 className="app-title">Ask Gus</h1>
        <p className="app-note" aria-hidden="true">
          {READING}
        </p>
        <ProductSkeleton />
      </div>
    );
  }
  if (error === "not-found") {
    return <GusSays heading mood="hmm">{"I couldn't find a readable label for that one. Try searching by name."}</GusSays>;
  }
  if (error || !data) return <GusSays heading mood="hmm" onRetry={reload}>I couldn&rsquo;t reach the label library just now. Give it another try in a moment.</GusSays>;

  const { product, alternatives } = data;
  const rules = product.flaggedIds.map((id) => RULES_BY_ID[id]).filter(Boolean);
  const inPantry = pantry.products.some((p) => p.code === product.code);
  const watchedHits = rules.filter((r) => pantry.watched.includes(r.id));

  const ingredients: CupboardIngredient[] = [
    ...rules.map((r) => ({
      id: r.id,
      label: r.jarLabel,
      ariaLabel: `${r.name}, ${r.statusText}`,
      fill: r.fill,
      status: r.status,
      statusText: r.statusText,
      explanation: explain(r),
    })),
    {
      id: "rest",
      label: rules.length === 0 ? "All clear" : size === "desktop" ? "Everything else" : "The rest",
      fill: "sage",
      status: "ok",
      statusText: "No EU issues",
      explanation:
        rules.length === 0
          ? "I found nothing on this label that clashes with EU rules."
          : "Everything else on this label lines up with EU rules.",
    },
  ];
  const pickedId = pick?.code === code && ingredients.some((i) => i.id === pick.id) ? pick.id : ingredients[0].id;
  const pickedRule = RULES_BY_ID[pickedId];

  // Top shelf: this product first (dashed ring until kept), then what's in the pantry. Four fit.
  const current = { code: product.code, name: product.name, brand: product.brand, verdict: product.verdict };
  const others = pantry.products.filter((p) => p.code !== product.code);
  const shelf: CupboardProduct[] = [
    {
      id: product.code,
      label: shortLabel(product.name),
      status: product.verdict,
      color: inPantry ? (pantry.products.find((p) => p.code === product.code)?.color ?? "rose") : colorForIndex(pantry.products.length),
      unsaved: !inPantry,
    },
    ...others.slice(0, 3).map((p) => ({ id: p.code, label: shortLabel(p.name), status: p.verdict, color: p.color })),
  ];

  return (
    <div className="stack">
      {q ? (
        <Link href={`/app?q=${encodeURIComponent(q)}`} className="app-note">
          &larr; Back to results for &ldquo;{q}&rdquo;
        </Link>
      ) : null}
      <h1 className="app-product-title">{productTitle(product)}</h1>
      <div className="app-verdict">
        <StatusLabel kind={product.verdict} size="lg">
          {VERDICT_WORDS[product.verdict]}
        </StatusLabel>
      </div>

      {watchedHits.length > 0 ? (
        <div className="callout" role="note">
          <strong>Heads up: this has an ingredient you&rsquo;re watching.</strong>
          <span>{watchedHits.map((r) => r.name).join(", ")}</span>
        </div>
      ) : null}

      {/* Upright phone: jars stack as a list. Wide (landscape or desktop): the regular cupboard. */}
      {layout === "stack" ? (
        <PantryStack
          products={shelf}
          ingredients={ingredients}
          selectedProduct={product.code}
          onProductChange={(id) => router.push(`/app?${q ? `q=${encodeURIComponent(q)}&` : ""}code=${id}`)}
          selectedIngredient={pickedId}
          onIngredientChange={(id) => setPick({ code, id })}
          bubbleFooter={<p className="app-note">{DISCLAIMER.inApp}</p>}
        />
      ) : (
        <Cupboard
          size={size}
          products={shelf}
          ingredients={ingredients}
          selectedProduct={product.code}
          onProductChange={(id) => router.push(`/app?${q ? `q=${encodeURIComponent(q)}&` : ""}code=${id}`)}
          selectedIngredient={pickedId}
          onIngredientChange={(id) => setPick({ code, id })}
          bubbleFooter={<p className="app-note">{DISCLAIMER.inApp}</p>}
        />
      )}

      <div className="app-actions">
        <Button
          pressed={inPantry}
          onClick={() => (inPantry ? removeProduct(product.code) : saveProduct({ ...current, flaggedIds: product.flaggedIds }))}
        >
          {inPantry ? "In my pantry" : "Keep in my pantry"}
        </Button>
        {pickedRule ? (
          <Button variant="secondary" pressed={pantry.watched.includes(pickedRule.id)} onClick={() => toggleWatch(pickedRule.id)}>
            {pantry.watched.includes(pickedRule.id) ? `Watching ${pickedRule.name}` : `Watch ${pickedRule.name}`}
          </Button>
        ) : null}
      </div>

      {rules.length > 0 ? (
        <section className="stack" aria-labelledby="alt-title">
          <h2 id="alt-title">Alternatives that meet EU standards</h2>
          {alternatives.length > 0 ? (
            <ul className="result-list">
              {alternatives.map((a) => (
                <li key={a.code}>
                  <button
                    type="button"
                    className="result-card pg-press"
                    onClick={() => router.push(`/app?${q ? `q=${encodeURIComponent(q)}&` : ""}code=${a.code}`)}
                  >
                    <span className="pg-status pg-status--ok" aria-hidden="true">
                      <StatusIcon kind="ok" size={24} />
                    </span>
                    <span className="result-card__text">
                      <span className="result-card__name">{productTitle(a)}</span>
                      <span className="result-card__brand">{VERDICT_WORDS.ok}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted">I didn&rsquo;t find a US product in the same category that meets EU standards. The database is still growing.</p>
          )}
        </section>
      ) : null}

      <Collapsible title="The label, as we read it">
        <p className="muted">{product.ingredientsText || "No ingredient list."}</p>
        <p className="app-note" style={{ marginTop: "var(--space-3)" }}>
          Label data from Open Food Facts, a community database. It can be incomplete or out of date.
        </p>
      </Collapsible>
    </div>
  );
}

export function AskGus({ q, code }: { q: string; code: string | null }) {
  if (code && /^\d{6,14}$/.test(code)) {
    return <ProductView key={code} code={code} q={q} />;
  }
  return (
    <div className="stack">
      <h1 className="app-title">Ask Gus</h1>
      {q.length >= 2 ? <Results key={q} q={q} /> : <EmptyState />}
    </div>
  );
}
