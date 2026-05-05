# LeetCode 1025 — Divisor Game (Easy)
# Category: 1-D Dynamic Programming · Approach: Bottom-up DP
# Time: O(n^2) | Space: O(n)
# Source: https://leetcode.com/problems/divisor-game/

def divisor_game(n: int) -> bool:
    dp = [False] * (n + 1)
    for i in range(2, n + 1):
        for x in range(1, i):
            if i % x == 0 and not dp[i - x]:
                dp[i] = True
                break
    return dp[n]
