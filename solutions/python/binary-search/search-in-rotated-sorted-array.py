# LeetCode 33 — Search in Rotated Sorted Array (Medium)
# Category: Binary Search · Approach: Binary Search
# Time: O(log n) | Space: O(1)
# Source: https://leetcode.com/problems/search-in-rotated-sorted-array/

def search(nums: list[int], target: int) -> int:
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        if nums[lo] <= nums[mid]:
            if nums[lo] <= target < nums[mid]:
                hi = mid - 1
            else:
                lo = mid + 1
        else:
            if nums[mid] < target <= nums[hi]:
                lo = mid + 1
            else:
                hi = mid - 1
    return -1
