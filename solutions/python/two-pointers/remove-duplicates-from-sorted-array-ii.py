# LeetCode 80 — Remove Duplicates from Sorted Array II (Medium)
# Category: Two Pointers · Approach: Two Pointers
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/

def remove_duplicates(nums: list[int]) -> int:
    k = 0
    for x in nums:
        if k < 2 or nums[k - 2] != x:
            nums[k] = x
            k += 1
    return k
