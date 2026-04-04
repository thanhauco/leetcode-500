# LeetCode 1162 — As Far from Land as Possible (Medium)
# Category: Graphs · Approach: Multi-source BFS
# Time: O(n^2) | Space: O(n^2)
# Source: https://leetcode.com/problems/as-far-from-land-as-possible/

from collections import deque


def max_distance(grid: list[list[int]]) -> int:
    n, m = len(grid), len(grid[0])
    grid = [row[:] for row in grid]
    q = deque()
    for r in range(n):
        for c in range(m):
            if grid[r][c] == 1:
                q.append((r, c, 0))
    if not q or len(q) == n * m:
        return -1
    ans = 0
    while q:
        r, c, d = q.popleft()
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr, nc = r + dr, c + dc
            if 0 <= nr < n and 0 <= nc < m and grid[nr][nc] == 0:
                grid[nr][nc] = 1
                ans = d + 1
                q.append((nr, nc, d + 1))
    return ans
