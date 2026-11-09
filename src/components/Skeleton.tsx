/**
 * Shimmering placeholders shown while a search or a label is loading. The shimmer is a CSS
 * animation, so it stops (leaving still grey blocks) when Motion is off or the device asks
 * for reduced motion. Screen readers get a single "loading" message instead of the blocks.
 */
function Block({ w, h, className = "" }: { w?: number | string; h: number | string; className?: string }) {
  return <span className={`skel ${className}`} aria-hidden="true" style={{ width: w ?? "100%", height: h }} />;
}

export function ResultsSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="skel-group" role="status" aria-busy="true">
      <span className="visually-hidden">Searching</span>
      <Block w={200} h={26} />
      <div className="skel-list">
        {Array.from({ length: rows }, (_, i) => (
          <div key={i} className="skel-row">
            <Block w={30} h={30} className="skel--round" />
            <span style={{ display: "grid", gap: 8, flex: 1 }}>
              <Block w={i % 2 ? "72%" : "88%"} h={16} />
              <Block w="42%" h={12} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProductSkeleton() {
  return (
    <div className="skel-group" role="status" aria-busy="true">
      <span className="visually-hidden">Reading the label</span>
      <Block w="80%" h={36} />
      <Block w={190} h={24} />
      <Block h={300} className="skel--tall" />
      <Block h={96} />
    </div>
  );
}
