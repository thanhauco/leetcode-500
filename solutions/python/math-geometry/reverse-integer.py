# LeetCode 7 — Reverse Integer (Medium)
# Category: Math & Geometry · Approach: Digit Peel
# Time: O(log x) | Space: O(1)
# Source: https://leetcode.com/problems/reverse-integer/

def reverse(x: int) -> int:
    sign = -1 if x < 0 else 1
    n = abs(x)
    rev = 0
    while n > 0:
        rev = rev * 10 + n % 10
        n //= 10
    rev *= sign
    if rev < -(2 ** 31) or rev > 2 ** 31 - 1:
        return 0
    return rev
