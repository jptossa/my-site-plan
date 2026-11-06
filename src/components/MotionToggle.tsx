"use client";

import { Button } from "@/components/ds";
import { useMotion } from "./MotionProvider";

function WaveIcon() {
  return (
    <svg aria-hidden="true" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12c2.5-6 5-6 7.5 0s5 6 7.5 0 3-4 5-3" />
    </svg>
  );
}

/** The Motion control every screen has. Pressed = motion on. */
export function MotionToggle() {
  const { motion, setMotion } = useMotion();
  return (
    <Button variant="secondary" pill pressed={motion} onClick={() => setMotion(!motion)}>
      <WaveIcon />
      {motion ? "Motion on" : "Motion off"}
    </Button>
  );
}
