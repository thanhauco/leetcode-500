# LeetCode 50 — Pow(x, n) (Medium)
# Category: Math & Geometry · Approach: Fast Power
# Time: O(log n) | Space: O(1)
# Source: https://leetcode.com/problems/powx-n/

def my_pow(x: float, n: int) -> float:
    if n < 0:
        x = 1 / x
        n = -n
    result = 1.0
    while n > 0:
        if n % 2 == 1:
            result *= x
        x *= x
        n //= 2
    return result
