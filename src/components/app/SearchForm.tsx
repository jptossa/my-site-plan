"use client";

import Form from "next/form";
import { useId } from "react";
import { Button } from "@/components/ds";

export function SearchForm({ className = "", defaultValue = "" }: { className?: string; defaultValue?: string }) {
  const id = useId();
  return (
    <Form action="/app" className={`search-form ${className}`} role="search">
      <label htmlFor={id} className="visually-hidden">
        Search for a US food product
      </label>
      <input id={id} type="search" name="q" defaultValue={defaultValue} placeholder="Search a US food product" autoComplete="off" required minLength={2} />
      <Button type="submit" variant="inverse">
        Check
      </Button>
    </Form>
  );
}
