# LeetCode 417 — Pacific Atlantic Water Flow (Medium)
# Category: Graphs · Approach: Reverse DFS
# Time: O(m·n) | Space: O(m·n)
# Source: https://leetcode.com/problems/pacific-atlantic-water-flow/

def pacific_atlantic(heights: list[list[int]]) -> list[list[int]]:
    if not heights or not heights[0]:
        return []
    rows, cols = len(heights), len(heights[0])
    pac = [[False] * cols for _ in range(rows)]
    atl = [[False] * cols for _ in range(rows)]

    def dfs(r: int, c: int, seen: list[list[bool]], prev: int) -> None:
        if r < 0 or r >= rows or c < 0 or c >= cols or seen[r][c] or heights[r][c] < prev:
            return
        seen[r][c] = True
        h = heights[r][c]
        dfs(r + 1, c, seen, h); dfs(r - 1, c, seen, h)
        dfs(r, c + 1, seen, h); dfs(r, c - 1, seen, h)

    for c in range(cols):
        dfs(0, c, pac, heights[0][c])
        dfs(rows - 1, c, atl, heights[rows - 1][c])
    for r in range(rows):
        dfs(r, 0, pac, heights[r][0])
        dfs(r, cols - 1, atl, heights[r][cols - 1])

    return [[r, c] for r in range(rows) for c in range(cols) if pac[r][c] and atl[r][c]]
