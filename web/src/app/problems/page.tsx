import { Suspense } from "react";
import type { Metadata } from "next";
import ProblemExplorer from "@/components/ProblemExplorer";

export const metadata: Metadata = {
  title: "Problems",
  description: "Search and filter the most-asked LeetCode problems by pattern, difficulty, and company.",
};

export default function ProblemsPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold text-slate-100">Problems</h1>
        <p className="text-slate-400">
          Filter by pattern, difficulty, or company. Sort by how often each is asked.
        </p>
      </header>
      <Suspense fallback={<p className="py-16 text-center text-slate-500">Loading…</p>}>
        <ProblemExplorer />
      </Suspense>
    </div>
  );
}
