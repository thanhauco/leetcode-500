# LeetCode 154 — Find Minimum in Rotated Sorted Array II (Hard)
# Category: Binary Search · Approach: Binary search
# Time: O(log n) avg, O(n) worst | Space: O(1)
# Source: https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/

def find_min(nums: list[int]) -> int:
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] > nums[hi]:
            lo = mid + 1
        elif nums[mid] < nums[hi]:
            hi = mid
        else:
            hi -= 1
    return nums[lo]
