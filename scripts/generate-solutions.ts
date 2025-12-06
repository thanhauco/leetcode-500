/**
 * Generates standalone reference solution files under /solutions from the
 * single-source-of-truth dataset, so the repo is browsable without the web app.
 *
 * Run with:  npm run gen:solutions   (uses Node's built-in TS type stripping)
 */
import { mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { categoryBySlug, problems } from "../data/index.ts";
import type { Language } from "../data/types.ts";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const outDir = join(root, "solutions");

const ext: Record<Language, string> = {
  python: "py",
  typescript: "ts",
  java: "java",
  cpp: "cpp",
};

const comment: Record<Language, (s: string) => string> = {
  python: (s) => `# ${s}`,
  typescript: (s) => `// ${s}`,
  java: (s) => `// ${s}`,
  cpp: (s) => `// ${s}`,
};

function header(lang: Language, lines: string[]): string {
  return lines.map((l) => comment[lang](l)).join("\n") + "\n\n";
}

async function main() {
  await rm(outDir, { recursive: true, force: true });

  let count = 0;
  const indexRows: string[] = [];

  for (const p of [...problems].sort((a, b) => a.id - b.id)) {
    const category = categoryBySlug[p.category];
    indexRows.push(
      `| ${p.id} | [${p.title}](${p.leetcodeUrl}) | ${p.difficulty} | ${category?.icon ?? ""} ${category?.name ?? p.category} | \`${p.complexity.time}\` / \`${p.complexity.space}\` |`,
    );

    for (const sol of p.solutions) {
      const folder = join(outDir, sol.language, p.category);
      await mkdir(folder, { recursive: true });
      const meta = header(sol.language, [
        `LeetCode ${p.id} — ${p.title} (${p.difficulty})`,
        `Category: ${category?.name ?? p.category}${sol.label ? ` · Approach: ${sol.label}` : ""}`,
        `Time: ${p.complexity.time} | Space: ${p.complexity.space}`,
        `Source: ${p.leetcodeUrl}`,
      ]);
      await writeFile(join(folder, `${p.slug}.${ext[sol.language]}`), meta + sol.code + "\n");
      count++;
    }
  }

  const readme = `# Reference solutions

Auto-generated from [\`data/problems.ts\`](../data/problems.ts) — **do not edit by hand**.
Regenerate with \`npm run gen:solutions\`.

Organized as \`solutions/<language>/<category>/<slug>.<ext>\`.

| # | Problem | Difficulty | Category | Time / Space |
| --- | --- | --- | --- | --- |
${indexRows.join("\n")}
`;
  await writeFile(join(outDir, "README.md"), readme);

  console.log(`Generated ${count} solution files for ${problems.length} problems.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
