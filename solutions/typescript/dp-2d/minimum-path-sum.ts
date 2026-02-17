// LeetCode 64 — Minimum Path Sum (Medium)
// Category: 2-D Dynamic Programming · Approach: Rolling Row DP
// Time: O(m · n) | Space: O(n)
// Source: https://leetcode.com/problems/minimum-path-sum/

function minPathSum(grid: number[][]): number {
  const m = grid.length, n = grid[0].length;
  const dp = grid[0].slice();
  for (let j = 1; j < n; j++) dp[j] += dp[j - 1];
  for (let i = 1; i < m; i++) {
    dp[0] += grid[i][0];
    for (let j = 1; j < n; j++) {
      dp[j] = grid[i][j] + Math.min(dp[j], dp[j - 1]);
    }
  }
  return dp[n - 1];
}
