// LeetCode 121 — Best Time to Buy and Sell Stock (Easy)
// Category: Sliding Window · Approach: One Pass
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/best-time-to-buy-and-sell-stock/

function maxProfit(prices: number[]): number {
  let minPrice = Infinity, best = 0;
  for (const price of prices) {
    minPrice = Math.min(minPrice, price);
    best = Math.max(best, price - minPrice);
  }
  return best;
}
