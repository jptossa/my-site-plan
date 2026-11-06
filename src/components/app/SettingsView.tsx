"use client";

import { useState } from "react";
import { Button } from "@/components/ds";
import { MotionToggle } from "@/components/MotionToggle";
import { DISCLAIMER } from "@/data/site";
import { usePantry } from "@/lib/pantry";

export function SettingsView() {
  const { clearAll } = usePantry();
  const [confirming, setConfirming] = useState(false);
  return (
    <div className="stack">
      <h1 className="app-title">Settings</h1>

      <section className="settings-group" aria-labelledby="motion-title">
        <h2 id="motion-title">Motion</h2>
        <p className="muted">Gus walks, hops and blinks a little. Turn it off and everything stays still, but his face still changes. We start it off if your device asks for less motion.</p>
        <div>
          <MotionToggle />
        </div>
      </section>

      <section className="settings-group" aria-labelledby="data-title">
        <h2 id="data-title">Your data</h2>
        <p className="muted">Your pantry and avoid list are saved in this browser. Clearing them can&rsquo;t be undone.</p>
        <div className="app-actions">
          {confirming ? (
            <>
              <Button
                onClick={() => {
                  clearAll();
                  setConfirming(false);
                }}
              >
                Yes, clear everything
              </Button>
              <Button variant="secondary" onClick={() => setConfirming(false)}>
                Keep it
              </Button>
            </>
          ) : (
            <Button variant="secondary" onClick={() => setConfirming(true)}>
              Clear my pantry and avoid list
            </Button>
          )}
        </div>
      </section>

      <section className="settings-group" aria-labelledby="disclaimer-title">
        <h2 id="disclaimer-title">Disclaimer</h2>
        {DISCLAIMER.full.map((p) => (
          <p key={p} className="muted">
            {p}
          </p>
        ))}
        <p className="app-note">Label data from Open Food Facts (open database, ODbL). [Draft wording: to be reviewed before launch.]</p>
      </section>
    </div>
  );
}
