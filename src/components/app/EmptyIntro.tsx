import Link from "next/link";
import { Gus } from "@/components/ds";

export const SUGGESTIONS = ["Toaster tarts", "Mac and cheese", "Red velvet cake mix", "White bread"];

/** Ask Gus's first screen. Server-renderable (no hooks) so it ships in the static HTML. */
export function EmptyIntro() {
  return (
    <div className="app-empty">
      <Gus size={76} mood="idle" />
      <p style={{ fontFamily: "var(--font-voice)", fontSize: 21, lineHeight: 1.36 }}>
        Hi, I&rsquo;m Gus. Tell me a US food product and I&rsquo;ll read its label against EU rules.
      </p>
      <ul className="cta-row" style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {SUGGESTIONS.map((s) => (
          <li key={s}>
            <Link className="pg-btn pg-btn--secondary pg-press" href={`/app?q=${encodeURIComponent(s)}`}>
              {s}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
