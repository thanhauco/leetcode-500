# LeetCode 778 — Swim in Rising Water (Hard)
# Category: Advanced Graphs · Approach: Dijkstra
# Time: O(n^2 log n) | Space: O(n^2)
# Source: https://leetcode.com/problems/swim-in-rising-water/

import heapq


def swim_in_water(grid: list[list[int]]) -> int:
    n = len(grid)
    seen = [[False] * n for _ in range(n)]
    heap = [(grid[0][0], 0, 0)]
    seen[0][0] = True
    ans = 0
    while heap:
        t, r, c = heapq.heappop(heap)
        ans = max(ans, t)
        if r == n - 1 and c == n - 1:
            return ans
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr, nc = r + dr, c + dc
            if 0 <= nr < n and 0 <= nc < n and not seen[nr][nc]:
                seen[nr][nc] = True
                heapq.heappush(heap, (grid[nr][nc], nr, nc))
    return ans
