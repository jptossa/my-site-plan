import type { CSSProperties, ReactNode } from "react";
import { cx, type Size, type Status } from "./types";

export function SpeechBubble({
  size = "desktop",
  label,
  labelKind,
  tailLeft,
  speakKey,
  style,
  children,
}: {
  size?: Size;
  label?: string;
  labelKind?: Status;
  tailLeft?: number | null;
  speakKey?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const color = labelKind ? `var(--status-${labelKind})` : "var(--ink-muted)";
  return (
    <div className={cx("pg-bubble", `pg-bubble--${size}`)} aria-live="polite" style={style}>
      {tailLeft === undefined || tailLeft === null ? null : (
        <span className="pg-bubble__tail pg-walk" aria-hidden="true" style={{ left: tailLeft }} />
      )}
      <div className="pg-speak" key={speakKey}>
        {label ? (
          <div className="pg-bubble__label" style={{ color }}>
            {label}
          </div>
        ) : null}
        <p className="pg-bubble__text">{children}</p>
      </div>
    </div>
  );
}
