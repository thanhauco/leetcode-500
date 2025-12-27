/**
 * Verifies that every problem's runnable reference solution passes its own tests.
 * Mirrors the playground's comparison logic so "verified here" == "passes in the app".
 *
 * Run with:  npm run verify
 * Exits non-zero (and lists failures) if any reference solution fails a test.
 */
import { problems } from "../data/index.ts";

type Mode = "deep" | "canonical" | "set" | "approx";

function canonical(x: unknown): unknown {
  if (Array.isArray(x)) {
    const arr = x.map(canonical);
    arr.sort((a, b) => {
      const as = JSON.stringify(a);
      const bs = JSON.stringify(b);
      return as < bs ? -1 : as > bs ? 1 : 0;
    });
    return arr;
  }
  return x;
}

function approxEqual(a: unknown, b: unknown, tol = 1e-6): boolean {
  if (typeof a === "number" && typeof b === "number") return Math.abs(a - b) <= tol;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((v, i) => approxEqual(v, b[i], tol));
  }
  return JSON.stringify(a) === JSON.stringify(b);
}

function equal(actual: unknown, expected: unknown, mode: Mode, tol?: number): boolean {
  if (mode === "approx") return approxEqual(actual, expected, tol);
  if (mode === "canonical" || mode === "set") {
    return JSON.stringify(canonical(actual)) === JSON.stringify(canonical(expected));
  }
  return JSON.stringify(actual) === JSON.stringify(expected);
}

function clone<T>(x: T): T {
  try {
    return structuredClone(x);
  } catch {
    return JSON.parse(JSON.stringify(x));
  }
}

let withRunner = 0;
let verified = 0;
const failures: string[] = [];

for (const p of problems) {
  if (!p.runner || !p.tests || p.tests.length === 0) continue;
  withRunner++;

  let fn: ((...args: unknown[]) => unknown) | undefined;
  try {
    fn = new Function(
      `${p.runner.jsReference}\nreturn typeof ${p.runner.entry} === "function" ? ${p.runner.entry} : undefined;`,
    )() as typeof fn;
  } catch (err) {
    failures.push(`#${p.id} ${p.slug}: compile error — ${(err as Error).message}`);
    continue;
  }
  if (typeof fn !== "function") {
    failures.push(`#${p.id} ${p.slug}: entry "${p.runner.entry}" not found`);
    continue;
  }

  let ok = true;
  for (const t of p.tests) {
    const args = Array.isArray(t.args) ? t.args.map(clone) : [];
    let out: unknown;
    try {
      out = fn(...args);
    } catch (err) {
      ok = false;
      failures.push(`#${p.id} ${p.slug} [${t.name ?? "case"}]: threw — ${(err as Error).message}`);
      continue;
    }
    const mode = (t.comparison ?? p.runner.comparison ?? "deep") as Mode;
    if (!equal(out, t.expected, mode, t.tolerance)) {
      ok = false;
      failures.push(
        `#${p.id} ${p.slug} [${t.name ?? "case"}]: expected ${JSON.stringify(t.expected)} got ${JSON.stringify(out)}`,
      );
    }
  }
  if (ok) verified++;
}

console.log(`\nProblems: ${problems.length} total | ${withRunner} with runnable tests`);
console.log(`Verified: ${verified}/${withRunner} reference solutions pass all their tests`);

if (failures.length) {
  console.log(`\n${failures.length} FAILURE(S):`);
  for (const f of failures) console.log("  ✗", f);
  process.exit(1);
}
console.log("All runnable reference solutions pass. ✓\n");
