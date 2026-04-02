# LeetCode 89 — Gray Code (Medium)
# Category: Bit Manipulation · Approach: Reflected Formula
# Time: O(2^n) | Space: O(2^n)
# Source: https://leetcode.com/problems/gray-code/

def gray_code(n: int) -> list[int]:
    return [i ^ (i >> 1) for i in range(1 << n)]
