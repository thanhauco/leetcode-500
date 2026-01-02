# LeetCode 190 — Reverse Bits (Easy)
# Category: Bit Manipulation · Approach: Bit by Bit
# Time: O(1) | Space: O(1)
# Source: https://leetcode.com/problems/reverse-bits/

def reverse_bits(n: int) -> int:
    result = 0
    for _ in range(32):
        result = (result << 1) | (n & 1)
        n >>= 1
    return result
