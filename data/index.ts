/**
 * Public API of the @leetcode-500/data package.
 * The web app imports everything it needs from here.
 */
export * from "./types.ts";
export { categories, categoryBySlug, categorySlugs } from "./categories.ts";
export { companies, companyBySlug } from "./companies.ts";

import { categories } from "./categories.ts";
import { companies } from "./companies.ts";
import { problems as curatedProblems } from "./problems.ts";
import { catalogProblems } from "./catalog/index.ts";
import type { CategorySlug, Difficulty, Problem } from "./types.ts";

/**
 * The full problem set: the curated, full-treatment core first, then the broader
 * catalog, de-duplicated by id (curated entries win on collision).
 */
function dedupeById(list: Problem[]): Problem[] {
  const seen = new Set<number>();
  const out: Problem[] = [];
  for (const p of list) {
    if (seen.has(p.id)) continue;
    seen.add(p.id);
    out.push(p);
  }
  return out;
}

export const problems: Problem[] = dedupeById([...curatedProblems, ...catalogProblems]);

/** Look up a single problem by its URL slug. */
export function getProblemBySlug(slug: string): Problem | undefined {
  return problems.find((p) => p.slug === slug);
}

/** Look up a single problem by its LeetCode id. */
export function getProblemById(id: number): Problem | undefined {
  return problems.find((p) => p.id === id);
}

/** All problems in a category, highest frequency first. */
export function problemsByCategory(slug: CategorySlug): Problem[] {
  return problems
    .filter((p) => p.category === slug)
    .sort((a, b) => b.frequency - a.frequency);
}

/** All problems a given company is known to ask. */
export function problemsByCompany(companySlug: string): Problem[] {
  return problems
    .filter((p) => p.companies.includes(companySlug))
    .sort((a, b) => b.frequency - a.frequency);
}

/** Case-insensitive search over title, id, patterns, and category. */
export function searchProblems(query: string): Problem[] {
  const q = query.trim().toLowerCase();
  if (!q) return problems;
  return problems.filter((p) => {
    const haystack = [
      p.title,
      String(p.id),
      p.slug,
      p.category,
      ...p.patterns,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export interface CategoryStat {
  slug: CategorySlug;
  name: string;
  icon: string;
  color: string;
  count: number;
}

/** Per-category problem counts for dashboards. */
export function categoryStats(): CategoryStat[] {
  return categories.map((c) => ({
    slug: c.slug,
    name: c.name,
    icon: c.icon,
    color: c.color,
    count: problems.filter((p) => p.category === c.slug).length,
  }));
}

/** Counts of Easy / Medium / Hard across the dataset. */
export function difficultyStats(): Record<Difficulty, number> {
  const out: Record<Difficulty, number> = { Easy: 0, Medium: 0, Hard: 0 };
  for (const p of problems) out[p.difficulty]++;
  return out;
}

/** High-level totals used on the home page. */
export function datasetSummary() {
  return {
    totalProblems: problems.length,
    totalCategories: categories.length,
    totalCompanies: companies.length,
    byDifficulty: difficultyStats(),
    withPlayground: problems.filter((p) => p.runner && p.tests?.length).length,
  };
}
