# LeetCode 26 — Remove Duplicates from Sorted Array (Easy)
# Category: Two Pointers · Approach: Two Pointers
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/remove-duplicates-from-sorted-array/

def remove_duplicates(nums: list[int]) -> int:
    if not nums:
        return 0
    k = 1
    for i in range(1, len(nums)):
        if nums[i] != nums[i - 1]:
            nums[k] = nums[i]
            k += 1
    return k
