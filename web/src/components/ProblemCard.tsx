import Link from "next/link";
import { categoryBySlug, type Problem } from "@/data";
import DifficultyBadge from "./DifficultyBadge";

export default function ProblemCard({ problem }: { problem: Problem }) {
  const category = categoryBySlug[problem.category];
  const color = category?.color ?? "#6366f1";

  return (
    <Link
      href={`/problems/${problem.slug}`}
      className="card group flex flex-col gap-3 p-4 transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-glow"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-base"
            style={{ backgroundColor: `${color}22`, border: `1px solid ${color}55` }}
          >
            {category?.icon}
          </span>
          <div className="min-w-0">
            <p className="truncate font-semibold text-slate-100 group-hover:text-white">
              <span className="text-slate-500">#{problem.id}</span> {problem.title}
            </p>
            <p className="text-xs text-slate-500">{category?.name}</p>
          </div>
        </div>
        <DifficultyBadge difficulty={problem.difficulty} />
      </div>

      <div className="flex flex-wrap gap-1.5">
        {problem.patterns.slice(0, 3).map((p) => (
          <span key={p} className="chip bg-white/5 text-slate-300">
            {p}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full"
            style={{ width: `${problem.frequency}%`, backgroundColor: color }}
          />
        </div>
        <span className="text-xs tabular-nums text-slate-500">{problem.frequency}</span>
      </div>
    </Link>
  );
}
