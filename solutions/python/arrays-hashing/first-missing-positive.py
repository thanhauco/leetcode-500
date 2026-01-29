# LeetCode 41 — First Missing Positive (Hard)
# Category: Arrays & Hashing · Approach: Cyclic Sort
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/first-missing-positive/

def first_missing_positive(nums: list[int]) -> int:
    n = len(nums)
    for i in range(n):
        while 0 < nums[i] <= n and nums[nums[i] - 1] != nums[i]:
            j = nums[i] - 1
            nums[i], nums[j] = nums[j], nums[i]
    for i in range(n):
        if nums[i] != i + 1:
            return i + 1
    return n + 1
