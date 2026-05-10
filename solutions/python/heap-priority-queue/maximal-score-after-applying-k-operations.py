# LeetCode 2530 — Maximal Score After Applying K Operations (Medium)
# Category: Heap / Priority Queue · Approach: Max-Heap
# Time: O((n + k) log n) | Space: O(n)
# Source: https://leetcode.com/problems/maximal-score-after-applying-k-operations/

import heapq
from math import ceil


def max_kelements(nums: list[int], k: int) -> int:
    heap = [-x for x in nums]
    heapq.heapify(heap)
    score = 0
    for _ in range(k):
        x = -heapq.heappop(heap)
        score += x
        heapq.heappush(heap, -ceil(x / 3))
    return score
