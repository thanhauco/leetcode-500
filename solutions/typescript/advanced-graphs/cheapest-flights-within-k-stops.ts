// LeetCode 787 — Cheapest Flights Within K Stops (Medium)
// Category: Advanced Graphs · Approach: Bellman-Ford
// Time: O(k · E) | Space: O(n)
// Source: https://leetcode.com/problems/cheapest-flights-within-k-stops/

function findCheapestPrice(
  n: number,
  flights: number[][],
  src: number,
  dst: number,
  k: number,
): number {
  let dist = new Array(n).fill(Infinity);
  dist[src] = 0;
  for (let i = 0; i <= k; i++) {
    const next = dist.slice();
    for (const [u, v, w] of flights) {
      if (dist[u] !== Infinity && dist[u] + w < next[v]) {
        next[v] = dist[u] + w;
      }
    }
    dist = next;
  }
  return dist[dst] === Infinity ? -1 : dist[dst];
}
