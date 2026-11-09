"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { MenuItem, TabBar, type TabId } from "@/components/ds";
import { SearchBar } from "@/components/SearchBar";
import { Logo } from "@/components/site/Logo";
import { SiteMenu } from "@/components/site/SiteMenu";
import { RULES_BY_ID } from "@/data/eu-rules";
import { usePantry } from "@/lib/pantry";
import { VERDICT_WORDS } from "@/lib/analyze";
import { AppSearch } from "./AppSearch";

function activeTab(pathname: string): TabId {
  if (pathname.startsWith("/app/pantry")) return "pantry";
  if (pathname.startsWith("/app/profile")) return "profile";
  if (pathname.startsWith("/app/settings")) return "settings";
  return "ask";
}

/**
 * Phone: top bar (logo + hamburger) and an icon-only bottom TabBar.
 * Desktop (900px+): left menu with My Pantry and Ingredients. Both get one long search bar on top.
 * Motion lives in Settings only.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { pantry } = usePantry();

  function openIngredient(id: string) {
    const holder = pantry.products.find((p) => p.flaggedIds.includes(id));
    router.push(holder ? `/app?code=${holder.code}` : "/top-warnings");
  }

  return (
    <div className="app-shell">
      <aside className="app-side" aria-label="Pantry menu">
        <Logo />
        <div className="app-side__group">
          <h2>My Pantry</h2>
          {pantry.products.length === 0 ? (
            <p className="app-note">Nothing kept yet. Search a product, then choose &ldquo;Keep in my pantry&rdquo;.</p>
          ) : (
            pantry.products.map((p) => (
              <MenuItem
                key={p.code}
                kind="product"
                color={p.color}
                title={[p.brand, p.name].filter(Boolean).join(" ")}
                subtitle={VERDICT_WORDS[p.verdict]}
                onClick={() => router.push(`/app?code=${p.code}`)}
              />
            ))
          )}
        </div>
        <div className="app-side__group">
          <h2>Ingredients</h2>
          {pantry.watched.length === 0 ? (
            <p className="app-note">No ingredients watched yet.</p>
          ) : (
            pantry.watched.map((id) => {
              const rule = RULES_BY_ID[id];
              if (!rule) return null;
              return <MenuItem key={id} kind="ingredient" fill={rule.fill} title={rule.name} subtitle={rule.statusText} onClick={() => openIngredient(id)} />;
            })
          )}
        </div>
        <div className="app-side__foot">
          <Link href="/app/profile" className="pg-btn pg-btn--secondary pg-press" aria-current={pathname.startsWith("/app/profile") ? "page" : undefined}>
            Profile
          </Link>
          <Link href="/app/settings" className="pg-btn pg-btn--secondary pg-press" aria-current={pathname.startsWith("/app/settings") ? "page" : undefined}>
            Settings
          </Link>
          <Link href="/" className="app-note">
            Back to the Pregustator site
          </Link>
        </div>
      </aside>

      <header className="app-top">
        <Logo />
        <SiteMenu />
      </header>

      <main id="main" className="app-main">
        <Suspense fallback={<SearchBar />}>
          <AppSearch />
        </Suspense>
        {children}
      </main>

      <div className="app-tabs">
        <TabBar active={activeTab(pathname)} />
      </div>
    </div>
  );
}
