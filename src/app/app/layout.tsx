import type { Metadata } from "next";
import { AppShell } from "@/components/app/AppShell";

export const metadata: Metadata = {
  title: { default: "Track the Poison", template: "%s | Pregustator" },
  description: "Search a US food product and let Gus check each ingredient against EU food rules.",
};

export default function AppLayout({ children }: LayoutProps<"/app">) {
  return <AppShell>{children}</AppShell>;
}
