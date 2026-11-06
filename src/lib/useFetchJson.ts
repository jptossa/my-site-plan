"use client";

import { useCallback, useEffect, useState } from "react";

type State<T> = { key: string | null; data?: T; error?: string };

/** Minimal GET-JSON hook. `loading` is true from the moment `url` changes until its answer lands. */
export function useFetchJson<T>(url: string | null) {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<State<T>>({ key: null });
  const key = url ? `${url}#${attempt}` : null;

  useEffect(() => {
    if (!url || !key) return;
    let cancelled = false;
    fetch(url)
      .then(async (res) => {
        const body = (await res.json().catch(() => ({}))) as T & { error?: string };
        if (!res.ok) throw new Error(body.error ?? "lookup-failed");
        return body as T;
      })
      .then((data) => {
        if (!cancelled) setState({ key, data });
      })
      .catch((e: unknown) => {
        if (!cancelled) setState({ key, error: e instanceof Error ? e.message : "lookup-failed" });
      });
    return () => {
      cancelled = true;
    };
  }, [url, key]);

  const ready = state.key === key;
  const reload = useCallback(() => setAttempt((n) => n + 1), []);
  return {
    data: ready ? state.data : undefined,
    error: ready ? state.error : undefined,
    loading: key !== null && !ready,
    reload,
  };
}
