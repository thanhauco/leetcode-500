# LeetCode 413 — Arithmetic Slices (Medium)
# Category: 1-D Dynamic Programming · Approach: Running count
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/arithmetic-slices/

def number_of_arithmetic_slices(nums: list[int]) -> int:
    total = cur = 0
    for i in range(2, len(nums)):
        if nums[i] - nums[i - 1] == nums[i - 1] - nums[i - 2]:
            cur += 1
            total += cur
        else:
            cur = 0
    return total
