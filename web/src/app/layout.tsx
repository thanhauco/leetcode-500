import type { Metadata } from "next";
import Link from "next/link";
import { Inter, JetBrains_Mono } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "LeetCode 500 — 2025–2026 Interview Prep",
    template: "%s · LeetCode 500",
  },
  description:
    "The most-asked LeetCode questions of 2025–2026: categorized by pattern, mapped to companies, explained with diagrams and complexity analysis, and runnable in an in-browser playground.",
};

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink-950/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-white shadow-glow">
            ⚡
          </span>
          <span className="text-slate-100">
            LeetCode<span className="text-brand-400">500</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link href="/" className="rounded-lg px-3 py-2 text-slate-300 hover:bg-white/5 hover:text-white">
            Home
          </Link>
          <Link href="/problems" className="rounded-lg px-3 py-2 text-slate-300 hover:bg-white/5 hover:text-white">
            Problems
          </Link>
          <a
            href="https://leetcode.com/problemset/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg px-3 py-2 text-slate-300 hover:bg-white/5 hover:text-white"
          >
            LeetCode ↗
          </a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 py-8 text-center text-sm text-slate-500">
      <p>
        Built for the 2025–2026 interview cycle · Problem statements are original paraphrases;
        originals belong to LeetCode.
      </p>
    </footer>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} dark`}>
      <body className="min-h-screen">
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
