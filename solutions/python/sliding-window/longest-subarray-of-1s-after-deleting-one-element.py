# LeetCode 1493 — Longest Subarray of 1's After Deleting One Element (Medium)
# Category: Sliding Window · Approach: Sliding Window
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/

def longest_subarray(nums: list[int]) -> int:
    left = zeros = best = 0
    for right, x in enumerate(nums):
        if x == 0:
            zeros += 1
        while zeros > 1:
            if nums[left] == 0:
                zeros -= 1
            left += 1
        best = max(best, right - left)
    return best
