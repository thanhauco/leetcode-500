# LeetCode 309 — Best Time to Buy and Sell Stock with Cooldown (Medium)
# Category: 1-D Dynamic Programming · Approach: State Machine DP
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/

def max_profit(prices: list[int]) -> int:
    hold = float("-inf")
    sold = 0
    rest = 0
    for p in prices:
        prev_sold = sold
        sold = hold + p
        hold = max(hold, rest - p)
        rest = max(rest, prev_sold)
    return int(max(sold, rest))
