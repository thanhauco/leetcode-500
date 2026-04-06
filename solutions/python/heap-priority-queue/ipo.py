# LeetCode 502 — IPO (Hard)
# Category: Heap / Priority Queue · Approach: Greedy + max-heap
# Time: O(n log n) | Space: O(n)
# Source: https://leetcode.com/problems/ipo/

import heapq

def find_maximized_capital(k: int, w: int, profits: list[int], capital: list[int]) -> int:
    projects = sorted(zip(capital, profits))
    heap: list[int] = []
    i = 0
    for _ in range(k):
        while i < len(projects) and projects[i][0] <= w:
            heapq.heappush(heap, -projects[i][1])
            i += 1
        if not heap:
            break
        w -= heapq.heappop(heap)
    return w
