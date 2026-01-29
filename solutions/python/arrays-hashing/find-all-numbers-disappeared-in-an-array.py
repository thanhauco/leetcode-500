# LeetCode 448 — Find All Numbers Disappeared in an Array (Easy)
# Category: Arrays & Hashing · Approach: Index Marking
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/

def find_disappeared_numbers(nums: list[int]) -> list[int]:
    n = len(nums)
    for x in nums:
        idx = abs(x) - 1
        if nums[idx] > 0:
            nums[idx] = -nums[idx]
    return [i + 1 for i in range(n) if nums[i] > 0]
