// LeetCode 343 — Integer Break (Medium)
// Category: 1-D Dynamic Programming · Approach: DP
// Time: O(n^2) | Space: O(n)
// Source: https://leetcode.com/problems/integer-break/

function integerBreak(n: number): number {
  const dp = new Array<number>(n + 1).fill(0);
  dp[1] = 1;
  for (let x = 2; x <= n; x++)
    for (let j = 1; j < x; j++)
      dp[x] = Math.max(dp[x], j * (x - j), j * dp[x - j]);
  return dp[n];
}
