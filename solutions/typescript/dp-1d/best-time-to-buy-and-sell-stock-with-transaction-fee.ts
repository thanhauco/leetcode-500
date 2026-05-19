// LeetCode 714 — Best Time to Buy and Sell Stock with Transaction Fee (Medium)
// Category: 1-D Dynamic Programming · Approach: State Machine
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/

function maxProfit(prices: number[], fee: number): number {
  let cash = 0;
  let hold = -prices[0];
  for (let i = 1; i < prices.length; i++) {
    cash = Math.max(cash, hold + prices[i] - fee);
    hold = Math.max(hold, cash - prices[i]);
  }
  return cash;
}
