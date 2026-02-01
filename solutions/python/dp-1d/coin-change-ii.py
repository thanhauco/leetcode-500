# LeetCode 518 — Coin Change II (Medium)
# Category: 1-D Dynamic Programming · Approach: Unbounded Knapsack
# Time: O(amount · k) | Space: O(amount)
# Source: https://leetcode.com/problems/coin-change-ii/

def change(amount: int, coins: list[int]) -> int:
    dp = [0] * (amount + 1)
    dp[0] = 1
    for c in coins:
        for a in range(c, amount + 1):
            dp[a] += dp[a - c]
    return dp[amount]
