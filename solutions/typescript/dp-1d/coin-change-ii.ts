// LeetCode 518 — Coin Change II (Medium)
// Category: 1-D Dynamic Programming · Approach: Unbounded Knapsack
// Time: O(amount · k) | Space: O(amount)
// Source: https://leetcode.com/problems/coin-change-ii/

function change(amount: number, coins: number[]): number {
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1;
  for (const c of coins) {
    for (let a = c; a <= amount; a++) {
      dp[a] += dp[a - c];
    }
  }
  return dp[amount];
}
