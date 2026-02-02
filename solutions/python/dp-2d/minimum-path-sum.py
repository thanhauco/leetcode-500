# LeetCode 64 — Minimum Path Sum (Medium)
# Category: 2-D Dynamic Programming · Approach: Rolling Row DP
# Time: O(m · n) | Space: O(n)
# Source: https://leetcode.com/problems/minimum-path-sum/

def min_path_sum(grid: list[list[int]]) -> int:
    m, n = len(grid), len(grid[0])
    dp = grid[0][:]
    for j in range(1, n):
        dp[j] += dp[j - 1]
    for i in range(1, m):
        dp[0] += grid[i][0]
        for j in range(1, n):
            dp[j] = grid[i][j] + min(dp[j], dp[j - 1])
    return dp[n - 1]
