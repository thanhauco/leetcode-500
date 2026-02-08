# LeetCode 232 — Implement Queue using Stacks (Easy)
# Category: Stack · Approach: Two stacks
# Time: O(1) amortized per op | Space: O(n)
# Source: https://leetcode.com/problems/implement-queue-using-stacks/

class MyQueue:
    def __init__(self) -> None:
        self.in_stk: list[int] = []
        self.out_stk: list[int] = []

    def push(self, x: int) -> None:
        self.in_stk.append(x)

    def _shift(self) -> None:
        if not self.out_stk:
            while self.in_stk:
                self.out_stk.append(self.in_stk.pop())

    def pop(self) -> int:
        self._shift()
        return self.out_stk.pop()

    def peek(self) -> int:
        self._shift()
        return self.out_stk[-1]

    def empty(self) -> bool:
        return not self.in_stk and not self.out_stk
