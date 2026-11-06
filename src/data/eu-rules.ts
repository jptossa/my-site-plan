import type { JarFill, Status } from "@/components/ds/types";

/**
 * Starter table of ingredients where EU and US food rules differ.
 *
 * VERIFICATION STATUS: every entry is a plain-language summary written from the sources
 * linked on it and has NOT yet been signed off. Check each entry against the linked
 * regulation (and the current official text) before launch, then set `reviewed: true`.
 * Wording follows the design system: it compares rules and never says "toxic", "unsafe"
 * or "banned in Europe".
 */
export type Source = { label: string; url: string };

export type Rule = {
  id: string;
  /** What a shopper would read on a label. */
  name: string;
  /** Jar label, with soft hyphens (U+00AD) so long names wrap instead of shrinking the type. */
  jarLabel: string;
  /** The other names, once: "also called Allura Red or E129". */
  alsoCalled: string;
  /** Lowercase phrases to find in the ingredients text (digits and letters only, single spaces). */
  aliases: string[];
  /** E-numbers, lowercase, matched against Open Food Facts additive tags. */
  eNumbers: string[];
  status: Exclude<Status, "ok">;
  /** The words Gus's bubble shows. */
  statusText: string;
  fill: JarFill;
  /** Three short sentences for Gus, in this order: what it does (naming its other names once), the EU rule, the US rule. */
  whatItDoes: string;
  euRule: string;
  usRule: string;
  /** True when the EU rule is an amount limit that labels don't let us check. */
  amountMatters: boolean;
  sources: { eu: Source; us: Source };
  reviewed: boolean;
};

const EU_ADDITIVES: Source = { label: "EU Regulation 1333/2008 (food additives)", url: "https://eur-lex.europa.eu/eli/reg/2008/1333/oj" };
const EU_TIO2: Source = { label: "EU Regulation 2022/63 (E171)", url: "https://eur-lex.europa.eu/eli/reg/2022/63/oj" };
const cfr = (section: string): Source => ({
  label: `US 21 CFR ${section}`,
  url: `https://www.ecfr.gov/current/title-21/section-${section}`,
});

