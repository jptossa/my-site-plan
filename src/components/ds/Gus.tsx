import type { Mood } from "./types";

export function Gus({ mood = "idle", size = 76 }: { mood?: Mood; size?: number }) {
  return (
    <svg
      className="pg-gus"
      data-mood={mood}
      role="img"
      aria-label="Gus, a round little taster holding a spoon"
      width={size}
      height={size}
      viewBox="0 0 120 120"
    >
      <g className="pg-spoon pg-part" fill="none" stroke="var(--ink)" strokeWidth={5} strokeLinecap="round">
        <path d="M96 92L96 44" />
        <ellipse cx={96} cy={34} rx={9} ry={12} fill="var(--surface-raised)" />
      </g>
      <path d="M60 22c28 0 44 19 44 46 0 26-17 42-44 42S16 94 16 68c0-27 16-46 44-46z" fill="var(--amber)" stroke="var(--surface)" strokeWidth={4} />
      <path d="M38 26c-5-10 4-18 13-14 3-7 15-7 18 0 9-4 18 4 13 14-13-6-31-6-44 0z" fill="var(--ink)" stroke="var(--surface)" strokeWidth={4} strokeLinejoin="round" />
      <g className="pg-eyes pg-part" fill="var(--surface)">
        <circle cx={46} cy={62} r={6} />
        <circle cx={74} cy={62} r={6} />
      </g>
      <path d="M30 76a7 5 0 0 0 12 2M78 78a7 5 0 0 0 12-2" fill="none" stroke="var(--gus-cheek)" strokeWidth={3} strokeLinecap="round" />
      <path className="pg-m-smile" d="M50 78q10 10 20 0" fill="none" stroke="var(--surface)" strokeWidth={4.5} strokeLinecap="round" />
      <path className="pg-m-hmm" d="M50 82q6-4 10 0t10-2" fill="none" stroke="var(--surface)" strokeWidth={4.5} strokeLinecap="round" />
      <ellipse className="pg-m-open" cx={60} cy={81} rx={7} ry={6} fill="var(--surface)" />
    </svg>
  );
}
