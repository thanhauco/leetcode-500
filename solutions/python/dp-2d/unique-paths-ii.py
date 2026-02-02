# LeetCode 63 — Unique Paths II (Medium)
# Category: 2-D Dynamic Programming · Approach: Rolling Row DP
# Time: O(m · n) | Space: O(n)
# Source: https://leetcode.com/problems/unique-paths-ii/

def unique_paths_with_obstacles(grid: list[list[int]]) -> int:
    m, n = len(grid), len(grid[0])
    dp = [0] * n
    dp[0] = 0 if grid[0][0] == 1 else 1
    for i in range(m):
        for j in range(n):
            if grid[i][j] == 1:
                dp[j] = 0
            elif j > 0:
                dp[j] += dp[j - 1]
    return dp[n - 1]
