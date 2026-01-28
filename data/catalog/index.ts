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
import { batchA } from "./batchA.ts";
import { batchB } from "./batchB.ts";
import { batchC } from "./batchC.ts";
import { batchD } from "./batchD.ts";
import { batchE } from "./batchE.ts";
import { batchF } from "./batchF.ts";
import { batchG } from "./batchG.ts";
import { batchH } from "./batchH.ts";

export const catalogProblems: Problem[] = [
  ...batchA,
  ...batchB,
  ...batchC,
  ...batchD,
  ...batchE,
  ...batchF,
  ...batchG,
  ...batchH,
];
