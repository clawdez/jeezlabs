import type { Metadata } from "next";
import { JetBrains_Mono, Instrument_Serif, Newsreader } from "next/font/google";
import "./globals.css";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-mono",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const news = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-news",
});

export const metadata: Metadata = {
  title: "jeezlabs — product index",
  description: "A two-person product lab building and shipping small internet products.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${mono.variable} ${serif.variable} ${news.variable}`}>
        {children}
      </body>
    </html>
  );
}
