import type { Metadata, Viewport } from "next";
import { Figtree, Fredoka, Gloock } from "next/font/google";
import { MotionProvider } from "@/components/MotionProvider";
import { SITE } from "@/data/site";
import "@/styles/tokens.css";
import "@/styles/ds.css";
import "./globals.css";

const gloock = Gloock({ weight: "400", subsets: ["latin"], variable: "--font-gloock", display: "swap" });
const figtree = Figtree({ weight: ["400", "600", "700"], subsets: ["latin"], variable: "--font-figtree", display: "swap" });
// Gus's voice. Fredoka is rounded and friendly but has regular letter shapes, so it reads
// more consistently than the design system's original Grandstander.
const fredoka = Fredoka({ weight: ["400", "500"], subsets: ["latin"], variable: "--font-fredoka", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name}: ${SITE.tagline}`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name}: ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#1b2a16",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${gloock.variable} ${figtree.variable} ${fredoka.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
