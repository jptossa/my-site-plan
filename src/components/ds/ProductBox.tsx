import { StatusIcon } from "./Status";
import { cx, STATUS_WORDS, type BoxColor, type Size, type Status } from "./types";

export type ProductBoxProps = {
  label: string;
  color: BoxColor;
  status: Status;
  size?: Size;
  selected?: boolean;
  unsaved?: boolean;
  ariaLabel?: string;
  onClick?: () => void;
};

export function ProductBox({ label, color, status, size = "phone", selected, unsaved, ariaLabel, onClick }: ProductBoxProps) {
  const aria = `${label}, ${STATUS_WORDS[status]}${unsaved ? ", not saved yet" : ""}`;
  return (
    <button
      type="button"
      className={cx("pg-box", "pg-press", `pg-box--${size}`, `pg-box--${color}`, unsaved && "pg-box--unsaved")}
      aria-pressed={!!selected}
      aria-label={ariaLabel ?? aria}
      onClick={onClick}
    >
      <StatusIcon kind={status} size={size === "desktop" ? 22 : 16} />
      {label}
    </button>
  );
}
