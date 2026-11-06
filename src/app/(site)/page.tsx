import type { Metadata } from "next";
import { Button, Gus, IngredientJar, ProductBox } from "@/components/ds";
import { HeroScene } from "@/components/site/HeroScene";
import { TestCard } from "@/components/site/TestCard";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: { absolute: `${SITE.name}: ${SITE.tagline}` },
  alternates: { canonical: "/" },
};

function Art({ children }: { children: React.ReactNode }) {
  return (
    <div className="feature__art" aria-hidden="true" {...{ inert: true }}>
      {children}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="container">
      <section className="hero rise" aria-labelledby="hero-title">
        <div className="hero__copy">
          <h1 id="hero-title">No need to check for poison yourself, use a poison tester</h1>
          <p>
            Pregustator reads the label on US food products and checks each ingredient against EU food rules. No jargon, no lectures, no judgment.
          </p>
          <div className="cta-row">
            <Button href="/app" large>
              Ask Gus
            </Button>
            <Button href="/how-it-works" variant="secondary" large>
              How it works
            </Button>
          </div>
        </div>
        <HeroScene />
      </section>

      <section className="section intro rise rise-2" aria-label="Meet Gus">
        <h2>Gus your personal Pregustator</h2>
        <h2 className="intro__2">Limit the amount of poison you ingest</h2>
        <h2>Let Gus take the risk</h2>
      </section>

      <section className="section" aria-label="Three reasons to use Pregustator">
        <div className="feature-rows">
          <article className="feature">
            <Art>
              <Gus size={110} mood="idle" />
            </Art>
            <div className="feature__text">
              <h3>A taster for your pantry</h3>
              <p>
                Royal tasters, called pregustators, sampled the king&rsquo;s food first. Gus does the same for your groceries. He reads the label so you don&rsquo;t have to squint at it.
              </p>
            </div>
          </article>

          <article className="feature">
            <Art>
              <IngredientJar label="Red 40" fill="red" status="limit" size="phone" />
              <IngredientJar label="BHT" fill="butter" status="limit" size="phone" />
              <IngredientJar label="The rest" fill="sage" status="ok" size="phone" />
            </Art>
            <div className="feature__text">
              <h3>One jar per ingredient</h3>
              <p>
                Pick a product and its ingredients line up in jars. Tap one and Gus tells you what it does in the food, what the EU rule is, and what the US rule is.
              </p>
            </div>
          </article>

          <article className="feature">
            <Art>
              <ProductBox label="Toaster Tarts" color="rose" status="ban" size="phone" />
              <ProductBox label="White Bread" color="teal" status="ban" size="phone" />
              <ProductBox label="Apple Juice" color="apple" status="ok" size="phone" />
            </Art>
            <div className="feature__text">
              <h3>Keep track of what you care about</h3>
              <p>
                Keep products in your pantry and watch the ingredients you want to avoid. Pregustator points them out the next time they show up, and suggests alternatives.
              </p>
            </div>
          </article>
        </div>
      </section>

      <div className="section">
        <TestCard />
      </div>
    </div>
  );
}
