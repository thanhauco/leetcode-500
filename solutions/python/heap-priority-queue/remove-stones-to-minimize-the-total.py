# LeetCode 1962 — Remove Stones to Minimize the Total (Medium)
# Category: Heap / Priority Queue · Approach: Max-Heap
# Time: O((n + k) log n) | Space: O(n)
# Source: https://leetcode.com/problems/remove-stones-to-minimize-the-total/

import heapq


def min_stone_sum(piles: list[int], k: int) -> int:
    heap = [-p for p in piles]
    heapq.heapify(heap)
    total = sum(piles)
    for _ in range(k):
        x = -heapq.heappop(heap)
        removed = x // 2
        total -= removed
        heapq.heappush(heap, -(x - removed))
    return total
