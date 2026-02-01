# LeetCode 371 — Sum of Two Integers (Medium)
# Category: Bit Manipulation · Approach: Bitwise Add
# Time: O(1) | Space: O(1)
# Source: https://leetcode.com/problems/sum-of-two-integers/

def get_sum(a: int, b: int) -> int:
    mask = 0xFFFFFFFF
    while b & mask:
        carry = (a & b) << 1
        a, b = a ^ b, carry
    a &= mask
    return a if a <= 0x7FFFFFFF else ~(a ^ mask)
