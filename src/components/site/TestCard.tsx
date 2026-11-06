import { Button, Gus } from "@/components/ds";

/** The home page's primary action: a search that opens Ask Gus with the query filled in. */
export function TestCard({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <section className="test-card" aria-labelledby="test-card-title">
      <div className="test-card__gus">
        <Gus size={120} mood="idle" />
      </div>
      <div className="stack">
        <Heading id="test-card-title">Test for Poison</Heading>
        <p className="muted" style={{ fontSize: 17 }}>
          Type a product, like &ldquo;toaster tarts&rdquo; or &ldquo;red velvet cake mix&rdquo;. Gus reads the label and checks each ingredient against EU food rules.
        </p>
        <form className="search-form" action="/app" role="search">
          <label htmlFor="home-search" className="visually-hidden">
            Search for a US food product
          </label>
          <input id="home-search" type="search" name="q" placeholder="Search a US food product" autoComplete="off" required />
          <Button type="submit" large>
            Ask Gus
          </Button>
        </form>
      </div>
    </section>
  );
}
