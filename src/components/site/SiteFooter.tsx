import Link from "next/link";
import { DISCLAIMER, SITE } from "@/data/site";

function SocialIcon({ label }: { label: string }) {
  const a = {
    "aria-hidden": true as const,
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (label === "Instagram") {
    return (
      <svg {...a}>
        <rect x={3.5} y={3.5} width={17} height={17} rx={5} />
        <circle cx={12} cy={12} r={4} />
        <path d="M17.2 6.8h.01" />
      </svg>
    );
  }
  if (label === "TikTok") {
    return (
      <svg {...a}>
        <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" />
        <path d="M14 3c.4 2.6 2 4.2 5 4.5" />
      </svg>
    );
  }
  return (
    <svg {...a}>
      <path d="M4 4l16 16M20 4L4 20" />
    </svg>
  );
}

export function SiteFooter() {
  const c = SITE.contact;
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div>
            <h2>Say hello</h2>
            <address>
              <a href={c.phoneHref}>{c.phone}</a>
              <a href={`mailto:${c.email}`}>{c.email}</a>
            </address>
          </div>
          <div>
            <h2>Find us</h2>
            <address>
              {c.addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
              <span className="app-note">[Placeholder address]</span>
            </address>
          </div>
          <div>
            <h2>Follow Gus</h2>
            <ul className="social" style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {SITE.social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} aria-label={s.label}>
                    <SocialIcon label={s.label} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="site-footer__legal">
          {DISCLAIMER.short} <Link href="/how-it-works#disclaimer">Read the full disclaimer</Link>.
        </p>
      </div>
    </footer>
  );
}
