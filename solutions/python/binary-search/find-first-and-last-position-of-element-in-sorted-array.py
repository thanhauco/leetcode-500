# LeetCode 34 — Find First and Last Position of Element in Sorted Array (Medium)
# Category: Binary Search · Approach: Two boundary searches
# Time: O(log n) | Space: O(1)
# Source: https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/

def search_range(nums: list[int], target: int) -> list[int]:
    def bound(is_lower: bool) -> int:
        lo, hi, ans = 0, len(nums) - 1, -1
        while lo <= hi:
            mid = (lo + hi) // 2
            if nums[mid] > target or (is_lower and nums[mid] == target):
                hi = mid - 1
            else:
                lo = mid + 1
            if nums[mid] == target:
                ans = mid
        return ans

    return [bound(True), bound(False)]
