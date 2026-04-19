// LeetCode 122 — Best Time to Buy and Sell Stock II (Medium)
// Category: Greedy · Approach: Sum positive deltas
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/

function maxProfit(prices: number[]): number {
  let profit = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];
  }
  return profit;
}
