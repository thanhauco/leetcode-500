// LeetCode 583 — Delete Operation for Two Strings (Medium)
// Category: 2-D Dynamic Programming · Approach: LCS
// Time: O(n * m) | Space: O(n * m)
// Source: https://leetcode.com/problems/delete-operation-for-two-strings/

function minDistance(word1: string, word2: string): number {
  const n = word1.length, m = word2.length;
  const dp = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (word1[i - 1] === word2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return n + m - 2 * dp[n][m];
}
