"use client";

import { Button } from "@/components/ds";
import { usePantry } from "@/lib/pantry";

/** "Watch Red 40" / "Watching Red 40": toggles an ingredient on the avoid list. */
export function WatchButton({ ruleId, name }: { ruleId: string; name: string }) {
  const { pantry, toggleWatch } = usePantry();
  const watching = pantry.watched.includes(ruleId);
  return (
    <Button variant="secondary" pressed={watching} onClick={() => toggleWatch(ruleId)}>
      {watching ? `Watching ${name}` : `Watch ${name}`}
    </Button>
  );
}
