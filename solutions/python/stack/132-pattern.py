# LeetCode 456 — 132 Pattern (Medium)
# Category: Stack · Approach: Monotonic Stack
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/132-pattern/

def find_132_pattern(nums: list[int]) -> bool:
    stack: list[int] = []
    third = float("-inf")
    for x in reversed(nums):
        if x < third:
            return True
        while stack and stack[-1] < x:
            third = stack.pop()
        stack.append(x)
    return False
