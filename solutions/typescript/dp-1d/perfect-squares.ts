// LeetCode 279 — Perfect Squares (Medium)
// Category: 1-D Dynamic Programming · Approach: DP
// Time: O(n·√n) | Space: O(n)
// Source: https://leetcode.com/problems/perfect-squares/

function numSquares(n: number): number {
  const dp = new Array<number>(n + 1).fill(Infinity);
  dp[0] = 0;
  for (let x = 1; x <= n; x++)
    for (let s = 1; s * s <= x; s++)
      dp[x] = Math.min(dp[x], dp[x - s * s] + 1);
  return dp[n];
}
