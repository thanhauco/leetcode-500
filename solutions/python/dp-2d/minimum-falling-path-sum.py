# LeetCode 931 — Minimum Falling Path Sum (Medium)
# Category: 2-D Dynamic Programming · Approach: Rolling Row DP
# Time: O(n^2) | Space: O(n)
# Source: https://leetcode.com/problems/minimum-falling-path-sum/

def min_falling_path_sum(matrix: list[list[int]]) -> int:
    n = len(matrix)
    dp = matrix[0][:]
    for i in range(1, n):
        cur = [0] * n
        for j in range(n):
            best = dp[j]
            if j > 0:
                best = min(best, dp[j - 1])
            if j < n - 1:
                best = min(best, dp[j + 1])
            cur[j] = matrix[i][j] + best
        dp = cur
    return min(dp)
