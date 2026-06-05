# LeetCode 1167 — Minimum Cost to Connect Sticks (Medium)
# Category: Heap / Priority Queue · Approach: Min-heap
# Time: O(n log n) | Space: O(n)
# Source: https://leetcode.com/problems/minimum-cost-to-connect-sticks/

import heapq

def connect_sticks(sticks: list[int]) -> int:
    heap = sticks[:]
    heapq.heapify(heap)
    total = 0
    while len(heap) > 1:
        a = heapq.heappop(heap)
        b = heapq.heappop(heap)
        total += a + b
        heapq.heappush(heap, a + b)
    return total
