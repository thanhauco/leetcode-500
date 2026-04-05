# LeetCode 376 — Wiggle Subsequence (Medium)
# Category: Greedy · Approach: Up/down counters
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/wiggle-subsequence/

def wiggle_max_length(nums: list[int]) -> int:
    if len(nums) < 2:
        return len(nums)
    up = down = 1
    for i in range(1, len(nums)):
        if nums[i] > nums[i - 1]:
            up = down + 1
        elif nums[i] < nums[i - 1]:
            down = up + 1
    return max(up, down)
