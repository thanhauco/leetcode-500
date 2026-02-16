// LeetCode 309 — Best Time to Buy and Sell Stock with Cooldown (Medium)
// Category: 1-D Dynamic Programming · Approach: State Machine DP
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/

function maxProfit(prices: number[]): number {
  let hold = -Infinity, sold = 0, rest = 0;
  for (const p of prices) {
    const prevSold = sold;
    sold = hold + p;
    hold = Math.max(hold, rest - p);
    rest = Math.max(rest, prevSold);
  }
  return Math.max(sold, rest);
}
