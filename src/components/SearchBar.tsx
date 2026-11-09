"use client";

import Form from "next/form";
import { useId } from "react";
import { MagnifierIcon } from "@/components/icons";

/** One long search bar with a magnifying glass. Enter or the glass submits to Ask Gus. */
export function SearchBar({ defaultValue = "" }: { defaultValue?: string }) {
  const id = useId();
  return (
    <Form action="/app" role="search" className="searchbar">
      <label htmlFor={id} className="visually-hidden">
        Search for a US food product
      </label>
      <input
        id={id}
        type="search"
        name="q"
        defaultValue={defaultValue}
        placeholder="Search a US food product, like toaster tarts"
        autoComplete="off"
        enterKeyHint="search"
        required
        minLength={2}
      />
      <button type="submit" className="searchbar__go pg-press" aria-label="Search">
        <MagnifierIcon size={22} />
      </button>
    </Form>
  );
}
