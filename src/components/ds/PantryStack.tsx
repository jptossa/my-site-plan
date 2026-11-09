"use client";

import { useState } from "react";
import { Gus } from "./Gus";
import type { CupboardIngredient, CupboardProduct } from "./Cupboard";
import { Lamp } from "./Lamp";
import { ProductBox } from "./ProductBox";
import { SpeechBubble } from "./SpeechBubble";
import { StatusIcon } from "./Status";
import { STATUS_WORDS, type Mood } from "./types";

const ROW = 64;
const GAP = 8;
const GUS = 46;

export type PantryStackProps = {
  products: CupboardProduct[];
  ingredients: CupboardIngredient[];
  selectedProduct?: string;
  onProductChange?: (id: string) => void;
  selectedIngredient?: string;
  onIngredientChange?: (id: string) => void;
  mood?: Mood;
  bubbleFooter?: React.ReactNode;
};

/**
 * The pantry for a phone held upright: the same lamp, shelf and Gus as the Cupboard, but the
 * jars stand in a vertical list (one per row) instead of side by side, so nothing scrolls sideways.
 * Products are still square boxes on the top shelf; ingredients are still round-shouldered jars.
 */
export function PantryStack({ products, ingredients, selectedProduct, onProductChange, selectedIngredient, onIngredientChange, mood, bubbleFooter }: PantryStackProps) {
  const [own, setOwn] = useState<string | undefined>(ingredients[0]?.id);
  const picked = selectedIngredient !== undefined ? selectedIngredient : own;
  const idx = Math.max(0, ingredients.findIndex((i) => i.id === picked));
  const cur = ingredients[idx];
  const gusMood: Mood = mood ?? (cur?.status === "ban" ? "hmm" : cur?.status === "ok" ? "happy" : "idle");
  const gusTop = idx * (ROW + GAP) + (ROW - GUS) / 2;

  function pick(id: string) {
    onIngredientChange?.(id);
    setOwn(id);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div className="pg-cupboard pg-cupboard--phone pg-stack">
        <div className="pg-glow" aria-hidden="true" style={{ background: "radial-gradient(290px 270px at 50% 0, var(--lamp-glow), transparent 78%)" }} />
        <Lamp size="phone" style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", zIndex: 2 }} />

        <nav aria-label="Products in my pantry" className="pg-stack__products">
          {products.map((pr) => (
            <ProductBox key={pr.id} {...pr} size="phone" selected={pr.id === selectedProduct} onClick={() => onProductChange?.(pr.id)} />
          ))}
          <div className="pg-board" aria-hidden="true" style={{ bottom: 0, height: 12 }} />
        </nav>

        <section aria-label="Ask Gus about an ingredient" className="pg-stack__jars">
          <div className="pg-walk-y" style={{ top: gusTop, width: GUS, height: GUS }}>
            <Gus size={GUS} mood={gusMood} />
          </div>
          <ul className="pg-stack__list" style={{ gap: GAP }}>
            {ingredients.map((ing) => {
              const selected = ing.id === picked;
              return (
                <li key={ing.id}>
                  <button
                    type="button"
                    className="pg-sjar pg-press"
                    style={{ height: ROW, borderColor: `var(--fill-${ing.fill})` }}
                    aria-pressed={selected}
                    aria-label={ing.ariaLabel ?? `${ing.label}, ${ing.statusText ?? STATUS_WORDS[ing.status]}`}
                    onClick={() => pick(ing.id)}
                  >
                    <span className="pg-sjar__glyph" aria-hidden="true">
                      <span className="pg-sjar__lid" />
                      <span
                        className="pg-sjar__glass"
                        style={{ background: `linear-gradient(to top, var(--fill-${ing.fill}) 62%, var(--glass) 62%)` }}
                      />
                    </span>
                    <span className="pg-sjar__text">
                      <span className="pg-sjar__name">{ing.label}</span>
                      <span className={`pg-status pg-status--${ing.status} pg-sjar__status`}>
                        <StatusIcon kind={ing.status} size={16} />
                        {ing.statusText ?? STATUS_WORDS[ing.status]}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      {cur?.explanation ? (
        <SpeechBubble size="phone" label={cur.statusText} labelKind={cur.status} speakKey={cur.id}>
          {cur.explanation}
        </SpeechBubble>
      ) : null}
      {bubbleFooter}
    </div>
  );
}
