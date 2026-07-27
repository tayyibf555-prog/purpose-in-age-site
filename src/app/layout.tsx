import type { Metadata } from "next";
import Script from "next/script";
import { Archivo, Vollkorn } from "next/font/google";
import { ChatWidget } from "@/components/ChatWidget";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteMotion } from "@/components/motion/SiteMotion";
import { site } from "@/content/site";
import "./globals.css";

/** Heavy grotesque. Wide, square terminals, exceptionally legible at size. */
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

/**
 * The contrasting italic cut, used one phrase at a time.
 *
 * Was Bodoni Moda. A Didone reads as fashion magazine: very high stroke
 * contrast, delicate hairlines, and it went spindly next to Archivo 800.
 * Vollkorn is robust and warm, holds its weight against the grotesque, and
 * matches the brand's own words for itself: a heavy diner mug, a well kept
 * tool, a table with the plates cleared.
 */
const vollkorn = Vollkorn({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-italic-cut",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}, ${site.tagline}`,
    template: `%s, ${site.name}`,
  },
  description:
    "Scott D Brown writes about what happens to a man's identity when the career ends, and what rebuilds it. The book, the journal, speaking, and the Purpose in Age Club waitlist.",
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: the inline script below adds a class to <html>
    // before React hydrates, which is intended and is the standard pattern for
    // pre-paint scripts.
    <html
      lang="en"
      className={`${archivo.variable} ${vollkorn.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/*
          Marks that JavaScript is running so the reveal-hiding CSS can apply.
          Without it the page renders fully visible, which is the correct
          degradation. beforeInteractive puts it in the initial HTML so it runs
          before first paint and there is no flash of hidden content.
        */}
        <Script id="js-flag" strategy="beforeInteractive">
          {`document.documentElement.classList.add('js')`}
        </Script>

        <a
          href="#main"
          className="btn btn-bone sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100]"
        >
          Skip to content
        </a>

        <SiteMotion />
        <SiteHeader />
        <ChatWidget />

        <div className="flex flex-col gap-[14px] px-[14px] pb-[14px] sm:gap-[18px] sm:px-[18px] sm:pb-[18px]">
          <main id="main" className="flex flex-col gap-[14px] sm:gap-[18px]">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
