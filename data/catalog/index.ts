import type { Problem } from "../types.ts";

/**
 * Catalog tier — broader problem coverage generated in validated batches.
 * Each batch file exports an array of `Problem`; they are concatenated here and
 * merged with the curated core in `data/index.ts` (curated wins on id collision).
 *
 * Every catalog entry ships working Python + TypeScript solutions, and (where the
 * I/O is JSON-friendly) a runnable `runner` + `tests` that the verifier executes.
 */
// Batch imports are wired in here as each validated batch lands.
export const catalogProblems: Problem[] = [];
