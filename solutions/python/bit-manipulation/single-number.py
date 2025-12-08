# LeetCode 136 — Single Number (Easy)
# Category: Bit Manipulation · Approach: XOR fold
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/single-number/

from functools import reduce
from operator import xor

def single_number(nums: list[int]) -> int:
    return reduce(xor, nums, 0)
