"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(min-width: 900px)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/** True from 900px up (the design system's desktop breakpoint). Phone-first on the server. */
export function useIsDesktop(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
