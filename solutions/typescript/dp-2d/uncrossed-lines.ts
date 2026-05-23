// LeetCode 1035 — Uncrossed Lines (Medium)
// Category: 2-D Dynamic Programming · Approach: LCS
// Time: O(n * m) | Space: O(n * m)
// Source: https://leetcode.com/problems/uncrossed-lines/

function maxUncrossedLines(nums1: number[], nums2: number[]): number {
  const n = nums1.length, m = nums2.length;
  const dp = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (nums1[i - 1] === nums2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[n][m];
}
