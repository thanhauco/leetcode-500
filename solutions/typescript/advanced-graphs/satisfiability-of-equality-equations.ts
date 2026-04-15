// LeetCode 990 — Satisfiability of Equality Equations (Medium)
// Category: Advanced Graphs · Approach: Union-Find
// Time: O(n·α(26)) | Space: O(1)
// Source: https://leetcode.com/problems/satisfiability-of-equality-equations/

function equationsPossible(equations: string[]): boolean {
  const parent: Record<string, string> = {};
  const find = (x: string): string => {
    if (parent[x] === undefined) parent[x] = x;
    while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; }
    return x;
  };
  for (const eq of equations)
    if (eq[1] === "=") parent[find(eq[0])] = find(eq[3]);
  for (const eq of equations)
    if (eq[1] === "!" && find(eq[0]) === find(eq[3])) return false;
  return true;
}
