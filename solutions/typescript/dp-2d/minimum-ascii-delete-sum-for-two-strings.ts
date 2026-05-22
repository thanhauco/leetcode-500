// LeetCode 712 — Minimum ASCII Delete Sum for Two Strings (Medium)
// Category: 2-D Dynamic Programming · Approach: Weighted LCS
// Time: O(n * m) | Space: O(n * m)
// Source: https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings/

function minimumDeleteSum(s1: string, s2: string): number {
  const n = s1.length, m = s2.length;
  const dp = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0));
  for (let i = 1; i <= n; i++) dp[i][0] = dp[i - 1][0] + s1.charCodeAt(i - 1);
  for (let j = 1; j <= m; j++) dp[0][j] = dp[0][j - 1] + s2.charCodeAt(j - 1);
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (s1[i - 1] === s2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
      else dp[i][j] = Math.min(dp[i - 1][j] + s1.charCodeAt(i - 1), dp[i][j - 1] + s2.charCodeAt(j - 1));
    }
  }
  return dp[n][m];
}
