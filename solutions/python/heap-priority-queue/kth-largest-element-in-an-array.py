# LeetCode 215 — Kth Largest Element in an Array (Medium)
# Category: Heap / Priority Queue · Approach: Min-heap size k
# Time: O(n log k) | Space: O(k)
# Source: https://leetcode.com/problems/kth-largest-element-in-an-array/

import heapq

def find_kth_largest(nums: list[int], k: int) -> int:
    heap: list[int] = []
    for x in nums:
        heapq.heappush(heap, x)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]
