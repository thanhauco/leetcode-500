# LeetCode 540 — Single Element in a Sorted Array (Medium)
# Category: Binary Search · Approach: Binary search on pairs
# Time: O(log n) | Space: O(1)
# Source: https://leetcode.com/problems/single-element-in-a-sorted-array/

def single_non_duplicate(nums: list[int]) -> int:
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if mid % 2 == 1:
            mid -= 1
        if nums[mid] == nums[mid + 1]:
            lo = mid + 2
        else:
            hi = mid
    return nums[lo]
