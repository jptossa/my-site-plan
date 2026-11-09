"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import { ChevronIcon } from "@/components/icons";

/**
 * A wordy section that can be folded away. The heading is a real heading containing a button
 * with an arrow, so it is announced as both. Pass `id` to make `#id` links open it.
 */
export function Collapsible({
  id,
  title,
  level = 2,
  defaultOpen = false,
  children,
}: {
  id?: string;
  title: string;
  level?: 2 | 3;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const uid = useId();
  const panelId = `${uid}-panel`;
  const Heading = level === 2 ? "h2" : "h3";

  useEffect(() => {
    if (!id) return;
    const openIfLinked = () => {
      if (window.location.hash === `#${id}`) setOpen(true);
    };
    const frame = requestAnimationFrame(openIfLinked);
    window.addEventListener("hashchange", openIfLinked);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", openIfLinked);
    };
  }, [id]);

  return (
    <section id={id} className="collapsible">
      <Heading className="collapsible__head">
        <button type="button" className="collapsible__btn" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((o) => !o)}>
          <span>{title}</span>
          <ChevronIcon />
        </button>
      </Heading>
      <div id={panelId} className="collapsible__panel" hidden={!open}>
        {children}
      </div>
    </section>
  );
}

/** A small show/hide for the wordy part of a card. Not a heading. */
export function Disclosure({ closedLabel = "Show details", openLabel = "Hide details", children }: { closedLabel?: string; openLabel?: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const panelId = `${useId()}-panel`;
  return (
    <div className="disclosure">
      <button type="button" className="disclosure__btn" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((o) => !o)}>
        <span>{open ? openLabel : closedLabel}</span>
        <ChevronIcon />
      </button>
      <div id={panelId} className="disclosure__panel" hidden={!open}>
        {children}
      </div>
    </div>
  );
}
