import type { Metadata } from "next";
import { PantryView } from "@/components/app/PantryView";

export const metadata: Metadata = { title: "My Pantry" };

export default function PantryPage() {
  return <PantryView />;
}