export const RULES: Rule[] = [
  {
    id: "titanium-dioxide",
    name: "Titanium dioxide",
    jarLabel: "Titanium di­oxide",
    alsoCalled: "E171",
    aliases: ["titanium dioxide", "e171"],
    eNumbers: ["e171"],
    status: "ban",
    statusText: "Not allowed in the EU",
    fill: "white",
    whatItDoes: "This white coloring, also called E171, makes foods like icing and candy look brighter.",
    euRule: "Europe took it out of food in 2022, after its food safety agency could no longer rule out DNA damage.",
    usRule: "US rules permit up to 1% of a food's weight.",
    amountMatters: false,
    sources: { eu: EU_TIO2, us: cfr("73.575") },
    reviewed: false,
  },
  {
    id: "azodicarbonamide",
    name: "Azodicarbonamide",
    jarLabel: "Azodi­carbon­amide",
    alsoCalled: "E927a, or ADA",
    aliases: ["azodicarbonamide", "e927a"],
    eNumbers: ["e927a"],
    status: "ban",
    statusText: "Not allowed in the EU",
    fill: "sky",
    whatItDoes: "This flour treatment, also called E927a, helps dough rise and stay soft.",
    euRule: "It isn't on the EU's list of approved food additives.",
    usRule: "US rules allow up to 45 parts per million in flour.",
    amountMatters: false,
    sources: { eu: EU_ADDITIVES, us: cfr("172.806") },
    reviewed: false,
  },
  {
    id: "potassium-bromate",
    name: "Potassium bromate",
    jarLabel: "Potassium bro­mate",
    alsoCalled: "E924, or bromated flour",
    aliases: ["potassium bromate", "bromated flour", "e924"],
    eNumbers: ["e924"],
    status: "ban",
    statusText: "Not allowed in the EU",
    fill: "sky",
    whatItDoes: "This flour improver, also called E924, makes bread dough stronger so it rises higher.",
    euRule: "It isn't on the EU's list of approved food additives.",
    usRule: "US rules allow it in flour in limited amounts.",
    amountMatters: false,
    sources: { eu: EU_ADDITIVES, us: cfr("136.110") },
    reviewed: false,
  },
  {
    id: "propylparaben",
    name: "Propylparaben",
    jarLabel: "Propyl­paraben",
    alsoCalled: "E216",
    aliases: ["propylparaben", "propyl paraben", "e216"],
    eNumbers: ["e216"],
    status: "ban",
    statusText: "Not allowed in the EU",
    fill: "butter",
    whatItDoes: "This preservative, also called E216, keeps mold from growing in baked goods.",
    euRule: "The EU removed it from its approved additive list in 2006.",
    usRule: "US rules list it as generally recognized as safe.",
    amountMatters: false,
    sources: { eu: EU_ADDITIVES, us: cfr("184.1670") },
    reviewed: false,
  },
  {
    id: "red-40",
    name: "Red 40",
    jarLabel: "Red 40",
    alsoCalled: "Allura Red or E129",
    aliases: ["red 40", "allura red", "allura red ac", "e129"],
    eNumbers: ["e129"],
    status: "limit",
    statusText: "EU warning label required",
    fill: "red",
    whatItDoes: "This dye, also called Allura Red or E129, colors foods like candy and toaster pastries red.",
    euRule: "Europe allows it, but the package must say it may have an adverse effect on activity and attention in children.",
    usRule: "US labels don't need that warning.",
    amountMatters: false,
    sources: { eu: { label: "EU Regulation 1333/2008, Annex V (warning labels)", url: EU_ADDITIVES.url }, us: cfr("74.340") },
    reviewed: false,
  },
  {
    id: "yellow-5",
    name: "Yellow 5",
    jarLabel: "Yellow 5",
    alsoCalled: "Tartrazine or E102",
    aliases: ["yellow 5", "tartrazine", "e102"],
    eNumbers: ["e102"],
    status: "limit",
    statusText: "EU warning label required",
    fill: "butter",
    whatItDoes: "This dye, also called Tartrazine or E102, gives foods like cereal and drinks a lemon-yellow color.",
    euRule: "Europe allows it, but the package must say it may have an adverse effect on activity and attention in children.",
    usRule: "US labels must name it, but don't need that warning.",
    amountMatters: false,
    sources: { eu: { label: "EU Regulation 1333/2008, Annex V (warning labels)", url: EU_ADDITIVES.url }, us: cfr("74.705") },
    reviewed: false,
  },
  {
    id: "yellow-6",
    name: "Yellow 6",
    jarLabel: "Yellow 6",
    alsoCalled: "Sunset Yellow or E110",
    aliases: ["yellow 6", "sunset yellow", "sunset yellow fcf", "e110"],
    eNumbers: ["e110"],
    status: "limit",
    statusText: "EU warning label required",
    fill: "butter",
    whatItDoes: "This dye, also called Sunset Yellow or E110, gives foods like chips and pastries an orange color.",
    euRule: "Europe allows it, but the package must say it may have an adverse effect on activity and attention in children.",
    usRule: "US labels don't need that warning.",
    amountMatters: false,
    sources: { eu: { label: "EU Regulation 1333/2008, Annex V (warning labels)", url: EU_ADDITIVES.url }, us: cfr("74.706") },
    reviewed: false,
  },
  {
    id: "red-3",
    name: "Red 3",
    jarLabel: "Red 3",
    alsoCalled: "Erythrosine or E127",
    aliases: ["red 3", "erythrosine", "erythrosin", "e127"],
    eNumbers: ["e127"],
    status: "limit",
    statusText: "EU limit applies",
    fill: "red",
    whatItDoes: "This dye, also called Erythrosine or E127, gives candy and some baked goods a cherry-red color.",
    euRule: "Europe allows it in only a few foods, such as cocktail cherries, with a maximum amount.",
    usRule: "The FDA has withdrawn its approval for food, and makers have until January 2027 to switch.",
    amountMatters: true,
    sources: { eu: EU_ADDITIVES, us: cfr("74.303") },
    reviewed: false,
  },
  {
    id: "bha",
    name: "BHA",
    jarLabel: "BHA",
    alsoCalled: "Butylated hydroxyanisole or E320",
    aliases: ["bha", "butylated hydroxyanisole", "e320"],
    eNumbers: ["e320"],
    status: "limit",
    statusText: "EU limit applies",
    fill: "butter",
    whatItDoes: "This preservative, also called E320, keeps fats and oils from going stale.",
    euRule: "Europe allows it, with a maximum amount for each type of food.",
    usRule: "US rules allow up to 0.02% of the fat or oil in a food.",
    amountMatters: true,
    sources: { eu: EU_ADDITIVES, us: cfr("172.110") },
    reviewed: false,
  },
  {
    id: "bht",
    name: "BHT",
    jarLabel: "BHT",
    alsoCalled: "Butylated hydroxytoluene or E321",
    aliases: ["bht", "butylated hydroxytoluene", "e321"],
    eNumbers: ["e321"],
    status: "limit",
    statusText: "EU limit applies",
    fill: "butter",
    whatItDoes: "This preservative, also called E321, keeps fats from going stale.",
    euRule: "Europe allows it, with a maximum amount for each type of food.",
    usRule: "US rules allow up to 0.02% of the fat or oil in a food.",
    amountMatters: true,
    sources: { eu: EU_ADDITIVES, us: cfr("172.115") },
    reviewed: false,
  },
  {
    id: "tbhq",
    name: "TBHQ",
    jarLabel: "TBHQ",
    alsoCalled: "Tertiary butylhydroquinone or E319",
    aliases: ["tbhq", "tertiary butylhydroquinone", "e319"],
    eNumbers: ["e319"],
    status: "limit",
    statusText: "EU limit applies",
    fill: "butter",
    whatItDoes: "This preservative, also called E319, keeps cooking oils in snacks and pastries from going stale.",
    euRule: "Europe allows it, with a maximum amount for each type of food.",
    usRule: "US rules allow up to 0.02% of the fat or oil in a food.",
    amountMatters: true,
    sources: { eu: EU_ADDITIVES, us: cfr("172.185") },
    reviewed: false,
  },
];

export const RULES_BY_ID: Record<string, Rule> = Object.fromEntries(RULES.map((r) => [r.id, r]));
