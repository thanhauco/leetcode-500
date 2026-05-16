// LeetCode 1129 — Shortest Path with Alternating Colors (Medium)
// Category: Advanced Graphs · Approach: State BFS
// Time: O(n + e) | Space: O(n + e)
// Source: https://leetcode.com/problems/shortest-path-with-alternating-colors/

function shortestAlternatingPaths(n: number, redEdges: number[][], blueEdges: number[][]): number[] {
  const adj: [number[], number[]][] = Array.from({ length: n }, () => [[], []]);
  for (const [u, v] of redEdges) adj[u][0].push(v);
  for (const [u, v] of blueEdges) adj[u][1].push(v);
  const INF = Infinity;
  const dist: [number, number][] = Array.from({ length: n }, () => [INF, INF]);
  dist[0] = [0, 0];
  const q: [number, number][] = [[0, 0], [0, 1]];
  let head = 0;
  while (head < q.length) {
    const [node, last] = q[head++];
    const nxt = last ^ 1;
    for (const nb of adj[node][nxt]) {
      if (dist[nb][nxt] === INF) {
        dist[nb][nxt] = dist[node][last] + 1;
        q.push([nb, nxt]);
      }
    }
  }
  return dist.map(([a, b]) => (Math.min(a, b) === INF ? -1 : Math.min(a, b)));
}
