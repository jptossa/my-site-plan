import { RULES, type Rule } from "@/data/eu-rules";
import type { Status } from "@/components/ds/types";

export type Analysis = {
  verdict: Status;
  /** Matched rules, worst first (ban, then limit), then in table order. */
  flagged: Rule[];
  /** False when the product has no readable ingredient list: we can't give a verdict. */
  hasIngredients: boolean;
};

/**
 * Lowercase, drop punctuation, and strip the "FD&C" / "No." decorations so that
 * "FD&C Red No. 40" and "red 40" read the same.
 */
export function normalize(text: string): string {
  return ` ${text}`
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/\b(fd and c|d and c)\b/g, " ")
    .replace(/\bno\.?\s*(?=\d)/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function hasPhrase(haystack: string, phrase: string): boolean {
  // The haystack and phrase are both normalized: letters, digits and single spaces.
  return ` ${haystack} `.includes(` ${phrase} `);
}

function tagToE(tag: string): string {
  return tag.replace(/^[a-z]{2}:/, "").toLowerCase();
}

const STATUS_RANK: Record<Status, number> = { ban: 0, limit: 1, ok: 2 };

export function analyzeIngredients(input: { ingredientsText?: string | null; additivesTags?: string[] | null }): Analysis {
  const text = normalize(input.ingredientsText ?? "");
  const tags = new Set((input.additivesTags ?? []).map(tagToE));
  const hasIngredients = text.length > 0 || tags.size > 0;

  const flagged = RULES.filter(
    (rule) => rule.aliases.some((a) => hasPhrase(text, a)) || rule.eNumbers.some((e) => tags.has(e)),
  ).sort((a, b) => STATUS_RANK[a.status] - STATUS_RANK[b.status]);

  const verdict: Status = flagged.some((r) => r.status === "ban") ? "ban" : flagged.length ? "limit" : "ok";
  return { verdict, flagged, hasIngredients };
}

/** What Gus says for a flagged ingredient: what it does, the EU rule, the US rule. */
export function explain(rule: Rule): string {
  const parts = [rule.whatItDoes, rule.euRule, rule.usRule];
  if (rule.amountMatters) parts.push("Labels don't show the amount, so I can't tell you if this one's under the EU limit.");
  return parts.join(" ");
}

export const VERDICT_WORDS: Record<Status, string> = {
  ban: "Doesn't meet EU standards",
  limit: "EU limit applies",
  ok: "Meets EU standards",
};
