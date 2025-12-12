// LeetCode 743 — Network Delay Time (Medium)
// Category: Advanced Graphs · Approach: Dijkstra
// Time: O(E log V) | Space: O(V + E)
// Source: https://leetcode.com/problems/network-delay-time/

function networkDelayTime(times: number[][], n: number, k: number): number {
  const adj: number[][][] = Array.from({ length: n + 1 }, () => []);
  for (const [u, v, w] of times) adj[u].push([v, w]);
  const dist = new Array<number>(n + 1).fill(Infinity);
  dist[k] = 0;
  const pq: [number, number][] = [[0, k]];
  while (pq.length) {
    let mi = 0;
    for (let i = 1; i < pq.length; i++) if (pq[i][0] < pq[mi][0]) mi = i;
    const [d, u] = pq.splice(mi, 1)[0];
    if (d > dist[u]) continue;
    for (const [v, w] of adj[u])
      if (d + w < dist[v]) { dist[v] = d + w; pq.push([dist[v], v]); }
  }
  let ans = 0;
  for (let i = 1; i <= n; i++) ans = Math.max(ans, dist[i]);
  return ans === Infinity ? -1 : ans;
}
