# LeetCode 463 — Island Perimeter (Easy)
# Category: Graphs · Approach: Edge Counting
# Time: O(rows * cols) | Space: O(1)
# Source: https://leetcode.com/problems/island-perimeter/

def island_perimeter(grid: list[list[int]]) -> int:
    rows, cols = len(grid), len(grid[0])
    perimeter = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 1:
                perimeter += 4
                if r > 0 and grid[r - 1][c] == 1:
                    perimeter -= 2
                if c > 0 and grid[r][c - 1] == 1:
                    perimeter -= 2
    return perimeter
