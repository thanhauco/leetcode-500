# LeetCode 322 — Coin Change (Medium)
# Category: 1-D Dynamic Programming · Approach: Bottom-up DP
# Time: O(amount · coins) | Space: O(amount)
# Source: https://leetcode.com/problems/coin-change/

def coin_change(coins: list[int], amount: int) -> int:
    dp = [amount + 1] * (amount + 1)
    dp[0] = 0
    for a in range(1, amount + 1):
        for coin in coins:
            if coin <= a:
                dp[a] = min(dp[a], dp[a - coin] + 1)
    return dp[amount] if dp[amount] <= amount else -1
