import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor";
import NoiseOverlay from "@/components/NoiseOverlay";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/sections/Footer";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Soft+Systems — Software That Runs Your Business",
  description:
    "Soft Plus Systems builds ERP, accounting, stock, POS, mobile app and web platforms engineered for businesses that run on precision.",
};

export const viewport: Viewport = {
  themeColor: "#07080a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable} preloading`}>
      <head>
        {/* The scroll lock and the intro overlay are both removed by the
            preloader. With scripting off nothing would ever remove them, so
            the page would render as an unscrollable black panel. */}
        <noscript>
          <style>{`
            html.preloading, html.preloading body { overflow: auto !important; height: auto !important; }
            [data-preloader] { display: none !important; }
          `}</style>
        </noscript>
      </head>
      <body className="font-sans">
        <Preloader />
        <Cursor />
        <NoiseOverlay />
        <SmoothScroll>
          <Navbar />
          <main id="top">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
