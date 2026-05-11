# LeetCode 2336 — Smallest Number in Infinite Set (Medium)
# Category: Heap / Priority Queue · Approach: Counter + Min-Heap
# Time: O(log k) per op | Space: O(k)
# Source: https://leetcode.com/problems/smallest-number-in-infinite-set/

import heapq


class SmallestInfiniteSet:
    def __init__(self) -> None:
        self.cur = 1
        self.heap: list[int] = []
        self.in_set: set[int] = set()

    def popSmallest(self) -> int:
        if self.heap:
            x = heapq.heappop(self.heap)
            self.in_set.discard(x)
            return x
        x = self.cur
        self.cur += 1
        return x

    def addBack(self, num: int) -> None:
        if num < self.cur and num not in self.in_set:
            self.in_set.add(num)
            heapq.heappush(self.heap, num)
