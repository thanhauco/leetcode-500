# LeetCode 287 — Find the Duplicate Number (Medium)
# Category: Binary Search · Approach: Binary Search on Value
# Time: O(n log n) | Space: O(1)
# Source: https://leetcode.com/problems/find-the-duplicate-number/

def find_duplicate(nums: list[int]) -> int:
    lo, hi = 1, len(nums) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        count = sum(1 for x in nums if x <= mid)
        if count > mid:
            hi = mid
        else:
            lo = mid + 1
    return lo
