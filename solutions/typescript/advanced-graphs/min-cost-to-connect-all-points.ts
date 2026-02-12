// LeetCode 1584 — Min Cost to Connect All Points (Medium)
// Category: Advanced Graphs · Approach: Prim's MST
// Time: O(n^2) | Space: O(n)
// Source: https://leetcode.com/problems/min-cost-to-connect-all-points/

function minCostConnectPoints(points: number[][]): number {
  const n = points.length;
  if (n <= 1) return 0;
  const inMST = new Array(n).fill(false);
  const dist = new Array(n).fill(Infinity);
  dist[0] = 0;
  let total = 0;
  for (let k = 0; k < n; k++) {
    let u = -1;
    for (let i = 0; i < n; i++) {
      if (!inMST[i] && (u === -1 || dist[i] < dist[u])) u = i;
    }
    inMST[u] = true;
    total += dist[u];
    for (let v = 0; v < n; v++) {
      if (!inMST[v]) {
        const d =
          Math.abs(points[u][0] - points[v][0]) +
          Math.abs(points[u][1] - points[v][1]);
        if (d < dist[v]) dist[v] = d;
      }
    }
  }
  return total;
}
