# LeetCode 263 — Ugly Number (Easy)
# Category: Math & Geometry · Approach: Factor Stripping
# Time: O(log n) | Space: O(1)
# Source: https://leetcode.com/problems/ugly-number/

def is_ugly(n: int) -> bool:
    if n <= 0:
        return False
    for p in (2, 3, 5):
        while n % p == 0:
            n //= p
    return n == 1
