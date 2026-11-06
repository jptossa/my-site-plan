"use client";

/**
 * A tiny localStorage-backed store for useSyncExternalStore.
 * Every read and write is wrapped in try/catch: storage can be blocked or full,
 * and the app must still work (it then lives in memory for the session).
 */
export function createLocalStore<T>(key: string, fallback: T) {
  const listeners = new Set<() => void>();
  let current: T = fallback;
  let loaded = false;

  function load() {
    if (loaded || typeof window === "undefined") return;
    loaded = true;
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) current = JSON.parse(raw) as T;
    } catch {
      current = fallback;
    }
    window.addEventListener("storage", (e) => {
      if (e.key !== key) return;
      try {
        current = e.newValue ? (JSON.parse(e.newValue) as T) : fallback;
      } catch {
        current = fallback;
      }
      listeners.forEach((l) => l());
    });
  }

  return {
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    getSnapshot(): T {
      load();
      return current;
    },
    getServerSnapshot(): T {
      return fallback;
    },
    set(next: T) {
      load();
      current = next;
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        /* storage unavailable: keep the value in memory */
      }
      listeners.forEach((l) => l());
    },
  };
}
