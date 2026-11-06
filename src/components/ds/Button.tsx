import Link from "next/link";
import type { ReactNode } from "react";
import { cx } from "./types";

type Common = {
  variant?: "primary" | "secondary" | "inverse";
  pill?: boolean;
  large?: boolean;
  children: ReactNode;
  className?: string;
};

type AsButton = Common & {
  href?: undefined;
  pressed?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};
type AsLink = Common & { href: string };

export function Button(props: AsButton | AsLink) {
  const { variant = "primary", pill, large, children, className } = props;
  const cls = cx("pg-btn", "pg-press", `pg-btn--${variant}`, pill && "pg-btn--pill", large && "pg-btn--lg", className);
  if (props.href !== undefined) {
    return (
      <Link href={props.href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type={props.type ?? "button"}
      className={cls}
      onClick={props.onClick}
      aria-pressed={props.pressed === undefined ? undefined : props.pressed}
      disabled={props.disabled}
    >
      {children}
    </button>
  );
}
