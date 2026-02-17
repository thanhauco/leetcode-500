// LeetCode 1466 — Reorder Routes to Make All Paths Lead to the City Zero (Medium)
// Category: Graphs · Approach: DFS from 0
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/

function minReorder(n: number, connections: number[][]): number {
  const adj: Array<Array<[number, number]>> = Array.from({ length: n }, () => []);
  for (const [a, b] of connections) {
    adj[a].push([b, 1]);
    adj[b].push([a, 0]);
  }
  const visited = new Array<boolean>(n).fill(false);
  let flips = 0;
  const dfs = (city: number): void => {
    visited[city] = true;
    for (const [nei, cost] of adj[city]) {
      if (!visited[nei]) {
        flips += cost;
        dfs(nei);
      }
    }
  };
  dfs(0);
  return flips;
}
