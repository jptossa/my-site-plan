import { cx, type BoxColor, type JarFill } from "./types";

export type MenuItemProps = {
  kind: "product" | "ingredient";
  title: string;
  subtitle?: string;
  color?: BoxColor;
  fill?: JarFill;
  selected?: boolean;
  onClick?: () => void;
};

/** One row in the desktop left menu or the phone My Pantry list, shaped like what it lists. */
export function MenuItem({ kind, title, subtitle, color = "rose", fill, selected, onClick }: MenuItemProps) {
  const style = kind === "ingredient" && fill ? { borderColor: `var(--fill-${fill})` } : undefined;
  return (
    <button
      type="button"
      className={cx("pg-menu", "pg-press", `pg-menu--${kind}`, kind === "product" && `pg-menu--${color}`)}
      aria-pressed={kind === "product" ? !!selected : undefined}
      onClick={onClick}
      style={style}
    >
      <span className="pg-menu__title">{title}</span>
      {subtitle ? <span className="pg-menu__sub">{subtitle}</span> : null}
    </button>
  );
}
