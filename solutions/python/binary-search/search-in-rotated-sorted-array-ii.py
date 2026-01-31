# LeetCode 81 — Search in Rotated Sorted Array II (Medium)
# Category: Binary Search · Approach: Binary search
# Time: O(n) worst case | Space: O(1)
# Source: https://leetcode.com/problems/search-in-rotated-sorted-array-ii/

def search(nums: list[int], target: int) -> bool:
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return True
        if nums[lo] == nums[mid] == nums[hi]:
            lo += 1
            hi -= 1
        elif nums[lo] <= nums[mid]:
            if nums[lo] <= target < nums[mid]:
                hi = mid - 1
            else:
                lo = mid + 1
        else:
            if nums[mid] < target <= nums[hi]:
                lo = mid + 1
            else:
                hi = mid - 1
    return False
