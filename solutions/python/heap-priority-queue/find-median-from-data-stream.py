# LeetCode 295 — Find Median from Data Stream (Hard)
# Category: Heap / Priority Queue · Approach: Two heaps
# Time: O(log n) add, O(1) median | Space: O(n)
# Source: https://leetcode.com/problems/find-median-from-data-stream/

import heapq

class MedianFinder:
    def __init__(self):
        self.low: list[int] = []   # max-heap via negation
        self.high: list[int] = []  # min-heap

    def addNum(self, num: int) -> None:
        heapq.heappush(self.low, -num)
        heapq.heappush(self.high, -heapq.heappop(self.low))
        if len(self.high) > len(self.low):
            heapq.heappush(self.low, -heapq.heappop(self.high))

    def findMedian(self) -> float:
        if len(self.low) > len(self.high):
            return float(-self.low[0])
        return (-self.low[0] + self.high[0]) / 2
