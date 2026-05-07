# LeetCode 174 — Dungeon Game (Hard)
# Category: 2-D Dynamic Programming · Approach: Backward Grid DP
# Time: O(n * m) | Space: O(n * m)
# Source: https://leetcode.com/problems/dungeon-game/

def calculate_minimum_hp(dungeon: list[list[int]]) -> int:
    n, m = len(dungeon), len(dungeon[0])
    dp = [[float("inf")] * (m + 1) for _ in range(n + 1)]
    dp[n][m - 1] = 1
    dp[n - 1][m] = 1
    for i in range(n - 1, -1, -1):
        for j in range(m - 1, -1, -1):
            need = min(dp[i + 1][j], dp[i][j + 1]) - dungeon[i][j]
            dp[i][j] = 1 if need <= 0 else need
    return dp[0][0]
