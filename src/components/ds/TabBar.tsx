import Link from "next/link";

export type TabId = "pantry" | "ask" | "profile" | "settings";

const TABS: Array<{ id: TabId; label: string; href: string }> = [
  { id: "pantry", label: "My Pantry", href: "/app/pantry" },
  { id: "ask", label: "Ask Gus", href: "/app" },
  { id: "profile", label: "Profile", href: "/app/profile" },
  { id: "settings", label: "Settings", href: "/app/settings" },
];

function TabIcon({ id }: { id: TabId }) {
  const a = {
    "aria-hidden": true as const,
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (id === "pantry") {
    return (
      <svg {...a}>
        <path d="M3 21V4h18v17M3 12h18M7 12V8h4v4M14 21v-5h4v5M7 21v-5h4v5" />
      </svg>
    );
  }
  if (id === "ask") {
    return (
      <svg {...a}>
        <ellipse cx={12} cy={7} rx={4.5} ry={5} />
        <path d="M12 12v10" />
      </svg>
    );
  }
  if (id === "profile") {
    return (
      <svg {...a}>
        <circle cx={12} cy={8} r={4} />
        <path d="M4 21c1-5 4-7 8-7s7 2 8 7" />
      </svg>
    );
  }
  return (
    <svg {...a}>
      <path d="M4 7h10M18 7h2M4 17h2M10 17h10" />
      <circle cx={16} cy={7} r={2.3} />
      <circle cx={8} cy={17} r={2.3} />
    </svg>
  );
}

/** Phone bottom navigation: always four tabs, in this order. */
export function TabBar({ active }: { active: TabId }) {
  return (
    <nav aria-label="Main" className="pg-tabs">
      {TABS.map((t) => (
        <Link key={t.id} href={t.href} className="pg-tab pg-press" aria-current={t.id === active ? "page" : undefined}>
          <TabIcon id={t.id} />
          {t.label}
        </Link>
      ))}
    </nav>
  );
}
