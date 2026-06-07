# LeetCode 357 — Count Numbers with Unique Digits (Medium)
# Category: Math & Geometry · Approach: Combinatorial count
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/count-numbers-with-unique-digits/

def count_numbers_with_unique_digits(n: int) -> int:
    if n == 0:
        return 1
    total = 10
    unique = 9
    available = 9
    for _ in range(n - 1):
        unique *= available
        total += unique
        available -= 1
    return total
