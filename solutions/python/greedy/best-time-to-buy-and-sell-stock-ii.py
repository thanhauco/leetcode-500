# LeetCode 122 — Best Time to Buy and Sell Stock II (Medium)
# Category: Greedy · Approach: Sum positive deltas
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/

def max_profit(prices: list[int]) -> int:
    profit = 0
    for i in range(1, len(prices)):
        if prices[i] > prices[i - 1]:
            profit += prices[i] - prices[i - 1]
    return profit
