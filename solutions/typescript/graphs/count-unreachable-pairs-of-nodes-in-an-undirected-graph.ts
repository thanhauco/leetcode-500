// LeetCode 2316 — Count Unreachable Pairs of Nodes in an Undirected Graph (Medium)
// Category: Graphs · Approach: Union Find
// Time: O(n + e α(n)) | Space: O(n)
// Source: https://leetcode.com/problems/count-unreachable-pairs-of-nodes-in-an-undirected-graph/

function countPairs(n: number, edges: number[][]): number {
  const parent = Array.from({ length: n }, (_, i) => i);
  const size = new Array(n).fill(1);
  const find = (x: number): number => {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  };
  for (const [a, b] of edges) {
    const ra = find(a), rb = find(b);
    if (ra !== rb) {
      parent[ra] = rb;
      size[rb] += size[ra];
    }
  }
  let total = 0;
  for (let i = 0; i < n; i++) {
    if (find(i) === i) total += size[i] * (n - size[i]);
  }
  return total / 2;
}
