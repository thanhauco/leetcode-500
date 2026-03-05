# LeetCode 120 — Triangle (Medium)
# Category: 2-D Dynamic Programming · Approach: Bottom-Up DP
# Time: O(n^2) | Space: O(n)
# Source: https://leetcode.com/problems/triangle/

def minimum_total(triangle: list[list[int]]) -> int:
    dp = list(triangle[-1])
    for r in range(len(triangle) - 2, -1, -1):
        for c in range(r + 1):
            dp[c] = triangle[r][c] + min(dp[c], dp[c + 1])
    return dp[0]
