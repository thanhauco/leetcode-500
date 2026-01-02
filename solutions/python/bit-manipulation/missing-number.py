# LeetCode 268 — Missing Number (Easy)
# Category: Bit Manipulation · Approach: XOR
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/missing-number/

def missing_number(nums: list[int]) -> int:
    missing = len(nums)
    for i, x in enumerate(nums):
        missing ^= i ^ x
    return missing
