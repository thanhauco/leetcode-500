# LeetCode 1845 — Seat Reservation Manager (Medium)
# Category: Heap / Priority Queue · Approach: Counter + Min-Heap
# Time: O(log n) per op | Space: O(n)
# Source: https://leetcode.com/problems/seat-reservation-manager/

import heapq


class SeatManager:
    def __init__(self, n: int) -> None:
        self.next = 1
        self.heap: list[int] = []

    def reserve(self) -> int:
        if self.heap:
            return heapq.heappop(self.heap)
        seat = self.next
        self.next += 1
        return seat

    def unreserve(self, seat_number: int) -> None:
        heapq.heappush(self.heap, seat_number)
