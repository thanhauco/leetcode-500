# LeetCode 695 — Max Area of Island (Medium)
# Category: Graphs · Approach: DFS
# Time: O(m·n) | Space: O(m·n)
# Source: https://leetcode.com/problems/max-area-of-island/

def max_area_of_island(grid: list[list[int]]) -> int:
    rows, cols = len(grid), len(grid[0]) if grid else 0

    def dfs(r: int, c: int) -> int:
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != 1:
            return 0
        grid[r][c] = 0
        return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1)

    best = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 1:
                best = max(best, dfs(r, c))
    return best
