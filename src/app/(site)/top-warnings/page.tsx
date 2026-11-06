import type { Metadata } from "next";
import { Button, IngredientJar, StatusLabel } from "@/components/ds";
import { WatchButton } from "@/components/WatchButton";
import { RULES } from "@/data/eu-rules";

export const metadata: Metadata = {
  title: "Top Warnings",
  description: "The ingredients where US and EU food rules differ most, with what each rule says and where it comes from.",
  alternates: { canonical: "/top-warnings" },
};

const ORDER = { ban: 0, limit: 1 } as const;

export default function TopWarningsPage() {
  const rules = [...RULES].sort((a, b) => ORDER[a.status] - ORDER[b.status]);
  return (
    <div className="container">
      <div className="page-head rise">
        <h1>Top Warnings</h1>
        <p>The ingredients we check for, strictest EU rule first. Watch the ones you want to avoid and Gus will point them out.</p>
      </div>

      <section className="section" aria-labelledby="top-list">
        <h2 id="top-list" style={{ marginBottom: "var(--space-5)" }}>
          The Most Commonly Banned or Warned against Poisons
        </h2>
        <ul className="warnings" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {rules.map((rule) => (
            <li key={rule.id} className="warning">
              <div className="warning__jar" aria-hidden="true" {...{ inert: true }}>
                <IngredientJar label={rule.jarLabel} fill={rule.fill} status={rule.status} statusText={rule.statusText} size="phone" />
              </div>
              <div className="warning__body">
                <h3>{rule.name}</h3>
                <StatusLabel kind={rule.status}>{rule.statusText}</StatusLabel>
                <p>
                  {rule.whatItDoes} {rule.euRule} {rule.usRule}
                </p>
                <p className="rule-source muted">
                  Sources:{" "}
                  <a href={rule.sources.eu.url} target="_blank" rel="noreferrer">
                    {rule.sources.eu.label}
                  </a>
                  ;{" "}
                  <a href={rule.sources.us.url} target="_blank" rel="noreferrer">
                    {rule.sources.us.label}
                  </a>
                  .
                </p>
                <WatchButton ruleId={rule.id} name={rule.name} />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <div className="callout">
          <h2>Check a product</h2>
          <p className="muted">Want to see which of these are in the food in your cupboard?</p>
          <div className="cta-row">
            <Button href="/app" large>
              Track the Poison
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
