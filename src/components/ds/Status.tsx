import type { ReactNode } from "react";
import { cx, STATUS_WORDS, type Status } from "./types";

export function StatusIcon({ kind, size = 20 }: { kind: Status; size?: number }) {
  const common = {
    "aria-hidden": true as const,
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    style: { flex: "none" as const },
  };
  if (kind === "limit") {
    return (
      <svg {...common} strokeWidth={2.4}>
        <path d="M12 3.5l9.5 17h-19z" />
        <path d="M12 10v5M12 18h.01" />
      </svg>
    );
  }
  if (kind === "ok") {
    return (
      <svg {...common} strokeWidth={2.6}>
        <path d="M4.5 12.5l5 5 10-11" />
      </svg>
    );
  }
  return (
    <svg {...common} strokeWidth={2.6}>
      <circle cx={12} cy={12} r={9} />
      <path d="M5.8 5.8l12.4 12.4" />
    </svg>
  );
}

export function StatusLabel({
  kind,
  size = "md",
  children,
}: {
  kind: Status;
  size?: "md" | "lg";
  children?: ReactNode;
}) {
  return (
    <span className={cx("pg-status", `pg-status--${kind}`)} style={{ fontSize: size === "lg" ? 20 : 15 }}>
      <StatusIcon kind={kind} size={size === "lg" ? 24 : 18} />
      {children ?? STATUS_WORDS[kind]}
    </span>
  );
}
