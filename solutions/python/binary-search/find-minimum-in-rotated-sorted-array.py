# LeetCode 153 — Find Minimum in Rotated Sorted Array (Medium)
# Category: Binary Search · Approach: Binary Search
# Time: O(log n) | Space: O(1)
# Source: https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/

def find_min(nums: list[int]) -> int:
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] > nums[hi]:
            lo = mid + 1
        else:
            hi = mid
    return nums[lo]
