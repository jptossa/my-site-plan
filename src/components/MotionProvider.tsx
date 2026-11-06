"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore, type ReactNode } from "react";
import { createLocalStore } from "@/lib/localStore";

type Pref = "on" | "off" | null; // null: follow the device's reduced-motion setting

const prefStore = createLocalStore<Pref>("pregustator:motion", null);

const REDUCED = "(prefers-reduced-motion: reduce)";
function subscribeReduced(onChange: () => void) {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

type MotionCtx = { motion: boolean; setMotion: (on: boolean) => void };
const Ctx = createContext<MotionCtx>({ motion: true, setMotion: () => {} });

export function MotionProvider({ children }: { children: ReactNode }) {
  const pref = useSyncExternalStore(prefStore.subscribe, prefStore.getSnapshot, prefStore.getServerSnapshot);
  const reduced = useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED).matches,
    () => false,
  );
  const motion = pref === null ? !reduced : pref === "on";

  useEffect(() => {
    document.documentElement.dataset.motion = motion ? "on" : "off";
  }, [motion]);

  const setMotion = useCallback((on: boolean) => prefStore.set(on ? "on" : "off"), []);
  const value = useMemo(() => ({ motion, setMotion }), [motion, setMotion]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useMotion() {
  return useContext(Ctx);
}
