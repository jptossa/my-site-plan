"use client";

import { RULES } from "@/data/eu-rules";
import { StatusLabel } from "@/components/ds";
import { WatchButton } from "@/components/WatchButton";
import { usePantry } from "@/lib/pantry";

export function ProfileView() {
  const { pantry } = usePantry();
  return (
    <div className="stack">
      <h1 className="app-title">Profile</h1>
      <div className="settings-group">
        <h2>[Your name]</h2>
        <p className="muted">
          Pregustator has no accounts yet. Your pantry and avoid list live in this browser only, so they won&rsquo;t follow you to another device.
        </p>
        <p className="app-note">
          {pantry.products.length} kept {pantry.products.length === 1 ? "product" : "products"} &middot; {pantry.watched.length} watched{" "}
          {pantry.watched.length === 1 ? "ingredient" : "ingredients"}
        </p>
      </div>

      <section className="settings-group" aria-labelledby="avoid-title">
        <h2 id="avoid-title">Ingredients I want to avoid</h2>
        <p className="muted">Watch an ingredient and Gus will point it out whenever a product contains it.</p>
        <ul className="pantry-list">
          {RULES.map((r) => (
            <li key={r.id} className="pantry-row" style={{ gridTemplateColumns: "1fr auto" }}>
              <span style={{ display: "grid", gap: 2 }}>
                <strong>{r.name}</strong>
                <StatusLabel kind={r.status}>{r.statusText}</StatusLabel>
              </span>
              <WatchButton ruleId={r.id} name={r.name} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
