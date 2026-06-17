// LeetCode 323 — Number of Connected Components in an Undirected Graph (Medium)
// Category: Graphs · Approach: Union-Find
// Time: O(n + E · α(n)) | Space: O(n)
// Source: https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/

function countComponents(n: number, edges: number[][]): number {
  const parent = Array.from({ length: n }, (_, i) => i);
  const find = (x: number): number => {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  };
  let count = n;
  for (const [a, b] of edges) {
    const ra = find(a), rb = find(b);
    if (ra !== rb) {
      parent[ra] = rb;
      count--;
    }
  }
  return count;
}
