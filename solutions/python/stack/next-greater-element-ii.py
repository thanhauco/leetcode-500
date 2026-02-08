# LeetCode 503 — Next Greater Element II (Medium)
# Category: Stack · Approach: Monotonic stack
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/next-greater-element-ii/

def next_greater_elements(nums: list[int]) -> list[int]:
    n = len(nums)
    res = [-1] * n
    stack: list[int] = []  # indices
    for i in range(2 * n):
        cur = nums[i % n]
        while stack and nums[stack[-1]] < cur:
            res[stack.pop()] = cur
        if i < n:
            stack.append(i)
    return res
