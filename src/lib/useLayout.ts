"use client";

import { useSyncExternalStore } from "react";

/**
 * How the pantry should be drawn:
 * - "stack":   portrait and narrower than 900px (a phone held upright): jars stack as a list
 * - "phone":   landscape and narrower than 900px: the wide cupboard at phone size
 * - "desktop": 900px and up: the wide cupboard at desktop size
 */
export type PantryLayout = "stack" | "phone" | "desktop";

const DESKTOP = "(min-width: 900px)";
const STACK = "(orientation: portrait) and (max-width: 899px)";

function subscribe(onChange: () => void) {
  const queries = [window.matchMedia(DESKTOP), window.matchMedia(STACK)];
  queries.forEach((q) => q.addEventListener("change", onChange));
  return () => queries.forEach((q) => q.removeEventListener("change", onChange));
}

function snapshot(): PantryLayout {
  if (window.matchMedia(DESKTOP).matches) return "desktop";
  if (window.matchMedia(STACK).matches) return "stack";
  return "phone";
}

/** Phone-first on the server, so the first paint is the stacked list. */
export function usePantryLayout(): PantryLayout {
  return useSyncExternalStore(subscribe, snapshot, () => "stack");
}
