# LeetCode 169 — Majority Element (Easy)
# Category: Arrays & Hashing · Approach: Boyer-Moore
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/majority-element/

def majority_element(nums: list[int]) -> int:
    candidate, count = None, 0
    for x in nums:
        if count == 0:
            candidate = x
        count += 1 if x == candidate else -1
    return candidate
