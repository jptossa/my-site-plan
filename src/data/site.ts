/**
 * Site-wide copy and placeholder contact details.
 * Everything here is a PLACEHOLDER until the real company details are supplied:
 * replace the values in this one file. (555-01xx numbers and .example domains
 * are reserved for fiction and can never reach a real person.)
 */
export const SITE = {
  name: "Pregustator",
  tagline: "Every label, read against EU food rules.",
  description:
    "Look up a US food product, see which ingredients don't meet EU standards, and keep track of the ones you want to avoid.",
  // Replace with the real production address before launch (used for absolute og:image URLs).
  url: "https://pregustator.example",
  contact: {
    phone: "(555) 010-0199",
    phoneHref: "tel:+15550100199",
    email: "hello@pregustator.example",
    addressLines: ["100 Placeholder Lane", "Anytown, USA 00000"],
  },
  social: [
    { label: "Instagram", href: "#" },
    { label: "TikTok", href: "#" },
    { label: "X", href: "#" },
  ],
  /** Sent to Open Food Facts so they can reach us if we misbehave. Placeholder contact only. */
  userAgent: "Pregustator/0.1 (hello@pregustator.example)",
} as const;

export const NAV = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Track the Poison", href: "/app" },
  { label: "Top Warnings", href: "/top-warnings" },
  { label: "About Us", href: "/about" },
] as const;

/**
 * Disclaimer copy. DRAFT: needs the owner's (ideally a lawyer's) review before launch.
 * Tone follows the design system: plain, compares rules, never says "toxic" or "unsafe".
 */
export const DISCLAIMER = {
  short:
    "Pregustator compares US food labels with EU food rules. It is for information only, not medical, dietary or legal advice, and it doesn't say whether a food is safe.",
  inApp: "Based on the label data we found. Check the package.",
  full: [
    "Pregustator is for information only. It is not medical, dietary or legal advice, and it is not a substitute for a doctor or dietitian.",
    "We compare food rules. We do not decide whether a food is safe for you. A \"Meets EU standards\" result does not mean a food is right for you, and a \"Doesn't meet EU standards\" result does not mean it is harmful.",
    "Product data comes from Open Food Facts, a community-built database. It can be incomplete, out of date or wrong, and recipes change. Always check the package in your hand.",
    "We summarize EU rules from the sources we link. Rules change. Labels rarely show how much of an ingredient is in a food, so we can't tell you whether a product is under an EU limit.",
    "Pregustator is not affiliated with the European Union, EFSA, the FDA, Open Food Facts or any food brand. Brand and product names belong to their owners.",
    "Everything is provided as is, without any warranty. You use Pregustator at your own risk.",
  ],
} as const;
