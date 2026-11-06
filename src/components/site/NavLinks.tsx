"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/data/site";

export function NavLinks() {
  const pathname = usePathname();
  return (
    <nav aria-label="Main" className="site-nav">
      {NAV.map((item) => {
        const current = item.href === "/app" ? pathname.startsWith("/app") : pathname === item.href;
        return (
          <Link key={item.href} href={item.href} aria-current={current ? "page" : undefined}>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
