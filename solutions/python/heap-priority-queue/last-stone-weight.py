# LeetCode 1046 — Last Stone Weight (Easy)
# Category: Heap / Priority Queue · Approach: Max-heap (negated)
# Time: O(n log n) | Space: O(n)
# Source: https://leetcode.com/problems/last-stone-weight/

import heapq

def last_stone_weight(stones: list[int]) -> int:
    heap = [-s for s in stones]
    heapq.heapify(heap)
    while len(heap) > 1:
        y = -heapq.heappop(heap)
        x = -heapq.heappop(heap)
        if y != x:
            heapq.heappush(heap, -(y - x))
    return -heap[0] if heap else 0
