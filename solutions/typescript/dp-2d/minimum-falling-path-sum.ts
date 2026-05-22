// LeetCode 931 — Minimum Falling Path Sum (Medium)
// Category: 2-D Dynamic Programming · Approach: Rolling Row DP
// Time: O(n^2) | Space: O(n)
// Source: https://leetcode.com/problems/minimum-falling-path-sum/

function minFallingPathSum(matrix: number[][]): number {
  const n = matrix.length;
  let dp = matrix[0].slice();
  for (let i = 1; i < n; i++) {
    const cur = new Array<number>(n);
    for (let j = 0; j < n; j++) {
      let best = dp[j];
      if (j > 0) best = Math.min(best, dp[j - 1]);
      if (j < n - 1) best = Math.min(best, dp[j + 1]);
      cur[j] = matrix[i][j] + best;
    }
    dp = cur;
  }
  return Math.min(...dp);
}
