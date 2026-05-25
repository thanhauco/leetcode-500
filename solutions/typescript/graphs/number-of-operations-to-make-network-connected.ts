// LeetCode 1319 — Number of Operations to Make Network Connected (Medium)
// Category: Graphs · Approach: Union Find
// Time: O(n + e α(n)) | Space: O(n)
// Source: https://leetcode.com/problems/number-of-operations-to-make-network-connected/

function makeConnected(n: number, connections: number[][]): number {
  if (connections.length < n - 1) return -1;
  const parent = Array.from({ length: n }, (_, i) => i);
  const find = (x: number): number => {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  };
  let comp = n;
  for (const [a, b] of connections) {
    const ra = find(a), rb = find(b);
    if (ra !== rb) {
      parent[ra] = rb;
      comp--;
    }
  }
  return comp - 1;
}
