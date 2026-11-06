import type { CSSProperties } from "react";
import type { Size } from "./types";

export function Lamp({ size = "phone", style }: { size?: Size; style?: CSSProperties }) {
  const w = size === "desktop" ? 112 : 64;
  return (
    <svg aria-hidden="true" width={w} height={(w * 30) / 64} viewBox="0 0 64 30" style={style}>
      <rect x={29} y={0} width={6} height={8} fill="var(--wood-highlight)" />
      <path d="M6 24C8 12 20 7 32 7s24 5 26 17z" fill="var(--brass)" stroke="var(--brass-shadow)" strokeWidth={2} strokeLinejoin="round" />
      <ellipse cx={32} cy={25} rx={16} ry={4} fill="var(--lamp-bulb)" />
    </svg>
  );
}
