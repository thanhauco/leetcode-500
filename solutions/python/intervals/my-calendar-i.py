# LeetCode 729 — My Calendar I (Medium)
# Category: Intervals · Approach: Linear scan
# Time: O(n) per book | Space: O(n)
# Source: https://leetcode.com/problems/my-calendar-i/

class MyCalendar:
    def __init__(self) -> None:
        self.events: list[tuple[int, int]] = []

    def book(self, start: int, end: int) -> bool:
        for s, e in self.events:
            if start < e and s < end:
                return False
        self.events.append((start, end))
        return True
