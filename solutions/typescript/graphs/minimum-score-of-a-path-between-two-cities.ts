// LeetCode 2492 — Minimum Score of a Path Between Two Cities (Medium)
// Category: Graphs · Approach: BFS
// Time: O(n + e) | Space: O(n + e)
// Source: https://leetcode.com/problems/minimum-score-of-a-path-between-two-cities/

function minScore(n: number, roads: number[][]): number {
  const adj: [number, number][][] = Array.from({ length: n + 1 }, () => []);
  for (const [a, b, d] of roads) {
    adj[a].push([b, d]);
    adj[b].push([a, d]);
  }
  const seen = new Array(n + 1).fill(false);
  seen[1] = true;
  const stack = [1];
  let best = Infinity;
  while (stack.length) {
    const u = stack.pop()!;
    for (const [v, d] of adj[u]) {
      best = Math.min(best, d);
      if (!seen[v]) {
        seen[v] = true;
        stack.push(v);
      }
    }
  }
  return best;
}
