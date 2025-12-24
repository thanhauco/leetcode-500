import Link from "next/link";
import {
  categoryStats,
  companies,
  datasetSummary,
  type Difficulty,
} from "@/data";

export default function HomePage() {
  const summary = datasetSummary();
  const stats = categoryStats();

  const difficultyColor: Record<Difficulty, string> = {
    Easy: "#22c55e",
    Medium: "#f59e0b",
    Hard: "#ef4444",
  };
  const totalByDiff = summary.byDifficulty.Easy + summary.byDifficulty.Medium + summary.byDifficulty.Hard;

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="animate-fade-up pt-6 text-center">
        <span className="chip border border-brand/30 bg-brand/10 text-brand-400">
          2025–2026 interview cycle
        </span>
        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-slate-50 sm:text-5xl">
          The most-asked <span className="text-brand-400">LeetCode</span> questions, decoded.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
          Categorized by pattern, mapped to the companies that ask them, and explained with colorful
          diagrams, complexity analysis, pseudocode, and a runnable test playground.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/problems" className="btn-primary px-5 py-2.5">
            Browse problems →
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost px-5 py-2.5"
          >
            ★ Star the repo
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Problems", value: summary.totalProblems, hint: "fully explained" },
          { label: "Patterns", value: summary.totalCategories, hint: "categories" },
          { label: "Companies", value: summary.totalCompanies, hint: "mapped" },
          { label: "Playgrounds", value: summary.withPlayground, hint: "runnable + tested" },
        ].map((s) => (
          <div key={s.label} className="card p-5 text-center">
            <div className="text-3xl font-extrabold text-slate-50">{s.value}</div>
            <div className="mt-1 text-sm font-medium text-slate-300">{s.label}</div>
            <div className="text-xs text-slate-500">{s.hint}</div>
          </div>
        ))}
      </section>

      {/* Difficulty distribution */}
      <section className="card p-6">
        <h2 className="mb-4 text-lg font-semibold text-slate-100">Difficulty mix</h2>
        <div className="flex h-4 overflow-hidden rounded-full">
          {(["Easy", "Medium", "Hard"] as Difficulty[]).map((d) => (
            <div
              key={d}
              style={{
                width: `${(summary.byDifficulty[d] / totalByDiff) * 100}%`,
                backgroundColor: difficultyColor[d],
              }}
              title={`${d}: ${summary.byDifficulty[d]}`}
            />
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-4 text-sm">
          {(["Easy", "Medium", "Hard"] as Difficulty[]).map((d) => (
            <span key={d} className="flex items-center gap-2 text-slate-400">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: difficultyColor[d] }} />
              {d} · {summary.byDifficulty[d]}
            </span>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-2xl font-bold text-slate-100">Explore by pattern</h2>
          <Link href="/problems" className="text-sm text-brand-400 hover:text-brand-500">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((c) => (
            <Link
              key={c.slug}
              href={`/problems?category=${c.slug}`}
              className="card group flex items-center gap-3 p-4 transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-glow"
              style={{ borderLeft: `3px solid ${c.color}` }}
            >
              <span
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-xl"
                style={{ backgroundColor: `${c.color}22`, border: `1px solid ${c.color}55` }}
              >
                {c.icon}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-100 group-hover:text-white">{c.name}</p>
                <p className="text-xs text-slate-500">
                  {c.count} problem{c.count === 1 ? "" : "s"}
                </p>
              </div>
              <span className="text-slate-600 transition group-hover:translate-x-0.5 group-hover:text-brand-400">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Companies */}
      <section className="card p-6">
        <h2 className="mb-4 text-lg font-semibold text-slate-100">Companies covered</h2>
        <div className="flex flex-wrap gap-2">
          {companies.map((c) => (
            <Link
              key={c.slug}
              href={`/problems?company=${c.slug}`}
              className="chip border transition hover:scale-105"
              style={{ borderColor: `${c.color}66`, backgroundColor: `${c.color}1f`, color: "#e2e8f0" }}
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
