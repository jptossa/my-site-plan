export type Status = "ban" | "limit" | "ok";
export type Size = "phone" | "desktop";
export type BoxColor = "rose" | "teal" | "lilac" | "apple";
export type JarFill = "white" | "red" | "butter" | "sky" | "sage";
export type Mood = "idle" | "hmm" | "tasting" | "happy";

export const STATUS_WORDS: Record<Status, string> = {
  ban: "Not allowed in the EU",
  limit: "EU limit applies",
  ok: "Meets EU standards",
};

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
