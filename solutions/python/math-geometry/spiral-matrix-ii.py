# LeetCode 59 — Spiral Matrix II (Medium)
# Category: Math & Geometry · Approach: Boundary Simulation
# Time: O(n^2) | Space: O(1)
# Source: https://leetcode.com/problems/spiral-matrix-ii/

def generate_matrix(n: int) -> list[list[int]]:
    grid = [[0] * n for _ in range(n)]
    top, bottom, left, right = 0, n - 1, 0, n - 1
    val = 1
    while top <= bottom and left <= right:
        for c in range(left, right + 1):
            grid[top][c] = val
            val += 1
        top += 1
        for r in range(top, bottom + 1):
            grid[r][right] = val
            val += 1
        right -= 1
        for c in range(right, left - 1, -1):
            grid[bottom][c] = val
            val += 1
        bottom -= 1
        for r in range(bottom, top - 1, -1):
            grid[r][left] = val
            val += 1
        left += 1
    return grid
