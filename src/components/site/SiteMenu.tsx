"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { NAV } from "@/data/site";

// Settings (where Motion lives) is reachable from the site too, not just from inside the app.
const LINKS = [...NAV, { label: "Settings", href: "/app/settings" }] as const;

/** Hamburger button with a dropdown of the site links. Esc, an outside tap or tabbing away closes it. */
export function SiteMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelId = `${useId()}-menu`;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div
      className="menu"
      ref={wrapRef}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={btnRef}
        type="button"
        className="menu__btn pg-btn pg-btn--secondary pg-press"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>
      <nav id={panelId} className="menu__panel" aria-label="Site" hidden={!open}>
        <ul>
          {LINKS.map((item) => {
            const current = item.href === "/app" ? pathname === "/app" : pathname === item.href;
            return (
              <li key={item.href}>
                <Link href={item.href} aria-current={current ? "page" : undefined} onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
