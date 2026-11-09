"use client";

import { useSearchParams } from "next/navigation";
import { SearchBar } from "@/components/SearchBar";

/** The search bar at the top of every app screen, filled with the current ?q=. */
export function AppSearch() {
  const q = (useSearchParams().get("q") ?? "").trim();
  return <SearchBar key={q} defaultValue={q} />;
}
