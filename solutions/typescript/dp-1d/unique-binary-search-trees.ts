// LeetCode 96 — Unique Binary Search Trees (Medium)
// Category: 1-D Dynamic Programming · Approach: DP / Catalan
// Time: O(n^2) | Space: O(n)
// Source: https://leetcode.com/problems/unique-binary-search-trees/

function numTrees(n: number): number {
  const dp = new Array<number>(n + 1).fill(0);
  dp[0] = 1;
  for (let k = 1; k <= n; k++)
    for (let i = 1; i <= k; i++)
      dp[k] += dp[i - 1] * dp[k - i];
  return dp[n];
}
