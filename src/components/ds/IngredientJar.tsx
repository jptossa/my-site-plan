import { StatusIcon } from "./Status";
import { cx, STATUS_WORDS, type JarFill, type Size, type Status } from "./types";

export type IngredientJarProps = {
  label: string;
  fill: JarFill;
  status: Status;
  statusText?: string;
  size?: Size;
  selected?: boolean;
  ariaLabel?: string;
  onClick?: () => void;
};

export function IngredientJar({ label, fill, status, statusText, size = "phone", selected, ariaLabel, onClick }: IngredientJarProps) {
  const fillVar = `var(--fill-${fill})`;
  const aria = `${label}, ${statusText ?? STATUS_WORDS[status]}`;
  return (
    <button
      type="button"
      className={cx("pg-jar", "pg-press", `pg-jar--${size}`)}
      aria-pressed={!!selected}
      aria-label={ariaLabel ?? aria}
      onClick={onClick}
    >
      <span className="pg-jar__lid" aria-hidden="true" />
      <span className="pg-jar__glass" style={{ background: `linear-gradient(to top, ${fillVar} 62%, var(--glass) 62%)` }}>
        <span className="pg-jar__label">
          <StatusIcon kind={status} size={size === "desktop" ? 22 : 15} />
          {label}
        </span>
      </span>
    </button>
  );
}
