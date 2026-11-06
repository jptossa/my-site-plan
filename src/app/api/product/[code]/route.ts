import { findAlternatives, getProduct } from "@/lib/off";

export async function GET(_request: Request, ctx: RouteContext<"/api/product/[code]">) {
  const { code } = await ctx.params;
  if (!/^\d{6,14}$/.test(code)) return Response.json({ error: "bad-code" }, { status: 400 });
  try {
    const product = await getProduct(code);
    if (!product) return Response.json({ error: "not-found" }, { status: 404 });
    // Alternatives come from the most specific category we know of; they're a nice-to-have.
    let alternatives: Awaited<ReturnType<typeof findAlternatives>> = [];
    const category = product.categories[product.categories.length - 1];
    if (category && product.verdict !== "ok") {
      try {
        alternatives = await findAlternatives(code, category);
      } catch {
        alternatives = [];
      }
    }
    return Response.json({ product, alternatives });
  } catch {
    return Response.json({ error: "lookup-failed" }, { status: 502 });
  }
}
