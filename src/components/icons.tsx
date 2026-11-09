/** Small inline icons on a 24px grid: round caps and joins, stroked in currentColor. */
const base = {
  "aria-hidden": true as const,
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function MagnifierIcon({ size = 24 }: { size?: number }) {
  return (
    <svg {...base} width={size} height={size}>
      <circle cx={10.5} cy={10.5} r={6.5} />
      <path d="M15.4 15.4L21 21" />
    </svg>
  );
}

export function MenuIcon() {
  return (
    <svg {...base}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg {...base}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

/** Points down; rotate 180 degrees (via the .chevron class) when its section is open. */
export function ChevronIcon() {
  return (
    <svg {...base} className="chevron">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
