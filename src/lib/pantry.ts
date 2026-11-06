"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { BoxColor, Status } from "@/components/ds/types";
import { createLocalStore } from "@/lib/localStore";

export type PantryProduct = {
  code: string;
  name: string;
  brand: string;
  verdict: Status;
  color: BoxColor;
  flaggedIds: string[];
};

export type Pantry = {
  products: PantryProduct[];
  /** Rule ids of ingredients the person wants to avoid. */
  watched: string[];
};

const EMPTY: Pantry = { products: [], watched: [] };
const store = createLocalStore<Pantry>("pregustator:pantry:v1", EMPTY);

const COLORS: BoxColor[] = ["rose", "teal", "lilac", "apple"];

/** Product colors are assigned in order and repeat; they never mean a verdict. */
export function colorForIndex(i: number): BoxColor {
  return COLORS[i % COLORS.length];
}

export function usePantry() {
  const pantry = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);

  const saveProduct = useCallback((p: Omit<PantryProduct, "color">) => {
    const cur = store.getSnapshot();
    if (cur.products.some((x) => x.code === p.code)) return;
    store.set({ ...cur, products: [...cur.products, { ...p, color: colorForIndex(cur.products.length) }] });
  }, []);

  const removeProduct = useCallback((code: string) => {
    const cur = store.getSnapshot();
    store.set({ ...cur, products: cur.products.filter((p) => p.code !== code) });
  }, []);

  const toggleWatch = useCallback((ruleId: string) => {
    const cur = store.getSnapshot();
    store.set({
      ...cur,
      watched: cur.watched.includes(ruleId) ? cur.watched.filter((w) => w !== ruleId) : [...cur.watched, ruleId],
    });
  }, []);

  const clearAll = useCallback(() => store.set(EMPTY), []);

  return { pantry, saveProduct, removeProduct, toggleWatch, clearAll };
}
