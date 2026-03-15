// LeetCode 684 — Redundant Connection (Medium)
// Category: Advanced Graphs · Approach: Union-Find
// Time: O(n * α(n)) | Space: O(n)
// Source: https://leetcode.com/problems/redundant-connection/

function findRedundantConnection(edges: number[][]): number[] {
  const n = edges.length;
  const parent = Array.from({ length: n + 1 }, (_, i) => i);
  const find = (x: number): number => {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  };
  for (const [u, v] of edges) {
    const ru = find(u);
    const rv = find(v);
    if (ru === rv) return [u, v];
    parent[ru] = rv;
  }
  return [];
}
