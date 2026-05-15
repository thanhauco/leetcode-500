// LeetCode 1135 — Connecting Cities With Minimum Cost (Medium)
// Category: Advanced Graphs · Approach: Kruskal MST
// Time: O(e log e) | Space: O(n)
// Source: https://leetcode.com/problems/connecting-cities-with-minimum-cost/

function minimumCost(n: number, connections: number[][]): number {
  const parent = Array.from({ length: n + 1 }, (_, i) => i);
  const find = (x: number): number => {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  };
  const sorted = connections.slice().sort((a, b) => a[2] - b[2]);
  let total = 0, used = 0;
  for (const [a, b, c] of sorted) {
    const ra = find(a), rb = find(b);
    if (ra !== rb) {
      parent[ra] = rb;
      total += c;
      used++;
    }
  }
  return used === n - 1 ? total : -1;
}
