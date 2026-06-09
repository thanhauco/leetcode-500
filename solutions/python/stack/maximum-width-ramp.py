# LeetCode 962 — Maximum Width Ramp (Medium)
# Category: Stack · Approach: Monotonic Stack
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/maximum-width-ramp/

def max_width_ramp(nums: list[int]) -> int:
    stack: list[int] = []
    for i, x in enumerate(nums):
        if not stack or nums[stack[-1]] > x:
            stack.append(i)
    res = 0
    for j in range(len(nums) - 1, -1, -1):
        while stack and nums[stack[-1]] <= nums[j]:
            res = max(res, j - stack.pop())
    return res
