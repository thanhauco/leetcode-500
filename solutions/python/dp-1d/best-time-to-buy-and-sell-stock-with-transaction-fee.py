# LeetCode 714 — Best Time to Buy and Sell Stock with Transaction Fee (Medium)
# Category: 1-D Dynamic Programming · Approach: State Machine
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/

def max_profit(prices: list[int], fee: int) -> int:
    cash, hold = 0, -prices[0]
    for p in prices[1:]:
        cash = max(cash, hold + p - fee)
        hold = max(hold, cash - p)
    return cash
