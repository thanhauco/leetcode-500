# LeetCode 901 — Online Stock Span (Medium)
# Category: Stack · Approach: Monotonic stack
# Time: O(1) amortized per call | Space: O(n)
# Source: https://leetcode.com/problems/online-stock-span/

class StockSpanner:
    def __init__(self) -> None:
        self.stack: list[list[int]] = []  # [price, span]

    def next(self, price: int) -> int:
        span = 1
        while self.stack and self.stack[-1][0] <= price:
            span += self.stack.pop()[1]
        self.stack.append([price, span])
        return span
