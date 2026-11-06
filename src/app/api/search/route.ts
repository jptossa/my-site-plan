import { searchProducts } from "@/lib/off";

export async function GET(request: Request) {
  const q = (new URL(request.url).searchParams.get("q") ?? "").trim().toLowerCase().slice(0, 80);
  if (q.length < 2) return Response.json({ results: [] });
  try {
    const found = await searchProducts(q);
    const results = found.map((p) => ({ code: p.code, name: p.name, brand: p.brand, verdict: p.verdict, flaggedIds: p.flaggedIds }));
    return Response.json({ results });
  } catch {
    return Response.json({ error: "lookup-failed" }, { status: 502 });
  }
}
