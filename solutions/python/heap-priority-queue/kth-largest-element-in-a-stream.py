# LeetCode 703 — Kth Largest Element in a Stream (Easy)
# Category: Heap / Priority Queue · Approach: Min-heap size k
# Time: O(log k) per add | Space: O(k)
# Source: https://leetcode.com/problems/kth-largest-element-in-a-stream/

import heapq

class KthLargest:
    def __init__(self, k: int, nums: list[int]):
        self.k = k
        self.heap = nums[:]
        heapq.heapify(self.heap)
        while len(self.heap) > k:
            heapq.heappop(self.heap)

    def add(self, val: int) -> int:
        heapq.heappush(self.heap, val)
        if len(self.heap) > self.k:
            heapq.heappop(self.heap)
        return self.heap[0]
