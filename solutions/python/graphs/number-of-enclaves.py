# LeetCode 1020 — Number of Enclaves (Medium)
# Category: Graphs · Approach: Border flood fill
# Time: O(m·n) | Space: O(m·n)
# Source: https://leetcode.com/problems/number-of-enclaves/

def num_enclaves(grid: list[list[int]]) -> int:
    g = [row[:] for row in grid]
    m, n = len(g), len(g[0])

    def dfs(r: int, c: int) -> None:
        if r < 0 or r >= m or c < 0 or c >= n or g[r][c] == 0:
            return
        g[r][c] = 0
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)

    for i in range(m):
        dfs(i, 0)
        dfs(i, n - 1)
    for j in range(n):
        dfs(0, j)
        dfs(m - 1, j)

    return sum(cell for row in g for cell in row)
