# LeetCode 162 — Find Peak Element (Medium)
# Category: Binary Search · Approach: Binary search
# Time: O(log n) | Space: O(1)
# Source: https://leetcode.com/problems/find-peak-element/

def find_peak_element(nums: list[int]) -> int:
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] > nums[mid + 1]:
            hi = mid
        else:
            lo = mid + 1
    return lo
