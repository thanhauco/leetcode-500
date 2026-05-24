// LeetCode 1615 — Maximal Network Rank (Medium)
// Category: Graphs · Approach: Degree + Adjacency
// Time: O(n^2 + e) | Space: O(n^2)
// Source: https://leetcode.com/problems/maximal-network-rank/

function maximalNetworkRank(n: number, roads: number[][]): number {
  const deg = new Array(n).fill(0);
  const connected: boolean[][] = Array.from({ length: n }, () => new Array(n).fill(false));
  for (const [a, b] of roads) {
    deg[a]++; deg[b]++;
    connected[a][b] = connected[b][a] = true;
  }
  let ans = 0;
  for (let i = 0; i < n; i++)
    for (let j = i + 1; j < n; j++) {
      const rank = deg[i] + deg[j] - (connected[i][j] ? 1 : 0);
      ans = Math.max(ans, rank);
    }
  return ans;
}
