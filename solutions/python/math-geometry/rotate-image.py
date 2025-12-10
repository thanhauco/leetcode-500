# LeetCode 48 — Rotate Image (Medium)
# Category: Math & Geometry · Approach: Transpose + Reverse
# Time: O(n²) | Space: O(1)
# Source: https://leetcode.com/problems/rotate-image/

def rotate(matrix: list[list[int]]) -> None:
    n = len(matrix)
    for i in range(n):
        for j in range(i + 1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    for row in matrix:
        row.reverse()
