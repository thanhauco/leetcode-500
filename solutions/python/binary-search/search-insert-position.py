# LeetCode 35 — Search Insert Position (Easy)
# Category: Binary Search · Approach: Lower Bound
# Time: O(log n) | Space: O(1)
# Source: https://leetcode.com/problems/search-insert-position/

def search_insert(nums: list[int], target: int) -> int:
    lo, hi = 0, len(nums)
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid
    return lo
