import type { Metadata } from "next";
import { Button, Gus } from "@/components/ds";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "About Us",
  description: "Meet Gus, the Pregustator, and the people behind this food-label tester.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const c = SITE.contact;
  return (
    <div className="container">
      <div className="page-head rise">
        <h1>About Us</h1>
      </div>

      <section className="section" aria-labelledby="about-gus">
        <div className="feature">
          <div className="feature__art" aria-hidden="true" {...{ inert: true }}>
            <Gus size={120} mood="happy" />
          </div>
          <div className="prose">
            <h2 id="about-gus">Gus the Pregustator, Your Personal Poison Tester</h2>
            <p>
              A pregustator was the person who tasted a ruler&rsquo;s food first. Gus does that job for your groceries.
            </p>
            <p>
              <strong>Our goals are simple.</strong> Make it easy to see where US and EU food rules differ. Say it plainly, with no jargon and no scolding. Help you keep track of the products and ingredients you care about. Then help you find something you&rsquo;d rather eat.
            </p>
            <p>
              We don&rsquo;t tell you what to eat. We compare rules and show our sources. You decide.
            </p>
            <p className="app-note">[Placeholder: replace with the real team and company story.]</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="callout contact-card">
          <h2>Questions? Call us.</h2>
          <p>
            <a href={c.phoneHref} className="pg-btn pg-btn--primary pg-btn--lg pg-press">
              Call {c.phone}
            </a>
          </p>
          <p className="muted">Or write to <a href={`mailto:${c.email}`}>{c.email}</a>. All our details are in the footer, too.</p>
          <div className="cta-row">
            <Button href="/app" variant="secondary">
              Track the Poison
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
