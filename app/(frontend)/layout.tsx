import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { getSiteSettings } from "@/lib/cms";
import "./globals.css";

// Every page in this route group reads live CMS data via Payload, so the
// whole group is rendered dynamically per request rather than prerendered
// at build time — CMS edits go live immediately and the build doesn't
// depend on Payload's secret/DB being reachable at build time.
export const dynamic = "force-dynamic";

// Stand-in for SF Pro Display (not licensed for web use here) — same
// clean, modern grotesque character. Swap via next/font/local if the
// upright SF Pro Display weights become available.
const display = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Favourite Child Church",
  description:
    "Favourite Child Church (FCC) — a Bible-believing church in Henderson, Auckland, preaching the Gospel of Jesus Christ.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" className={`${display.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <NavBar name={settings.name} logoUrl={settings.logo} />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
