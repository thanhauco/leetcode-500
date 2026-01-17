// LeetCode 139 — Word Break (Medium)
// Category: 1-D Dynamic Programming · Approach: DP
// Time: O(n^2) | Space: O(n)
// Source: https://leetcode.com/problems/word-break/

function wordBreak(s: string, wordDict: string[]): boolean {
  const words = new Set(wordDict);
  const n = s.length;
  const dp = new Array(n + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && words.has(s.slice(j, i))) { dp[i] = true; break; }
    }
  }
  return dp[n];
}
