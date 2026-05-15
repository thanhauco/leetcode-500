// LeetCode 1334 — Find the City With the Smallest Number of Neighbors at a Threshold Distance (Medium)
// Category: Advanced Graphs · Approach: Floyd-Warshall
// Time: O(n^3) | Space: O(n^2)
// Source: https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/

function findTheCity(n: number, edges: number[][], distanceThreshold: number): number {
  const INF = 1e9;
  const d = Array.from({ length: n }, () => new Array(n).fill(INF));
  for (let i = 0; i < n; i++) d[i][i] = 0;
  for (const [u, v, w] of edges) {
    d[u][v] = Math.min(d[u][v], w);
    d[v][u] = Math.min(d[v][u], w);
  }
  for (let k = 0; k < n; k++)
    for (let i = 0; i < n; i++)
      for (let j = 0; j < n; j++)
        if (d[i][k] + d[k][j] < d[i][j]) d[i][j] = d[i][k] + d[k][j];
  let ansCity = -1, ansCount = INF;
  for (let i = 0; i < n; i++) {
    let cnt = 0;
    for (let j = 0; j < n; j++) if (j !== i && d[i][j] <= distanceThreshold) cnt++;
    if (cnt <= ansCount) { ansCount = cnt; ansCity = i; }
  }
  return ansCity;
}
