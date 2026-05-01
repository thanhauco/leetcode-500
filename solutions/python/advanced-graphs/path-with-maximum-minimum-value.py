# LeetCode 1102 — Path With Maximum Minimum Value (Medium)
# Category: Advanced Graphs · Approach: Dijkstra (max-min)
# Time: O(m·n log(m·n)) | Space: O(m·n)
# Source: https://leetcode.com/problems/path-with-maximum-minimum-value/

import heapq


def maximum_minimum_path(grid: list[list[int]]) -> int:
    n, m = len(grid), len(grid[0])
    seen = [[False] * m for _ in range(n)]
    heap = [(-grid[0][0], 0, 0)]
    ans = grid[0][0]
    while heap:
        neg_v, r, c = heapq.heappop(heap)
        if seen[r][c]:
            continue
        seen[r][c] = True
        ans = min(ans, -neg_v)
        if r == n - 1 and c == m - 1:
            return ans
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr, nc = r + dr, c + dc
            if 0 <= nr < n and 0 <= nc < m and not seen[nr][nc]:
                heapq.heappush(heap, (-grid[nr][nc], nr, nc))
    return ans
