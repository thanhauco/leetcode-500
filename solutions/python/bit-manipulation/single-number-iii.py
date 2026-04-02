# LeetCode 260 — Single Number III (Medium)
# Category: Bit Manipulation · Approach: XOR Partition
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/single-number-iii/

def single_number(nums: list[int]) -> list[int]:
    xor_all = 0
    for x in nums:
        xor_all ^= x
    diff = xor_all & (-xor_all)
    a = 0
    for x in nums:
        if x & diff:
            a ^= x
    return [a, xor_all ^ a]
