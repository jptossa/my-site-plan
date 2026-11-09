import type { Metadata } from "next";
import { Collapsible } from "@/components/Collapsible";
import { Button } from "@/components/ds";
import { DISCLAIMER } from "@/data/site";

export const metadata: Metadata = {
  title: "How It Works",
  description: "Where Pregustator's information comes from, how US and EU food rules differ, and what it does and doesn't do.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <div className="container">
      <div className="page-head rise">
        <h1>How It Works</h1>
        <p>Pregustator lines up the label on a US food product against EU food rules, one ingredient at a time. Tap an arrow to open a section.</p>
      </div>

      <div className="section">
        <Collapsible title="Methodology" defaultOpen>
          <div className="prose">
            <ol>
              <li>
                <strong>You search.</strong> Pick a US food product. We look up its label in Open Food Facts, a community-built database of food products.
              </li>
              <li>
                <strong>We read the ingredients.</strong> We match each ingredient and additive on the label to a short list of ingredients where US and EU rules differ.
              </li>
              <li>
                <strong>Gus explains.</strong> For each match he says what the ingredient does in the food, what the EU rule is, and what the US rule is.
              </li>
              <li>
                <strong>The product gets one verdict.</strong> It takes the strictest result of its ingredients.
              </li>
            </ol>
          </div>
        </Collapsible>

        <Collapsible title="Where the rules differ">
          <div className="prose">
            <p>Gus uses exactly three phrases, so a result always means the same thing.</p>
          </div>
          <div className="compare" style={{ marginTop: "var(--space-5)" }}>
            <div className="compare__row">
              <strong>Doesn&rsquo;t meet EU standards</strong>
              <span>The EU does not allow this ingredient in food.</span>
              <span>Example: titanium dioxide (E171).</span>
            </div>
            <div className="compare__row">
              <strong>EU limit applies / EU warning label required</strong>
              <span>The EU allows it, with a maximum amount or a warning on the package.</span>
              <span>Example: Red 40 (E129) needs a warning label.</span>
            </div>
            <div className="compare__row">
              <strong>Meets EU standards</strong>
              <span>We found no EU issue with this ingredient.</span>
              <span>Most ingredients land here.</span>
            </div>
          </div>
        </Collapsible>

        <Collapsible id="disclaimer" title="What Pregustator does and doesn't do">
          <div className="prose">
            {DISCLAIMER.full.map((para) => (
              <p key={para}>{para}</p>
            ))}
            <p className="app-note">[Draft wording: to be reviewed before launch.]</p>
          </div>
        </Collapsible>
      </div>

      <section className="section">
        <div className="callout">
          <h2>Ready to try it?</h2>
          <p className="muted">Search a product and let Gus take the first bite.</p>
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
