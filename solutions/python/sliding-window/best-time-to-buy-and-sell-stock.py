# LeetCode 121 — Best Time to Buy and Sell Stock (Easy)
# Category: Sliding Window · Approach: One Pass
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/best-time-to-buy-and-sell-stock/

def max_profit(prices: list[int]) -> int:
    min_price = float("inf")
    best = 0
    for price in prices:
        min_price = min(min_price, price)
        best = max(best, price - min_price)
    return best
