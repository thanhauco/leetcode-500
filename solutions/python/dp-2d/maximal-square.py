# LeetCode 221 — Maximal Square (Medium)
# Category: 2-D Dynamic Programming · Approach: 2-D DP
# Time: O(rows * cols) | Space: O(rows * cols)
# Source: https://leetcode.com/problems/maximal-square/

def maximal_square(matrix: list[list[str]]) -> int:
    rows, cols = len(matrix), len(matrix[0])
    dp = [[0] * (cols + 1) for _ in range(rows + 1)]
    best = 0
    for i in range(1, rows + 1):
        for j in range(1, cols + 1):
            if matrix[i - 1][j - 1] == "1":
                dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
                best = max(best, dp[i][j])
    return best * best
