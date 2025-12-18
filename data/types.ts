/**
 * Core domain models for the LeetCode 500 dataset.
 * This module is the single typed source of truth consumed by the web app,
 * the docs generators, and any tooling.
 */

export type Difficulty = "Easy" | "Medium" | "Hard";

/** The 18 canonical interview patterns. */
export type CategorySlug =
  | "arrays-hashing"
  | "two-pointers"
  | "sliding-window"
  | "stack"
  | "binary-search"
  | "linked-list"
  | "trees"
  | "tries"
  | "heap-priority-queue"
  | "backtracking"
  | "graphs"
  | "advanced-graphs"
  | "dp-1d"
  | "dp-2d"
  | "greedy"
  | "intervals"
  | "math-geometry"
  | "bit-manipulation";

export type CompanyTier =
  | "FAANG"
  | "Big Tech"
  | "Finance"
  | "Unicorn"
  | "Other";

export type Language = "python" | "typescript" | "java" | "cpp";

export interface Category {
  slug: CategorySlug;
  /** Display name, e.g. "Arrays & Hashing". */
  name: string;
  /** Recommended study order (1 = first). */
  order: number;
  /** Emoji used across the UI and docs. */
  icon: string;
  /** Hex accent color for the UI. */
  color: string;
  /** One-line summary. */
  blurb: string;
  /** Longer description of when the pattern applies. */
  description: string;
  /** Transferable techniques to internalize. */
  keyIdeas: string[];
}

export interface Company {
  slug: string;
  name: string;
  tier: CompanyTier;
  /** Hex brand-ish color for chips. */
  color: string;
}

export interface CodeSolution {
  language: Language;
  /** Optional label, e.g. "Hash Map" or "Optimal". */
  label?: string;
  code: string;
}

export interface WorkedExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface Complexity {
  /** Big-O time, e.g. "O(n)". */
  time: string;
  /** Big-O space, e.g. "O(1)". */
  space: string;
  note?: string;
}

/**
 * How the playground compares a function's actual output to `expected`.
 * - `deep`      strict deep equality (default)
 * - `canonical` deep equality after recursively sorting nested arrays
 *               (order-insensitive — e.g. "return subsets in any order")
 * - `set`       compare top-level arrays as sets of primitives
 * - `approx`    numeric equality within `tolerance`
 */
export type ComparisonMode = "deep" | "canonical" | "set" | "approx";

export interface TestCase {
  /** Short human label, e.g. "duplicates" or "empty input". */
  name?: string;
  /** Positional arguments passed to the entry function, in order. */
  args: unknown[];
  /** Expected return value. */
  expected: unknown;
  /** Override the problem-level comparison mode for this case. */
  comparison?: ComparisonMode;
  /** Numeric tolerance when comparison is "approx". */
  tolerance?: number;
}

/**
 * Everything the in-browser playground needs to execute and grade a solution.
 * Code runs sandboxed inside a Web Worker against {@link Problem.tests}.
 */
export interface RunnerSpec {
  /** Name of the function the test harness invokes, e.g. "twoSum". */
  entry: string;
  /** Editable JavaScript skeleton shown by default (signature + TODO). */
  jsStarter: string;
  /** Full working JavaScript reference the user can load and run. */
  jsReference: string;
  /** Default comparison mode for this problem's tests. */
  comparison?: ComparisonMode;
}

export interface Problem {
  /** Official LeetCode problem number. */
  id: number;
  /** URL-safe identifier, e.g. "two-sum". */
  slug: string;
  title: string;
  difficulty: Difficulty;
  /** Primary pattern bucket. */
  category: CategorySlug;
  /** Finer-grained techniques, e.g. ["Hash Map", "Prefix Sum"]. */
  patterns: string[];
  /** Company slugs (see companies.ts). */
  companies: string[];
  /**
   * Relative 0-100 heuristic of how often this surfaces in 2025-2026
   * interview reports. Higher = ask more, study first.
   */
  frequency: number;
  leetcodeUrl: string;
  premium?: boolean;
  /** Short one/two-line summary used in cards and lists. */
  description: string;
  /**
   * Full, self-contained problem statement in markdown (original wording — a
   * paraphrase, not LeetCode's copyrighted text). Supports inline code and
   * LaTeX. Rendered as the primary problem section on the detail page.
   */
  statement?: string;
  examples: WorkedExample[];
  constraints?: string[];
  /** Markdown: the key insight that unlocks the problem. */
  intuition: string;
  /** Ordered solution steps. */
  approach: string[];
  /** Language-agnostic pseudocode for the core algorithm (rendered as a code block). */
  pseudocode?: string;
  /** Mermaid diagram source (rendered in the web app). */
  diagram?: string;
  complexity: Complexity;
  solutions: CodeSolution[];
  /** Runner spec powering the interactive playground (optional until wired). */
  runner?: RunnerSpec;
  /** Ingested test data the playground grades solutions against. */
  tests?: TestCase[];
  hints?: string[];
  /** Related LeetCode ids for follow-up practice. */
  relatedIds?: number[];
}
