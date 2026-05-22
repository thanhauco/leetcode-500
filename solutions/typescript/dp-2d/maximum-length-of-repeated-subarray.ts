// LeetCode 718 — Maximum Length of Repeated Subarray (Medium)
// Category: 2-D Dynamic Programming · Approach: Grid DP
// Time: O(n * m) | Space: O(n * m)
// Source: https://leetcode.com/problems/maximum-length-of-repeated-subarray/

function findLength(a: number[], b: number[]): number {
  const n = a.length, m = b.length;
  const dp = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0));
  let best = 0;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        best = Math.max(best, dp[i][j]);
      }
    }
  }
  return best;
}
