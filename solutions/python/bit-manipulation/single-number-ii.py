# LeetCode 137 — Single Number II (Medium)
# Category: Bit Manipulation · Approach: Bit Counters
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/single-number-ii/

def single_number(nums: list[int]) -> int:
    ones = twos = 0
    for x in nums:
        ones = (ones ^ x) & ~twos
        twos = (twos ^ x) & ~ones
    return ones
