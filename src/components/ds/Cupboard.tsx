"use client";

import { useState } from "react";
import { Gus } from "./Gus";
import { IngredientJar, type IngredientJarProps } from "./IngredientJar";
import { Lamp } from "./Lamp";
import { ProductBox, type ProductBoxProps } from "./ProductBox";
import { SpeechBubble } from "./SpeechBubble";
import { cx, type Mood, type Size } from "./types";

export type CupboardProduct = ProductBoxProps & { id: string };
export type CupboardIngredient = IngredientJarProps & { id: string; explanation?: string };

export type CupboardProps = {
  size?: Size;
  products: CupboardProduct[];
  ingredients: CupboardIngredient[];
  selectedProduct?: string;
  onProductChange?: (id: string) => void;
  selectedIngredient?: string;
  defaultIngredient?: string;
  onIngredientChange?: (id: string) => void;
  mood?: Mood;
  /** Shown inside the bubble under Gus's words, e.g. the short disclaimer. */
  bubbleFooter?: React.ReactNode;
};

const GEO = {
  phone: { w: 78, gap: 8, pad: 6, gus: 46, gusTop: 2, shelfH: 152, topH: 124, board: 12, tail: 23 },
  desktop: { w: 130, gap: 28, pad: 24, gus: 76, gusTop: 10, shelfH: 235, topH: 190, board: 16, tail: 42 },
} as const;

export function Cupboard({
  size = "desktop",
  products,
  ingredients,
  selectedProduct,
  onProductChange,
  selectedIngredient,
  defaultIngredient,
  onIngredientChange,
  mood,
  bubbleFooter,
}: CupboardProps) {
  const g = GEO[size];
  const [own, setOwn] = useState<string | undefined>(defaultIngredient ?? ingredients[0]?.id);
  const picked = selectedIngredient !== undefined ? selectedIngredient : own;
  const idx = Math.max(0, ingredients.findIndex((i) => i.id === picked));
  const cur = ingredients[idx];
  const gusX = g.pad + idx * (g.w + g.gap) + (g.w - g.gus) / 2;
  const gusMood: Mood = mood ?? (cur?.status === "ban" ? "hmm" : cur?.status === "ok" ? "happy" : "idle");

  function pick(id: string) {
    onIngredientChange?.(id);
    setOwn(id);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: size === "desktop" ? 18 : 10 }}>
      <div className={cx("pg-cupboard", `pg-cupboard--${size}`)}>
        <div style={{ position: "relative", width: "max-content", minWidth: "100%" }}>
          <div
            className="pg-glow"
            aria-hidden="true"
            style={{
              background: `radial-gradient(${size === "desktop" ? "620px 460px" : "290px 270px"} at 50% 0, var(--lamp-glow), transparent 78%)`,
            }}
          />
          <Lamp size={size} style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", zIndex: 2 }} />
          <nav
            aria-label="Products in my pantry"
            className="pg-shelf"
            style={{ height: g.topH, padding: `0 ${g.pad}px ${g.board + 6}px` }}
          >
            <div className="pg-shelf__row" style={{ gap: g.gap }}>
              {products.map((pr) => (
                <ProductBox
                  key={pr.id}
                  {...pr}
                  size={size}
                  selected={pr.id === selectedProduct}
                  onClick={() => onProductChange?.(pr.id)}
                />
              ))}
            </div>
            <div className="pg-board" aria-hidden="true" style={{ bottom: 2, height: g.board }} />
          </nav>
          <section
            aria-label="Ask Gus about an ingredient"
            className="pg-shelf"
            style={{ height: g.shelfH, padding: `0 ${g.pad}px 12px` }}
          >
            <div className="pg-walk" style={{ position: "absolute", top: g.gusTop, left: gusX, width: g.gus, height: g.gus, zIndex: 1 }}>
              <Gus size={g.gus} mood={gusMood} />
            </div>
            <div className="pg-shelf__row" style={{ gap: g.gap }}>
              {ingredients.map((ing) => (
                <IngredientJar
                  key={ing.id}
                  {...ing}
                  size={size}
                  selected={ing.id === picked}
                  onClick={() => pick(ing.id)}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
      {cur?.explanation ? (
        <SpeechBubble size={size} tailLeft={gusX + g.tail} label={cur.statusText} labelKind={cur.status} speakKey={cur.id}>
          {cur.explanation}
        </SpeechBubble>
      ) : null}
      {bubbleFooter}
    </div>
  );
}
