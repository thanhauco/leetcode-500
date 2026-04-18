// LeetCode 516 — Longest Palindromic Subsequence (Medium)
// Category: 2-D Dynamic Programming · Approach: Interval DP
// Time: O(n^2) | Space: O(n^2)
// Source: https://leetcode.com/problems/longest-palindromic-subsequence/

function longestPalindromeSubseq(s: string): number {
  const n = s.length;
  const dp = Array.from({ length: n }, () => new Array<number>(n).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    dp[i][i] = 1;
    for (let j = i + 1; j < n; j++) {
      if (s[i] === s[j]) dp[i][j] = dp[i + 1][j - 1] + 2;
      else dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
    }
  }
  return dp[0][n - 1];
}
