# LeetCode 1254 — Number of Closed Islands (Medium)
# Category: Graphs · Approach: Border flood fill
# Time: O(m·n) | Space: O(m·n)
# Source: https://leetcode.com/problems/number-of-closed-islands/

def closed_island(grid: list[list[int]]) -> int:
    g = [row[:] for row in grid]
    m, n = len(g), len(g[0])

    def flood(r: int, c: int) -> None:
        if r < 0 or r >= m or c < 0 or c >= n or g[r][c] != 0:
            return
        g[r][c] = 1
        flood(r + 1, c)
        flood(r - 1, c)
        flood(r, c + 1)
        flood(r, c - 1)

    for i in range(m):
        flood(i, 0)
        flood(i, n - 1)
    for j in range(n):
        flood(0, j)
        flood(m - 1, j)

    count = 0
    for i in range(m):
        for j in range(n):
            if g[i][j] == 0:
                count += 1
                flood(i, j)
    return count
