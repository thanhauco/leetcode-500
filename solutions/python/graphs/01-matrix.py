# LeetCode 542 — 01 Matrix (Medium)
# Category: Graphs · Approach: Multi-Source BFS
# Time: O(rows * cols) | Space: O(rows * cols)
# Source: https://leetcode.com/problems/01-matrix/

from collections import deque


def update_matrix(mat: list[list[int]]) -> list[list[int]]:
    grid = [row[:] for row in mat]
    rows, cols = len(grid), len(grid[0])
    dist = [[-1] * cols for _ in range(rows)]
    queue: deque[tuple[int, int]] = deque()
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 0:
                dist[r][c] = 0
                queue.append((r, c))

    while queue:
        r, c = queue.popleft()
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and dist[nr][nc] == -1:
                dist[nr][nc] = dist[r][c] + 1
                queue.append((nr, nc))

    return dist
