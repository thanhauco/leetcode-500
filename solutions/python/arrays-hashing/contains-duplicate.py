# LeetCode 217 — Contains Duplicate (Easy)
# Category: Arrays & Hashing · Approach: Hash Set
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/contains-duplicate/

def contains_duplicate(nums: list[int]) -> bool:
    return len(set(nums)) < len(nums)
