import { cacheLife } from "next/cache";
import { analyzeIngredients } from "@/lib/analyze";
import type { Status } from "@/components/ds/types";
import { SITE } from "@/data/site";

/**
 * Open Food Facts (OFF) client. Server only: called from the /api routes.
 * OFF is community-sourced and asks apps to send a descriptive User-Agent and to cache.
 * Search uses OFF's search-a-licious service (the old cgi/search.pl is unreliable).
 */

export type ProductSummary = {
  code: string;
  name: string;
  brand: string;
  verdict: Status;
  flaggedIds: string[];
};

export type ProductDetail = ProductSummary & {
  categories: string[];
  ingredientsText: string;
};

const FIELDS = "code,product_name,brands,ingredients_text,additives_tags,categories_tags";
const HEADERS = { "User-Agent": SITE.userAgent, Accept: "application/json" };

type RawProduct = {
  code?: string;
  product_name?: string;
  brands?: string | string[];
  ingredients_text?: string;
  additives_tags?: string[];
  categories_tags?: string[];
};

function firstBrand(brands: RawProduct["brands"]): string {
  const b = Array.isArray(brands) ? brands[0] : brands?.split(",")[0];
  return (b ?? "").trim();
}

function toDetail(raw: RawProduct): ProductDetail | null {
  const code = raw.code?.trim();
  const name = raw.product_name?.trim();
  if (!code || !name) return null;
  const analysis = analyzeIngredients({ ingredientsText: raw.ingredients_text, additivesTags: raw.additives_tags });
  if (!analysis.hasIngredients) return null;
  return {
    code,
    name,
    brand: firstBrand(raw.brands),
    verdict: analysis.verdict,
    flaggedIds: analysis.flagged.map((r) => r.id),
    categories: raw.categories_tags ?? [],
    ingredientsText: raw.ingredients_text ?? "",
  };
}

async function getJson(url: string): Promise<unknown> {
  const res = await fetch(url, { headers: HEADERS, signal: AbortSignal.timeout(12000) });
  if (!res.ok) throw new Error(`Open Food Facts answered ${res.status}`);
  return res.json();
}

/**
 * The search index only returns names and brands, not ingredients. So we take the top
 * hits and read each label (in parallel; every product read is cached for hours).
 * Hits without a readable ingredient list are dropped: we can't give them a verdict.
 */
export async function searchProducts(query: string, limit = 10): Promise<ProductDetail[]> {
  "use cache";
  cacheLife("hours");
  // Quotes would break out of the filter expression; everything else is plain search text.
  const q = query.replace(/["\\]/g, " ").trim();
  const params = new URLSearchParams({
    q: `${q} countries_tags:"en:united-states"`,
    page_size: String(limit),
    fields: "code",
  });
  const data = (await getJson(`https://search.openfoodfacts.org/search?${params}`)) as { hits?: RawProduct[] };
  const codes = [...new Set((data.hits ?? []).map((h) => h.code?.trim()).filter((c): c is string => !!c))].slice(0, limit);
  const settled = await Promise.allSettled(codes.map((c) => getProduct(c)));
  return settled
    .map((s) => (s.status === "fulfilled" ? s.value : null))
    .filter((p): p is ProductDetail => p !== null);
}

export async function getProduct(code: string): Promise<ProductDetail | null> {
  "use cache";
  cacheLife("hours");
  const data = (await getJson(
    `https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(code)}.json?fields=${FIELDS}`,
  )) as { status?: number; product?: RawProduct };
  if (data.status !== 1 || !data.product) return null;
  return toDetail({ ...data.product, code: data.product.code ?? code });
}

/** US products in the same category whose labels meet EU standards. */
export async function findAlternatives(code: string, category: string, limit = 4): Promise<ProductSummary[]> {
  "use cache";
  cacheLife("hours");
  const params = new URLSearchParams({
    categories_tags: category,
    countries_tags: "en:united-states",
    fields: FIELDS,
    page_size: "40",
  });
  const data = (await getJson(`https://world.openfoodfacts.org/api/v2/search?${params}`)) as { products?: RawProduct[] };
  return (data.products ?? [])
    .map(toDetail)
    .filter((p): p is ProductDetail => p !== null && p.verdict === "ok" && p.code !== code)
    .slice(0, limit)
    .map((p) => ({ code: p.code, name: p.name, brand: p.brand, verdict: p.verdict, flaggedIds: p.flaggedIds }));
}
