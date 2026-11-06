import { Gus, IngredientJar, Lamp, ProductBox } from "@/components/ds";

/** Decorative mini cupboard for the home hero. Not interactive: hidden from assistive tech. */
export function HeroScene() {
  return (
    <div className="hero-scene" aria-hidden="true" {...{ inert: true }}>
      <div className="hero-scene__glow" />
      <div className="hero-scene__lamp">
        <Lamp size="desktop" />
      </div>
      <div className="hero-scene__row">
        <ProductBox label="Toaster Tarts" color="rose" status="ban" size="phone" />
        <IngredientJar label="Red 40" fill="red" status="limit" size="phone" />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 0 }}>
          <Gus size={58} mood="happy" />
          <IngredientJar label="Titanium dioxide" fill="white" status="ban" size="phone" selected />
        </div>
        <ProductBox label="Apple Juice" color="apple" status="ok" size="phone" />
        <div className="hero-scene__board" />
      </div>
    </div>
  );
}
