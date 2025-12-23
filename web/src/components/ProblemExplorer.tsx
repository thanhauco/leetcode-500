"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  problems as allProblems,
  categories,
  companies,
  type CategorySlug,
  type Difficulty,
} from "@/data";
import ProblemCard from "./ProblemCard";

type Sort = "frequency" | "difficulty" | "id";
const DIFFICULTY_ORDER: Record<Difficulty, number> = { Easy: 0, Medium: 1, Hard: 2 };

export default function ProblemExplorer() {
  const params = useSearchParams();
  const initialCategory = (params.get("category") as CategorySlug | null) ?? "all";
  const initialCompany = params.get("company") ?? "all";

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategorySlug | "all">(initialCategory);
  const [difficulty, setDifficulty] = useState<Difficulty | "all">("all");
  const [company, setCompany] = useState<string>(initialCompany);
  const [sort, setSort] = useState<Sort>("frequency");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = allProblems.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (difficulty !== "all" && p.difficulty !== difficulty) return false;
      if (company !== "all" && !p.companies.includes(company)) return false;
      if (q) {
        const hay = [p.title, String(p.id), p.slug, p.category, ...p.patterns].join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sort === "frequency") return b.frequency - a.frequency;
      if (sort === "difficulty") return DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty];
      return a.id - b.id;
    });
    return list;
  }, [query, category, difficulty, company, sort]);

  const selectClass =
    "rounded-xl border border-white/10 bg-ink-850 px-3 py-2 text-sm text-slate-200 focus:border-brand/50 focus:outline-none";

  return (
    <div className="space-y-6">
      <div className="card flex flex-col gap-3 p-4">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, number, or pattern…"
          className="w-full rounded-xl border border-white/10 bg-ink-850 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-brand/50 focus:outline-none"
        />
        <div className="flex flex-wrap gap-2">
          <select className={selectClass} value={category} onChange={(e) => setCategory(e.target.value as CategorySlug | "all")}>
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.icon} {c.name}
              </option>
            ))}
          </select>

          <select className={selectClass} value={difficulty} onChange={(e) => setDifficulty(e.target.value as Difficulty | "all")}>
            <option value="all">All difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <select className={selectClass} value={company} onChange={(e) => setCompany(e.target.value)}>
            <option value="all">All companies</option>
            {companies.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>

          <select className={selectClass} value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
            <option value="frequency">Sort: Frequency</option>
            <option value="difficulty">Sort: Difficulty</option>
            <option value="id">Sort: Number</option>
          </select>

          <div className="ml-auto flex items-center px-2 text-sm text-slate-500">
            {filtered.length} problem{filtered.length === 1 ? "" : "s"}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-slate-500">No problems match those filters.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProblemCard key={p.id} problem={p} />
          ))}
        </div>
      )}
    </div>
  );
}
