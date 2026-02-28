# LeetCode 1631 — Path With Minimum Effort (Medium)
# Category: Advanced Graphs · Approach: Dijkstra
# Time: O(R * C * log(R * C)) | Space: O(R * C)
# Source: https://leetcode.com/problems/path-with-minimum-effort/

import heapq


def minimum_effort_path(heights: list[list[int]]) -> int:
    rows, cols = len(heights), len(heights[0])
    effort = [[float("inf")] * cols for _ in range(rows)]
    effort[0][0] = 0
    heap: list[tuple[int, int, int]] = [(0, 0, 0)]
    while heap:
        e, r, c = heapq.heappop(heap)
        if r == rows - 1 and c == cols - 1:
            return e
        if e > effort[r][c]:
            continue
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols:
                ne = max(e, abs(heights[nr][nc] - heights[r][c]))
                if ne < effort[nr][nc]:
                    effort[nr][nc] = ne
                    heapq.heappush(heap, (ne, nr, nc))
    return 0
