# LeetCode 994 — Rotting Oranges (Medium)
# Category: Graphs · Approach: Multi-source BFS
# Time: O(m·n) | Space: O(m·n)
# Source: https://leetcode.com/problems/rotting-oranges/

from collections import deque


def oranges_rotting(grid: list[list[int]]) -> int:
    rows, cols = len(grid), len(grid[0]) if grid else 0
    queue: deque[tuple[int, int]] = deque()
    fresh = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 2:
                queue.append((r, c))
            elif grid[r][c] == 1:
                fresh += 1
    minutes = 0
    dirs = [(1, 0), (-1, 0), (0, 1), (0, -1)]
    while queue and fresh > 0:
        minutes += 1
        for _ in range(len(queue)):
            r, c = queue.popleft()
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                    grid[nr][nc] = 2
                    fresh -= 1
                    queue.append((nr, nc))
    return minutes if fresh == 0 else -1
