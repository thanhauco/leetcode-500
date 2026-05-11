# LeetCode 2462 — Total Cost to Hire K Workers (Medium)
# Category: Heap / Priority Queue · Approach: Two Heaps
# Time: O((k + candidates) log candidates) | Space: O(candidates)
# Source: https://leetcode.com/problems/total-cost-to-hire-k-workers/

import heapq


def total_cost(costs: list[int], k: int, candidates: int) -> int:
    n = len(costs)
    left: list[int] = []
    right: list[int] = []
    i, j = 0, n - 1
    while len(left) < candidates and i <= j:
        heapq.heappush(left, costs[i]); i += 1
    while len(right) < candidates and i <= j:
        heapq.heappush(right, costs[j]); j -= 1
    total = 0
    for _ in range(k):
        lv = left[0] if left else float("inf")
        rv = right[0] if right else float("inf")
        if lv <= rv:
            total += heapq.heappop(left)
            if i <= j:
                heapq.heappush(left, costs[i]); i += 1
        else:
            total += heapq.heappop(right)
            if i <= j:
                heapq.heappush(right, costs[j]); j -= 1
    return total
