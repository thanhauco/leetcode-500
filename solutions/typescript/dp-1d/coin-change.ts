// LeetCode 322 — Coin Change (Medium)
// Category: 1-D Dynamic Programming · Approach: Bottom-up DP
// Time: O(amount · coins) | Space: O(amount)
// Source: https://leetcode.com/problems/coin-change/

function coinChange(coins: number[], amount: number): number {
  const dp = new Array<number>(amount + 1).fill(amount + 1);
  dp[0] = 0;
  for (let a = 1; a <= amount; a++) {
    for (const coin of coins) {
      if (coin <= a) dp[a] = Math.min(dp[a], dp[a - coin] + 1);
    }
  }
  return dp[amount] > amount ? -1 : dp[amount];
}
